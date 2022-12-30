import * as React from 'react';
import { Link } from "react-router-dom"
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import { useSelector } from 'react-redux'
import { RootState } from '../../core/store/store'
import Siteroutes from '../../features/config'

const Menuitems = () => {
  const  { user }  = useSelector((state: RootState) => state.auth)
  function ismenu(element:any, index:any, array:Object)
  { 
    return element.menutype !== 0 ;
  } 
  function isnotlogged(element:any, index:any, array:Object)
  { 
    return (element.menutype === 1 || element.menutype === 2);
  } 
  function islogged(element:any, index:any, array:Object)
  { 
    return (element.menutype === 1 || element.menutype === 3 );
  } 
  function isadmin(element:any, index:any, array:Object)
  { 
    return element.menutype === 4;
  } 
  const menuitems = Siteroutes.filter(ismenu)
  var Menu
  let Adminmenu = <></>
  if (!user.email) {
    Menu =
      <React.Fragment>
      {menuitems.filter(isnotlogged).map((item,index) => (
      <ListItemButton component={Link} to={item.path} key={index.toString()}>
        <ListItemIcon>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.title}/>
      </ListItemButton>
    ))}
    </React.Fragment> 
  } else {
    Menu = 
      <React.Fragment>
      {menuitems.filter(islogged).map((item,index) => (
      <ListItemButton component={Link} to={item.path} key={index.toString()}>
        <ListItemIcon >
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.title} />
      </ListItemButton>
    ))}
    </React.Fragment>
    if (user.role === "admin") {
      Adminmenu = 
        <React.Fragment>
          <Divider sx={{ my: 1 }} />
          <ListSubheader component="div" inset>
            Admin Actions
          </ListSubheader>
          {menuitems.filter(isadmin).map((item,index) => (
            <ListItemButton  component={Link} to={item.path} key={index.toString()}>
              <ListItemIcon >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
        ))}
        </React.Fragment>
    }
  }
  return (
    <>
      {Menu}
      {Adminmenu}
    </>
  )
}
export default Menuitems