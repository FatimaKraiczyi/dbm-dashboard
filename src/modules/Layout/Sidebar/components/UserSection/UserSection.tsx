import { Avatar, Box, Stack, Typography } from "@mui/material";

interface UserSectionProps {
  name?: string;
  email?: string;
}

export default function UserSection({ name = "Usuário Adm", email = "user.adm@test.com" }: UserSectionProps) {
  return (
    <Box sx={{ p: 2, borderTop: "1px solid #1E2024" }}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Avatar
          sx={{
            bgcolor: "#2E3DA3",
            width: 40,
            height: 40,
            fontSize: "12px",
            fontWeight: 700,
          }}
        >
          UA
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              color: "#F9FAFA",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 400,
              color: "#858B99",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {email}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
