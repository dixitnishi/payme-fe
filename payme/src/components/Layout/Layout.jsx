import React, { useState } from 'react'
import Leftpanel from './Leftpanel';
import Rightpanel from './Rightpanel';

function Layout() {
  const [selectedButton, setSelectedButton] = useState('dashboard');

  const handleSelectButton = (buttonType) => {
    setSelectedButton(buttonType);
  };

  return (
    <div className='flex bg-gray-200 resize p-5 h-screen'>
        <Leftpanel onSelectButton={handleSelectButton}/>
        <Rightpanel selectedButton={selectedButton}/>
        {/* The content side to the side pannel will be dynamic based the options selected in the side panel */}
    </div>
  );
}

export default Layout;