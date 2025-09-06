const prisma = require("../../config/prismaClient");

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
  const { nama, harga, kondisi, spesifikasi, deskripsi } = req.body;
  const user = req.user;

  try {
    const createProduct = await prisma.tD_Produk.create({
      data: {
        nama,
        harga: parseInt(harga),
        kondisi: parseInt(kondisi),
        spesifikasi,
        deskripsi,
      },
    });

    if (createProduct) {
      await prisma.tH_Produk.create({
        data: {
          produkId: createProduct.id,
          aksi: 1,
          userId: user.id,
        },
      });
    }

    res.status(201).json({
      success: true,
      message: "Produk berhasil ditambahkan",
      produk: createProduct,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, createProduct };
