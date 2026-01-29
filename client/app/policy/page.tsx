"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const accent = "rgba(242,185,13,0.95)";

const policies = [
  {
    id: "delivery",
    title: "Delivery",
    body: [
      "Our ceramic and jewelry pieces are handcrafted with precision. Each order is processed within 3-5 business days. We offer insured worldwide shipping via our premium logistics partners.",
    ],
    bullets: [
      "Domestic: 2-3 business days (Complimentary)",
      "International: 7-10 business days ($45 flat rate)",
      "Express: Next-day delivery available upon request",
    ],
  },
  {
    id: "return",
    title: "Return Policy",
    body: [
      "We accept returns for unworn jewelry and unused ceramic pieces within 14 days of delivery. Items must be in their original packaging with all security tags intact.",
      "Bespoke commissions and personalized engravings are non-refundable unless a manufacturing defect is present.",
    ],
  },
  {
    id: "terms",
    title: "Terms & Conditions",
    body: [
      "By accessing the Winter Sparrow Eye boutique, you agree to our terms of service. All designs, imagery, and text are protected by international intellectual property laws.",
      "Ceramic pieces are subject to natural variations in glaze and form, which are characteristics of our artisanal production process and not considered flaws.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    body: [
      "Your privacy is of the utmost importance to us. We use industry-standard encryption to protect your data. We never sell your personal information to third parties.",
      "Our payment processing is handled by secure, PCI-compliant gateways to ensure your financial security.",
    ],
  },
  {
    id: "cookies",
    title: "Cookie Policy",
    body: [
      "We use essential cookies to maintain your shopping cart and session. Analytical cookies help us improve our user experience by understanding how visitors interact with our gallery.",
    ],
    action: "Manage Preferences",
  },
];

export default function PolicyPage() {
  const [expanded, setExpanded] = useState<string | false>("delivery");

  return (
    <Stack
      spacing={{ xs: 4, md: 6 }}
      sx={{
        fontFamily: "var(--font-inter)",
        width: "100%",
        alignItems: "center",
        mx: "auto",
      }}
    >
      <Box
        component="section"
        sx={{
          textAlign: "center",
          pt: { xs: 2, md: 3 },
          width: "100%",
          maxWidth: 920,
          mx: "auto",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: "var(--font-playfair)",
            fontSize: { xs: "2.6rem", md: "3.8rem" },
            fontWeight: 600,
            letterSpacing: "-0.02em",
            textTransform: "none",
            color: "rgba(255,255,255,0.98)",
          }}
        >
          Policy & Delivery Terms
        </Typography>
      </Box>

      <Stack
        spacing={2}
        sx={{
          maxWidth: 920,
          mx: "auto",
          width: "100%",
          px: { xs: 1, md: 0 },
          alignItems: "center",
        }}
      >
        {policies.map((item) => (
          <Accordion
            key={item.id}
            disableGutters
            expanded={expanded === item.id}
            onChange={(_, isExpanded) => setExpanded(isExpanded ? item.id : false)}
            sx={{
              width: "100%",
              maxWidth: 820,
              backgroundColor: "rgba(153, 151, 151, 0.29)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 3,
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              overflow: "hidden",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "rgba(255,255,255,0.7)" }} />}
              sx={{
                px: { xs: 2.5, md: 4 },
                py: { xs: 2, md: 2.5 },
                "& .MuiAccordionSummary-content": {
                  margin: 0,
                },
                "& .MuiAccordionSummary-expandIconWrapper": {
                  transition: "transform 0.3s ease",
                },
                "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                  transform: "rotate(180deg)",
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: { xs: "1.4rem", md: "1.8rem" },
                  color: "rgb(255, 255, 255)",
                }}
              >
                {item.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                px: { xs: 2.5, md: 4 },
                pb: { xs: 2.5, md: 3 },
                pt: 0,
              }}
            >
              <Stack spacing={2}>
                {item.body?.map((paragraph) => (
                  <Typography
                    key={paragraph}
                    sx={{
                      color: "rgba(255, 255, 255, 0.79)",
                      fontSize: "0.98rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {paragraph}
                  </Typography>
                ))}
                {item.bullets && (
                  <Box
                    component="ul"
                    sx={{
                      pl: 3,
                      m: 0,
                      color: "rgba(255, 255, 255, 0.75)",
                      "& li": { mb: 1, fontSize: "0.95rem" },
                    }}
                  >
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </Box>
                )}
                {item.action && (
                  <Button
                    variant="outlined"
                    sx={{
                      alignSelf: "flex-start",
                      borderColor: accent,
                      color: accent,
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      fontSize: "0.7rem",
                      px: 3,
                      py: 1,
                      "&:hover": {
                        borderColor: accent,
                        backgroundColor: "rgba(242,185,13,0.15)",
                      },
                    }}
                  >
                    {item.action}
                  </Button>
                )}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Stack>
  );
}

