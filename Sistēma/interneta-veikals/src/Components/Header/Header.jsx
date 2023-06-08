import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useIsAuthenticated, useSignOut } from 'react-auth-kit';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';

function Header() {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [cartItems, setCartItems] = useState(0);
  const [authStatus, setAuthStatus] = useState(false);
  const signOut = useSignOut();

  useEffect(() => {
    setCartItems(localStorage.length);
    if (isAuthenticated() && auth().userType === 'client') {
      setAuthStatus(true);
    } else {
      setAuthStatus(false);
    }
  }, []);

  window.addEventListener('storage', () => {
    setCartItems(localStorage.length);
  });

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSignout = () => {
    signOut();
    setAuthStatus(false);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Veikals
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center" onClick={() => navigate('/katalogs/')}>
                  Katalogs
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center" onClick={() => navigate('/kategorijas')}>Kategorijas</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Veikals
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button onClick={() => navigate('/katalogs/')} sx={{ my: 2, color: 'white', display: 'block' }}>
              Katalogs
            </Button>
            <Button onClick={() => navigate('/kategorijas')} sx={{ my: 2, color: 'white', display: 'block' }}>
              Kategorijas
            </Button>
            <TextField variant="standard" label="Meklēt" sx={{ ml: 1, my: 0.5, color: 'white', display: 'block' }} />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Atvērt grozu">
              <IconButton onClick={() => navigate('/cart')} sx={{ p: 0, mr: '1rem' }}>
                <Badge badgeContent={cartItems} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            {authStatus ? (
              <>
                {' '}
                <Tooltip title="Atvērt lietotāja opcijas">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <PersonIcon />
                  </IconButton>
                </Tooltip>
                <Button sx={{ ml: '1rem' }} onClick={handleSignout}>
                  Izlogoties
                </Button>
              </>
            ) : (
              <Tooltip title="Ielogoties">
                <IconButton onClick={() => navigate('/login')} sx={{ p: 0 }}>
                  <PersonIcon />
                </IconButton>
              </Tooltip>
            )}

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Profils</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Iestatijumi</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
