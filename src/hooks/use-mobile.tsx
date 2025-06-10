
import * as React from "react"

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export function useResponsive() {
  const [windowSize, setWindowSize] = React.useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  React.useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures this effect only runs on mount and unmount

  return {
    isMobile: windowSize.width !== undefined ? windowSize.width < MOBILE_BREAKPOINT : false,
    isTablet: windowSize.width !== undefined ? windowSize.width >= MOBILE_BREAKPOINT && windowSize.width < TABLET_BREAKPOINT : false,
    isDesktop: windowSize.width !== undefined ? windowSize.width >= TABLET_BREAKPOINT : true,
    isSmallMobile: windowSize.width !== undefined ? windowSize.width < 480 : false,
    width: windowSize.width,
    height: windowSize.height,
  };
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useIsSmallMobile() {
  const [isSmallMobile, setIsSmallMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: 479px)`)
    const onChange = () => {
      setIsSmallMobile(window.innerWidth < 480)
    }
    mql.addEventListener("change", onChange)
    setIsSmallMobile(window.innerWidth < 480)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isSmallMobile
}
