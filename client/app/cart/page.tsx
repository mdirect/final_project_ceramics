"use client";

import Link from "next/link";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { useCart } from "@/src/shared/providers/CartProvider";

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

export default function CartPage() {
  const { items, total, isLoading, error, updateQuantity, removeItem, clearCart } = useCart();
  const delivery = useMemo(() => (items.length > 0 ? 30 : 0), [items.length]);
  const totalWithDelivery = total + delivery;
  const fallbackImage =
    "https://images.unsplash.com/photo-1456327102063-fb5054efe647?auto=format&fit=crop&w=1200&q=80";

  return (
    <Stack spacing={6} sx={{ py: { xs: 4, md: 6 } }}>
      <Stack spacing={1} textAlign="center">
        <Typography
          variant="h1"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            textTransform: "none",
            letterSpacing: "0.02em",
            fontWeight: 500,
            fontSize: { xs: "2.4rem", md: "3rem" },
            color: "rgba(255,255,255,0.95)",
          }}
        >
          Cart
        </Typography>
        <Typography
          sx={{
            color: "rgba(255,255,255,0.4)",
            textTransform: "uppercase",
            letterSpacing: "0.28em",
            fontSize: "0.7rem",
            fontStyle: "italic",
          }}
        >
          Delivery and checkout summary
        </Typography>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "repeat(12, 1fr)" },
          gap: { xs: 3, md: 4 },
          alignItems: "start",
        }}
      >
        <Stack spacing={3} sx={{ gridColumn: { xs: "1 / -1", lg: "span 8" } }}>
          {error && (
            <Typography sx={{ color: "rgba(248,113,113,0.85)" }}>
              {error}
            </Typography>
          )}
          {isLoading && items.length === 0 ? (
            <Box
              sx={{
                backgroundColor: "rgba(255,255,255,0.06)",
                borderRadius: 3,
                p: { xs: 3, md: 4 },
                border: "1px solid rgba(255,255,255,0.1)",
                textAlign: "center",
              }}
            >
              <Typography sx={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.8)" }}>
                Loading your cart...
              </Typography>
            </Box>
          ) : items.length === 0 ? (
            <Box
              sx={{
                backgroundColor: "rgba(255,255,255,0.06)",
                borderRadius: 3,
                p: { xs: 3, md: 4 },
                border: "1px solid rgba(255,255,255,0.1)",
                textAlign: "center",
              }}
            >
              <Typography sx={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.8)" }}>
                Your cart is empty.
              </Typography>
              <Typography sx={{ mt: 1, color: "rgba(255,255,255,0.5)" }}>
                Browse the catalog to add items.
              </Typography>
            </Box>
          ) : (
            items.map((item) => (
              <Box
                key={item.productId}
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "128px 1fr auto" },
                  gap: 2.5,
                  alignItems: "center",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderRadius: 3,
                  p: { xs: 2.5, md: 3 },
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
                  transition: "background-color 0.2s ease",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.12)" },
                }}
              >
                <Box
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    width: 128,
                    height: 128,
                    backgroundImage: `url(${item.product.image ?? fallbackImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
                <Stack spacing={0.8}>
                  <Typography
                    sx={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.15rem",
                      color: "rgba(255,255,255,0.95)",
                    }}
                  >
                    {item.product.name}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>
                    Quantity: {item.quantity}
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography
                      sx={{ fontWeight: 700, color: "rgba(255,255,255,0.95)" }}
                    >
                      {formatCurrency(item.product.price)}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        border: "1px solid rgba(255,255,255,0.08)",
                        backgroundColor: "rgba(255,255,255,0.05)",
                      }}
                    >
                      <Box
                        component="button"
                        type="button"
                        onClick={() => void updateQuantity(item.productId, item.quantity - 1)}
                        disabled={isLoading}
                        sx={{
                          border: "none",
                          background: "transparent",
                          color: "rgba(255,255,255,0.5)",
                          fontSize: "1rem",
                          cursor: "pointer",
                          "&:hover": { color: "rgba(242,185,13,0.9)" },
                        }}
                      >
                        −
                      </Box>
                      <Typography sx={{ width: 16, textAlign: "center" }}>
                        {item.quantity}
                      </Typography>
                      <Box
                        component="button"
                        type="button"
                        onClick={() => void updateQuantity(item.productId, item.quantity + 1)}
                        disabled={isLoading}
                        sx={{
                          border: "none",
                          background: "transparent",
                          color: "rgba(255,255,255,0.5)",
                          fontSize: "1rem",
                          cursor: "pointer",
                          "&:hover": { color: "rgba(242,185,13,0.9)" },
                        }}
                      >
                        +
                      </Box>
                    </Stack>
                  </Stack>
                </Stack>
                <Box
                  component="button"
                  type="button"
                  onClick={() => void removeItem(item.productId)}
                  disabled={isLoading}
                  sx={{
                    border: "none",
                    background: "transparent",
                    color: "rgba(255,255,255,0.2)",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                    justifySelf: { xs: "start", sm: "end" },
                    "&:hover": { color: "rgba(248,113,113,0.85)" },
                  }}
                >
                  Remove
                </Box>
              </Box>
            ))
          )}

          <Box
            component={Link}
            href="/shop"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
              letterSpacing: "0.28em",
              fontSize: "0.65rem",
              textDecoration: "none",
              "&:hover": { color: "rgba(242,185,13,0.9)" },
            }}
          >
            <Box component="span">←</Box>
            Continue shopping
          </Box>
        </Stack>

        <Box
          sx={{
            gridColumn: { xs: "1 / -1", lg: "span 4" },
            position: { lg: "sticky" },
            top: { lg: 120 },
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(255,255,255,0.08)",
              borderRadius: 3,
              p: { xs: 3, md: 4 },
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 12px 28px rgba(0,0,0,0.3)",
              backdropFilter: "blur(20px)",
            }}
          >
            <Typography
              sx={{
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.4)",
                fontWeight: 700,
                mb: 3,
              }}
            >
              Order summary
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
                  Subtotal
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.9)" }}>
                  {formatCurrency(total)}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
                  Delivery
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.9)" }}>
                  {formatCurrency(delivery)}
                </Typography>
              </Stack>
              <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ fontWeight: 700, color: "white" }}>
                  Total
                </Typography>
                <Typography sx={{ fontWeight: 700, color: "white" }}>
                  {formatCurrency(totalWithDelivery)}
                </Typography>
              </Stack>
            </Stack>
            <Button
              variant="contained"
              sx={{
                mt: 4,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                fontSize: "0.7rem",
                py: 1.6,
                backgroundColor: "white",
                color: "rgba(26,24,18,0.95)",
                "&:hover": { backgroundColor: "rgba(242,185,13,0.9)" },
              }}
            >
              Proceed to checkout
            </Button>
            {items.length > 0 && (
              <Button
                variant="text"
                onClick={() => void clearCart()}
                sx={{
                  mt: 1.5,
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  fontSize: "0.65rem",
                  color: "rgba(255,255,255,0.45)",
                  "&:hover": { color: "rgba(248,113,113,0.85)" },
                }}
              >
                Clear cart
              </Button>
            )}
            <Typography
              sx={{
                mt: 3,
                fontSize: "0.62rem",
                color: "rgba(255,255,255,0.35)",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                textAlign: "center",
              }}
            >
              Taxes and shipping will be calculated at checkout.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}

