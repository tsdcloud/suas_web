import React, {useContext, useState, useEffect} from 'react';
import './App.css';
import LoginPage from './Pages/LoginPage';
import LoggedOutLayout from './layouts/LoggedOut';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import SignupPage from './Pages/Signup';
import ForgotPasswordPage from './Pages/ForgotPassword';
import AuthContext, { AuthProvider } from "./Context/AuthContext";
import Categories from './Pages/Categories/Categories';
import Evenements from './Pages/Evenements/Evenements';
import Atelier from './Pages/Ateliers/Ateliers';
import FicheAtelier from './Pages/FicheAtelier/FicheAtelier';
import SalleAttente from './Pages/SalleAttente/SalleAttente';
import InscriptionParticipant from './Pages/IncriptionParticipant/IncriptionParticipant';
import BadgeGenerator from './Components/BadgeGenerator/BadgeGenerator';

const App=()=>
{
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setIsLoggedIn(true);
    }
    else{
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <Router>
          {
            isLoggedIn ?(
              <Routes>
                <Route exact path='*' element={<Categories />}/>
                <Route exact path='/' element={<Categories />}/>
                
                <Route exact path='/events' element={<Evenements />}/>
                <Route exact path="/events/:id" element={<Evenements />}/>

                <Route exact path='/events/ateliers' element={<Atelier />}/>
                <Route exact path='/events/ateliers/:id' element={<Atelier />}/>

                <Route exact path='/fiche-atelier/' element={<FicheAtelier />}/>
                <Route exact path='/fiche-atelier/:id' element={<FicheAtelier />}/>

                <Route exact path='/room/:id' element={<SalleAttente />}/>
                <Route exact path='/inscription/' element={<InscriptionParticipant />}/>
                <Route exact path='/view-badge/:id' element={<BadgeGenerator />}/>
                
              </Routes>
            ):
            (
              <LoggedOutLayout>
                <Routes>
                  <Route exact path='*' element={<LoginPage />}/>
                  <Route exact path='/' element={<LoginPage />}/>
                  <Route exact path='/sign-up' element={<SignupPage />}/>
                  <Route exact path='/forgot-password' element={<ForgotPasswordPage />}/>
                </Routes>
              </LoggedOutLayout>
            )
          }
    </Router>
  );
}

export default App;
