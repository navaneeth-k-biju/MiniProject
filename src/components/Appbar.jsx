import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Tab, Tabs } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Search } from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import pageContext from './useContext';
import { useNavigate } from 'react-router-dom';
import './Appbar.css'
import { useState } from 'react';
import { useContext } from 'react';
function CustomAppbar() {   
    const tabs = [
        { label: 'DashBoard', content: <p>Content for Tab 1</p> },
        { label: 'Home', content: <p>Content for Tab 2</p> },
        { label: 'About', content: <p>Content for Tab 3</p> },
        { label: 'Notification', content: <p>Content for Tab 4</p> },
        { label: 'Contact', content: <p>Content for Tab 5</p> },
        
    ];
    const navigate=useNavigate()
    const {updatePage}=useContext(pageContext)
    const [selectedTab, setSelectedTab] = useState(1)
    const handleChange = (event, newIndex) => {
        setSelectedTab(newIndex);
        updatePage(tabs[newIndex].label)
        if(tabs[newIndex].label==='Home'){
            navigate('home')
        }else if(tabs[newIndex].label==='DashBoard'){
            navigate("/dashboard")
        }else if(tabs[newIndex].label==='About'){
            navigate('/about')
        }else if(tabs[newIndex].label==='Contact'){
            navigate('/contact')
        }else if(tabs[newIndex].label==='Notification'){
            navigate('/notification')
        }
        console.log(tabs[newIndex].label)
    };
    const [anchorEl, setAnchorEl] = useState(null); // State for menu anchor

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleProfile=()=>{
        navigate("/profile")
    }
    
    return (
        <div className='appbar'>
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant='p' noWrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
                        Ration 
                    </Typography>
                    <Tabs value={selectedTab}  onChange={handleChange}>
                        {tabs.map((tab) => (
                            <Tab key={tab.label} label={tab.label} content={tab.label} />
                        ))}
                    </Tabs>
                    <div sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                        color="inherit"
                        onClick={handleProfile}
                        aria-label="Account">
                            <AccountCircleIcon />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            aria-label="more options"
                            aria-haspopup="true"
                            onClick={handleMenuOpen}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>

        </div>
    );
}
export default CustomAppbar