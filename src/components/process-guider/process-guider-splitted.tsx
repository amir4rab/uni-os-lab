// preact
import { useEffect, useState } from 'preact/hooks';
import { Suspense, lazy } from 'preact/compat';

// Sass classes
import classes from './process-guider.module.scss';

// Types
import ProcessArray from '../../types/process';
import SchedulingAlgorithm from '../../types/scheduling-algorithm';

// Hooks
import useAlgorithm from '../../hooks/use-algorithm';

// Components
import Loading from '../loading';

// Dynamic components
const AlgorithmSelector = lazy(() => import('../algorithm-selector'));
const Fader = lazy(() => import('../fader'));
const ResultGallery = lazy(() => import('../result-gallery'));
const ProcessesDisplay = lazy(() => import('../processes-display'));

const steps = ['Choose algorithm', 'Add processes', 'Results'];

const ProcessGuider = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeSlice, setTimeSlice] = useState(1);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<
    SchedulingAlgorithm[]
  >([]);
  const [processes, setProcesses] = useState<ProcessArray>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { process } = useAlgorithm();

  /** Resets inputs */
  const reset = () => {
    setCurrentStep(0);
    setSelectedAlgorithms([]);
    setProcesses([]);
    setTimeSlice(1);
  };

  /** Preloads components needed for page */
  const preLoadComponents = async () => {
    await Promise.all([
      import('../algorithm-selector'),
      import('../fader'),
      import('../result-displayer'),
      import('../result-gallery'),
      import('../processes-display'),
    ]);
    setIsLoading(false);
  };

  useEffect(() => {
    preLoadComponents();
  }, []);

  const stepBack = () => setCurrentStep((curr) => curr - 1);

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
      {isLoading ? (
        <Loading />
      ) : (
        <Suspense fallback={null}>
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
        </Suspense>
      )}
    </section>
  );
};

export default ProcessGuider;
