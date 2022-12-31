import React from 'react'
import Navbar1 from '../components/navbar/Navbar1';
import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <div>
      <Navbar1 />
      <Outlet />
    </div>
  )
}

export default RootLayout;


