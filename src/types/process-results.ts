import Gantt from './gantt';

interface ProcessResult {
  gantt: Gantt;
  averageReturnTime: number;
  averageResponseTime: number;
}

export default ProcessResult;
