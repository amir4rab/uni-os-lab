import { useCallback, useEffect, useRef, useState } from "preact/hooks";

interface Props {
  minimized: boolean;
  mobileOnly?: boolean;
}

const useMinimizeBody = ({ minimized, mobileOnly= false }: Props) => {
  const [ isMobile, setIsMobile ] = useState(false);

  const checkDisplayWidth = useCallback(() => {
    const isMobile = window.matchMedia('(max-width: 1100px)').matches;
    setIsMobile(isMobile);
  }, [])

  useEffect(() => {
    checkDisplayWidth();
    window.addEventListener('resize', checkDisplayWidth);

    return () => {
      window.removeEventListener('resize', checkDisplayWidth);
    }
  }, []);

  useEffect(() => {
    if ( typeof window === 'undefined' ) return;

    const body = document.getElementsByTagName('body')[0] as undefined | HTMLElement;
    const html = document.getElementsByTagName('html')[0] as undefined | HTMLElement;
    
    if ( typeof body === 'undefined' || typeof html === 'undefined' ) return;

    if ( mobileOnly && !isMobile ) {
      body.style.transform = '';
      body.style.transition = '';
      body.style.top = '';
      body.style.borderRadius = '';
      body.style.overflow = '';
      html.style.background = '';

      return;
    }

    if ( !minimized ) {
      body.style.transform = 'scale(1)';
      body.style.transition = 'transform .15s ease-in-out, border-radius .15s ease-in-out';
      body.style.borderRadius = '0';
      body.style.overflow = '';
      html.style.background = '#000';
      
    } else {
      body.style.transform = 'scale(.93)';
      body.style.transition = 'transform .15s ease-in-out, border-radius .15s ease-in-out';
      body.style.borderRadius = '.6rem';
      body.style.overflow = 'hidden';
      html.style.background = '#000';
    }

    // cleanup
    return () => {
      const body = document.getElementsByTagName('body')[0] as undefined | HTMLElement;
      const html = document.getElementsByTagName('html')[0] as undefined | HTMLElement;
      if ( typeof body === 'undefined' || typeof html === 'undefined' ) return;
    
      body.style.transform = '';
      body.style.transition = '';
      body.style.top = '';
      body.style.borderRadius = '';
      body.style.overflow = '';
      html.style.background = '';
    }
  }, [ minimized, mobileOnly, isMobile ]);
};

export default useMinimizeBody;