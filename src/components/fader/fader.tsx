import {
  StateUpdater,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'preact/hooks';
import { createContext } from 'preact';

// types
import type { ComponentChildren } from 'preact';

// stylings
import classes from './fader.module.scss';

const FaderContext = createContext<{
  height: number;
  setHeight: StateUpdater<number>;
  resizeObserver: ResizeObserver | undefined;
}>({ height: 0, setHeight: () => {}, resizeObserver: undefined });

interface Props {
  displayed: boolean;
  children: ComponentChildren;
  id: string;
}

/** Adds fade animation to components */
const Child = ({ children, displayed, id }: Props) => {
  const [state, setState] = useState(displayed);
  const [elWidth, setElWidth] = useState<number>(0);
  const elRef = useRef<HTMLDivElement | null>(null);
  const { resizeObserver } = useContext(FaderContext);

  // sets visual state of the element upon displaying or removal
  useEffect(() => {
    let unmountingTimeout: undefined | number;

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
      const { width } = elRef.current.getBoundingClientRect();
      setElWidth(width);
      resizeObserver?.observe(elRef.current);
    } else {
      elRef.current && resizeObserver?.unobserve(elRef.current);
    }
  }, [displayed, state]);

  return (
    <>
      {state && (
        <div
          key={id}
          ref={elRef}
          className={classes.child}
          data-displayed={displayed}
          style={!displayed ? `width: ${elWidth}px;` : ''}
        >
          {children}
        </div>
      )}
    </>
  );
};

// Wraps fader children
const Fader = ({ children }: { children: ComponentChildren }) => {
  const [height, setHeight] = useState(0);
  const resizeObserver = new ResizeObserver((elements) => {
    elements.map((el) => {
      const { height } = el.contentRect;
      height !== 0 && setHeight(height);
    });
  });

  return (
    <FaderContext.Provider value={{ height, setHeight, resizeObserver }}>
      <div style={`height:${height}px;`} className={classes.fader}>
        {children}
      </div>
    </FaderContext.Provider>
  );
};

Fader.Child = Child;

export default Fader;
