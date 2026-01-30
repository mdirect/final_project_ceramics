"use client";

import Link from "next/link";
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useMemo, useState } from "react";
import { useCart } from "@/src/shared/providers/CartProvider";

const accent = "#f2b90d";
const panelBorder = "1px solid rgba(255,255,255,0.1)";
const panelBg = "rgba(255,255,255,0.06)";

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

const formatPlainAmount = (value: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const inputSx = {
  "& .MuiInputBase-root": {
    color: "rgba(255,255,255,0.9)",
    borderBottom: "1px solid rgba(255,255,255,0.3)",
    pb: 0.5,
  },
  "& .MuiInputBase-root.Mui-focused": {
    borderBottom: `1px solid ${accent}`,
  },
  "& .MuiInputBase-input::placeholder": {
    color: "rgba(255,255,255,0.4)",
    opacity: 1,
  },
};

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const delivery = useMemo(() => (items.length > 0 ? 30 : 0), [items.length]);
  const totalWithDelivery = total + delivery;
  const fallbackImage =
    "https://images.unsplash.com/photo-1456327102063-fb5054efe647?auto=format&fit=crop&w=1200&q=80";
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <Stack
      sx={{
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 3 },
        fontFamily: "var(--font-inter)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      

      <Stack
        spacing={6}
        sx={{
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Stack spacing={1} textAlign="center">
          <Typography
            variant="h1"
            sx={{
              fontFamily: "var(--font-playfair)",
              textTransform: "none",
              letterSpacing: "0.02em",
              fontWeight: 500,
              fontSize: { xs: "2.6rem", md: "3.4rem" },
              color: "rgba(255,255,255,0.95)",
            }}
          >
            Checkout
          </Typography>
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.6)",
              textTransform: "uppercase",
              letterSpacing: "0.32em",
              fontSize: "0.7rem",
            }}
          >
            Shipping & Payment Details
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "repeat(12, 1fr)" },
            gap: { xs: 4, lg: 6 },
            alignItems: "start",
          }}
        >
          <Box
            sx={{
              gridColumn: { xs: "1 / -1", lg: "span 8" },
              borderRadius: 3,
              p: { xs: 3, md: 4 },
              backgroundColor: "rgba(68, 67, 67, 0.6)",
              border: panelBorder,
              backdropFilter: "blur(9px)",
            }}
          >
            <Stack spacing={6}>
              <Stack spacing={3}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography sx={{ color: accent, fontWeight: 700, fontSize: "1.1rem" }}>
                  01.
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.5rem",
                    letterSpacing: "0.08em",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  Contact Information
                </Typography>
              </Stack>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                  gap: 3,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.6rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.22em",
                      color: "rgba(255,255,255,0.5)",
                      mb: 1,
                    }}
                  >
                    Email Address
                  </Typography>
                  <TextField
                    placeholder="example@email.com"
                    type="email"
                    variant="standard"
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                    sx={inputSx}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.6rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.22em",
                      color: "rgba(255,255,255,0.5)",
                      mb: 1,
                    }}
                  >
                    Phone Number
                  </Typography>
                  <TextField
                    placeholder="+33 (0) 000 000 00"
                    type="tel"
                    variant="standard"
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                    sx={inputSx}
                  />
                </Box>
              </Box>
            </Stack>

            <Stack spacing={3}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography sx={{ color: accent, fontWeight: 700, fontSize: "1.1rem" }}>
                  02.
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.5rem",
                    letterSpacing: "0.08em",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  Shipping Address
                </Typography>
              </Stack>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                  gap: 3,
                }}
              >
                <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 2" } }}>
                  <Typography
                    sx={{
                      fontSize: "0.6rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.22em",
                      color: "rgba(255,255,255,0.5)",
                      mb: 1,
                    }}
                  >
                    Full Name
                  </Typography>
                  <TextField
                    placeholder="Your Name"
                    variant="standard"
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                    sx={inputSx}
                  />
                </Box>
                <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 2" } }}>
                  <Typography
                    sx={{
                      fontSize: "0.6rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.22em",
                      color: "rgba(255,255,255,0.5)",
                      mb: 1,
                    }}
                  >
                    Street Address
                  </Typography>
                  <TextField
                    placeholder="123 Luxury Lane"
                    variant="standard"
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                    sx={inputSx}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.6rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.22em",
                      color: "rgba(255,255,255,0.5)",
                      mb: 1,
                    }}
                  >
                    City
                  </Typography>
                  <TextField
                    placeholder="Paris"
                    variant="standard"
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                    sx={inputSx}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.6rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.22em",
                      color: "rgba(255,255,255,0.5)",
                      mb: 1,
                    }}
                  >
                    Postal Code
                  </Typography>
                  <TextField
                    placeholder="75001"
                    variant="standard"
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                    sx={inputSx}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.6rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.22em",
                      color: "rgba(255,255,255,0.5)",
                      mb: 1,
                    }}
                  >
                    Country
                  </Typography>
                  <TextField
                    select
                    defaultValue="France"
                    variant="standard"
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                    sx={inputSx}
                  >
                    {["France", "United Kingdom", "United States", "Germany"].map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Box>
            </Stack>

            <Stack spacing={3}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography sx={{ color: accent, fontWeight: 700, fontSize: "1.1rem" }}>
                  03.
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.5rem",
                    letterSpacing: "0.08em",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  Payment Method
                </Typography>
              </Stack>
              <RadioGroup
                value={paymentMethod}
                onChange={(event) => setPaymentMethod(event.target.value)}
                sx={{ gap: 2 }}
              >
                <Box
                  component="label"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    border: paymentMethod === "card" ? `1px solid ${accent}` : panelBorder,
                    backgroundColor: "rgba(0,0,0,0.2)",
                    cursor: "pointer",
                    transition: "border-color 0.2s ease",
                  }}
                >
                  <Radio value="card" sx={{ color: accent, "&.Mui-checked": { color: accent } }} />
                  <Typography sx={{ flex: 1, fontSize: "0.95rem" }}>
                    Credit or Debit Card
                  </Typography>
                  <CreditCardIcon sx={{ color: "rgba(255,255,255,0.45)" }} />
                </Box>
                <Box
                  component="label"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    border: paymentMethod === "wallet" ? `1px solid ${accent}` : panelBorder,
                    backgroundColor: "rgba(0,0,0,0.2)",
                    cursor: "pointer",
                    transition: "border-color 0.2s ease",
                  }}
                >
                  <Radio
                    value="wallet"
                    sx={{ color: accent, "&.Mui-checked": { color: accent } }}
                  />
                  <Typography sx={{ flex: 1, fontSize: "0.95rem" }}>
                    Digital Wallet (Apple Pay / Google Pay)
                  </Typography>
                  <AccountBalanceWalletIcon sx={{ color: "rgba(255,255,255,0.45)" }} />
                </Box>
              </RadioGroup>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                  gap: 3,
                }}
              >
                <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 2" } }}>
                  <Typography
                    sx={{
                      fontSize: "0.6rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.22em",
                      color: "rgba(255,255,255,0.5)",
                      mb: 1,
                    }}
                  >
                    Card Number
                  </Typography>
                  <TextField
                    placeholder="0000 0000 0000 0000"
                    variant="standard"
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                    sx={inputSx}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.6rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.22em",
                      color: "rgba(255,255,255,0.5)",
                      mb: 1,
                    }}
                  >
                    Expiry Date
                  </Typography>
                  <TextField
                    placeholder="MM / YY"
                    variant="standard"
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                    sx={inputSx}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.6rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.22em",
                      color: "rgba(255,255,255,0.5)",
                      mb: 1,
                    }}
                  >
                    CVC
                  </Typography>
                  <TextField
                    placeholder="123"
                    variant="standard"
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                    sx={inputSx}
                  />
                </Box>
              </Box>
            </Stack>

              <Box>
                <Button
                  component={Link}
                  href="/shop"
                  sx={{
                    textTransform: "uppercase",
                    letterSpacing: "0.24em",
                    fontSize: "0.7rem",
                    color: "rgba(255,255,255,0.6)",
                    "&:hover": { color: accent },
                    px: 0,
                    minWidth: "auto",
                  }}
                >
                  ← Continue Shopping
                </Button>
              </Box>
            </Stack>
          </Box>

          <Box sx={{ gridColumn: { xs: "1 / -1", lg: "span 4" } }}>
            <Box
              sx={{
                position: { lg: "sticky" },
                top: 32,
                borderRadius: 3,
                p: { xs: 3, md: 4 },
                backgroundColor: "rgba(68, 67, 67, 0.6)",
                border: panelBorder,
                backdropFilter: "blur(9px)",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.6rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.32em",
                  color: "rgba(255,255,255,0.6)",
                  mb: 4,
                }}
              >
                Order Summary
              </Typography>

              <Stack spacing={1.5}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography sx={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem" }}>
                    Subtotal
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>{formatCurrency(total)}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography sx={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem" }}>
                    Delivery
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    {items.length > 0 ? formatCurrency(delivery) : "€—"}
                  </Typography>
                </Stack>
                <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 2 }} />
                <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "0.6rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.22em",
                        color: "rgba(255,255,255,0.6)",
                        mb: 1,
                      }}
                    >
                      Total Amount
                    </Typography>
                    <Typography sx={{ fontFamily: "var(--font-playfair)", fontSize: "2.4rem" }}>
                      €{formatPlainAmount(totalWithDelivery)}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "0.6rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.22em",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    EUR
                  </Typography>
                </Stack>
              </Stack>

              <Stack spacing={2.5} sx={{ mt: 4 }}>
                {items.length === 0 ? (
                  <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
                    Your cart is empty.
                  </Typography>
                ) : (
                  items.map((item) => (
                    <Stack key={item.productId} direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 2,
                          backgroundColor: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          p: 1,
                          flexShrink: 0,
                        }}
                      >
                        <Box
                          component="img"
                          src={item.product.image ?? fallbackImage}
                          alt={item.product.name}
                          sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          sx={{
                            fontFamily: "var(--font-playfair)",
                            fontSize: "0.95rem",
                            color: "rgba(255,255,255,0.9)",
                          }}
                        >
                          {item.product.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.65rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.18em",
                            color: "rgba(255,255,255,0.45)",
                          }}
                        >
                          Qty: {item.quantity}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontSize: "0.9rem" }}>
                        {formatCurrency(item.product.price)}
                      </Typography>
                    </Stack>
                  ))
                )}
              </Stack>

              <Button
                fullWidth
                disabled={items.length === 0}
                sx={{
                  mt: 4,
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                  fontSize: "0.65rem",
                  py: 1.8,
                  backgroundColor: "#111",
                  color: "white",
                  borderRadius: 999,
                  "&:hover": { backgroundColor: "#000" },
                  "&.Mui-disabled": { color: "rgba(255,255,255,0.3)" },
                }}
              >
                Complete Order →
              </Button>
              

              <Box
                sx={{
                  mt: 3,
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderRadius: 3,
                  px: 2.5,
                  py: 2,
                  textAlign: "center",
                  border: panelBorder,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.6rem",
                    color: "rgba(255,255,255,0.65)",
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                  }}
                >
                  Complimentary luxury packaging and certificate of authenticity included with
                  every order.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
}
