import { ComponentChildren } from 'preact';
import { useEffect, useLayoutEffect, useRef, useState } from 'preact/hooks';
import classes from './fader.module.scss';

interface Props {
  displayed: boolean;
  children: ComponentChildren;
}

/** Adds fade animation to components */
const Fader = ({ children, displayed }: Props) => {
  const [state, setState] = useState(displayed);
  const [clientRect, setClientRect] = useState<{
    left: number;
    top: number;
    width: number;
  } | null>(null);
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let unmountingTimeout: number;

    if (displayed) {
      setState(true);
    } else {
      unmountingTimeout = setTimeout(() => setState(false), 300);
    }

    return () => {
      unmountingTimeout && clearTimeout(unmountingTimeout);
    };
  }, [displayed]);

  useLayoutEffect(() => {
    if (elRef.current && displayed && state) {
      const rect = elRef.current.getBoundingClientRect();

      console.log(rect);

      setClientRect({
        left: rect.x,
        top: rect.y,
        width: rect.width,
      });
    }
  }, [displayed, state]);

  return (
    <>
      {state && (
        <div
          ref={elRef}
          className={classes.fader}
          data-displayed={displayed}
          style={!displayed ? `width: ${clientRect?.width}px;` : ''}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default Fader;
