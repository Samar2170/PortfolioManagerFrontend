import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './components/Login/Login';
import useToken from './useToken';
import SideNav from './components/Base/SideNav';
import Dashboard from './components/Dashboard';
import Preferences from './components/Preferences';
import RegisterAll from './components/Register/RegisterAll';
import RegisterAllTrades from './components/RegisterTrades/RegisterTrades';
import StockHoldings from './components/Holdings/Stocks';
function App() {
  const { token, setToken} = useToken();
  if (!token) {
    return <Login setToken={setToken} />
  } else if (token === undefined) {
    return <Login setToken={setToken} />
  } 

  return (
    <div className='grid grid-cols-6 gap-2'>
      
      <div className='col-span-1'>
        <SideNav />
        </div>
      <div className='col-span-5'>
        <h1 className='text-3xl font-bold underline'>Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<Dashboard/>} exact/>
          <Route path='/preferences' element={<Preferences/>} exact/>
          <Route path='/register' element={<RegisterAll/>} exact/>
          <Route path='/register-trades' element={<RegisterAllTrades />} exact/>
          <Route path='/stock-holdings'  element={<StockHoldings view="stock"/>} exact/>
          <Route path='/mf-holdings'  element={<StockHoldings view="mf"/>} exact/>
        </Routes>
      </BrowserRouter>
      </div>

    </div>
);
}

export default App;