import { useState } from 'preact/hooks';
import { Suspense, lazy } from 'preact/compat';

import classes from './process-guider.module.scss';

// types
import ProcessArray from '../../types/process';
import SchedulingAlgorithm from '../../types/scheduling-algorithm';

// hooks
import useAlgorithm from '../../hooks/use-algorithm';

// components
import AlgorithmSelector from '../algorithm-selector';
import Fader from '../fader';
import ProcessesDisplay from '../processes-display';
import ResultDisplayer from '../result-displayer';
import ResultGallery from '../result-gallery';

const steps = ['Choose algorithm', 'Add processes', 'Results'];

const ProcessGuider = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeSlice, setTimeSlice] = useState(1);
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<SchedulingAlgorithm | null>(null);
  const [processes, setProcesses] = useState<ProcessArray>([]);
  const { process } = useAlgorithm();

  const reset = () => {
    setCurrentStep(0);
    setSelectedAlgorithm(null);
    setProcesses([]);
    setTimeSlice(1);
  };

  const stepBack = () => setCurrentStep((curr) => curr - 1);

  return (
    <section>
      <header className={classes.header}>
        <p className={classes.algorithm}>{selectedAlgorithm}</p>
        <div
          data-to-right={selectedAlgorithm !== null && true}
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
      <Fader displayed={currentStep === 0}>
        <AlgorithmSelector
          onSubmit={(v) => {
            setSelectedAlgorithm(v);
            setCurrentStep((curr) => curr + 1);
          }}
        />
      </Fader>
      <Fader displayed={currentStep === 1}>
        {selectedAlgorithm && (
          <ProcessesDisplay
            defaultTimeSlice={timeSlice}
            goBack={stepBack}
            defaultProcesses={processes}
            algorithm={selectedAlgorithm}
            onSubmit={(processes, timeSlice) => {
              setProcesses(processes);
              setTimeSlice(timeSlice);
              setCurrentStep((curr) => curr + 1);
            }}
          />
        )}
      </Fader>
      <Fader displayed={currentStep === 2}>
        {selectedAlgorithm !== null &&
          processes.length !== 0 &&
          (selectedAlgorithm !== 'all' ? (
            <ResultDisplayer
              goBack={stepBack}
              data={process({
                algorithm: selectedAlgorithm,
                processes,
                timeSlice,
              })}
              onReset={reset}
            />
          ) : (
            <ResultGallery
              goBack={stepBack}
              data={processes}
              onReset={reset}
              timeSlice={timeSlice}
            />
          ))}
      </Fader>
    </section>
  );
};

export default ProcessGuider;
