// import { useEffect, useState, useRef } from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Countries from './pages/Countries';
import Edit from './pages/Edit';
import HomePage from './pages/Home';
import NavigationBar from './components/NavigationBar';

function App() {

return (
  <div className = "App">
    <NavigationBar />

  <div>
    <b>Countries</b>
  </div>

    <Routes>
    <Route path="" element={<HomePage />} />
    <Route path="countries" element={<Countries />} />
    <Route path="/edit/:id" element={<Edit />} />
    </Routes>

    </div>
  );
}

export default App;
