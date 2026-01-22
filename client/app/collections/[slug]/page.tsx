"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import { collections } from "@/src/shared/config/collections";
import SearchIcon from "@mui/icons-material/Search";
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

export default function CollectionPage() {
  const params = useParams<{ slug?: string | string[] }>();
  const slugValue = Array.isArray(params?.slug) ? params?.slug[0] : params?.slug;
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
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
    <Stack spacing={3}>
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography variant="h1">{title}</Typography>
          <Typography color="rgb(49, 53, 42)" sx={{ fontWeight: 400, fontSize: "1.3rem" }}>
            Collection items
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5}>
          <TextField
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search collection..."
            size="small"
            sx={{
              minWidth: { xs: 220, md: 280 },
              backgroundColor: "rgba(255,255,255,0.16)",
              borderRadius: 1.5,
              "& fieldset": { borderColor: "rgba(255,255,255,0.35)" },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "rgba(255,255,255,0.7)" }} fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            href="/shop"
            size="small"
            variant="outlined"
            sx={{
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              borderColor: "rgba(255,255,255,0.7)",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            All collections
          </Button>
        </Stack>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "240px 1fr" },
          gap: 3,
        }}
      >
        <Stack
          spacing={2}
          sx={{
            borderRadius: 2,
            p: 2,
            backgroundColor: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(6px)",
          }}
        >
          <Typography sx={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Filter by
          </Typography>
          <Stack spacing={1.5}>
            {filterGroups.map((group) => (
              <Accordion
                key={group.id}
                defaultExpanded={group.id === "type" || group.id === "color"}
                disableGutters
                elevation={0}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 2,
                  "&:before": { display: "none" },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "rgba(255,255,255,0.8)" }} />}
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
                      letterSpacing: "0.12em",
                      fontWeight: 600,
                    }}
                  >
                    {group.label}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
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
                                color: "rgba(255,255,255,0.7)",
                                "&.Mui-checked": { color: "rgba(255,255,255,0.95)" },
                              }}
                            />
                          }
                          label={
                            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)" }}>
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
          </Stack>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.15)" }} />

          <Typography sx={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Sort by
          </Typography>
          <RadioGroup value={sort} onChange={(event) => setSort(event.target.value)}>
            {sortOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio sx={{ color: "rgba(255,255,255,0.6)" }} />}
                label={
                  <Typography variant="body2" color="text.secondary">
                    {option.label}
                  </Typography>
                }
              />
            ))}
          </RadioGroup>
        </Stack>

        <Stack spacing={2}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 2,
            }}
          >
            {pagedItems.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.id}?collection=${slugValue ?? ""}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 14px 26px rgba(0,0,0,0.18)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      pt: "95%",
                      backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 100%), url(${item.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      flexShrink: 0,
                    }}
                  />
                  <CardContent sx={{ minHeight: { xs: 76, md: 88 } }}>
                    <Typography
                      sx={{
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            ))}
            {Array.from({ length: placeholders }).map((_, index) => (
              <Card
                key={`placeholder-${index}`}
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  visibility: "hidden",
                }}
              >
                <Box sx={{ pt: "95%", flexShrink: 0 }} />
                <CardContent sx={{ minHeight: { xs: 76, md: 88 } }} />
              </Card>
            ))}
          </Box>

          <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
            <IconButton
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={clampedPage === 1}
              sx={{
                border: "1px solid rgba(255,255,255,0.35)",
                color: "rgba(255,255,255,0.8)",
                backgroundColor: "rgba(255,255,255,0.08)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.16)" },
              }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>

            <Typography
              sx={{
                letterSpacing: "0.2em",
                fontSize: "0.85rem",
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
                border: "1px solid rgba(255,255,255,0.35)",
                color: "rgba(255,255,255,0.8)",
                backgroundColor: "rgba(255,255,255,0.08)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.16)" },
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
