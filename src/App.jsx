import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Content from './components/layout/Content';
import Header from './components/layout/Header';
import ProductState from './context/products/productState';
import './assets/css/style.css';
import authToken from './config/authToken';
import AuthState from './context/auth/authState';

//Check if we have a token
const token = localStorage.getItem('token');
if(token){
  authToken(token);
}

const App = () => { 
  return (
    <AuthState>
      <ProductState>
        <Router>
          <Header />
          <Content />
        </Router>
      </ProductState> 
    </AuthState>
    
   );
}
 
export default App;