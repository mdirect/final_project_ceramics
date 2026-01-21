import { Box, Stack, Typography } from "@mui/material";
import { shopFilters } from "@/src/shared/config/filters";

export function FilterPanel() {
  return (
    <Box>
      <Typography variant="h2">Filters</Typography>
      <Stack spacing={1} mt={1}>
        {shopFilters.map((group) => (
          <Box key={group.title}>
            <Typography variant="subtitle2">{group.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {group.options.join(", ")}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

