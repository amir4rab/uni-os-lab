// preact
import { useState } from 'preact/hooks';
import { Suspense, lazy } from 'preact/compat';

// Sass classes
import classes from './process-guider.module.scss';

import SchedulingAlgorithm from '../../types/scheduling-algorithm';

// Components
// import Loading from '../loading';
import LoadingIndicator from '../loading-indicator';

// Dynamic components
const Inner = lazy(() => import('./inner'));

const steps = ['Choose algorithm', 'Add processes', 'Results'];

const ProcessGuider = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<
    SchedulingAlgorithm[]
  >([]);

  return (
    <section>
      <header className={classes.header}>
        <p className={classes.algorithm}>
          {selectedAlgorithms.length !== 0 &&
            (selectedAlgorithms.length === 1
              ? selectedAlgorithms
              : `${selectedAlgorithms.length} algorithms`)}
        </p>
        <div
          data-to-right={selectedAlgorithms.length !== 0 && true}
          className={classes.progressWrapper}
        >
          {steps.map((_, i) => (
            <div
              key={i}
              className={classes.dot}
              data-active={i <= currentStep ? true : null}
            ></div>
          ))}
        </div>
      </header>
      <Suspense fallback={<LoadingIndicator animate={true} />}>
        <Inner
          selectedAlgorithms={selectedAlgorithms}
          setSelectedAlgorithms={setSelectedAlgorithms}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </Suspense>
    </section>
  );
};

export default ProcessGuider;
