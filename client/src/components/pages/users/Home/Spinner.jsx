import React from 'react';
import '../../../../App.css'
const Spinner = () => {
  return (
    <div id="spinner" className="fixed bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full h-screen">
          <div class="typewriter">
        <div class="slide"><i></i></div>
        <div class="paper"></div>
        <div class="keyboard"></div>
    </div>
    </div>
  );
};

export default Spinner;
