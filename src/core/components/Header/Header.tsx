import AppBar from "@mui/material/AppBar";
import AdbIcon from "@mui/icons-material/Adb";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";

export const Header = () => (
  <AppBar position="static">
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <AdbIcon />
        <Button sx={{ my: 2, color: "white", display: "block" }}>
          Главная
        </Button>
      </Toolbar>
    </Container>
  </AppBar>
);
