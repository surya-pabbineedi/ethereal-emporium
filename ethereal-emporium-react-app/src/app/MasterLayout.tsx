import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { MouseEventHandler, useState } from 'react';
import styled from '@emotion/styled';
import { useAuthentication } from './hooks/useAuthentication';

const AppToolBar = ({
  handleMenuClick,
}: {
  handleMenuClick: MouseEventHandler;
}) => {
  const { user, logout } = useAuthentication();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ethereal Emporium
          </Typography>

          <Typography>Welcome, {user?.email} |</Typography>
          <Button color="inherit" onClick={() => logout()}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const StyledRootContainer = styled.main`
  margin: 1rem;
  padding: 1rem;
  height: calc(100vh - 64px - 2rem);
`;

const MasterLayout = () => {
  const [toggleDrawer, setToggleDrawer] = useState(false);
  return (
    <>
      <AppToolBar handleMenuClick={() => setToggleDrawer(true)} />
      <Drawer open={toggleDrawer} onClose={() => setToggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setToggleDrawer(false)}
        >
          <List>
            <ListItem component={Link} to="/dashboard">
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem component={Link} to="/products">
              <ListItemText primary="Products" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <StyledRootContainer>
        <Outlet />
      </StyledRootContainer>
    </>
  );
};

export default MasterLayout;
