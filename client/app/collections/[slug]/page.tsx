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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

const filterGroups = [
  {
    id: "type",
    label: "Type",
    options: [
      "Painted image",
      "Relief",
      "Three-dimensional",
    ],
  },
  {
    id: "color",
    label: "Color",
    options: ["Colourful", "White", "Black", "Yellow", "Green"],
  },
  {
    id: "finish",
    label: "Finish",
    options: ["Glaze", "Engobe", "Acrylic", "Epoxy resin", "Light-reflecting pigment"],
  },
  {
    id: "suspension",
    label: "Suspension",
    options: ["Chain", "Beading wire", "Memory wire", "Decorative cord"],
  },
  {
    id: "composition",
    label: "Composition",
    options: ["Multi-part jewelry", "Single-piece jewelry"],
  },
  {
    id: "availability",
    label: "Availability",
    options: ["Regularly", "May be repeated", "Part of collection", "Single piece"],
  },
  {
    id: "animal",
    label: "Animal motif",
    options: [
      "Seal",
      "Bird",
      "Camel",
      "Antelope",
      "Deer",
      "Lizard",
      "Bear",
      "Squirrel",
      "Beetle",
      "Spider",
      "Donkey",
      "Cat",
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
  });
  const trimmedImageUrl = formState.image.trim();
  const hasImageUrl = trimmedImageUrl.length > 0;
  const isImageUrlValid = hasImageUrl && imageExtensionRegex.test(trimmedImageUrl);
  const pageSize = 6;
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
            setLoadError("Коллекция не найдена в базе данных.");
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
              : "Не удалось загрузить товары.",
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
      setActionError("Не удалось определить коллекцию для товара.");
      return;
    }

    const name = formState.name.trim();
    const priceValue = Number(formState.price);

    if (!name) {
      setActionError("Название товара обязательно.");
      return;
    }

    if (!formState.price || Number.isNaN(priceValue) || priceValue <= 0) {
      setActionError("Цена должна быть числом больше 0.");
      return;
    }

    setIsSaving(true);
    setActionError(null);

    try {
      const created = await apiFetch<Product>("/product", {
        method: "POST",
        body: JSON.stringify({
          name,
          price: priceValue,
          image: formState.image.trim() || null,
          desc: formState.desc.trim() || null,
          collectionId: collection.id,
        }),
      });
      setProducts((current) => [created, ...current]);
      setFormState({ name: "", price: "", image: "", desc: "" });
    } catch (error) {
      setActionError(
        error instanceof Error ? error.message : "Не удалось добавить товар.",
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
        error instanceof Error ? error.message : "Не удалось удалить товар.",
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
    <Stack spacing={4}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "280px 1fr" },
          gap: 4,
          alignItems: "start",
        }}
      >
        <Box component="aside" sx={{ display: { xs: "none", md: "block" } }}>
          <Stack spacing={4} sx={{ position: "sticky", top: 96 }}>
            <Box>
              
              <Stack spacing={0.5}>
                {[
                  { label: "All Creations", active: true },
                  { label: "Fine Jewelry" },
                  { label: "Ceramics" },
                  { label: "New Arrivals" },
                ].map((item) => (
                  <Box
                    key={item.label}
                    sx={{
                      px: 2,
                      py: 1.3,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      backgroundColor: item.active ? accent : "transparent",
                      color: item.active ? "rgba(18,21,26,0.9)" : "rgba(255,255,255,0.8)",
                      fontWeight: item.active ? 700 : 500,
                      fontSize: "0.9rem",
                      "&:hover": {
                        backgroundColor: item.active ? accent : "rgba(255,255,255,0.08)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: item.active ? "rgba(18,21,26,0.7)" : "rgba(255,255,255,0.4)",
                      }}
                    />
                    {item.label}
                  </Box>
                ))}
              </Stack>
            </Box>

            <Stack spacing={2} sx={{ pt: 2, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              {filterGroups.map((group, index) => (
                <Accordion
                  key={group.id}
                  defaultExpanded={index < 2}
                  disableGutters
                  elevation={0}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 2,
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
                        letterSpacing: "0.14em",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.6)",
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
                                  color: "rgba(255,255,255,0.5)",
                                  "&.Mui-checked": { color: accent },
                                }}
                              />
                            }
                            label={
                              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
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
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.8)",
                  textTransform: "none",
                  fontWeight: 700,
                  "&:hover": { borderColor: "rgba(255,255,255,0.35)" },
                }}
                onClick={() => setSelectedFilters({})}
              >
                Reset Filters
              </Button>
            </Stack>
          </Stack>
        </Box>

        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={2}>
            <Box>
              <Typography sx={{ fontSize: "1.8rem", fontWeight: 700, color: "rgba(255,255,255,0.95)" }}>
                {title}
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem" }}>
                Collection items
              </Typography>
            </Box>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem" }}>
                Showing {pagedItems.length} of {sortedItems.length} items
              </Typography>
              <Box sx={{ position: "relative" }}>
                <Button
                  onClick={() => setSortOpen((current) => !current)}
                  sx={{
                    textTransform: "none",
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.8)",
                    borderRadius: 2,
                    px: 2.5,
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.12)" },
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
                      right: 0,
                      mt: 1,
                      minWidth: 220,
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
          </Stack>

          {loadError && (
            <Alert severity="error" sx={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
              {loadError}
            </Alert>
          )}

          {isAdmin && (
            <Box
              sx={{
                borderRadius: 3,
                border: "1px solid rgba(255,255,255,0.12)",
                backgroundColor: "rgba(255,255,255,0.04)",
                p: 3,
              }}
            >
              <Stack spacing={2}>
                <Stack spacing={0.5}>
                  <Typography sx={{ fontWeight: 700, color: "rgba(255,255,255,0.95)" }}>
                    Админ-панель
                  </Typography>
                </Stack>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <TextField
                    value={formState.name}
                    onChange={(event) =>
                      setFormState((current) => ({ ...current, name: event.target.value }))
                    }
                    label="Название"
                    placeholder="Название товара"
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
                    value={formState.price}
                    onChange={(event) =>
                      setFormState((current) => ({ ...current, price: event.target.value }))
                    }
                    label="Цена"
                    placeholder="Например 120"
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
                </Stack>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  {isImageUrlValid && (
                    <Box
                      sx={{
                        width: { xs: "100%", md: 220 },
                        flexShrink: 0,
                        borderRadius: 2,
                        overflow: "hidden",
                        border: "1px solid rgba(255,255,255,0.12)",
                        backgroundColor: "rgba(255,255,255,0.04)",
                        aspectRatio: "4 / 5",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          backgroundImage: `url(${trimmedImageUrl})`,
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
                    label="URL изображения"
                    placeholder="https://..."
                    fullWidth
                    size="small"
                    error={hasImageUrl && !isImageUrlValid}
                    helperText={
                      hasImageUrl && !isImageUrlValid
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
                  <TextField
                    value={formState.desc}
                    onChange={(event) =>
                      setFormState((current) => ({ ...current, desc: event.target.value }))
                    }
                    label="Описание"
                    placeholder="Короткое описание"
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
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
                  <Button
                    variant="contained"
                    onClick={handleCreateProduct}
                    disabled={isSaving || !collection || (hasImageUrl && !isImageUrlValid)}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      backgroundColor: accent,
                      color: "rgba(18,21,26,0.9)",
                      "&:hover": { backgroundColor: "#f7cd4c" },
                    }}
                  >
                    {isSaving ? "Сохранение..." : "Добавить товар"}
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
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 3,
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
                  Пока нет товаров в этой коллекции.
                </Typography>
              </Box>
            )}
            {pagedItems.map((item) => (
              <Box key={item.id} sx={{ position: "relative" }}>
                {isAdmin && (
                  <IconButton
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
                      backgroundColor: "rgba(0,0,0,0.55)",
                      color: "rgba(255,255,255,0.9)",
                      "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
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
                <Box className="product-card" sx={{ position: "relative" }}>
                <Box
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    aspectRatio: "4 / 5",
                    position: "relative",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: item.image ? `url(${item.image})` : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundColor: item.image ? "transparent" : "rgba(255,255,255,0.08)",
                      transition: "transform 0.7s ease",
                      ".product-card:hover &": { transform: "scale(1.08)" },
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 70%)",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "flex-end",
                      p: 2,
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      ".product-card:hover &": { opacity: 1 },
                    }}
                  >
                    <Button
                      fullWidth
                      sx={{
                        backgroundColor: "rgba(255,255,255,0.95)",
                        color: "rgba(18,21,26,0.9)",
                        fontWeight: 700,
                        textTransform: "none",
                        "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                      }}
                    >
                      Quick View
                    </Button>
                  </Box>
                  {item.tags?.includes("new") && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        px: 1.2,
                        py: 0.4,
                        borderRadius: 1,
                        backgroundColor: accent,
                        color: "rgba(18,21,26,0.9)",
                        fontSize: "0.65rem",
                        fontWeight: 800,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                      }}
                    >
                      New
                    </Box>
                  )}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1.5, gap: 1 }}>
                  <Box>
                    <Typography sx={{ fontWeight: 700, color: "rgba(255,255,255,0.95)" }}>
                      {item.name}
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>
                      {title}
                    </Typography>
                  </Box>
                  <Typography sx={{ color: accent, fontWeight: 700 }}>
                    {formatCurrency(item.price)}
                  </Typography>
                </Box>
                </Box>
                </Link>
              </Box>
            ))}
            {Array.from({ length: placeholders }).map((_, index) => (
              <Box key={`placeholder-${index}`} sx={{ aspectRatio: "4 / 5", visibility: "hidden" }} />
            ))}
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
            {[1, 2, 3].map((index) => (
              <Box
                key={index}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: index === clampedPage ? accent : "rgba(255,255,255,0.06)",
                  color: index === clampedPage ? "rgba(18,21,26,0.9)" : "rgba(255,255,255,0.8)",
                  fontWeight: 700,
                }}
              >
                {index}
              </Box>
            ))}
            <Box sx={{ color: "rgba(255,255,255,0.35)", px: 0.5 }}>...</Box>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.8)",
                fontWeight: 700,
              }}
            >
              {pageCount}
            </Box>
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
