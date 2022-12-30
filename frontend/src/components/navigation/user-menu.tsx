//import './navigation.scss'
import * as React from 'react';
import homeSlice from '../../features/content/home/home.slice'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../core/store/store'
import { useAppDispatch } from '../../core/hooks/useStore'
import { authSlice } from '../../features/content/auth/auth'
import { toast } from 'react-toastify'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Box from '@mui/material/Box'
import LogoutIcon from '@mui/icons-material/Logout'
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import {LogoutOptions, UserMenu} from '../../features/config/'

const Usermenu = () => {

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useAppDispatch()
  const { apiUrl, theme } = useSelector((state: RootState) => state.home)
  const { user } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()

  const switchTheme = () => {
    dispatch(homeSlice.actions.switchTheme())
    handleCloseUserMenu()
  }

  const onLogout = async () => {
    handleCloseUserMenu()
    try {
      const response = await axios.get(`${apiUrl}/auth/local/logout`)
      if (response.data?.success) {
        dispatch(authSlice.actions.setUser(false))
        toast.success('Logged out successfully!')
      } else {
        dispatch(authSlice.actions.setUser(false))
        toast.warn('Logout failed!')
      }
    } catch (err) {
      console.warn(err)
    }
    navigate('/')
  }
  
  return (
    <>
      {user.email ? (
         <> 
          <Tooltip title="Open settings">
            <IconButton 
              onClick={handleOpenUserMenu} 
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            id="menu-appbar"
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
              {UserMenu.map((user,index) => (
              <MenuItem key={user.title} onClick={handleCloseUserMenu} component={Link} to={user.address}>
                <ListItemIcon key={"useri-"+index}>
                  {user.icon}
                </ListItemIcon>
                <ListItemText primary={user.title} key={"usert-"+index}/>
              </MenuItem>
            ))}
              <MenuItem onClick={ () => {onLogout()}} key="logoutm">
                <ListItemIcon key="logouti">
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" key="logoutt"/>
              </MenuItem>

          </Menu>
         </>
      ) : (
        <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex' } }}>
          {LogoutOptions.map((page,index) => (
            <MenuItem key={"page-"+index} component={Link} to={page.address} >
              <Typography textAlign="center">{page.title}</Typography>
            </MenuItem>
          ))}
        </Box>
      )}
      {theme === 'light' ? (
          <MenuItem onClick={switchTheme} >
            <ListItemIcon key="theml">
              <DarkModeIcon />
            </ListItemIcon>
          </MenuItem>
        ) : (
          <MenuItem onClick={switchTheme} >
            <ListItemIcon key="themd">
              <LightModeIcon />
            </ListItemIcon>
          </MenuItem>
        )
      }
    </>
  );
}

export default Usermenu
