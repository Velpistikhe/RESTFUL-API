const fs = require("fs").promises;
const prisma = require("../../config/prismaClient");
const { AKSI, IMAGE_TYPE } = require("../../utils/constanst");

const getProducts = async (req, res, next) => {
  try {
    const {
      nama,
      harga,
      page = 1,
      limit = 10,
      sort = "createAt",
      order = "desc",
    } = req.query;

    const currentPage = parseInt(page);
    const take = parseInt(limit);
    const skip = (currentPage - 1) * take;

    const filters = [
      nama && { nama: { contains: nama, mode: "insensitive" } },
      harga && { harga: parseFloat(harga) },
    ].filter(Boolean);

    const allowedSortFields = ["nama", "kondisi", "createAt"];
    const allowedOrder = ["asc", "desc"];
    const sortField = allowedSortFields.includes(sort) ? sort : "createAt";
    const sortOrder = allowedOrder.includes(order.toLowerCase())
      ? order
      : "desc";

    const where = {
      AND: filters,
    };

    const [datas, total] = await Promise.all([
      prisma.tD_Produk.findMany({
        where,
        skip,
        take,
        orderBy: { [sortField]: sortOrder },
        include: {
          TD_ProdukImage: true,
        },
      }),

      prisma.tD_Produk.count({ where }),
    ]);

    const produks = datas?.map((data) => {
      const { TD_ProdukImage, ...restData } = data;
      return {
        ...restData,
        image:
          process.env.NODE_ENV === "production"
            ? TD_ProdukImage[0]?.path
            : `http://localhost:5000/pictures/product/${TD_ProdukImage[0].name}`,
      };
    });

    res.status(200).json({
      success: true,
      pagination: {
        total,
        page: currentPage,
        limit: take,
        totalPages: Math.ceil(total / take),
      },

      produks,
    });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await prisma.tD_Produk.findUnique({
      where: {
        id,
      },
      include: {
        TD_ProdukImage: true,
      },
    });

    if (!data)
      return res
        .status(404)
        .json({ success: false, message: "Produk tidak ditemukan" });

    const { kondisi, TD_ProdukImage, ...item } = data;

    const produk = {
      ...item,
      kondisi: kondisi === 1 ? "Baru" : "Bekas",
      image: TD_ProdukImage.map((pic) =>
        process.env.NODE_ENV === "production"
          ? pic.path
          : `http://localhost:5000/pictures/product/${pic.name}`
      ),
    };

    res.status(200).json({ success: true, produk });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  const user = req.user;
  const { nama, harga, kondisi, spesifikasi, deskripsi } = req.body;
  const files = req.files || [];

  try {
    const newProduk = await prisma.$transaction(async (tx) => {
      const createProduct = await tx.tD_Produk.create({
        data: {
          nama,
          harga: Number(harga),
          kondisi: Number(kondisi),
          spesifikasi: spesifikasi || "-",
          deskripsi: deskripsi || "-",
        },
      });

      await tx.tH_Produk.create({
        data: {
          produkId: createProduct.id,
          aksi: AKSI.CREATE,
          userId: user.id,
          keterangan: "Produk",
        },
      });

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        await tx.tD_ProdukImage.create({
          data: {
            name: file.filename,
            path: file.path,
            produkId: createProduct.id,
            primary: i === 0 ? IMAGE_TYPE.PRIMARY : IMAGE_TYPE.SECONDARY,
          },
        });
      }

      return createProduct;
    });

    res.status(201).json({
      success: true,
      message: "Produk berhasil ditambahkan",
      produk: newProduk,
    });
  } catch (error) {
    try {
      await Promise.all(files.map(async (file) => await fs.unlink(file.path)));
    } catch (fsError) {
      console.error("Gagal menghapus file", fsError);
    }

    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Data tidak lengkap" });

    const existProduct = await prisma.tD_Produk.findUnique({
      where: {
        id,
      },
    });

    if (!existProduct)
      return res
        .status(404)
        .json({ success: false, message: "Produk tidak ditemukan" });

    const findImage = await prisma.tD_ProdukImage.findMany({
      where: {
        produkId: existProduct.id,
      },
    });

    await Promise.all(
      findImage.map(async ({ id: idImage, path }) => {
        try {
          await fs.unlink(path);
        } catch (fsError) {
          console.error("Gagal menghapus file", fsError);
        }

        try {
          await prisma.tD_ProdukImage.delete({
            where: {
              id: idImage,
            },
          });
        } catch (imgError) {
          console.error("Gagal menghapus gambar", imgError);
        }
      })
    );

    await prisma.tH_Produk.deleteMany({
      where: {
        produkId: existProduct.id,
      },
    });

    await prisma.tD_Produk.delete({
      where: {
        id: existProduct.id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Produk berhasil dihapus",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, getProduct, createProduct, deleteProduct };
