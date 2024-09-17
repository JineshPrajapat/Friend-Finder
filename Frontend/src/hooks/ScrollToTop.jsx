import React, { useState, useEffect } from 'react';
import { MdKeyboardDoubleArrowUp } from 'react-icons/md';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    isVisible && (
      <a
        href="#"
        id="scroll-top"
        className="fixed right-4 bottom-4 z-50 bg-blue-600 w-11 h-11 rounded-full flex items-center justify-center opacity-100 transition-all duration-400 hover:bg-blue-700"
        onClick={(e) => {
          e.preventDefault();
          scrollToTop();
        }}
      >
        <MdKeyboardDoubleArrowUp className="text-2xl text-white" />
      </a>
    )
  );
};

export default ScrollToTop;
