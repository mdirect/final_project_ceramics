import { Box, Button, Divider, Stack, Typography } from "@mui/material";

const cartItems = [
  {
    title: "Ritual Collar",
    subtitle: "Sterling silver + ceramic",
    price: "420 €",
    image:
      "https://images.unsplash.com/photo-1456327102063-fb5054efe647?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Light Vessels",
    subtitle: "Porcelain light object",
    price: "540 €",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function CartPage() {
  return (
    <Stack spacing={5}>
      <Stack spacing={1} textAlign="center">
        <Typography
          variant="h1"
          sx={{
            textTransform: "none",
            letterSpacing: "0.02em",
            fontWeight: 500,
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          Cart
        </Typography>
        <Typography
          sx={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontStyle: "italic",
            color: "rgba(0,0,0,0.6)",
          }}
        >
          Delivery calculation and checkout summary
        </Typography>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gap: { xs: 3, md: 4 },
        }}
      >
        <Stack spacing={3}>
          {cartItems.map((item) => (
            <Box
              key={item.title}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "140px 1fr" },
                gap: 2,
                alignItems: "center",
                backgroundColor: "rgba(248,248,246,0.82)",
                borderRadius: 4,
                p: 2.5,
                boxShadow: "0 18px 40px rgba(0,0,0,0.14)",
                border: "1px solid rgba(255,255,255,0.6)",
              }}
            >
              <Box
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  minHeight: 140,
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <Stack spacing={0.8}>
                <Typography
                  sx={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "1.15rem",
                    letterSpacing: "0.02em",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography sx={{ color: "rgba(0,0,0,0.6)" }}>
                  {item.subtitle}
                </Typography>
                <Typography sx={{ fontWeight: 600, letterSpacing: "0.08em" }}>
                  {item.price}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Stack>

        <Box
          sx={{
            backgroundColor: "rgba(248,248,246,0.9)",
            borderRadius: 4,
            p: 3,
            boxShadow: "0 20px 45px rgba(0,0,0,0.14)",
            height: "fit-content",
            border: "1px solid rgba(255,255,255,0.6)",
          }}
        >
          <Stack spacing={2}>
            <Typography
              sx={{
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                fontSize: "0.75rem",
                color: "rgba(0,0,0,0.5)",
              }}
            >
              Order summary
            </Typography>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ color: "rgba(0,0,0,0.6)" }}>Subtotal</Typography>
                <Typography>960 €</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ color: "rgba(0,0,0,0.6)" }}>
                  Delivery
                </Typography>
                <Typography>30 €</Typography>
              </Stack>
              <Divider sx={{ opacity: 0.4 }} />
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ fontWeight: 600 }}>Total</Typography>
                <Typography sx={{ fontWeight: 600 }}>990 €</Typography>
              </Stack>
            </Stack>
            <Button
              variant="contained"
              sx={{
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                py: 1.2,
                backgroundColor: "rgba(30,30,30,0.92)",
                boxShadow: "0 12px 26px rgba(0,0,0,0.25)",
                "&:hover": { backgroundColor: "rgba(20,20,20,0.98)" },
              }}
            >
              Proceed to checkout
            </Button>
            <Typography sx={{ fontSize: "0.85rem", color: "rgba(0,0,0,0.65)" }}>
              Taxes and shipping will be calculated at checkout.
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
}

