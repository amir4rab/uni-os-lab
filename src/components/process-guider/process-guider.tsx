import { useState } from 'preact/hooks';
import useAlgorithm from '../../hooks/use-algorithm';
import ProcessArray from '../../types/process';
import SchedulingAlgorithm from '../../types/scheduling-algorithm';
import AlgorithmSelector from '../algorithm-selector';
import Fader from '../fader';
import LoadingEmulator from '../loading-emulator';
import ProcessesDisplay from '../processes-display';
import ResultDisplayer from '../result-displayer';
import classes from './process-guider.module.scss';

const steps = ['Choose algorithm', 'Add processes', 'Calculating', 'Results'];

const ProcessGuider = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<SchedulingAlgorithm | null>(null);
  const [processes, setProcesses] = useState<ProcessArray>([]);
  const { process } = useAlgorithm();

  const reset = () => {
    setCurrentStep(0);
    setSelectedAlgorithm(null);
    setProcesses([]);
  };

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
        <ProcessesDisplay
          algorithm={selectedAlgorithm ? selectedAlgorithm : 'fcfs'}
          onSubmit={(v) => {
            setProcesses(v);
            setCurrentStep((curr) => curr + 1);
          }}
        />
      </Fader>
      <Fader displayed={currentStep === 2}>
        <LoadingEmulator onComplete={() => setCurrentStep(3)} />
      </Fader>
      <Fader displayed={currentStep === 3}>
        {selectedAlgorithm !== null && processes.length !== 0 && (
          <ResultDisplayer
            data={process({ algorithm: selectedAlgorithm, processes })}
            onReset={reset}
          />
        )}
      </Fader>
    </section>
  );
};

export default ProcessGuider;
