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
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/src/shared/api/http";
import { useFavorites } from "@/src/shared/providers/FavoritesProvider";
import { useCart } from "@/src/shared/providers/CartProvider";

type Product = {
  id: number;
  name: string;
  desc?: string | null;
  image?: string | null;
  images?: string[] | null;
  price: number | string;
  tags?: string[];
  collectionId?: number | null;
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

const filterGroups = [
  {
    id: "form",
    label: "Form",
    options: ["Painted image", "Relief", "Three-dimensional"],
  },
  {
    id: "color",
    label: "Color",
    options: ["Colourful", "White", "Black", "Yellow", "Green"],
  },
  {
    id: "surface",
    label: "Surface medium",
    options: ["Glaze", "Engobe", "Acrylic", "Epoxy resin", "Light-reflecting pigment"],
  },
  {
    id: "hanging",
    label: "Hanging material",
    options: ["Chain", "Beading wire", "Memory wire", "Decorative cord"],
  },
  {
    id: "composition",
    label: "Composition type",
    options: ["Multi-part jewelry", "Single-piece jewelry"],
  },
  {
    id: "production",
    label: "Production type",
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

export default function ShopAllPage() {
  const isAdmin = false;
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [sortOpen, setSortOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [deletePending, setDeletePending] = useState<number | null>(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<"success" | "error">("success");
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addItem, isLoading: isCartUpdating, error: cartError } = useCart();
  const pageSize = 12;

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setIsLoading(true);
      setLoadError(null);
      setActionError(null);
      try {
        const data = await apiFetch<Product[]>("/product");
        if (!cancelled) {
          setProducts(data);
          setPage(1);
        }
      } catch (error) {
        if (!cancelled) {
          setLoadError(
            error instanceof Error ? error.message : "Failed to load products.",
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
  }, []);

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
  const paginationItems = useMemo(() => {
    if (pageCount <= 5) {
      return Array.from({ length: pageCount }, (_, index) => index + 1);
    }

    const pages = new Set<number>([1, pageCount, clampedPage, clampedPage - 1, clampedPage + 1]);
    if (clampedPage <= 3) {
      pages.add(2);
      pages.add(3);
      pages.add(4);
    } else if (clampedPage >= pageCount - 2) {
      pages.add(pageCount - 1);
      pages.add(pageCount - 2);
      pages.add(pageCount - 3);
    }

    const sortedPages = Array.from(pages)
      .filter((value) => value >= 1 && value <= pageCount)
      .sort((a, b) => a - b);

    const items: Array<number | string> = [];
    sortedPages.forEach((value, index) => {
      if (index > 0 && value - sortedPages[index - 1] > 1) {
        items.push("…");
      }
      items.push(value);
    });

    return items;
  }, [pageCount, clampedPage]);
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
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page]);

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
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={2}>
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: "2.6rem", md: "3.8rem" },
                  fontWeight: 600,
                  fontFamily: "var(--font-playfair)",
                  color: "rgba(255, 255, 255, 0.98)",
                }}
              >
                All Jewellery
              </Typography>
              <Typography
                sx={{
                  color: "rgba(242,185,13,0.75)",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.32em",
                  fontWeight: 600,
                  mt: 0.5,
                }}
              >
                All items
              </Typography>
            </Box>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography
                sx={{
                    color: "rgba(226, 232, 240, 0.97)",
                    fontSize: "0.82rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
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
                      <SearchIcon sx={{ fontSize: "1.1rem", color: "rgba(226,232,240,0.4)" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  minWidth: 280,
                  "& .MuiInputBase-input": {
                    color: "rgba(226,232,240,0.85)",
                    fontSize: "0.9rem",
                    py: 0.85,
                    "&::placeholder": {
                      fontSize: "0.88rem",
                    },
                  },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(0,0,0,0.25)",
                    borderColor: "rgba(255,255,255,0.12)",
                    borderRadius: 999,
                    pr: 0.5,
                  },
                }}
              />
            </Stack>
          </Stack>

          {loadError && (
            <Alert severity="error" sx={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
              {loadError}
            </Alert>
          )}
          {actionError && (
            <Alert severity="error" sx={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
              {actionError}
            </Alert>
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
                  No products yet.
                </Typography>
              </Box>
            )}
            {pagedItems.map((item) => {
              const primaryImage = item.images?.[0] ?? item.image;
              const favorited = isFavorite(item.id);
              return (
                <Box
                  key={item.id}
                  sx={{
                    position: "relative",
                    minWidth: 0,
                    "&:hover .delete-btn": { opacity: 1 },
                    "&:hover .product-image": {
                      filter: "grayscale(0%)",
                      transform: "scale(1.06)",
                    },
                  }}
                >
                  <IconButton
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      const wasAdded = toggleFavorite({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image ?? null,
                        collectionId: null,
                      });
                      setToastMessage(
                        wasAdded ? "Added to favorites." : "Removed from favorites.",
                      );
                      setToastSeverity("success");
                      setToastOpen(true);
                    }}
                    sx={{
                      position: "absolute",
                      top: 18,
                      right: isAdmin ? 52 : 18,
                      zIndex: 2,
                      backgroundColor: "rgba(0,0,0,0.6)",
                      color: favorited ? accent : "rgba(255,255,255,0.85)",
                      "&:hover": { backgroundColor: "rgba(5, 5, 5, 0.75)" },
                    }}
                  >
                    {favorited ? (
                      <FavoriteIcon fontSize="small" />
                    ) : (
                      <FavoriteBorderIcon fontSize="small" />
                    )}
                  </IconButton>
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
                    href={`/products/${item.id}`}
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
                        height: 570,
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
                          backgroundColor: "rgba(255, 255, 255, 0.13)",
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
                              filter: "grayscale(30%)",
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
                          noWrap
                          sx={{
                            fontFamily: "var(--font-playfair)",
                            fontSize: "1.2rem",
                            color: "rgba(255,255,255,0.95)",
                            minWidth: 0,
                            flex: 1,
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Box
                          onClick={async (event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            const success = await addItem(
                              {
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                image: item.image ?? null,
                                collectionId: item.collectionId ?? null,
                              },
                              1,
                            );
                            setToastMessage(
                              success
                                ? "Item added to cart."
                                : "Unable to add item to cart.",
                            );
                            setToastSeverity(success ? "success" : "error");
                            setToastOpen(true);
                          }}
                          sx={{
                            px: 1.6,
                            py: 0.6,
                            borderRadius: 1.2,
                            backgroundColor: "rgba(242,185,13,0.22)",
                            border: "1px solid rgba(242,185,13,0.4)",
                            cursor: "pointer",
                            transition: "transform 0.2s ease, background-color 0.2s ease",
                            "&:hover": {
                              backgroundColor: "rgba(242,185,13,0.3)",
                              transform: "translateY(-1px)",
                            },
                            "&:active": { transform: "translateY(0)" },
                          }}
                        >
                          <Typography
                            sx={{
                              color: "rgba(242,185,13,0.95)",
                              fontWeight: 600,
                              fontSize: "0.76rem",
                              letterSpacing: "0.14em",
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
            {paginationItems.map((item, index) => {
              const isNumber = typeof item === "number";
              const isActive = item === clampedPage;
              return (
                <Box
                  key={`${item}-${index}`}
                  onClick={isNumber ? () => setPage(item) : undefined}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: isNumber ? "pointer" : "default",
                    backgroundColor: isNumber
                      ? isActive
                        ? accent
                        : "rgba(255,255,255,0.06)"
                      : "transparent",
                    color: isNumber
                      ? isActive
                        ? "rgba(18,21,26,0.9)"
                        : "rgba(255,255,255,0.8)"
                      : "rgba(255,255,255,0.5)",
                    fontWeight: 700,
                    pointerEvents: isNumber ? "auto" : "none",
                  }}
                >
                  {item}
                </Box>
              );
            })}
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
