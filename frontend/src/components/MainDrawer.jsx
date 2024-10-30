import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import TableChartIcon from "@mui/icons-material/TableChart";
import { Link, Outlet, useNavigate } from "react-router-dom";

const drawerWidth = 72;

const closedMixin = (theme) => ({
  width: drawerWidth,
  overflowX: "hidden",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "center",
}));

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer - 1,
}));

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...closedMixin(theme),
  "& .MuiDrawer-paper": closedMixin(theme),
}));

const mainLinks = [
  {
    id: 1,
    link: "/",
    text: "Home",
    icon: <HomeIcon />,
  },
  {
    id: 2,
    link: "/tables",
    text: "Tables",
    icon: <TableChartIcon />,
  },
];

const MainDrawer = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, [navigate]);

  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (id) => {
    setSelectedIndex(id);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <Typography
            variant="h6"
            style={{ color: "black" }}
            noWrap
            component="div"
          >
            Floor Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent">
        <List>
          {mainLinks.map(({ id, link, text, icon }) => (
            <ListItem key={id} sx={{ padding: "8px" }}>
              <ListItemButton
                component={Link}
                to={link}
                onClick={() => handleListItemClick(id)}
                sx={{
                  minHeight: 48,
                  justifyContent: "center",
                  px: 2.5,
                  backgroundColor:
                    selectedIndex === id ? "lightpink" : "transparent",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "lightgray",
                  },
                }}
                disableRipple
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    color: "#aa0404", // Set all icons to red
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ display: "none" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        sx={{
          mt: 8,
          p: 0,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainDrawer;
