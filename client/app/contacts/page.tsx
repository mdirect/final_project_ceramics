"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const accent = "#f2b90d";
const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const mainLocation = { lng: 16.3738, lat: 48.2082 };
const osmSrc =
  "https://www.openstreetmap.org/export/embed.html?bbox=16.30%2C48.17%2C16.45%2C48.24&layer=mapnik&marker=48.2082%2C16.3738";

function MapboxScene() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapboxToken || !mapContainerRef.current || mapRef.current) {
      return;
    }

    mapboxgl.accessToken = mapboxToken;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [mainLocation.lng, mainLocation.lat],
      zoom: 14.5,
      pitch: 60,
      bearing: -20,
      antialias: true,
    });

    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), "top-right");
    new mapboxgl.Marker({ color: accent })
      .setLngLat([mainLocation.lng, mainLocation.lat])
      .addTo(map);

    map.on("load", () => {
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });

      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.2 });

      map.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [0.0, 0.0],
          "sky-atmosphere-sun-intensity": 10,
        },
      });

      const labelLayerId = map
        .getStyle()
        .layers?.find(
          (layer) =>
            layer.type === "symbol" &&
            (layer as mapboxgl.SymbolLayer).layout?.["text-field"]
        )?.id;

      map.addLayer(
        {
          id: "3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 14.5,
          paint: {
            "fill-extrusion-color": "#d5c8b5",
            "fill-extrusion-height": ["get", "height"],
            "fill-extrusion-base": ["get", "min_height"],
            "fill-extrusion-opacity": 0.7,
          },
        },
        labelLayerId
      );
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <Box
      ref={mapContainerRef}
      sx={{
        position: "absolute",
        inset: 0,
      }}
    />
  );
}

export default function ContactsPage() {
  return (
    <Stack spacing={{ xs: 5, md: 7 }} sx={{ fontFamily: "var(--font-inter)" }}>
      <Box component="section" sx={{ textAlign: "center", pt: { xs: 2, md: 4 } }}>
        <Typography
          sx={{
            fontFamily: "var(--font-playfair)",
            fontStyle: "italic",
            color: accent,
            fontSize: { xs: "1rem", md: "1.1rem" },
            mb: 1,
          }}
        >
          We are always close
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontFamily: "var(--font-playfair)",
            fontSize: { xs: "2.6rem", md: "3.6rem" },
            fontWeight: 600,
            letterSpacing: "-0.02em",
            textTransform: "none",
            color: "rgba(255,255,255,0.98)",
          }}
        >
          Contacts
        </Typography>
        
      </Box>

      <Box
        component="section"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
          gap: { xs: 3, md: 4 },
          maxWidth: 1400,
          mx: "auto",
          px: { xs: 2, md: 3 },
        }}
      >
        <Box
          sx={{
            gridColumn: { xs: "1 / -1", lg: "span 5" },
            display: "flex",
            flexDirection: "column",
            gap: { xs: 3, md: 4 },
          }}
        >
          <Paper
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              bgcolor: "rgba(53, 52, 52, 0.42)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 18px 45px rgba(0,0,0,0.2)",
            }}
          >
            <Stack spacing={2.5}>
              <Typography
                variant="overline"
                sx={{ letterSpacing: "0.2em", color: accent }}
              >
                Company details
              </Typography>
              <Stack spacing={1.6}>
                <Box>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Full company name / entrepreneur
                  </Typography>
                  <Typography sx={{ fontSize: "1.05rem" }}>WSE Jewellery</Typography>
                </Box>
                <Box>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Physical address
                  </Typography>
                  <Typography sx={{ fontSize: "1.05rem" }}>
                    Kärntner Straße 12, Vienna, 1010
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Commercial register / VAT / UID
                  </Typography>
                  <Typography sx={{ fontSize: "1.05rem" }}>VAT UID 124587990</Typography>
                </Box>
                <Box>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Offline stockists
                  </Typography>
                  <Typography sx={{ fontSize: "1.05rem" }}>
                    Bloom Atelier, Nevsky 58 · Atelier MUSE, Taganskaya 3
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Paper>

          <Paper
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              bgcolor: "rgba(53, 52, 52, 0.42)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Stack spacing={2}>
              <Typography
                variant="overline"
                sx={{ letterSpacing: "0.2em", color: accent }}
              >
                Direct channels
              </Typography>
              <Stack spacing={1.4}>
                <Box>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>Email</Typography>
                  <Typography
                    component="a"
                    href="mailto:wse.jewellery@gmail.com"
                    sx={{ color: "inherit", textDecoration: "none" }}
                  >
                    wse.jewellery@gmail.com
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Instagram
                  </Typography>
                  <Typography
                    component="a"
                    href="https://www.instagram.com/wse.jewellery?igsh=MTM4dG9uODI0cjNseA=="
                    sx={{ color: "inherit", textDecoration: "none" }}
                  >
                    @wse.jewellery
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>Phone</Typography>
                  <Typography sx={{ fontSize: "1.05rem" }}>
                  06817274330
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Paper>
        </Box>

        <Paper
          sx={{
            gridColumn: { xs: "1 / -1", lg: "span 7" },
            borderRadius: 3,
            bgcolor: "rgba(245, 240, 240, 0.11)",
            border: "1px solid rgba(255,255,255,0.08)",
            overflow: "hidden",
            minHeight: { xs: 320, md: 520 },
            position: "relative",
          }}
        >
          {mapboxToken ? (
            <MapboxScene />
          ) : (
            <Box
              component="iframe"
              title="OpenStreetMap"
              src={osmSrc}
              sx={{
                border: 0,
                width: "100%",
                height: "100%",
                display: "block",
                filter: "grayscale(0.1) brightness(0.95)",
              }}
            />
          )}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(120deg, rgba(15,15,20,0.15), rgba(15,15,20,0.45))",
              pointerEvents: "none",
            }}
          />
          
        </Paper>
      </Box>

      

      <Box
        component="section"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
          gap: { xs: 3, md: 4 },
          maxWidth: 1400,
          mx: "auto",
          px: { xs: 2, md: 3 },
          pb: { xs: 4, md: 6 },
        }}
      >
        <Paper
          sx={{
            gridColumn: { xs: "1 / -1", md: "span 7" },
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            bgcolor: "rgba(53, 52, 52, 0.42)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Stack spacing={2.5}>
            <Box>
              <Typography
                sx={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: { xs: "1.6rem", md: "2rem" },
                  color: "rgba(255,255,255,0.95)",
                }}
              >
                Contact Us
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.7)", mt: 1 }}>
                Leave a message and we will respond shortly.
              </Typography>
            </Box>
            <Stack spacing={2}>
              <TextField fullWidth label="Your name" variant="outlined" />
              <TextField fullWidth label="Email" variant="outlined" />
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                multiline
                minRows={4}
              />
              <Button
                variant="contained"
                sx={{
                  alignSelf: "flex-start",
                  bgcolor: accent,
                  color: "#1d1d1d",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  px: 3,
                  "&:hover": { bgcolor: "#f7c94f" },
                }}
              >
                Send message
              </Button>
            </Stack>
          </Stack>
        </Paper>

        <Paper
          sx={{
            gridColumn: { xs: "1 / -1", md: "span 5" },
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            bgcolor: "rgba(53, 52, 52, 0.42)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Stack spacing={2.5}>
            <Box>
              <Typography
                sx={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: { xs: "1.6rem", md: "2rem" },
                  color: "rgba(255,255,255,0.95)",
                }}
              >
                Catalogs & News
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.7)", mt: 1 }}>
                Send me catalogs and news about new collections.
              </Typography>
            </Box>
            <Stack spacing={2}>
              <TextField fullWidth label="Email" variant="outlined" />
              <FormControlLabel
                control={<Checkbox />}
                label="I agree to receive catalogs and updates."
              />
              <Button
                variant="outlined"
                sx={{
                  alignSelf: "flex-start",
                  color: accent,
                  borderColor: "rgba(242,185,13,0.6)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  "&:hover": {
                    borderColor: accent,
                    bgcolor: "rgba(242,185,13,0.08)",
                  },
                }}
              >
                Send me catalogs
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Stack>
  );
}

