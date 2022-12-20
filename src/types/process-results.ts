import Gantt from './gantt';

interface ProcessResult {
  gantt: Gantt;
  averageTurnaroundTime: number;
  averageWaitingTime: number;
}

export default ProcessResult;
