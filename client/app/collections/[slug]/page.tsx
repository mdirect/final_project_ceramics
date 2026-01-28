"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import { collections } from "@/src/shared/config/collections";
import { apiFetch } from "@/src/shared/api/http";
import { useAuth } from "@/src/shared/providers/AuthProvider";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useMemo, useState } from "react";

type Collection = {
  id: number;
  title: string;
  description?: string | null;
  image?: string | null;
};

type Product = {
  id: number;
  collectionId: number;
  name: string;
  desc?: string | null;
  image?: string | null;
  images?: string[] | null;
  price: number | string;
  tags?: string[];
};

const formatCurrency = (value: number | string) => {
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

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const imageExtensionRegex = /\.(png|jpe?g|webp|gif|avif)(\?.*)?$/i;
const parseImageUrls = (value: string) =>
  value
    .split(/[\n,]+/)
    .map((url) => url.trim())
    .filter(Boolean);

const filterGroups = [
  {
    id: "form",
    label: "Form",
    options: ["Painted image", "Relief", "Three-dimensional"],
  },
  {
    id: "color",
    label: "Color",
    options: ["Mixed color", "White", "Black", "Yellow", "Green"],
  },
  {
    id: "Glaze type",
    label: "Glaze type",
    options: ["Ceramically glazed", "Non-ceramically glazed", "Unglazed"],
  },
  {
    id: "Composition type",
    label: "Composition type",
    options: ["Multi-part jewellery", " One-part jewellery"],
  },
  {
    id: "Production type",
    label: "Production type",
    options: ["Regular", "May be repeated", "Part of collection", "Single piece"],
  },
  {
    id: "Motif type",
    label: "Motif type",
    options: [
      "Animalistic",
      "People",
      "Mythology",
      "Esoteric",
      "Figurative",
      "Ornamental",
      "Still life",
      "Abstract",
      "Body part",
      "Story",
    ],
  },
];

const sortOptions = [
  { label: "Newest arrivals", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Alphabetical", value: "alpha" },
];

const accent = "#f2b90d";

export default function CollectionPage() {
  const params = useParams<{ slug?: string | string[] }>();
  const slugValue = Array.isArray(params?.slug) ? params?.slug[0] : params?.slug;
  const { user } = useAuth();
  const isAdmin = true;
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [sortOpen, setSortOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [collection, setCollection] = useState<Collection | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deletePending, setDeletePending] = useState<number | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    image: "",
    desc: "",
    finish: "",
    material: "",
    important: "",
  });
  const imageUrls = useMemo(() => parseImageUrls(formState.image), [formState.image]);
  const hasImageUrl = imageUrls.length > 0;
  const isImageUrlValid =
    !hasImageUrl || imageUrls.every((url) => imageExtensionRegex.test(url));
  const previewImageUrl = imageUrls[0];
  const pageSize = 12;
  const formatTitle = (value?: string) =>
    value
      ? value
          .replace(/-/g, " ")
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "Collection";

  const matched = collections.find((collection) => collection.slug === slugValue);
  const configTitle = matched?.label;
  const title = collection?.title ?? configTitle ?? formatTitle(slugValue);
  const description = collection?.description?.trim() ?? "";

  useEffect(() => {
    if (!slugValue) {
      return;
    }
    let cancelled = false;

    const loadData = async () => {
      setIsLoading(true);
      setLoadError(null);
      setActionError(null);

      try {
        const allCollections = await apiFetch<Collection[]>("/collection");
        const normalizedSlug = String(slugValue);
        const numericId = Number(normalizedSlug);
        const byId = Number.isNaN(numericId)
          ? undefined
          : allCollections.find((item) => item.id === numericId);
        const bySlug = allCollections.find(
          (item) => toSlug(item.title) === normalizedSlug,
        );
        const byTitle = configTitle
          ? allCollections.find(
              (item) => item.title.toLowerCase() === configTitle.toLowerCase(),
            )
          : undefined;
        const selected = byId ?? bySlug ?? byTitle ?? null;

        if (!selected) {
          if (!cancelled) {
            setCollection(null);
            setProducts([]);
            setLoadError("Collection not found in the database.");
          }
          return;
        }

        const allProducts = await apiFetch<Product[]>("/product");
        const collectionProducts = allProducts.filter(
          (item) => item.collectionId === selected.id,
        );

        if (!cancelled) {
          setCollection(selected);
          setProducts(collectionProducts);
          setPage(1);
        }
      } catch (error) {
        if (!cancelled) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "Failed to load products.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadData();

    return () => {
      cancelled = true;
    };
  }, [slugValue, configTitle]);

  const handleCreateProduct = async () => {
    if (!collection) {
      setActionError("Unable to determine collection for the product.");
      return;
    }

    const name = formState.name.trim();
    const priceValue = Number(formState.price);

    if (!name) {
      setActionError("Product name is required.");
      return;
    }

    if (!formState.price || Number.isNaN(priceValue) || priceValue <= 0) {
      setActionError("Price must be a number greater than 0.");
      return;
    }

    if (!isImageUrlValid) {
      setActionError("Direct file links are required (.jpg/.png/.webp).");
      return;
    }

    setIsSaving(true);
    setActionError(null);

    try {
      const images = imageUrls;
      const created = await apiFetch<Product>("/product", {
        method: "POST",
        body: JSON.stringify({
          name,
          price: priceValue,
          image: images[0] ?? null,
          images: images.length > 0 ? images : null,
          desc: formState.desc.trim() || null,
          finish: formState.finish.trim() || null,
          material: formState.material.trim() || null,
          important: formState.important.trim() || null,
          collectionId: collection.id,
        }),
      });
      setProducts((current) => [created, ...current]);
      setFormState({
        name: "",
        price: "",
        image: "",
        desc: "",
        finish: "",
        material: "",
        important: "",
      });
    } catch (error) {
      setActionError(
        error instanceof Error ? error.message : "Failed to add product.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    setDeletePending(id);
    setActionError(null);
    try {
      await apiFetch(`/product/${id}`, { method: "DELETE" });
      setProducts((current) => current.filter((item) => item.id !== id));
    } catch (error) {
      setActionError(
        error instanceof Error ? error.message : "Failed to remove product.",
      );
    } finally {
      setDeletePending(null);
    }
  };

  const filteredItems = useMemo(() => {
    const term = search.trim().toLowerCase();
    const matchesSearch = (name: string) =>
      term.length === 0 || name.toLowerCase().includes(term);
    const matchesFilters = (tags?: string[]) => {
      const groups = Object.values(selectedFilters).filter((group) => group.length > 0);
      if (groups.length === 0) {
        return true;
      }
      const safeTags = tags ?? [];
      return groups.every((group) => group.some((value) => safeTags.includes(value)));
    };

    return products.filter(
      (item) => matchesSearch(item.name) && matchesFilters(item.tags),
    );
  }, [search, selectedFilters, products]);

  const parsePrice = (value: number | string) => {
    const numeric = Number(value);
    return Number.isNaN(numeric) ? 0 : numeric;
  };

  const sortedItems = useMemo(() => {
    const items = [...filteredItems];
    switch (sort) {
      case "price-asc":
        return items.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
      case "price-desc":
        return items.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
      case "alpha":
        return items.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return items;
    }
  }, [filteredItems, sort]);

  const pageCount = Math.max(1, Math.ceil(sortedItems.length / pageSize));
  const clampedPage = Math.min(page, pageCount);
  const pagedItems = useMemo(() => {
    const start = (clampedPage - 1) * pageSize;
    return sortedItems.slice(start, start + pageSize);
  }, [clampedPage, sortedItems]);
  const placeholders = Math.max(0, pageSize - pagedItems.length);

  useEffect(() => {
    if (page > pageCount) {
      setPage(pageCount);
    }
  }, [page, pageCount]);

  return (
    <Stack spacing={4} sx={{ fontFamily: "var(--font-inter)" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "260px 1fr" },
          gap: { xs: 4, lg: 5 },
          alignItems: "start",
        }}
      >
        <Stack spacing={2} sx={{ display: { xs: "none", md: "flex" } }}>
          <Link href="/shop" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              startIcon={<ChevronLeftIcon sx={{ fontSize: "1.1rem" }} />}
              sx={{
                width: "100%",
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
              Back to collections
            </Button>
          </Link>
          <Box
            component="aside"
            sx={{
              borderRadius: 1,
              border: "1px solid rgba(242, 185, 13, 0.32)",
              backgroundColor: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(12px)",
              p: 2.5,
            }}
          >
            <Stack spacing={4} sx={{ position: "sticky", top: 96 }}>
              <Stack spacing={1.5}>
              <Typography
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  color: "rgba(148,163,184,0.8)",
                }}
              >
                Sort by
              </Typography>
              <Box sx={{ position: "relative" }}>
                <Button
                  onClick={() => setSortOpen((current) => !current)}
                  sx={{
                    textTransform: "none",
                    backgroundColor: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(226,232,240,0.9)",
                    borderRadius: 1,
                    px: 2,
                    width: "100%",
                    justifyContent: "space-between",
                    fontSize: "0.88rem",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.55)" },
                  }}
                  endIcon={<ExpandMoreIcon />}
                >
                  {sortOptions.find((option) => option.value === sort)?.label ?? "Newest arrivals"}
                </Button>
                {sortOpen && (
                  <Stack
                    spacing={0}
                    sx={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      mt: 1,
                      borderRadius: 2,
                      backgroundColor: "rgba(20,20,20,0.9)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      zIndex: 5,
                    }}
                  >
                    {sortOptions.map((option) => (
                      <Box
                        key={option.value}
                        onClick={() => {
                          setSort(option.value);
                          setSortOpen(false);
                        }}
                        sx={{
                          px: 2,
                          py: 1.2,
                          cursor: "pointer",
                          fontSize: "0.85rem",
                          color: "rgba(255,255,255,0.8)",
                          "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
                        }}
                      >
                        {option.label}
                      </Box>
                    ))}
                  </Stack>
                )}
              </Box>
            </Stack>

            <Stack spacing={2} sx={{ pt: 2, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              {filterGroups.map((group, index) => (
                <Accordion
                  key={group.id}
                  defaultExpanded={index < 2}
                  disableGutters
                  elevation={0}
                  sx={{
                    backgroundColor: "transparent",
                    borderTop: index === 0 ? "none" : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 0,
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "rgba(255,255,255,0.6)" }} />}
                    sx={{
                      "& .MuiAccordionSummary-content": {
                        margin: 0,
                      },
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        textTransform: "uppercase",
                        letterSpacing: "0.2em",
                        fontWeight: 600,
                    fontSize: "0.8rem",
                        color: "rgba(148,163,184,0.8)",
                      }}
                    >
                      {group.label}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 0 }}>
                    <Stack spacing={0.5}>
                      {group.options.map((option) => {
                        const selected = selectedFilters[group.id] ?? [];
                        const isChecked = selected.includes(option);
                        return (
                          <FormControlLabel
                            key={option}
                            control={
                              <Checkbox
                                checked={isChecked}
                                onChange={() =>
                                  setSelectedFilters((current) => {
                                    const next = { ...current };
                                    const currentValues = next[group.id] ?? [];
                                    next[group.id] = currentValues.includes(option)
                                      ? currentValues.filter((value) => value !== option)
                                      : [...currentValues, option];
                                    return next;
                                  })
                                }
                                sx={{
                                  color: "rgba(148,163,184,0.6)",
                                  "&.Mui-checked": { color: accent },
                                }}
                              />
                            }
                            label={
                              <Typography
                                variant="body2"
                                sx={{ color: "rgba(226,232,240,0.85)", fontSize: "0.96rem" }}
                              >
                                {option}
                              </Typography>
                            }
                          />
                        );
                      })}
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              ))}
              <Button
                variant="outlined"
                sx={{
                  borderColor: "rgba(255,255,255,0.12)",
                  color: "rgba(226,232,240,0.85)",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  fontSize: "0.78rem",
                  letterSpacing: "0.2em",
                  "&:hover": { borderColor: "rgba(255,255,255,0.28)" },
                }}
                onClick={() => setSelectedFilters({})}
              >
                Reset Filters
              </Button>
            </Stack>
          </Stack>
        </Box>
        </Stack>

        <Stack spacing={3}>
          <Stack spacing={1.5}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent={{ xs: "flex-start", sm: "flex-end" }}
              alignItems={{ xs: "stretch", sm: "center" }}
              spacing={1.5}
            >
              <Typography
                sx={{
                  color: "rgba(226, 232, 240, 0.9)",
                  fontSize: "0.78rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  whiteSpace: "nowrap",
                }}
              >
                Showing {pagedItems.length} of {sortedItems.length} items
              </Typography>
              <TextField
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon sx={{ fontSize: "1.2rem", color: "rgba(226,232,240,0.45)" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  minWidth: { xs: "100%", sm: 260 },
                  maxWidth: { xs: "100%", sm: 320 },
                  "& .MuiInputBase-input": {
                    color: "rgba(226,232,240,0.9)",
                    fontSize: "0.9rem",
                    py: 0.9,
                    px: 1.2,
                    "&::placeholder": {
                      fontSize: "0.86rem",
                    },
                  },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(0,0,0,0.35)",
                    borderColor: "rgba(255,255,255,0.16)",
                    borderRadius: 999,
                    pr: 0.6,
                  },
                }}
              />
            </Stack>
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: "2.6rem", md: "3.8rem" },
                  fontWeight: 600,
                  fontFamily: "var(--font-playfair)",
                  color: "rgba(255, 255, 255, 0.98)",
                }}
              >
                {title}
              </Typography>
              {description && (
                <Typography
                  sx={{
                    color: "rgba(226, 232, 240, 0.78)",
                    fontSize: { xs: "0.98rem", md: "1.05rem" },
                    fontFamily: "var(--font-inter)",
                    lineHeight: 1.8,
                    mt: 1,
                    maxWidth: 720,
                  }}
                >
                  {description}
                </Typography>
              )}
              <Typography
                sx={{
                  color: "rgba(242,185,13,0.75)",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.32em",
                  fontWeight: 600,
                  mt: 0.5,
                  pt: description ? 1 : 0,
                }}
              >
                Collection items
              </Typography>
            </Box>
          </Stack>

          {loadError && (
            <Alert severity="error" sx={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
              {loadError}
            </Alert>
          )}

          {isAdmin && (
            <Box
              sx={{
                borderRadius: 1.5,
                border: "1px solid rgba(242,185,13,0.2)",
                backgroundColor: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(12px)",
                p: 3,
              }}
            >
              <Stack spacing={2}>
                <Stack spacing={0.5}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: "rgba(242,185,13,0.9)",
                      textTransform: "uppercase",
                      letterSpacing: "0.28em",
                      fontSize: "0.62rem",
                    }}
                  >
                    Admin panel
                  </Typography>
                </Stack>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <TextField
                    value={formState.name}
                    onChange={(event) =>
                      setFormState((current) => ({ ...current, name: event.target.value }))
                    }
                    label="Name"
                    placeholder="Product name"
                    fullWidth
                    size="small"
                    InputLabelProps={{ sx: { color: "rgba(226,232,240,0.5)" } }}
                    sx={{
                      "& .MuiInputBase-input": { color: "rgba(226,232,240,0.9)" },
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(0,0,0,0.35)",
                        borderRadius: 1,
                      },
                    }}
                  />
                  <TextField
                    value={formState.price}
                    onChange={(event) =>
                      setFormState((current) => ({ ...current, price: event.target.value }))
                    }
                    label="Price"
                    placeholder="For example 120"
                    fullWidth
                    size="small"
                    InputLabelProps={{ sx: { color: "rgba(226,232,240,0.5)" } }}
                    sx={{
                      "& .MuiInputBase-input": { color: "rgba(226,232,240,0.9)" },
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(0,0,0,0.35)",
                        borderRadius: 1,
                      },
                    }}
                  />
                </Stack>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                {previewImageUrl && (
                    <Box
                      sx={{
                        width: { xs: "100%", md: 220 },
                        flexShrink: 0,
                        borderRadius: 1.5,
                        overflow: "hidden",
                        border: "1px solid rgba(255,255,255,0.1)",
                        backgroundColor: "rgba(0,0,0,0.35)",
                        aspectRatio: "4 / 5",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          backgroundImage: `url(${previewImageUrl})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    </Box>
                  )}
                  <TextField
                    value={formState.image}
                    onChange={(event) =>
                      setFormState((current) => ({ ...current, image: event.target.value }))
                    }
                    label="Image URL"
                    placeholder="https://... (multiple allowed, comma or newline)"
                    fullWidth
                    size="small"
                    multiline
                    minRows={4}
                    error={hasImageUrl && !isImageUrlValid}
                    helperText={
                      hasImageUrl && !isImageUrlValid
                        ? "Direct file links required (.jpg/.png/.webp)"
                        : " "
                    }
                    InputLabelProps={{ sx: { color: "rgba(226,232,240,0.5)" } }}
                    FormHelperTextProps={{ sx: { color: "rgba(226,232,240,0.45)" } }}
                    sx={{
                      "& .MuiInputBase-input": { color: "rgba(226,232,240,0.9)" },
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(0,0,0,0.35)",
                        borderRadius: 1,
                      },
                    }}
                  />
                  <TextField
                    value={formState.desc}
                    onChange={(event) =>
                      setFormState((current) => ({ ...current, desc: event.target.value }))
                    }
                    label="Description"
                    placeholder="Short description"
                    fullWidth
                    size="small"
                  multiline
                  minRows={4}
                    InputLabelProps={{ sx: { color: "rgba(226,232,240,0.5)" } }}
                    sx={{
                      "& .MuiInputBase-input": { color: "rgba(226,232,240,0.9)" },
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(0,0,0,0.35)",
                        borderRadius: 1,
                      },
                    }}
                  />
                </Stack>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <TextField
                  value={formState.finish}
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, finish: event.target.value }))
                  }
                  label="Finish"
                  placeholder="For example polished / matte"
                  fullWidth
                  size="small"
                  InputLabelProps={{ sx: { color: "rgba(226,232,240,0.5)" } }}
                  sx={{
                    "& .MuiInputBase-input": { color: "rgba(226,232,240,0.9)" },
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(0,0,0,0.35)",
                      borderRadius: 1,
                    },
                  }}
                />
                <TextField
                  value={formState.material}
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, material: event.target.value }))
                  }
                  label="Material"
                  placeholder="For example porcelain, 18k gold"
                  fullWidth
                  size="small"
                  InputLabelProps={{ sx: { color: "rgba(226,232,240,0.5)" } }}
                  sx={{
                    "& .MuiInputBase-input": { color: "rgba(226,232,240,0.9)" },
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(0,0,0,0.35)",
                      borderRadius: 1,
                    },
                  }}
                />
                <TextField
                  value={formState.important}
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, important: event.target.value }))
                  }
                  label="Important"
                  placeholder="Care note or warning"
                  fullWidth
                  size="small"
                  InputLabelProps={{ sx: { color: "rgba(226,232,240,0.5)" } }}
                  sx={{
                    "& .MuiInputBase-input": { color: "rgba(226,232,240,0.9)" },
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(0,0,0,0.35)",
                      borderRadius: 1,
                    },
                  }}
                />
              </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
                  <Button
                    variant="contained"
                    onClick={handleCreateProduct}
                    disabled={isSaving || !collection || (hasImageUrl && !isImageUrlValid)}
                    sx={{
                      textTransform: "uppercase",
                      fontWeight: 600,
                      letterSpacing: "0.22em",
                      fontSize: "0.65rem",
                      backgroundColor: accent,
                      color: "rgba(18,21,26,0.9)",
                      "&:hover": { backgroundColor: "#f7cd4c" },
                    }}
                  >
                    {isSaving ? "Saving..." : "Add product"}
                  </Button>
                  {actionError && (
                    <Alert severity="error" sx={{ flex: 1 }}>
                      {actionError}
                    </Alert>
                  )}
                </Stack>
              </Stack>
            </Box>
          )}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "minmax(0, 1fr)",
                md: "repeat(2, minmax(0, 1fr))",
                xl: "repeat(3, minmax(0, 1fr))",
              },
              gap: { xs: 4, md: 4.5 },
              alignItems: "start",
              justifyItems: "stretch",
            }}
          >
            {isLoading && (
              <Box
                sx={{
                  gridColumn: "1 / -1",
                  display: "flex",
                  justifyContent: "center",
                  py: 4,
                }}
              >
                <CircularProgress size={32} sx={{ color: accent }} />
              </Box>
            )}
            {!isLoading && sortedItems.length === 0 && (
              <Box sx={{ gridColumn: "1 / -1", textAlign: "center", py: 4 }}>
                <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
                  No products in this collection yet.
                </Typography>
              </Box>
            )}
            {pagedItems.map((item) => {
              const primaryImage = item.images?.[0] ?? item.image;
              return (
                <Box
                  key={item.id}
                  sx={{
                    position: "relative",
                    minWidth: 0,
                    "&:hover .delete-btn": { opacity: 1 },
                    "&:hover .product-image": {
                      transform: "scale(1.06)",
                    },
                  }}
                >
                  {isAdmin && (
                    <IconButton
                      className="delete-btn"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        void handleDeleteProduct(item.id);
                      }}
                      disabled={deletePending === item.id}
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        zIndex: 2,
                        backgroundColor: "rgba(0,0,0,0.6)",
                        color: "rgba(255,255,255,0.85)",
                        opacity: 0,
                        transition: "opacity 0.2s ease",
                        "&:hover": { backgroundColor: "rgba(5, 5, 5, 0.75)", color: "#fca5a5" },
                      }}
                    >
                      {deletePending === item.id ? (
                        <CircularProgress size={18} sx={{ color: "rgba(255,255,255,0.9)" }} />
                      ) : (
                        <DeleteOutlineIcon fontSize="small" />
                      )}
                    </IconButton>
                  )}
                  <Link
                    href={`/products/${item.id}?collection=${slugValue ?? ""}`}
                    style={{ textDecoration: "none", color: "inherit", display: "block" }}
                  >
                    <Box
                      className="product-card"
                      sx={{
                        borderRadius: 2,
                        backgroundColor: "rgba(38, 38, 38, 0.45)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(242,185,13,0.15)",
                        p: 1.5,
                        aspectRatio: "4 / 5",
                        display: "flex",
                        flexDirection: "column",
                        transition: "transform 0.3s ease",
                        position: "relative",
                      }}
                    >
                      {item.tags?.includes("new") && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            px: 1,
                            py: 0.4,
                            borderRadius: 0.5,
                            backgroundColor: accent,
                            color: "rgba(18,21,26,0.9)",
                            fontSize: "0.6rem",
                            fontWeight: 700,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                          }}
                        >
                          New
                        </Box>
                      )}
                      <Box
                        sx={{
                          position: "relative",
                          flexGrow: 1,
                          borderRadius: 2,
                          overflow: "hidden",
                          backgroundColor: "rgba(255,255,255,0.06)",
                        }}
                      >
                        {primaryImage ? (
                          <Box
                            className="product-image"
                            component="img"
                            src={primaryImage}
                            alt={item.name}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "center",
                              transform: "scale(1)",
                              transition: "transform 0.7s ease, filter 0.7s ease",
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
                      </Box>
                      <Box
                        sx={{
                          pt: 2,
                          px: 0.5,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 2,
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "var(--font-playfair)",
                            fontSize: "1.2rem",
                            color: "rgba(255,255,255,0.95)",
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Box
                          sx={{
                            px: 1.2,
                            py: 0.4,
                            borderRadius: 1,
                            backgroundColor: "rgba(242,185,13,0.18)",
                            border: "1px solid rgba(242,185,13,0.35)",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "rgba(242,185,13,0.95)",
                              fontWeight: 600,
                              fontSize: "0.7rem",
                              letterSpacing: "0.12em",
                            }}
                          >
                            {formatCurrency(item.price)}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Link>
                </Box>
            );
            })}
          </Box>

          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5} sx={{ mt: 2 }}>
            <IconButton
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={clampedPage === 1}
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.12)" },
              }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
            {pageCount <= 5
              ? Array.from({ length: pageCount }, (_, index) => index + 1).map((index) => (
                  <Box
                    key={index}
                    onClick={() => setPage(index)}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      backgroundColor:
                        index === clampedPage ? accent : "rgba(255,255,255,0.06)",
                      color:
                        index === clampedPage
                          ? "rgba(18,21,26,0.9)"
                          : "rgba(255,255,255,0.8)",
                      fontWeight: 700,
                    }}
                  >
                    {index}
                  </Box>
                ))
              : [
                  1,
                  Math.max(2, clampedPage - 1),
                  clampedPage,
                  Math.min(pageCount - 1, clampedPage + 1),
                  pageCount,
                ]
                  .filter((value, index, array) => array.indexOf(value) === index)
                  .map((index, idx, array) => (
                    <Box key={`${index}-${idx}`} sx={{ display: "flex", alignItems: "center" }}>
                      {idx > 0 && index - (array[idx - 1] ?? 0) > 1 ? (
                        <Box sx={{ color: "rgba(255,255,255,0.35)", px: 0.5 }}>...</Box>
                      ) : null}
                      <Box
                        onClick={() => setPage(index)}
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          backgroundColor:
                            index === clampedPage ? accent : "rgba(255,255,255,0.06)",
                          color:
                            index === clampedPage
                              ? "rgba(18,21,26,0.9)"
                              : "rgba(255,255,255,0.8)",
                          fontWeight: 700,
                        }}
                      >
                        {index}
                      </Box>
                    </Box>
                  ))}
            <IconButton
              onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
              disabled={clampedPage === pageCount}
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.12)" },
              }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
