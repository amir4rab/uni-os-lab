import classes from './pwa-update.module.scss';

// hooks
import { useRegisterSW } from 'virtual:pwa-register/preact';

// components
import Dialog from '../dialog';

// data
import { version } from '../../../package.json';
import { useEffect, useState } from 'preact/hooks';
version as string;

function ReloadPrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      // eslint-disable-next-line prefer-template
      console.log('SW Registered: ' + r)
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    },
  });

  const close = () => {
    setNeedRefresh(false)
  }

  return (
    <Dialog 
      state={needRefresh} 
      setState={close} 
      title='New update'
      disableAnimations={true}
      className={classes.dialog}
    >
      <div className={classes.pwaUpdate}>
        <p className={classes.title}>
          <span>{`New version of web application is available.`}</span>
        </p>
        <div className={classes.actions}>
          <button 
            className="secondary"
            style="margin-right:.5rem;"
            onClick={close}
          >
            Ignore
          </button>
          <button 
            className="primary" 
            onClick={() => updateServiceWorker(true)}
          >
            Update
          </button>
        </div>
      </div>
    </Dialog>
  )
}

export default ReloadPrompt
