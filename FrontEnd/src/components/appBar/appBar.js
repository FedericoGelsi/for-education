import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";
import AppLogo from "./appLogo";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
class Page {
  constructor(link, name) {
    this.link = link;
    this.name = name;
  }
}

const pagesStudent = [
  new Page("/clases", "Inicio"),
  new Page("/mis-clases", "Mis Clases"),
  new Page("/contrataciones", "Contrataciones"),
];

const pagesProfessor = [
  new Page("/mis-clases", "Mis Clases"),
  new Page("/contrataciones", "Contrataciones"),
];

const settings = [new Page("/perfil", "Perfil"), new Page("/", "Logout")];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const  {setUser} = useContext(UserContext);
  const contextUser = useContext(UserContext);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setUser(undefined);
    handleCloseUserMenu();
  };

  const handlePages = () => {
    return contextUser.user.role === "professor"
      ? pagesProfessor
      : pagesStudent;
  };

  const pages = handlePages();

  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar>
          {/* XS Components */}
          <Box sx={{ flexGrow: 2, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbars"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={page.link}
                  key={page.link}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <AppLogo variant="xs" />
          {/* MD Components */}
          <AppLogo variant="md" />
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              paddingX: 2,
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.link}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={page.link}
                >
                  {page.name}
                </Link>
              </Button>
            ))}

            <Button>
              <Link to={"/notificaciones"}>
                <Notifications
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    height: 32,
                    width: 32,
                  }}
                />
              </Link>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Jhon Doe" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Link
                key={settings[0].link}
                style={{ textDecoration: "none", color: "black" }}
                to={settings[0].link}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{settings[0].name}</Typography>
                </MenuItem>
              </Link>
              <Link
                key={settings[1].link}
                style={{ textDecoration: "none", color: "black" }}
                to={settings[1].link}
              >
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">{settings[1].name}</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
