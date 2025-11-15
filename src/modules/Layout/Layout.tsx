import { Box } from "@mui/material";
import type { PropsWithChildren } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { navItems } from "../../utils/navItems";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#151619" }}>
      <Sidebar items={navItems} />
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          bgcolor: "#F9FAFA",
          borderRadius: "20px 0 0 0",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
