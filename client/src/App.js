import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//!React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//!Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

//!Components
import Layout from './components/Layout';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route index path='/' element={<Dashboard />} />
            <Route exact path='dashboard' element={<Dashboard />} />
            <Route exact path='login' element={<Login />} />
            <Route exact path='register' element={<Register />} />
            <Route exact path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
