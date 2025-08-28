const prisma = require("../../config/prismaClient");

const getItems = async (req, res, next) => {
  try {
    const datas = await prisma.tD_Item.findMany();

    res.status(200).json({ success: true, items: datas });
  } catch (error) {
    next(error);
  }
};

const postItem = async (req, res, next) => {
  const { barcode, nama, jenis, berat, satuan, perusahaan, harga } = req.body;

  if (!barcode || !nama || !jenis || !berat || !satuan || !perusahaan || !harga)
    return res.status(400).json({
      success: false,
      message: "Data tidak lengkap harap periksa kembali",
    });

  try {
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

    // if (!createData)
    //   return res
    //     .status(409)
    //     .json({ success: false, message: "Barang gagal ditambahkan" });

    res
      .status(201)
      .json({ success: true, message: "Barang berhasil ditambahkan" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getItems, postItem };
