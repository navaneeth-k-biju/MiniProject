import './App.css';
import CustomAppbar from './components/Appbar';
import { ThemeProvider } from '@mui/material/styles';
import MyTheme from './components/MyTheme';
import { useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import IconButton from '@mui/material/IconButton';
import Login from './pages/Login';
import SocketContext, { SocketProvider } from './components/socketClient';
import { Close } from '@mui/icons-material';
import { Navigate, BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import UserProvider from './components/useProvider';
import DashBoard from './pages/DashBoard';
import { Outlet } from 'react-router-dom';
import ProfilePage from './pages/Profile';
import ContactForm from './pages/Contact';
import AboutPage from './pages/About';
import LauncherPage from './pages/Index';
import Signup from './pages/Signup';
import { Notification } from './pages/Notification';
import { CreateMember } from './pages/createMember';

function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [credential, setCredentail] = useState({});
  const handleCredential = (credential) => {
    setCredentail(credential);
    setIsLogin(!isLogin);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const message = 'Connection Establish.';

  const [isLogin, setIsLogin] = useState(false);

  return (
    <ThemeProvider theme={MyTheme}>
      <UserProvider>
        <SocketProvider>
        <div className='App'>
          <Router>
            <Routes>
              <Route index path='/login' element={<Login  handleCredential={handleCredential} />} />
              <Route path='/profile' element={<ProfilePage/>}/>
              <Route path='' element={<LauncherPage login/>}/>
              <Route path='/addMember' element={<CreateMember/>}/>
              <Route path='signup' element={<Signup/>}/>
              <Route path='/' element={<div className='mainPage'>
                <CustomAppbar/>
                <Outlet />
              </div>} >
                
                <Route path="home" element={<Home setIsLogin={setIsLogin}/>} />  
                <Route path="dashboard" element={<DashBoard />} />  {/* Nested route for dashboard */}
                <Route path='about' element={<AboutPage/>}/>  {/* Nested route for about */}
                <Route path='contact' element={<ContactForm/>} /> 
                <Route path='notification' element={<Notification/>}/>
              </Route>
            </Routes>
          </Router>
        </div>
        {open ? (
          <div>
            <Snackbar
              open={open}
              autoHideDuration={6000} 
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} 
            >
              <SnackbarContent message={message} action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
                  <Close />
                </IconButton>
              ]} />
            </Snackbar>
          </div>
        ) : null}
        </SocketProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
