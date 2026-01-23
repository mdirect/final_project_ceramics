"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import { collections } from "@/src/shared/config/collections";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useMemo, useState } from "react";

const mockItems = [
  {
    id: "1",
    name: "The Planet Holder",
    price: "€120",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
    tags: ["new"],
  },
  {
    id: "2",
    name: "Chipper",
    price: "€95",
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1200&q=80",
    tags: ["classic"],
  },
  {
    id: "3",
    name: "Bones Rider",
    price: "€110",
    image:
      "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?auto=format&fit=crop&w=1200&q=80",
    tags: ["limited"],
  },
  {
    id: "4",
    name: "Little Mask",
    price: "€80",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80",
    tags: ["new", "limited"],
  },
  {
    id: "5",
    name: "Golden Eye",
    price: "€140",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80",
    tags: ["statement"],
  },
  {
    id: "6",
    name: "Night Bloom",
    price: "€130",
    image:
      "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=1200&q=80",
    tags: ["classic"],
  },
  {
    id: "7",
    name: "Shell",
    price: "€90",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
    tags: ["new"],
  },
  {
    id: "8",
    name: "Bird Echo",
    price: "€150",
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1200&q=80",
    tags: ["statement", "limited"],
  },
];

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
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [sortOpen, setSortOpen] = useState(false);
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
  const title = matched?.label ?? formatTitle(slugValue);

  const filteredItems = useMemo(() => {
    const term = search.trim().toLowerCase();
    const matchesSearch = (name: string) =>
      term.length === 0 || name.toLowerCase().includes(term);
    const matchesFilters = (tags: string[]) => {
      const groups = Object.values(selectedFilters).filter((group) => group.length > 0);
      if (groups.length === 0) {
        return true;
      }
      return groups.every((group) => group.some((value) => tags.includes(value)));
    };

    return mockItems.filter(
      (item) => matchesSearch(item.name) && matchesFilters(item.tags),
    );
  }, [search, selectedFilters]);

  const parsePrice = (value: string) => Number(value.replace(/[^\d.]/g, ""));

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
              <Typography sx={{ fontSize: "1.8rem", fontWeight: 700, color: "rgba(255,255,255,0.95)" }}>
                Collections
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", mb: 2 }}>
                Artisanal excellence since 1994
              </Typography>
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
            {pagedItems.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.id}?collection=${slugValue ?? ""}`}
                style={{ textDecoration: "none", color: "inherit" }}
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
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
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
                  {item.tags.includes("new") && (
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
                  <Typography sx={{ color: accent, fontWeight: 700 }}>{item.price}</Typography>
                </Box>
              </Box>
              </Link>
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
