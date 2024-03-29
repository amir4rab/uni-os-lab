// preact
import { StateUpdater, useState } from 'preact/hooks';

// Types
import type ProcessArray from '../../types/process';
import type SchedulingAlgorithm from '../../types/scheduling-algorithm';

// components
import Fader from '../fader';
import AlgorithmSelector from '../algorithm-selector';
import ResultGallery from '../result-gallery';
import ProcessesDisplay from '../processes-display';

// interface
interface Props {
  selectedAlgorithms: SchedulingAlgorithm[];
  setSelectedAlgorithms: StateUpdater<SchedulingAlgorithm[]>;
  setCurrentStep: StateUpdater<number>;
  currentStep: number;
}

const Inner = ({
  selectedAlgorithms,
  setSelectedAlgorithms,
  setCurrentStep,
  currentStep,
}: Props) => {
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
    <Fader>
      <Fader.Child id="algorithmSelectorFader" displayed={currentStep === 0}>
        <AlgorithmSelector
          defaultSelectedAlgorithms={selectedAlgorithms}
          onSubmit={(v) => {
            setSelectedAlgorithms(v);
            setCurrentStep((curr) => curr + 1);
          }}
        />
      </Fader.Child>
      <Fader.Child id="processesDisplayFader" displayed={currentStep === 1}>
        <ProcessesDisplay
          defaultTimeSlice={timeSlice}
          goBack={stepBack}
          defaultProcesses={processes}
          algorithms={selectedAlgorithms}
          onSubmit={(processes, timeSlice) => {
            setProcesses(
              processes.sort((a, b) =>
                a.arrivalTime < b.arrivalTime
                  ? -1
                  : a.arrivalTime > b.arrivalTime
                  ? 1
                  : 0,
              ),
            );
            setTimeSlice(timeSlice);
            setCurrentStep((curr) => curr + 1);
          }}
        />
      </Fader.Child>
      <Fader.Child id="resultGalleryFader" displayed={currentStep === 2}>
        <ResultGallery
          goBack={stepBack}
          data={processes}
          onReset={reset}
          timeSlice={timeSlice}
          algorithms={selectedAlgorithms}
        />
      </Fader.Child>
    </Fader>
  );
};

export default Inner;
