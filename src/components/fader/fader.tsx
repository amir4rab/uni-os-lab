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
  const [elWidth, setElWidth] = useState<number>(0);
  const elRef = useRef<HTMLDivElement | null>(null);

  // sets visual state of the element upon displaying or removal
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

  // sets element visual status to be used in animation
  useLayoutEffect(() => {
    if (elRef.current && displayed && state) {
      setElWidth(elRef.current.getBoundingClientRect().width);
    }
  }, [displayed, state]);

  return (
    <>
      {state && (
        <div
          ref={elRef}
          className={classes.fader}
          data-displayed={displayed}
          style={!displayed ? `width: ${elWidth}px;` : ''}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default Fader;
