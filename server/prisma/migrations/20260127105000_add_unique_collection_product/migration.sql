-- CreateIndex
CREATE UNIQUE INDEX "Collection_title_key" ON "Collection"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Product_collectionId_name_key" ON "Product"("collectionId", "name");
