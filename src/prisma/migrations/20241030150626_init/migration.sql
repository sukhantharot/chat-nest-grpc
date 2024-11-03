-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN DEFAULT true,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedBy" INTEGER,
    "updatedBy" INTEGER,
    "createdBy" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN DEFAULT true,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedBy" INTEGER,
    "updatedBy" INTEGER,
    "createdBy" INTEGER,
    "nameEn" TEXT,
    "nameTh" TEXT,
    "descriptionEn" TEXT,
    "descriptionTh" TEXT,
    "itineraryEn" TEXT,
    "itineraryTh" TEXT,
    "conditionsEn" TEXT,
    "conditionsTh" TEXT,
    "remarksEn" TEXT,
    "remarksTh" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN DEFAULT true,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedBy" INTEGER,
    "updatedBy" INTEGER,
    "createdBy" INTEGER,
    "titleEn" TEXT,
    "titleTh" TEXT,
    "descriptionEn" TEXT,
    "descriptionTh" TEXT,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN DEFAULT true,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedBy" INTEGER,
    "updatedBy" INTEGER,
    "createdBy" INTEGER,
    "titleEn" TEXT,
    "titleTh" TEXT,
    "saleAdultPrice" DOUBLE PRECISION,
    "saleChildPrice" DOUBLE PRECISION,
    "promotionAdultPrice" DOUBLE PRECISION,
    "promotionChildPrice" DOUBLE PRECISION,
    "packageId" INTEGER NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductItinerary" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN DEFAULT true,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedBy" INTEGER,
    "updatedBy" INTEGER,
    "createdBy" INTEGER,
    "titleEn" TEXT,
    "titleTh" TEXT,
    "subTitleEn" TEXT,
    "subTitleTh" TEXT,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "ProductItinerary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "Product_nameEn_idx" ON "Product"("nameEn");

-- CreateIndex
CREATE INDEX "Product_nameTh_idx" ON "Product"("nameTh");

-- CreateIndex
CREATE INDEX "Package_titleEn_idx" ON "Package"("titleEn");

-- CreateIndex
CREATE INDEX "Package_titleTh_idx" ON "Package"("titleTh");

-- CreateIndex
CREATE INDEX "Price_titleEn_idx" ON "Price"("titleEn");

-- CreateIndex
CREATE INDEX "Price_titleTh_idx" ON "Price"("titleTh");

-- CreateIndex
CREATE INDEX "Price_saleAdultPrice_idx" ON "Price"("saleAdultPrice");

-- CreateIndex
CREATE INDEX "Price_saleChildPrice_idx" ON "Price"("saleChildPrice");

-- CreateIndex
CREATE INDEX "Price_promotionAdultPrice_idx" ON "Price"("promotionAdultPrice");

-- CreateIndex
CREATE INDEX "Price_promotionChildPrice_idx" ON "Price"("promotionChildPrice");

-- CreateIndex
CREATE INDEX "ProductItinerary_titleEn_idx" ON "ProductItinerary"("titleEn");

-- CreateIndex
CREATE INDEX "ProductItinerary_titleTh_idx" ON "ProductItinerary"("titleTh");

-- CreateIndex
CREATE INDEX "ProductItinerary_subTitleEn_idx" ON "ProductItinerary"("subTitleEn");

-- CreateIndex
CREATE INDEX "ProductItinerary_subTitleTh_idx" ON "ProductItinerary"("subTitleTh");

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItinerary" ADD CONSTRAINT "ProductItinerary_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
