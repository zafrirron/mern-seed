import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

// Logout options displayed when not logged
const LogoutOptions = 
[
    {
        "title" : "Login", 
        "address" : "/auth/login"
    },
    {
        "title": "Join", 
        "address" : "/auth/join"
    }
]

//User menu dispkayed when user logged in (Logout automatically added)
const UserMenu = 
[
    {
        "title" : "Profile", 
        "address" : "/user/profile",
        "icon" : <AccountBoxIcon/>
    },
    {
        "title": "Account",
        "address" : "/user/account",
        "icon" : <ManageAccountsIcon/>
    }
]

export {LogoutOptions, UserMenu}
