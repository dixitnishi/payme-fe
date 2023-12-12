import React from 'react'
import Sidepanel from './Leftpanel';
import Rightpanel from './Rightpanel';
import Dashboard from '../Dashboard/Dashboard';

function Layout() {
  return (
    <div className='flex bg-gray-200 resize p-5 h-screen'>
        <Sidepanel/>
        <Rightpanel/>
        {/* The content side to the side pannel will be dynamic based the options selected in the side panel */}
    </div>
  );
}

export default Layout;