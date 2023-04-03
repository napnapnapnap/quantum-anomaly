import { useEffect, useState } from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width: undefined | number;
    height: undefined | number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isXL: boolean;
  }>({
    width: undefined,
    height: undefined,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isXL: false,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth <= 576,
        isTablet: window.innerWidth > 576 && window.innerWidth <= 768,
        isDesktop: window.innerWidth > 768 && window.innerWidth <= 992,
        isXL: window.innerWidth > 1200,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
}

export default useWindowSize;
