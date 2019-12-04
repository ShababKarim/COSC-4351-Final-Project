import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FaceIcon from "@material-ui/icons/Face";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Image from "react-image-resizer";
import logo from "../images/UH_White_Red.png";

const drawerWidth = 240;
const barWidth = 40;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    minHeight: barWidth
  }
}));

const NavBar = () => {
  const classes = useStyles();
  const auth = true;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Image img src={logo} alt="cur" height={40} width={40} />
          <Typography
            variant="h6"
            style={{
              float: "none",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          ></Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
