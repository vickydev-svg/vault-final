import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { Container, fontWeight } from '@mui/system';
import {  MenuItem, Select, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "./header.css"
import { createBrowserHistory } from '@remix-run/router';
import CssBaseline from '@mui/material/CssBaseline';
import { CryptoState } from '../../CryptoContext';
import Logo from "../../Images/megahootvaultLogo.svg"
import { Money } from '../../Api/api';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

// appbar

import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';

import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
// import {MenuOpenIcon} from '@mui/icons-material/MenuOpen';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import AdbIcon from '@mui/icons-material/Adb';

const darkTheme = createTheme({

  palette: {
    primary:{
      main:"#fff"
    },
    mode:"dark"
  },
});
const theme = createTheme({
  title:{
    flex:1,
    color:"gold",
    fontFamily:"Montserrat",
    fontWeight:"bold",
    cursor:"pointer"

  }
 })
const Header = () => {
  const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
  const history = createBrowserHistory();
  const [currencyList,setCurrencyList] = useState();
  let navigate = useNavigate();
  const {currency,setCurrency} = CryptoState()
  console.log(currency)
  const MoneyList = async () =>{
    const {data} = await axios.get(Money());
    setCurrencyList(data);
  
    
}


console.log(currencyList);
useEffect(()=>{
  MoneyList();
},[currency])

  return (  
    <div className="app_container">
       
    <AppBar color='transparent' position="static" className='navbar'>
    
      <Container maxWidth="xl">
     
      <Toolbar style={{width:"95vw",display:"flex",justifyContent:"space-between"}}disableGutters>
       <img src={Logo} alt="" style={{height:"3rem"}}/>
        <Box sx={{  display: { xs: 'none', md: 'flex' } }} >
        <Container className="headerContainer">
        <Toolbar className='headerContainer' >
        <MenuItem  onClick={handleCloseNavMenu} style={{color:"#005373"}}>
               
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu} style={{color:"#005373"}}>
                <a href="https://megahootvault.com/request_listing.php" target="_blank">Listing Request</a>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu} style={{color:"#005373"}}>
                <a href="https://www.megahoot.com/xmg-fintech-digital-payment-portal/" target="_blank">XMG Fintech</a>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu} style={{color:"#005373"}}>
                <a href="https://www.megahoot.com/vault/" target="_blank">What is the vault ?</a>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu} style={{color:"#005373"}}>
                <a href="https://www.megahoot.com/cryptotools/" target="_blank">CryptoTools</a>
                </MenuItem>
          <Select variant='outlined' style={{width:100,height:40,marginRight:15}} value={currency} disabled onChange={(e)=>setCurrency(e.target.value)}>
            
            {currencyList?.map((list)=>{
              return <MenuItem value={list.toUpperCase()}>{list.toUpperCase()}</MenuItem>
            })}
          </Select>
        </Toolbar>
      </Container>
        </Box> 
        <Box sx={{  display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="black"
            style={{marginLeft:"65vw"}}
          >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{height:"36px",color:"#005373"}}><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
         
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
            className="navbar_menu"
            style={{marginTop:"8px"}}
      >
    
      <Container className="headerContainer">
        <Toolbar className='headerContainer' style={{display:"flex",flexDirection:"column"}}>

                <MenuItem  onClick={handleCloseNavMenu} style={{color:"#005373"}}>
                <a href="https://megahootvault.com/request_listing.php" target="_blank">Listing Request</a>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu} style={{color:"#005373"}}>
                <a href="https://www.megahoot.com/xmg-fintech-digital-payment-portal/" target="_blank">XMG Fintech</a>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu} style={{color:"#005373"}}>
                <a href="https://www.megahoot.com/vault/" target="_blank">What is the vault ?</a>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu} style={{color:"#005373"}}>
                <a href="https://www.megahoot.com/cryptotools/" target="_blank">CryptoTools</a>
                </MenuItem>
          <Select variant='outlined' style={{width:100,height:40,marginRight:15}} value={currency} onChange={(e)=>setCurrency(e.target.value)}>
            <MenuItem value={'USD'}>
            USD
            </MenuItem>
            <MenuItem value={'INR'}>
            INR
            </MenuItem>
            {currencyList?.map((list)=>{
              return <MenuItem value={list.toUpperCase()}>{list.toUpperCase()}</MenuItem>
            })}
          </Select>
        </Toolbar>
      </Container>
          </Menu>
        </Box>
      </Toolbar>
    </Container>
      {/* <Container className="headerContainer">
        <Toolbar className='headerContainer' >
          <img src={Logo} alt="" style={{height:"3rem"}}/>
          <Select variant='outlined' style={{width:100,height:40,marginRight:15}} value={currency} onChange={(e)=>setCurrency(e.target.value)}>
            <MenuItem value={'USD'}>
            USD
            </MenuItem>
            <MenuItem value={'INR'}>
            INR
            </MenuItem>
            {currencyList?.map((list)=>{
              return <MenuItem value={list.toUpperCase()}>{list.toUpperCase()}</MenuItem>
            })}
          </Select>
        </Toolbar>
      </Container> */}

    </AppBar>
    </div>


  //   <AppBar position="static">
  //   <Container maxWidth="xl">
  //     <Toolbar disableGutters>
  //       <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
  //       <Typography
  //         variant="h6"
  //         noWrap
  //         component="a"
  //         href="/"
  //         sx={{
  //           mr: 2,
  //           display: { xs: 'none', md: 'flex' },
  //           fontFamily: 'monospace',
  //           fontWeight: 700,
  //           letterSpacing: '.3rem',
  //           color: 'inherit',
  //           textDecoration: 'none',
  //         }}
  //       >
  //         LOGO
  //       </Typography>

  //       <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
  //         <IconButton
  //           size="large"
  //           aria-label="account of current user"
  //           aria-controls="menu-appbar"
  //           aria-haspopup="true"
  //           onClick={handleOpenNavMenu}
  //           color="inherit"
  //         >
  //           <MenuIcon />
  //         </IconButton>
  //         <Menu
  //           id="menu-appbar"
  //           anchorEl={anchorElNav}
  //           anchorOrigin={{
  //             vertical: 'bottom',
  //             horizontal: 'left',
  //           }}
  //           keepMounted
  //           transformOrigin={{
  //             vertical: 'top',
  //             horizontal: 'left',
  //           }}
  //           open={Boolean(anchorElNav)}
  //           onClose={handleCloseNavMenu}
  //           sx={{
  //             display: { xs: 'block', md: 'none' },
  //           }}
  //         >
  //           {pages.map((page) => (
  //             <MenuItem key={page} onClick={handleCloseNavMenu}>
  //               <Typography textAlign="center">{page}</Typography>
  //             </MenuItem>
  //           ))}
  //         </Menu>
  //       </Box>
  //       <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
  //       <Typography
  //         variant="h5"
  //         noWrap
  //         component="a"
  //         href=""
  //         sx={{
  //           mr: 2,
  //           display: { xs: 'flex', md: 'none' },
  //           flexGrow: 1,
  //           fontFamily: 'monospace',
  //           fontWeight: 700,
  //           letterSpacing: '.3rem',
  //           color: 'inherit',
  //           textDecoration: 'none',
  //         }}
  //       >
  //         LOGO
  //       </Typography>
  //       <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
  //         {pages.map((page) => (
  //           <Button
  //             key={page}
  //             onClick={handleCloseNavMenu}
  //             sx={{ my: 2, color: 'white', display: 'block' }}
  //           >
  //             {page}
  //           </Button>
  //         ))}
  //       </Box>

  //       <Box sx={{ flexGrow: 0 }}>
  //         <Tooltip title="Open settings">
  //           <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
  //             <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
  //           </IconButton>
  //         </Tooltip>
  //         <Menu
  //           sx={{ mt: '45px' }}
  //           id="menu-appbar"
  //           anchorEl={anchorElUser}
  //           anchorOrigin={{
  //             vertical: 'top',
  //             horizontal: 'right',
  //           }}
  //           keepMounted
  //           transformOrigin={{
  //             vertical: 'top',
  //             horizontal: 'right',
  //           }}
  //           open={Boolean(anchorElUser)}
  //           onClose={handleCloseUserMenu}
  //         >
  //           {settings.map((setting) => (
  //             <MenuItem key={setting} onClick={handleCloseUserMenu}>
  //               <Typography textAlign="center">{setting}</Typography>
  //             </MenuItem>
  //           ))}
  //         </Menu>
  //       </Box>
  //     </Toolbar>
  //   </Container>
  // </AppBar>
  
  )
}

export default Header