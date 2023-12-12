import React from 'react'
import Sidepanel from './Sidepanel';
import Dashboard from '../Dashboard/Dashboard';
import Transaction from '../Transaction/Transaction';

function Layout() {
  return (
    <div className='flex bg-gray-200 resize shadow-lg p-5 h-screen rounded-lg'>
        <Sidepanel/>
        {/* The content side to the side pannel will be dynamic based the options selected in the side panel */}
        <Dashboard/>
    </div>
  );
}

export default Layout