-- CreateTable
CREATE TABLE "public"."TD_Item" (
    "id" TEXT NOT NULL,
    "barcode" INTEGER NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "jenis" VARCHAR(255) NOT NULL,
    "berat" INTEGER NOT NULL,
    "satuan" VARCHAR(10) NOT NULL,
    "perusahaan" VARCHAR(255) NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "harga" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TD_Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TH_Item" (
    "id" TEXT NOT NULL,
    "itemId" VARCHAR(255) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TH_Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."TH_Item" ADD CONSTRAINT "TH_Item_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "public"."TD_Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
