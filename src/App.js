import {HashRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import HomePage from "./scenes/homePage/HomePage";
import ProfilePage from "./scenes/profilePage/ProfilePage";
import LoginPage from "./scenes/loginPage/LoginPage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {CssBaseline, ThemeProvider} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { Toaster } from 'react-hot-toast'


function App() {
  const mode = useSelector((state)=>state.mode);
  const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode]);

  const isAuth = Boolean(useSelector((state)=>state.token));

  return (
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}>
        <CssBaseline/>
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/home" element={isAuth ? <HomePage/> : <Navigate to="/" />} />
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage/> : <Navigate to="/" />} />
          </Routes>
        </ThemeProvider>
        <Toaster/>
      </Router>
    </div>
  );
}

export default App;
