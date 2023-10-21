import type { ReactNode } from "react";
import Drawer from "@mui/material/Drawer";
import Fab from "@mui/material/Fab";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

interface DrawerBottomProps {
  children: ReactNode;
  onToggle: () => void;
  drawerOpen: boolean;
}

export const DrawerBottom = ({ children, onToggle, drawerOpen }: DrawerBottomProps) => (
  <>
    <Fab
      color="primary"
      onClick={onToggle}
      sx={{ position: "fixed", bottom: "80px", left: "40px" }}
    >
      <FilterAltIcon />
    </Fab>

    <Drawer anchor="bottom" open={drawerOpen} onClose={onToggle}>
      {children}
    </Drawer>
  </>
);
