WITH ranked_products AS (
  SELECT ctid,
         ROW_NUMBER() OVER (
           PARTITION BY "collectionId", "name"
           ORDER BY "id"
         ) AS rn
  FROM "Product"
)
DELETE FROM "Product"
WHERE ctid IN (
  SELECT ctid FROM ranked_products WHERE rn > 1
);

WITH ranked_collections AS (
  SELECT ctid,
         ROW_NUMBER() OVER (
           PARTITION BY "title"
           ORDER BY "id"
         ) AS rn
  FROM "Collection"
)
DELETE FROM "Collection"
WHERE ctid IN (
  SELECT ctid FROM ranked_collections WHERE rn > 1
);
