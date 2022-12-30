import {Navigate } from 'react-router-dom'
import Home from '../../features/content/home'
import Login from '../content/auth/login'
import Join from '../content/auth/join'
import Activation from '../content/auth/activation'
import Recovery from '../content/auth/recovery'
import Reset from '../content/auth/reset'
import Profile from '../../features/content/user/profile'
import Error from '../../features/content/error'
import {Dashboard} from '../layouts'
import {Midcontainer} from '../containers'
import LoginIcon from '@mui/icons-material/Login';
import HouseIcon from '@mui/icons-material/House';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';

//menutype: 
// 0: none (not dispolayed on menu)
// 1: logout & logged (logged out remains after login)
// 2: not logged (removed after login)
// 3: logged (displayed after login)
// 4: admin (displayed only for admin role)

const Siteroutes = 
[
    {
        "title": "Home",
        "menu": "Home",
        "icon": <HouseIcon />,
        "menutype" :1,
        "path": "/",
        "content" : <Dashboard 
                        content={<Midcontainer content={<Home />}/>} 
                        title="Home"
                    />
    },
    {
        "title": "Test",
        "menu": "Test",
        "icon": <PeopleIcon />,
        "menutype" :1,
        "path": "/test",
        "content" : <Dashboard 
                        content={<Midcontainer content={<Home />} />} 
                        title={"Test"} 
                    />
    },
    {
        "title": "Login",
        "menu": "Login",
        "icon": <LoginIcon />,
        "menutype" :2,
        "path": "/auth/login",
        "content" : <Dashboard 
                        content={<Midcontainer content={<Login />} />} 
                        title={"Login"} 
                    />
    },
    {
        "title": "Join",
        "menu": "",
        "icon": "",
        "menutype" :0,
        "path": "/auth/join",
        "content" : <Dashboard 
                        content={<Midcontainer content={<Join />} />} 
                        title={"Join"} 
                    />
    },
    {
        "title": "Activation",
        "menu": "",
        "icon": "",
        "menutype" :0,
        "path": "/auth/activation/:id",
        "content" : <Dashboard 
                        content={<Midcontainer content={<Activation />} />}
                        title={"Activate"} 
                    />,
    },
    {
        "title": "Activation",
        "menu": "",
        "icon": "",
        "menutype" :0,
        "path": "/auth/activation/:id/:code",
        "content" : <Dashboard 
                        content={<Midcontainer content={<Activation />} />}
                        title={"Activate"}
                    />
    },
    {
        "title": "Recovery",
        "menu": "",
        "icon": "",
        "menutype" :0,
        "path": "/auth/recovery",
        "content" : <Dashboard 
                        content={<Midcontainer content={<Recovery />} />}
                        title={"ReRecovery"}
                    />
    },
    {
        "title": "Reset",
        "menu": "",
        "icon": "",
        "menutype" :0,
        "path": "/auth/reset/:id",
        "content" : <Dashboard 
                        content={<Midcontainer content={<Reset />} />}
                        title={"Reset"}
                    />
    },
    {
        "title": "Reset",
        "menu": "",
        "icon": "",
        "menutype" :0,
        "path": "/auth/reset/:id/:code",
        "content" : <Dashboard 
                        content={<Midcontainer content={<Reset />} />}
                        title={"Reset"}
                    />,
    },
    {
        "title": "Profile",
        "menu": "",
        "icon": "",
        "menutype" :0,
        "path": "/user/profile",
        "content" : <Dashboard 
                        content={<Midcontainer content={<Profile />} />}
                        title={"Profile"} 
                    />
    },
    {
        "title": "Unauthorized",
        "menu": "",
        "icon": "",
        "menutype" :0,
        "path": "/error/unauthorized",
        "content" : <Dashboard 
                        content={<Midcontainer content={<Error status={401} message="Unauthorized request" />} />}
                        title={"Error"}/>
    },
    {
        "title": "Notfound",
        "menu": "",
        "icon": "",
        "menutype" :0,
        "path": "/error/notfound",
        "content" : <Dashboard 
                        content={<Midcontainer content={<Error status={404} message="Page not found" />} />}
                        title={"Not Found"}/>
    },
    {
        "title": "Other",
        "menu": "",
        "icon": "",
        "menutype" :0,
        "path": "*",
        "content" : <Navigate to="/error/notfound" replace />,
    },
    {
        "title": "Demo",
        "menu": "Demo",
        "icon": <BarChartIcon />,
        "menutype" :3,
        "path": "/demo",
        "content" : <Dashboard 
                        content={<Midcontainer content="Demo" />}
                        title={"Demo"}/>
    },
    {
        "title": "Users",
        "menu": "Users",
        "icon": <PeopleIcon />,
        "menutype" :4,
        "path": "/users",
        "content" : <Dashboard 
                        content={<Midcontainer content="Users" />}
                        title={"Users"}/>
    },

]
export default Siteroutes