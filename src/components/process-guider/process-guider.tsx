import { useState } from 'preact/hooks';
import SchedulingAlgorithm from '../../types/scheduling-algorithm';
import AlgorithmSelector from '../algorithm-selector';
import ProcessesDisplay from '../processes-display';
import classes from './process-guider.module.scss';

const steps = ['Choose algorithm', 'Add processes', 'Calculating', 'Results'];

const ProcessGuider = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<SchedulingAlgorithm | null>(null);

  return (
    <section>
      <div className={classes.progressWrapper}>
        {steps.map((_, i) => (
          <div
            key={i}
            className={classes.dot}
            data-active={i <= currentStep ? true : null}
          ></div>
        ))}
      </div>
      {currentStep === 0 && (
        <AlgorithmSelector
          onSubmit={(v) => {
            setSelectedAlgorithm(v);
            setCurrentStep((curr) => curr + 1);
          }}
        />
      )}
      {currentStep === 1 && <ProcessesDisplay />}
    </section>
  );
};

export default ProcessGuider;
