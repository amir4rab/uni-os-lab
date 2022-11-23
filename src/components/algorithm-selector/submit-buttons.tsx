import { useState } from 'preact/hooks';
import { createPortal } from 'preact/compat';

// styles
import classes from './algorithm-selector.module.scss';


interface Props {
  submit: () => void; 
  customMode?: () => void, 
  title: string
}

const AlgorithmSelectorSubmitButtons = (
  { submit, customMode, title }:Props
) => {
  const [ clicked, setClicked ] = useState(false);
  const el = document.getElementById('bottom-buttons-portal');

  return (
    createPortal(
      <div data-displayed={!clicked} className={classes.mobileActionsWrapper}>
        <button
          onClick={() => { submit(); setClicked(true); }}
          className={["primary", classes.mainButton].join(' ')}
        >
          { title }
        </button>
        {
          customMode &&
          <button
            onClick={customMode}
            className={classes.customButton}
          >
            Custom
          </button>
        }
      </div>,
      el as HTMLElement
    )
  )
};

export default AlgorithmSelectorSubmitButtons;