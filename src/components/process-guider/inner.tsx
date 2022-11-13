// preact
import { StateUpdater, useState } from 'preact/hooks';

// Types
import ProcessArray from '../../types/process';
import SchedulingAlgorithm from '../../types/scheduling-algorithm';

// components
import AlgorithmSelector from '../algorithm-selector';
import Fader from '../fader';
import ResultGallery from '../result-gallery';
import ProcessesDisplay from '../processes-display';

// interface 
interface Props {
  selectedAlgorithms: SchedulingAlgorithm[];
  setSelectedAlgorithms: StateUpdater<SchedulingAlgorithm[]>;
  setCurrentStep: StateUpdater<number>;
  currentStep: number;
}

const Inner = ({selectedAlgorithms, setSelectedAlgorithms, setCurrentStep, currentStep}: Props) => {
  const [timeSlice, setTimeSlice] = useState(1);
  const [processes, setProcesses] = useState<ProcessArray>([]);

  /** Resets inputs */
  const reset = () => {
    setCurrentStep(0);
    setSelectedAlgorithms([]);
    setProcesses([]);
    setTimeSlice(1);
  };

  const stepBack = () => setCurrentStep((curr) => curr - 1);

  return (
    <>
      <Fader displayed={currentStep === 0}>
        <AlgorithmSelector
          onSubmit={(v) => {
            setSelectedAlgorithms(v);
            setCurrentStep((curr) => curr + 1);
          }}
        />
      </Fader>
      <Fader displayed={currentStep === 1}>
        <ProcessesDisplay
          defaultTimeSlice={timeSlice}
          goBack={stepBack}
          defaultProcesses={processes}
          algorithms={selectedAlgorithms}
          onSubmit={(processes, timeSlice) => {
            setProcesses(processes);
            setTimeSlice(timeSlice);
            setCurrentStep((curr) => curr + 1);
          }}
        />
      </Fader>
      <Fader displayed={currentStep === 2}>
        <ResultGallery
          goBack={stepBack}
          data={processes}
          onReset={reset}
          timeSlice={timeSlice}
          algorithms={selectedAlgorithms}
        />
      </Fader>
    </>
  );
};

export default Inner;