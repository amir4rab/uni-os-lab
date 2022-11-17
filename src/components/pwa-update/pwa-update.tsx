import classes from './pwa-update.module.scss';

// hooks
import { useRegisterSW } from 'virtual:pwa-register/preact';

// components
import Dialog from '../dialog';

// data
import { version } from '../../../package.json';
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
    <Dialog state={needRefresh} setState={close} title='New update available'>
      <div className={classes.pwaUpdate}>
        <p className={classes.title}>
          <span>{`New version of web application is available. `}</span>
          <span>{`click on update to upgrade to version `}</span>
          <code>{`"${version}"`}</code>
          <span>{`.`}</span>
        </p>
        <div className={classes.actions}>
          <button 
            className="secondary"
            style="margin-right:.5rem;"
            onClick={() => close()}
          >
            Close
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
