import React from 'react';

const PreLoader = () => {
  return (
    <div id="preloader" className="flex justify-center items-center h-[70vh] overflow-hidden bg-transparent transition-all duration-[0.6s] ease-out">
      <div className=" border-[6px] border-t-blue-600 border-r-transparent border-b-blue-600 border-l-transparent rounded-full w-[60px] h-[60px] animate-spin"></div>
    </div>   
  );
};

export default PreLoader;
