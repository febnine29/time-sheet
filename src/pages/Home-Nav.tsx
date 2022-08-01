import React, {useState, useEffect} from 'react';
import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Profile from './Profile'
import '../css/Home.css';
import ava from '../images/bae.jpeg';
import nccLogo from '../images/nccsoft_vietnam_logo.png'
interface LogoutProps {
    setIsLogin: (agr :boolean) => void,
    isLogin: boolean,
}
const pages = ['Profile', 'Task Manager', 'Project Manager'];

const settings = ['Logout'];

function ResponsiveAppBar({setIsLogin, isLogin}:LogoutProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const navigate = useNavigate()
  const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setIsLogin(false)
        if(!isLogin){
            return navigate('/')
        }
    }

  return (
    <AppBar className="mainNav" position="static">
      <Container  maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar className="ava-logo" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} src={nccLogo}/>
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
            TIMESHEET
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
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="left" sx={{display: 'flex', flexDirection: 'column'}}>
                    <Button><Link className='alink' to='/Home/Profile'>Profile</Link></Button> 
                    <Button><Link className='alink' to='/Home/TaskManager'>Task Manager</Link></Button>
                    <Button><Link className='alink' to='/Home/ProjectManager'>Project Manager</Link></Button> 
                  </Typography>
                </MenuItem>
            </Menu>
          </Box>
          <Avatar className="ava-logo" sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} src={nccLogo}/>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
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
            TIMESHEET
          </Typography>
          {/* ----button when not responsive----- */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <div style={{margin: 'auto', display: 'flex', flexDirection: 'row'}}>
            {/* {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{  my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
            ))} */}
            <Button><Link className='alink' to='/Home/Profile'>Profile</Link></Button> 
            <Button><Link className='alink' to='/Home/TaskManager'>Task Manager</Link></Button>
            <Button><Link className='alink' to='/Home/ProjectManager'>Project Manager</Link></Button> 
            </div>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar className="ava-right" src={ava} />
              </IconButton>
            </Tooltip>
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={handleLogout}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;