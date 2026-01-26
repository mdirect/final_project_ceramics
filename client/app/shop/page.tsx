"use client";

import Link from "next/link";
import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/src/shared/api/http";

const collectionMeta: Record<
  string,
  { image: string; tone: string; accent: string; description: string; category: string }
> = {
  hands: {
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(35, 42, 40, 0.72)",
    accent: "#e6d3bf",
    description: "Warm, tactile pieces inspired by gesture and craft.",
    category: "jewelry",
  },
  bearlings: {
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(24, 38, 58, 0.7)",
    accent: "#cbd8e6",
    description: "Playful silhouettes with gentle, rounded forms.",
    category: "jewelry",
  },
  "dear-deer": {
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(28, 46, 34, 0.7)",
    accent: "#d3e4c8",
    description: "Forest tones with soft, elegant contours.",
    category: "jewelry",
  },
  lotus: {
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(34, 26, 48, 0.72)",
    accent: "#e9d4ff",
    description: "Bloom-inspired ceramics with calm symmetry.",
    category: "ceramics",
  },
  microworld: {
    image:
      "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(18, 44, 48, 0.72)",
    accent: "#bfe9e6",
    description: "Miniature landscapes and tiny living scenes.",
    category: "ceramics",
  },
  "sci-fi": {
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(16, 26, 42, 0.74)",
    accent: "#b6d3ff",
    description: "Futuristic textures with metallic glints.",
    category: "ceramics",
  },
  "masks-and-faces": {
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(36, 36, 36, 0.7)",
    accent: "#e3dfd6",
    description: "Portrait-inspired forms with expressive lines.",
    category: "jewelry",
  },
  floral: {
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(54, 34, 40, 0.72)",
    accent: "#ffd5e1",
    description: "Petal shapes and soft botanical motifs.",
    category: "jewelry",
  },
  baroque: {
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(40, 30, 20, 0.74)",
    accent: "#f1d3a2",
    description: "Ornate textures and dramatic silhouettes.",
    category: "limited",
  },
  "man-and-ball": {
    image:
      "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(42, 30, 26, 0.74)",
    accent: "#f2cbb9",
    description: "Sculptural balance between weight and poise.",
    category: "limited",
  },
  "out-of-collections": {
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80",
    tone: "rgba(28, 28, 28, 0.74)",
    accent: "#d6d6d6",
    description: "Experimental pieces that break the mold.",
    category: "limited",
  },
};

const collectionFilters = [
  { label: "All Works", value: "all" },
  { label: "Jewelry", value: "jewelry" },
  { label: "Ceramics", value: "ceramics" },
  { label: "Limited Edition", value: "limited" },
];

const imageExtensionRegex = /\.(png|jpe?g|webp|gif|avif)(\?.*)?$/i;

const accent = "#f2b90d";

type Collection = {
  id: number;
  title: string;
  description?: string | null;
  image?: string | null;
};

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function ShopPage() {
  const pageSize = 8;
  const [page, setPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("all");
  const [collectionsData, setCollectionsData] = useState<Collection[]>([]);
  const [collectionsLoading, setCollectionsLoading] = useState(false);
  const [collectionsError, setCollectionsError] = useState<string | null>(null);
  const [collectionForm, setCollectionForm] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [collectionError, setCollectionError] = useState<string | null>(null);
  const [collectionMessage, setCollectionMessage] = useState<string | null>(null);
  const [isCollectionSaving, setIsCollectionSaving] = useState(false);

  const mappedCollections = useMemo(
    () =>
      collectionsData.map((collection) => ({
        id: collection.id,
        slug: toSlug(collection.title),
        label: collection.title,
        description: collection.description ?? undefined,
        image: collection.image ?? undefined,
      })),
    [collectionsData],
  );

  const filteredCollections = useMemo(() => {
    if (activeFilter === "all") {
      return mappedCollections;
    }
    return mappedCollections.filter((collection) => {
      const meta = collectionMeta[collection.slug];
      return (meta?.category ?? "other") === activeFilter;
    });
  }, [activeFilter, mappedCollections]);

  const pageCount = Math.max(1, Math.ceil(filteredCollections.length / pageSize));
  const clampedPage = Math.min(page, pageCount);

  const pageCollections = useMemo(() => {
    const start = (clampedPage - 1) * pageSize;
    return filteredCollections.slice(start, start + pageSize);
  }, [clampedPage, filteredCollections]);
  const placeholders = Math.max(0, pageSize - pageCollections.length);
  const trimmedCollectionImage = collectionForm.image.trim();
  const hasCollectionImage = trimmedCollectionImage.length > 0;
  const isCollectionImageValid =
    hasCollectionImage && imageExtensionRegex.test(trimmedCollectionImage);

  useEffect(() => {
    setPage(1);
  }, [activeFilter]);

  useEffect(() => {
    let cancelled = false;
    const loadCollections = async () => {
      setCollectionsLoading(true);
      setCollectionsError(null);
      try {
        const data = await apiFetch<Collection[]>("/collection");
        if (!cancelled) {
          setCollectionsData(data);
        }
      } catch (error) {
        if (!cancelled) {
          setCollectionsError(
            error instanceof Error ? error.message : "Не удалось загрузить коллекции.",
          );
        }
      } finally {
        if (!cancelled) {
          setCollectionsLoading(false);
        }
      }
    };
    void loadCollections();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleCreateCollection = async () => {
    const title = collectionForm.title.trim();
    if (!title) {
      setCollectionError("Название коллекции обязательно.");
      return;
    }

    if (hasCollectionImage && !isCollectionImageValid) {
      setCollectionError("Нужна прямая ссылка на файл (.jpg/.png/.webp).");
      return;
    }

    setIsCollectionSaving(true);
    setCollectionError(null);
    setCollectionMessage(null);

    try {
      await apiFetch("/collection", {
        method: "POST",
        body: JSON.stringify({
          title,
          description: collectionForm.description.trim() || null,
          image: trimmedCollectionImage || null,
        }),
      });
      setCollectionMessage("Коллекция добавлена.");
      setCollectionForm({ title: "", description: "", image: "" });
    } catch (error) {
      setCollectionError(
        error instanceof Error ? error.message : "Не удалось добавить коллекцию.",
      );
    } finally {
      setIsCollectionSaving(false);
    }
  };

  return (
    <Stack spacing={6}>
      <Stack spacing={1} sx={{ maxWidth: 880 }}>
        
        <Typography
          sx={{
            fontSize: { xs: "2.6rem", md: "4.4rem" },
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "rgba(255,255,255,0.95)",
            fontWeight: 300,
          }}
        >
          The <Box component="span" sx={{ fontWeight: 700, fontStyle: "italic" }}>Collections</Box>
        </Typography>
        <Typography
          sx={{
            mt: 2,
            fontSize: { xs: "1rem", md: "1.1rem" },
            color: "rgba(255, 255, 255, 0.89)",
            lineHeight: 1.5,
          }}
        >
          Artisanal jewelry and ceramics crafted for the modern soul. Each piece tells a
          story of the solstice, the moon, and the raw earth.
        </Typography>
      </Stack>

      <Stack
        direction="row"
        flexWrap="wrap"
        spacing={1.5}
        sx={{
          pb: 3,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          "& .MuiChip-root": { mb: 1 },
        }}
      >
        {collectionFilters.map((filter) => (
          <Chip
            key={filter.value}
            label={filter.label}
            size="medium"
            onClick={() => setActiveFilter(filter.value)}
            sx={{
              borderRadius: 999,
              px: 2,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              backgroundColor: activeFilter === filter.value ? accent : "rgba(255,255,255,0.08)",
              color: activeFilter === filter.value ? "rgba(18, 21, 26, 0.9)" : "rgba(255,255,255,0.9)",
              "&:hover": {
                backgroundColor:
                  activeFilter === filter.value ? accent : "rgba(255,255,255,0.16)",
              },
            }}
          />
        ))}
        <Link href="/shop/all_jewellery" style={{ textDecoration: "none" }}>
          <Chip
            label="All Jewellery"
            size="medium"
            sx={{
              borderRadius: 999,
              px: 2,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              backgroundColor: "rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.9)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.16)" },
            }}
          />
        </Link>
        <Link href="/shop/art_objects" style={{ textDecoration: "none" }}>
          <Chip
            label="Art Objects"
            size="medium"
            sx={{
              borderRadius: 999,
              px: 2,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              backgroundColor: "rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.9)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.16)" },
            }}
          />
        </Link>
      </Stack>

      <Box
        sx={{
          borderRadius: 3,
          border: "2px solid rgba(255, 255, 255, 0.84)",
          backgroundColor: "rgba(8,12,18,0.5)",
          boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
          backdropFilter: "blur(14px)",
          p: { xs: 3, md: 4 },
        }}
      >
        <Stack spacing={2}>
          <Typography sx={{ fontWeight: 700, color: "rgba(255,255,255,0.95)" }}>
            Админ-панель: добавить коллекцию
          </Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              value={collectionForm.title}
              onChange={(event) =>
                setCollectionForm((current) => ({
                  ...current,
                  title: event.target.value,
                }))
              }
              label="Название"
              placeholder="Название коллекции"
              fullWidth
              size="small"
              InputLabelProps={{ sx: { color: "rgba(255,255,255,0.6)" } }}
              sx={{
                "& .MuiInputBase-input": { color: "rgba(255,255,255,0.85)" },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255,255,255,0.05)",
                },
              }}
            />
            <TextField
              value={collectionForm.image}
              onChange={(event) =>
                setCollectionForm((current) => ({
                  ...current,
                  image: event.target.value,
                }))
              }
              label="URL изображения"
              placeholder="https://..."
              fullWidth
              size="small"
              error={hasCollectionImage && !isCollectionImageValid}
              helperText={
                hasCollectionImage && !isCollectionImageValid
                  ? "Нужна прямая ссылка на файл (.jpg/.png/.webp)"
                  : " "
              }
              InputLabelProps={{ sx: { color: "rgba(255,255,255,0.6)" } }}
              FormHelperTextProps={{ sx: { color: "rgba(255,255,255,0.5)" } }}
              sx={{
                "& .MuiInputBase-input": { color: "rgba(255,255,255,0.85)" },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255,255,255,0.05)",
                },
              }}
            />
          </Stack>
          <TextField
            value={collectionForm.description}
            onChange={(event) =>
              setCollectionForm((current) => ({
                ...current,
                description: event.target.value,
              }))
            }
            label="Описание"
            placeholder="Короткое описание"
            fullWidth
            size="small"
            multiline
            minRows={2}
            InputLabelProps={{ sx: { color: "rgba(255,255,255,0.6)" } }}
            sx={{
              "& .MuiInputBase-input": { color: "rgba(255,255,255,0.85)" },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "rgba(255,255,255,0.05)",
              },
            }}
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
            <Button
              variant="contained"
              onClick={handleCreateCollection}
              disabled={isCollectionSaving || (hasCollectionImage && !isCollectionImageValid)}
              sx={{
                textTransform: "none",
                fontWeight: 700,
                backgroundColor: accent,
                color: "rgba(18,21,26,0.9)",
                "&:hover": { backgroundColor: "#f7cd4c" },
              }}
            >
              {isCollectionSaving ? "Сохранение..." : "Добавить коллекцию"}
            </Button>
            {collectionError && (
              <Alert severity="error" sx={{ flex: 1 }}>
                {collectionError}
              </Alert>
            )}
            {collectionMessage && (
              <Alert severity="success" sx={{ flex: 1 }}>
                {collectionMessage}
              </Alert>
            )}
          </Stack>
        </Stack>
      </Box>

      {collectionsError && (
        <Alert severity="error" sx={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
          {collectionsError}
        </Alert>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        {collectionsLoading && (
          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "flex",
              justifyContent: "center",
              py: 4,
            }}
          >
            <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
              Загрузка коллекций...
            </Typography>
          </Box>
        )}
        {!collectionsLoading && pageCollections.length === 0 && (
          <Box sx={{ gridColumn: "1 / -1", textAlign: "center", py: 4 }}>
            <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
              Коллекций пока нет.
            </Typography>
          </Box>
        )}
        {!collectionsLoading &&
          pageCollections.map((collection) => {
            const image =
              collection.image ??
              collectionMeta[collection.slug]?.image ??
              "/collections/out-of-collections.svg";
            const description =
              collection.description ??
              collectionMeta[collection.slug]?.description ??
              "Curated ceramics with a distinct personality.";

            return (
              <Link
                key={collection.slug}
                href={`/collections/${collection.slug}`}
                style={{ textDecoration: "none" }}
              >
                <Box
                  className="collection-card"
                  sx={{
                    position: "relative",
                    aspectRatio: "4 / 5",
                    borderRadius: 3,
                    overflow: "hidden",
                    backgroundColor: "rgba(20,25,32,0.6)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    transition: "transform 0.5s ease",
                    "&:hover": { transform: "translateY(-6px)" },
                    "&:hover .collection-image": { transform: "scale(1.08)" },
                    "&:hover .collection-cta": { opacity: 1 },
                  }}
                >
                  <Box
                    className="collection-image"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `url(${image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      transition: "transform 0.7s ease",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, rgba(0,0,0,0.08) 10%, rgba(0,0,0,0.45) 100%)",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      left:16,
                      right:16,
                      bottom: 16,
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      backdropFilter: "blur(2px)",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.95)",
                        fontSize: "1.5rem",
                        fontStyle: "italic",
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {collection.label}
                    </Typography>
                    <Typography
                      className="collection-cta"
                      sx={{
                        mt: 2,
                        color: accent,
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.18em",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      Explore Collection →
                    </Typography>
                  </Box>
                </Box>
              </Link>
            );
          })}
        {Array.from({ length: placeholders }).map((_, index) => (
          <Box key={`placeholder-${index}`} sx={{ aspectRatio: "4 / 5", visibility: "hidden" }} />
        ))}
      </Box>

      <Box sx={{ height: 0 }} />

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{
          mt: 0,
          position: "relative",
          top: -24,
        }}
      >
        <IconButton
          onClick={() => setPage((current) => Math.max(1, current - 1))}
          disabled={clampedPage === 1}
          sx={{
            border: "2px solid rgba(255,255,255,0.35)",
            color: "rgba(255,255,255,0.8)",
            backgroundColor: "rgba(255,255,255,0.08)",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.16)" },
          }}
        >
          <ArrowBackIosNewIcon fontSize="large" />
        </IconButton>

        <Typography
          sx={{
            letterSpacing: "0.2em",
            fontSize: "1rem",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.8)",
          }}
        >
          {String(clampedPage).padStart(2, "0")} / {String(pageCount).padStart(2, "0")}
        </Typography>

        <IconButton
          onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
          disabled={clampedPage === pageCount}
          sx={{
            border: "2px solid rgba(255,255,255,0.35)",
            color: "rgba(255,255,255,0.8)",
            backgroundColor: "rgba(255,255,255,0.08)",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.16)" },
          }}
        >
          <ArrowForwardIosIcon fontSize="large" />
        </IconButton>
      </Stack>

      <Box
        sx={{
          mt: { xs: 6, md: 10 },
          width: "100%",
          maxWidth: 900,
          mx: "auto",
          alignSelf: "center",
          borderRadius: 3,
          p: { xs: 2.5, md: 4 },
          backgroundColor: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 240,
            height: 240,
            borderRadius: "50%",
            backgroundColor: "rgba(242,185,13,0.12)",
            filter: "blur(40px)",
          }}
        />
        <Stack
          spacing={2}
          sx={{ position: "relative", textAlign: "center" }}
          alignItems="center"
        >
          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "2.6rem" },
              fontWeight: 800,
              color: "rgba(255,255,255,0.95)",
            }}
          >
            Stay in the loop
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.7)",
              maxWidth: 620,
              mx: "auto",
              textAlign: "center",
            }}
          >
            Join our inner circle for early access to limited artisanal drops and the stories
            behind the kiln and bench.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Box
              component="input"
              placeholder="Your email address"
              sx={{
                width: { xs: "100%", sm: 320 },
                height: 48,
                px: 2.5,
                borderRadius: 2,
                border: "1px solid rgba(255,255,255,0.15)",
                backgroundColor: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.9)",
                outline: "none",
              }}
            />
            <Button
              variant="contained"
              sx={{
                height: 48,
                px: 4,
                backgroundColor: accent,
                color: "rgba(18,21,26,0.9)",
                fontWeight: 800,
                "&:hover": { backgroundColor: "#f6c423" },
              }}
            >
              Join the Newsletter
            </Button>
          </Stack>
          <Typography
            sx={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            New collection drops every full moon
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}