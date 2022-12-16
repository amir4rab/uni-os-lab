import { useTranslation } from '../../i18n';
import classes from './header.module.scss';

const MobileHeader = () => {
  const { t } = useTranslation('common');
  return (
    <div className={classes.header}>
      <h1 className={classes.title}>
        { t('title') }
      </h1>
    </div>
  );
};

export default MobileHeader;