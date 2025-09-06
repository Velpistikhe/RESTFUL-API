const prisma = require("../../config/prismaClient");
const fs = require("fs").promises;
const path = require("path");

const getProducts = async (req, res, next) => {
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

  const where = {
    AND: filters,
  };

  try {
    const [produks, total] = await Promise.all([
      prisma.tD_Produk.findMany({
        where,
        skip,
        take,
        orderBy: { [sort]: order },
      }),
      prisma.tD_Produk.count({ where }),
    ]);

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

const createProduct = async (req, res, next) => {
  const user = req.user;
  const { nama, harga, kondisi, spesifikasi, deskripsi } = req.body;
  const files = req.files;

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
          aksi: 1,
          userId: user.id,
          keterangan: "Produk",
        },
      });

      await Promise.all(
        files.map((file, index) => {
          return tx.tD_ProdukImage.create({
            data: {
              name: file.filename,
              path: file.path,
              produkId: createProduct.id,
              primary: index === 0 ? 1 : 2,
            },
          });
        })
      );

      return createProduct;
    });

    res.status(201).json({
      success: true,
      message: "Produk berhasil ditambahkan",
      produk: newProduk,
    });
  } catch (error) {
    await Promise.all(files.map(async (file) => await fs.unlink(file.path)));
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    res.status(200).json({ success: true, message: "Produk berhasil dihapus" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, createProduct, deleteProduct };
