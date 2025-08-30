const prisma = require("../../config/prismaClient");

const getItems = async (req, res, next) => {
  console.log(req.query);
  const {
    barcode,
    nama,
    jenis,
    berat,
    satuan,
    perusahaan,
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
    barcode && { barcode: { contains: barcode, mode: "insensitive" } },
    nama && { nama: { contains: nama, mode: "insensitive" } },
    jenis && { jenis: { contains: jenis, mode: "insensitive" } },
    berat && { berat: parseFloat(berat) },
    satuan && { satuan: { contains: satuan, mode: "insensitive" } },
    perusahaan && {
      perusahaan: { contains: perusahaan, mode: "insensitive" },
    },
    harga && { harga: parseFloat(harga) },
  ].filter(Boolean);

  const where = {
    AND: filters,
  };

  try {
    const [items, total] = await Promise.all([
      prisma.tD_Item.findMany({
        where,
        skip,
        take,
        orderBy: { [sort]: order },
      }),
      prisma.tD_Item.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      pagination: {
        total,
        page: currentPage,
        limit: take,
        totalPages: Math.ceil(total / take),
      },
      items,
    });
  } catch (error) {
    next(error);
  }
};

const postItem = async (req, res, next) => {
  const { barcode, nama, jenis, berat, satuan, perusahaan, harga } = req.body;

  try {
    const exist = await prisma.tD_Item.findFirst({
      where: {
        AND: {
          nama,
          jenis,
          berat,
          satuan,
          perusahaan,
        },
      },
    });

    if (exist)
      return res
        .status(409)
        .json({ success: false, message: "Barang sudah tersedia" });

    const createData = await prisma.tD_Item.create({
      data: {
        barcode,
        nama,
        jenis,
        berat,
        satuan,
        perusahaan,
        harga,
      },
    });

    res.status(201).json({
      success: true,
      message: "Barang berhasil ditambahkan",
      item: createData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getItems, postItem };
