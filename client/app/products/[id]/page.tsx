"use client";

import Link from "next/link";
import { Alert, Box, Button, CircularProgress, IconButton, Snackbar, Stack, Typography } from "@mui/material";
import { useParams, useSearchParams } from "next/navigation";
import { apiFetch } from "@/src/shared/api/http";
import BrushIcon from "@mui/icons-material/Brush";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import VerifiedIcon from "@mui/icons-material/Verified";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/src/shared/providers/CartProvider";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

type Product = {
  id: number;
  name: string;
  desc?: string | null;
  finish?: string | null;
  important?: string | null;
  material?: string | null;
  image?: string | null;
  images?: string[] | null;
  price: number | string;
  collectionId?: number;
};

const formatCurrency = (value?: number | string) => {
  if (value === undefined || value === null) {
    return "€—";
  }
  const numeric = Number(value);
  if (Number.isNaN(numeric)) {
    return String(value);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numeric);
};

export default function ProductPage() {
  const params = useParams<{ id?: string | string[] }>();
  const idValue = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const searchParams = useSearchParams();
  const collectionSlug = searchParams.get("collection");
  const accent = "#f2b90d";
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const relatedRef = useRef<HTMLDivElement | null>(null);
  const { addItem, isLoading: isCartUpdating, error: cartError } = useCart();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<"success" | "error">("success");
  const fallbackImage =
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80";

  useEffect(() => {
    if (!idValue) {
      return;
    }
    let cancelled = false;
    const load = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const item = await apiFetch<Product>(`/product/${idValue}`);
        if (!cancelled) {
          setProduct(item);
          setActiveImage(0);
        }
        const allProducts = await apiFetch<Product[]>("/product");
        const relatedItems = allProducts
          .filter((entry) => entry.id !== item.id)
          .filter((entry) =>
            item.collectionId ? entry.collectionId === item.collectionId : true,
          )
          .slice(0, 6);
        if (!cancelled) {
          setRelated(relatedItems);
        }
      } catch (error) {
        if (!cancelled) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "Failed to load product.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [idValue]);

  const viewName = product?.name ?? `Product ${idValue ?? "—"}`;
  const descValue = product?.desc?.trim() || "Description will be available soon.";
  const detailItems = [
    {
      label: "Finish",
      value: product?.finish?.trim(),
      icon: <DragIndicatorIcon sx={{ color: accent, fontSize: 22 }} />,
    },
    {
      label: "Material",
      value: product?.material?.trim(),
      icon: <DragIndicatorIcon sx={{ color: accent, fontSize: 22 }} />,
    },
    {
      label: "Important",
      value: product?.important?.trim(),
      icon: <DragIndicatorIcon sx={{ color: accent, fontSize: 22 }} />,
    },
  ].filter((item) => Boolean(item.value));
  const galleryImages = useMemo(() => {
    const images = product?.images?.filter(Boolean) ?? [];
    if (images.length > 0) {
      return images;
    }
    return [product?.image ?? fallbackImage];
  }, [product?.image, product?.images]);
  const activeSrc = galleryImages[Math.min(activeImage, galleryImages.length - 1)];
  const scrollRelated = (direction: "left" | "right") => {
    const node = relatedRef.current;
    if (!node) {
      return;
    }
    const delta = Math.round(node.clientWidth * 0.85);
    node.scrollBy({
      left: direction === "left" ? -delta : delta,
      behavior: "smooth",
    });
  };
  const hasMultipleImages = galleryImages.length > 1;
  const handlePrevImage = () => {
    if (!hasMultipleImages) {
      return;
    }
    setActiveImage((value) => (value - 1 + galleryImages.length) % galleryImages.length);
  };
  const handleNextImage = () => {
    if (!hasMultipleImages) {
      return;
    }
    setActiveImage((value) => (value + 1) % galleryImages.length);
  };

  return (
    <Stack spacing={6}>
      <Box>
        <Link
          href={collectionSlug ? `/collections/${collectionSlug}` : "/shop"}
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="contained"
            startIcon={<ChevronLeftIcon sx={{ fontSize: "1.1rem" }} />}
            sx={{
              backgroundColor: accent,
              color: "rgba(18,21,26,0.95)",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              fontSize: "0.7rem",
              fontWeight: 700,
              px: 2.5,
              borderRadius: 999,
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              "&:hover": { backgroundColor: "#f6c423" },
            }}
          >
            Back to collection
          </Button>
        </Link>
      </Box>

      {loadError && (
        <Alert severity="error" sx={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
          {loadError}
        </Alert>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 560px) minmax(0, 440px)" },
          gap: { xs: 4, lg: 5 },
          alignItems: "start",
          justifyContent: "center",
        }}
      >
        <Stack spacing={2.5} direction="column">
          <Box
            sx={{
              flex: 1,
              maxWidth: { xs: "100%", lg: 560 },
              maxHeight: { xs: 520, lg: 640 },
              borderRadius: 3,
              overflow: "hidden",
              aspectRatio: "4 / 5",
              position: "relative",
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {isLoading && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                  backgroundColor: "rgba(0,0,0,0.35)",
                }}
              >
                <CircularProgress size={32} sx={{ color: accent }} />
              </Box>
            )}
            {activeSrc ? (
              <Box
                component="img"
                src={activeSrc}
                alt={viewName}
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "center",
                  imageRendering: "auto",
                }}
              />
            ) : (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(255,255,255,0.08)",
                }}
              />
            )}
            {hasMultipleImages && (
              <>
                <IconButton
                  onClick={handlePrevImage}
                  aria-label="Previous image"
                  sx={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "rgba(10,12,16,0.6)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "rgba(255,255,255,0.8)",
                    "&:hover": { backgroundColor: "rgba(10,12,16,0.8)" },
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton
                  onClick={handleNextImage}
                  aria-label="Next image"
                  sx={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "rgba(10,12,16,0.6)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "rgba(255,255,255,0.8)",
                    "&:hover": { backgroundColor: "rgba(10,12,16,0.8)" },
                  }}
                >
                  <ChevronRightIcon />
                </IconButton>
              </>
            )}
          </Box>
          {hasMultipleImages && (
            <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap" }}>
              {galleryImages.map((src, index) => (
                <Box
                  key={`${product?.id ?? idValue ?? "product"}-thumb-${index}`}
                  onClick={() => setActiveImage(index)}
                  sx={{
                    width: { xs: 64, lg: 84 },
                    height: { xs: 64, lg: 84 },
                    borderRadius: 2,
                    overflow: "hidden",
                    border:
                      index === activeImage
                        ? `2px solid ${accent}`
                        : "1px solid rgba(255,255,255,0.1)",
                    cursor: "pointer",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      backgroundImage: `url(${src})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: index === activeImage ? "none" : "grayscale(0.5)",
                    }}
                  />
                </Box>
              ))}
            </Stack>
          )}
        </Stack>

        <Box
          sx={{
            borderRadius: 3,
            p: { xs: 3, md: 3.5 },
            backgroundColor: "rgba(20, 22, 28, 0.72)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(18px)",
            position: "sticky",
            top: 96,
          }}
        >
          <Stack spacing={2.5}>
            <Box>
              <Typography sx={{ fontSize: "2rem", fontWeight: 700, fontFamily: "var(--font-playfair)" }}>
                {viewName}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="baseline" sx={{ mt: 1 }}>
                <Typography sx={{ fontSize: "1.7rem", color: accent, fontWeight: 300 }}>
                  {formatCurrency(product?.price)}
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.35)", textDecoration: "line-through" }}>
                  €165
                </Typography>
              </Stack>
            </Box>

            <Box>
              <Typography
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.55)",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  pb: 1,
                  mb: 2,
                }}
              >
                About the product
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: "0.16em",
                      fontSize: "0.82rem",
                      color: accent,
                      mb: 0.8,
                    }}
                  >
                    Description
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.75)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                    {descValue}
                  </Typography>
                </Box>
                <Box sx={{ height: 2, backgroundColor: "rgba(255,255,255,0.08)" }} />
                <Stack spacing={1.8}>
                  {detailItems.map((item) => (
                    <Stack key={item.label} direction="row" spacing={1.5} alignItems="flex-start" >
                      <Box sx={{ pt: 0.2 }}>{item.icon}</Box>
                      <Box>
                        <Typography
                          sx={{
                            textTransform: "uppercase",
                            letterSpacing: "0.16em",
                            fontSize: "0.82rem",
                            color: accent,
                          }}
                        >
                          {item.label}
                        </Typography>
                        <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", mt: 0.4, lineHeight: 1.6 }}>
                          {item.value}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Box>

            <Stack spacing={1.5}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 2,
                    border: "1px solid rgba(255,255,255,0.1)",
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                >
                  <IconButton
                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                    sx={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ width: 32, textAlign: "center", fontWeight: 700 }}>
                    {quantity}
                  </Typography>
                  <IconButton
                    onClick={() => setQuantity((value) => value + 1)}
                    sx={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
                <Button
                  fullWidth
                  sx={{
                    height: 48,
                    backgroundColor: accent,
                    color: "rgba(18,21,26,0.9)",
                    fontWeight: 800,
                    "&:hover": { backgroundColor: "#f6c423" },
                  }}
                  disabled={!product || isCartUpdating}
                  onClick={async () => {
                    if (!product) {
                      return;
                    }
                    const success = await addItem(
                      {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image ?? null,
                        collectionId: product.collectionId ?? null,
                      },
                      quantity
                    );
                    setToastMessage(
                      success
                        ? "Item added to cart."
                        : "Unable to add item to cart."
                    );
                    setToastSeverity(success ? "success" : "error");
                    setToastOpen(true);
                  }}
                >
                  Add to Cart
                </Button>
              </Stack>
              <Button
                variant="outlined"
                startIcon={<FavoriteBorderIcon sx={{ color: accent }} />}
                sx={{
                  borderColor: "rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.8)",
                  "&:hover": { borderColor: "rgba(255,255,255,0.3)" },
                }}
              >
                Add to Wishlist
              </Button>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center" sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>
              <Typography>Free global shipping</Typography>
              <Box sx={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)" }} />
              <Typography>30-day returns</Typography>
            </Stack>
          </Stack>
        </Box>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography sx={{ fontSize: "1.4rem", fontWeight: 700 }}>Recommended for You</Typography>
          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={() => scrollRelated("left")}
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              onClick={() => scrollRelated("right")}
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Stack>
        </Stack>
        <Box
          ref={relatedRef}
          sx={{
            display: "grid",
            gridAutoFlow: "column",
            gridAutoColumns: { xs: "70%", sm: "45%", md: "23%" },
            gap: 3,
            overflowX: "auto",
            pb: 2,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {related.map((item) => (
            <Link
              key={item.id}
              href={
                collectionSlug
                  ? `/products/${item.id}?collection=${collectionSlug}`
                  : `/products/${item.id}`
              }
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Box sx={{ minWidth: 240 }}>
                <Box
                  sx={{
                    aspectRatio: "1 / 1",
                    borderRadius: 3,
                    overflow: "hidden",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      backgroundImage: `url(${item.image ?? fallbackImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      transition: "transform 0.5s ease",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  />
                </Box>
                <Typography sx={{ mt: 1.5, fontWeight: 700 }}>{item.name}</Typography>
                <Typography sx={{ color: accent, fontWeight: 600 }}>
                  {formatCurrency(item.price)}
                </Typography>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
      <Snackbar
        open={toastOpen}
        autoHideDuration={2500}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 10 }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity={toastSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toastMessage || cartError}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

