import { Box, Paper, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import UserSection from "./components/UserSection/UserSection";
import NavItem from "./components/NavItem/NavItem";
import type { NavItem as NavItemType } from "../../../utils/navItems";

interface SidebarProps {
  items: NavItemType[];
}

export default function Sidebar({ items }: SidebarProps) {
  const location = useLocation();

  return (
    <Paper
      elevation={0}
      sx={{
        width: 200,
        flexShrink: 0,
        bgcolor: "#151619",
        borderRadius: 0,
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #1E2024",
      }}
    >
      <Header />
      <Box sx={{ p: 2.5, flex: 1 }}>
        <Stack spacing={0.5}>
          {items.map((item) => (
            <NavItem key={item.path} item={item} active={location.pathname === item.path} />
          ))}
        </Stack>
      </Box>
      <UserSection />
    </Paper>
  );
}
