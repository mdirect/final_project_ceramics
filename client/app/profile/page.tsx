"use client";

import Link from "next/link";
import { useRef } from "react";
import { Box, Button, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useAuth } from "@/src/shared/providers/AuthProvider";
import { useFavorites } from "@/src/shared/providers/FavoritesProvider";

const accent = "#f2b90d";
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

const navItems = [
  { id: "favorites", label: "Favorites" },
  { id: "orders", label: "Order History" },
  { id: "coupons", label: "Discount Coupons" },
  { id: "catalogs", label: "Digital Catalogs" },
];

const orders = [
  {
    title: "18k Gold Solitaire Diamond Ring",
    status: "Delivered",
    statusColor: "rgba(56,189,121,0.14)",
    statusText: "rgba(56,189,121,0.9)",
    meta: "Order #WSE-884920 • Placed on Oct 12, 2023",
    price: "$4,200.00",
    qty: 1,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2ps3uAwquqDoWh2p6nePLgO2A4e9oaJMQMqoQIFFklE4JlmpfNh0zdM3okmLqjbcBJSyxhLkmB3OCVlHX4751Is92MoTqMugdG-W08fKRq3f7t-m1_Jabfzk3vZOB65rZSiVVoGF-BDmqPlRgtj1_ow3d1mS0RW5WW3NwU0WQJ7mlKipI13Q6zragwxuxSqLqNGjHgN2ohdHKSh3kpx_yUhnhOX-ZO1sG5zQz1FGTCC6X2EjRKaSyw3qr3BMcd_xy4WTWplXiDiI4",
    action: "Track order",
  },
  {
    title: "Classic South Sea Pearl Necklace",
    status: "Archived",
    statusColor: "rgba(148,163,184,0.16)",
    statusText: "rgba(148,163,184,0.8)",
    meta: "Order #WSE-773104 • Placed on May 15, 2023",
    price: "$2,850.00",
    qty: 1,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhl1sUlAf_GB65GICkzE34D7brY3znm4mlV2CCceA3ZDfFwnPrKUf158mMviu3Af9exuUZXBXsxr8Miej8AfXNRgw2ELidui_DrdNHSnr2WmDnN-PQsshy5DmTR-3T_LHs3Ey5j4MDE3-R0mu9vzvRaRB22Rs7YvJMHc1S5Z5YzQnZ2-l06yX_UOlHvIaxXnPXnNA-aersQS21vhfRAtsS7fau6KOYqjfvapB2Ac47dy4MwDnnJ4X-WIK6LEy2lNCKoXdfbZJr2Y3U",
    action: "Reorder",
  },
];

const coupons = [
  {
    title: "Member Special",
    value: "15% OFF",
    note: "Available for all gold collections",
    code: "WSE15GOLD",
    active: true,
  },
  {
    title: "Birthday Reward",
    value: "$50 OFF",
    note: "Expiring in 2 days",
    code: "HBD2026WSE",
    active: true,
  },
];

const secretCards = [
  {
    title: "Glistening Whispers",
    subtitle: "Moonstone Collection",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBAKK8BUWejUXT-eyNIFOJ3xQGRordUs7fdMX27rzu_So3Q1Pbj4hmGAHZRApuLuhzEE-oxohKNdcssTHXBBLyozQe3wW3QrL95_e77qfq9rYg5Pah8YscjT9VuHJLOjb7JgJpxsmEOy0MFS4LPfua6v2qChgBVCtBy7u7_ERU262M8W0iG71cQpSR2AWW-keF3dAkPDPci6y0nNi-7xBxHkYr3OH5cS6KM_ZCTem8KPJ4eR6aXjO0C9srz2eAMMZpGHZsr0RGZo21S",
  },
  {
    title: "Timeless Elegance",
    subtitle: "Curated selection",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCWNh454E35KXylCZ9ZBDp6LB-kH5DU8CllPU54AlzvZrQBaTgyThDfCKGplm8TQGN85o3IJaMGsr2ibtdqM-M8ZP_p_SdnLH0FwaxjP5__72LnkR5g8EsHXdKDmv3uvfz6Sv07QL5skdw574Gs71Wez55AaLIogk0rLmtOsNoogQbGjKdI712NQQHho9Hq6mH361-i-N_cCBnErHv_7we5jm-3d3euFXFienXQNcWqmpq2sJzaXH2Dvn6Sj0xjNBuScOfURqOiMxpu",
  },
];

const catalogs = [
  {
    title: "Winter 2024 Collections",
    tag: "Limited Edition",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACzkWCexWW07H78j1QT3VyfG7iWmqp_s2Fmj6txKNM2kov3vEQuG8ecXNYY93O7iFAcAXo2rgJnhHZQzCYStCy-NiTiqaQb0H9R0_uf9znJEO7-8tHK0QHW8MhqdRr5mDE1stqrtawHI3SMzg81un-NlKv5HqJLdOYbvbWJS34DmwBjmd5PDK9bwR6gxtZkZ01Ar3OYdhXw4dOH9wVULYeJPX0kmcPy9fvbbUbqIG0kZ8zjkpnJM1VDF9yNv3GXzEBUWwFS9geWSvK",
  },
  {
    title: "High Jewelry Lookbook",
    tag: "Masterpieces",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrPlmYbb3zBtYKWBRHaEBGjg5zKQJJQnZoOqdNuxKDuHRozT8KBFkmznOkWXyHoNY2gCxKVzQPJPI8cO5GlOyr9UmCoAwVOvK5BQzsFXcXXv7of4jqyEutceFSB57MTANO9GujJxXhdoG4KvX8f0gJRc1MRo7C2SGEZ6bYF-C_whEzsJj9wCJRRPUMDNzfhXA7j86EMXTC5KtvTSNHEXT-qXa4XnoCckoEjH0q935HArQtr24Fio6MVq1QjM1gBJLPdLvbpodSg-US",
  },
  {
    title: "Men's Timepieces",
    tag: "2023 Heritage",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBSr06QRQFAJ0isAPzzFTyWEPwLamVxryIaMAZDNxlHjWltu-uB87zpRwvv1FEbhtbespWIzarm7I-uyPa1SvR51kbVA0xZSVBaUOO_ZIce2TupdueHI2LFSP-NIs9SYJ0FAygy2J-aYEscLveHjDl5docc_J1JvClsIp6aVIDgC30grCtokyMFXfyMkPZUyYIF8bDjGr-m9-QhqvA8xKEw_Uq4aF160i8cvN8cKYWPAGoDVeenq78oOdwEiiW1kHMyX2wECXzNKcjG",
  },
  {
    title: "Wedding & Bridal",
    tag: "2024 Preview",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCbpmBE7SkvEv3pmSkZaHKSKVReQ_HA6m8jNNoCfttjbZRJ8Z0i8KGirG1lVgVTgNx9jLl01YT-SQTU_CtEhXcYSPeKAPYJKbyH_ZcyZqTXMzzMjH-SdNB4WL4x6k_GjelAJLNHydXnks51LJlqvdBjpr1sOAQgdbivjb7ILqUm-RjfiC8tgoEGmA3H4FYiHero2uCE7-AgJK-LKaam54spdCMa2sKFv38-VmtnEIccdco_zuFamHMUpNCICLq_bKEuNgqzNNhS5_Y",
  },
];

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const displayName = user?.name ?? "Guest";
  const { items: favoriteItems, removeFavorite } = useFavorites();
  const favoritesScrollRef = useRef<HTMLDivElement | null>(null);
  const scrollFavorites = (direction: "left" | "right") => {
    const node = favoritesScrollRef.current;
    if (!node) {
      return;
    }
    node.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
      <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 6 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "260px 1fr" },
            gap: { xs: 3, lg: 4 },
            alignItems: "start",
            fontFamily: "var(--font-inter)",
          }}
        >
          {/* LEFT COLUMN (reserves space) */}
          <Box
            component="aside"
            sx={{
              display: { xs: "none", lg: "block" },
              width: 260,
              position: "relative",
            }}
          >
            {/* FIXED SIDEBAR */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                position: "fixed",
                top: 150,
                width: 260,
                height: "60vh",
                overflowY: "auto",
                borderRadius: 2,
                border: "1px solid rgba(255,255,255,0.08)",
                backgroundColor: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(16px)",
                p: 3,
              }}
            >
          <Box sx={{ mb: 1 }}>
            <Typography
              sx={{
                fontSize: "0.72rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "rgba(253, 196, 9, 0.8)",
                mt: 0.5,
              }}
            >
              Member dashboard
            </Typography>
          </Box>
          <Stack spacing={0.5} sx={{ flex: 1 }}>
            {navItems.map((item) => (
              <Box
                key={item.id}
                component="a"
                href={`#${item.id}`}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: 2,
                  py: 1.2,
                  borderRadius: 1.5,
                  textDecoration: "none",
                  color: "rgba(255,255,255,0.75)",
                  textTransform: "uppercase",
                  letterSpacing: "0.24em",
                  fontSize: "0.62rem",
                  "&:hover": {
                    color: accent,
                    backgroundColor: "rgba(255,255,255,0.04)",
                    borderLeft: `2px solid ${accent}`,
                  },
                }}
              >
                {item.label}
              </Box>
            ))}
          </Stack>
          
          <Box
            sx={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              pt: 2.5,
            }}
          >
            {isLoading ? (
              <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
                Loading profile...
              </Typography>
            ) : user ? (
              <Stack spacing={1}>
                
                <Box>
                  <Typography sx={{ color: "rgba(255,255,255,0.9)" }}>
                    {displayName}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: "0.8rem" }}>
                    {user.email}
                  </Typography>
                </Box>
              </Stack>
            ) : (
              <Stack spacing={1.5}>
                <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
                  You are not signed in yet.
                </Typography>
                <Button
                  component={Link}
                  href="/signin"
                  variant="contained"
                  sx={{
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    fontSize: "0.72rem",
                    py: 1.1,
                    backgroundColor: "#1a1a1a",
                    color: "rgba(255,255,255,0.95)",
                    "&:hover": { backgroundColor: "#0f0f0f" },
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            )}
            </Box>
          </Box>
        </Box>

        <Stack spacing={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "flex-start", md: "flex-end" },
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: { xs: "2.1rem", md: "2.8rem" },
                  color: "rgba(255,255,255,0.96)",
                }}
              >
                Welcome Back, {displayName}
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.6)", mt: 1 }}>
                Explore your saved items and member-only perks.
              </Typography>
            </Box>
          </Box>

          <Box
            component="section"
            id="favorites"
            sx={{
              borderRadius: 2.5,
              backgroundColor: "rgba(0,0,0,0.45)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              p: { xs: 2.5, md: 3 },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, gap: 2 }}>
              <Box>
                <Typography
                  sx={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.8rem",
                    color: "rgba(255,255,255,0.95)",
                  }}
                >
                  Favorites
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.6)",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    fontSize: "0.7rem",
                    mt: 0.5,
                  }}
                >
                  {favoriteItems.length} items
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                <IconButton
                  onClick={() => scrollFavorites("left")}
                  sx={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.7)",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton
                  onClick={() => scrollFavorites("right")}
                  sx={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.7)",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
                  }}
                >
                  <ChevronRightIcon />
                </IconButton>
              </Stack>
            </Box>

            {favoriteItems.length === 0 ? (
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
                  You haven’t saved any favorites yet.
                </Typography>
              </Box>
            ) : (
              <Box
                ref={favoritesScrollRef}
                sx={{
                  display: "grid",
                  gridAutoFlow: "column",
                  gridAutoColumns: {
                    xs: "80%",
                    sm: "45%",
                    md: "calc((100% - 48px) / 4)",
                  },
                  gap: 2,
                  overflowX: "auto",
                  pb: 1,
                  scrollSnapType: "x mandatory",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  "&::-webkit-scrollbar": { display: "none" },
                }}
              >
                {favoriteItems.map((item) => (
                  <Box
                    key={item.productId}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: "rgba(0,0,0,0.45)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                      scrollSnapAlign: "start",
                    }}
                  >
                    <Link href={`/products/${item.productId}`} style={{ textDecoration: "none" }}>
                      <Box
                        sx={{
                          width: "100%",
                          aspectRatio: "3 / 4",
                          borderRadius: 1.5,
                          overflow: "hidden",
                          backgroundColor: "rgba(255,255,255,0.04)",
                          backgroundImage: item.product.image
                            ? `url(${item.product.image})`
                            : "none",
                          backgroundSize: "contain",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      />
                    </Link>
                    <Typography sx={{ color: "rgba(255,255,255,0.95)" }}>
                      {item.product.name}
                    </Typography>
                    <Typography sx={{ color: "rgba(242,185,13,0.9)", fontSize: "0.85rem" }}>
                      {formatCurrency(item.product.price)}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => removeFavorite(item.productId)}
                      sx={{
                        borderColor: "rgba(242,185,13,0.5)",
                        color: accent,
                        textTransform: "uppercase",
                        letterSpacing: "0.18em",
                        fontSize: "0.65rem",
                        px: 2,
                        alignSelf: "flex-start",
                      }}
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          <Box component="section" id="orders">
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Typography
                sx={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.8rem",
                  color: "rgba(255,255,255,0.95)",
                }}
              >
                Last Orders
              </Typography>
              <Button
                variant="text"
                sx={{
                  color: accent,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  fontSize: "0.75rem",
                }}
              >
                View all orders
              </Button>
            </Box>
            <Stack spacing={2}>
              {orders.map((order) => (
                <Box
                  key={order.title}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 2,
                    p: 3,
                    borderRadius: 2,
                    backgroundColor: "rgba(0,0,0,0.45)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: "100%", md: 96 },
                      height: { xs: 180, md: 96 },
                      borderRadius: 1.5,
                      overflow: "hidden",
                      backgroundColor: "rgba(255,255,255,0.04)",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url(${order.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                    >
                      <Typography sx={{ color: "rgba(255,255,255,0.95)" }}>
                        {order.title}
                      </Typography>
                      <Box
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 999,
                          bgcolor: order.statusColor,
                          color: order.statusText,
                          fontSize: "0.6rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.2em",
                        }}
                      >
                        {order.status}
                      </Box>
                    </Box>
                    <Typography sx={{ color: "rgba(255,255,255,0.55)", mt: 1 }}>
                      {order.meta}
                    </Typography>
                    <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
                      <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                        Price: {order.price}
                      </Typography>
                      <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                        Qty: {order.qty}
                      </Typography>
                    </Stack>
                  </Box>
                  <Button
                    variant="outlined"
                    sx={{
                      alignSelf: { xs: "stretch", md: "center" },
                      borderColor: "rgba(242,185,13,0.5)",
                      color: accent,
                      textTransform: "uppercase",
                      letterSpacing: "0.18em",
                      fontSize: "0.65rem",
                      px: 3,
                    }}
                  >
                    {order.action}
                  </Button>
                </Box>
              ))}
            </Stack>
          </Box>

          <Box component="section" id="coupons">
            <Typography
              sx={{
                fontFamily: "var(--font-playfair)",
                fontSize: "1.8rem",
                color: "rgba(255,255,255,0.95)",
                mb: 3,
              }}
            >
              Exclusive Coupons
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                gap: 2,
              }}
            >
              {coupons.map((coupon) => (
                <Box
                  key={coupon.code}
                  sx={{
                    borderRadius: 2,
                    border: "1px dashed rgba(242,185,13,0.4)",
                    backgroundColor: "rgba(0,0,0,0.45)",
                    p: 3,
                    opacity: coupon.active ? 1 : 0.6,
                  }}
                >
                  <Typography
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      fontSize: "0.62rem",
                      color: accent,
                    }}
                  >
                    {coupon.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "2rem",
                      color: "rgba(255,255,255,0.95)",
                      mt: 1,
                    }}
                  >
                    {coupon.value}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.6)", mt: 1 }}>
                    {coupon.note}
                  </Typography>
                  <Box
                    sx={{
                      mt: 2,
                      px: 2,
                      py: 1.5,
                      borderRadius: 1.5,
                      border: "1px solid rgba(255,255,255,0.08)",
                      backgroundColor: "rgba(255,255,255,0.03)",
                      fontFamily: "monospace",
                      letterSpacing: "0.2em",
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    {coupon.code}
                  </Box>
                  <Button
                    variant="text"
                    disabled={!coupon.active}
                    sx={{
                      mt: 1,
                      color: coupon.active ? accent : "rgba(255,255,255,0.4)",
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      fontSize: "0.6rem",
                    }}
                  >
                    {coupon.active ? "Copy code" : "Claimed"}
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
          <Box component="section" id="catalogs" sx={{ pb: 6 }}>
            <Typography
              sx={{
                fontFamily: "var(--font-playfair)",
                fontSize: "1.8rem",
                color: "rgba(255,255,255,0.95)",
                mb: 3,
              }}
            >
              Digital Catalogs
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
                gap: 2.5,
              }}
            >
              {catalogs.map((catalog) => (
                <Box key={catalog.title}>
                  <Box
                    sx={{
                      position: "relative",
                      borderRadius: 2,
                      overflow: "hidden",
                      aspectRatio: "3 / 4",
                      boxShadow: "0 12px 24px rgba(0,0,0,0.35)",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url(${catalog.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(0,0,0,0.35)",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        "&:hover": { opacity: 1 },
                      }}
                    />
                  </Box>
                  <Typography sx={{ mt: 1.5, color: "rgba(255,255,255,0.9)" }}>
                    {catalog.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.5)",
                      mt: 0.5,
                    }}
                  >
                    {catalog.tag}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
