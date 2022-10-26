export interface Process {
  priority: number;
  name: string;
  id: string;
  arrivalTime: number;
  duration: number;
}

type ProcessArray = Process[];

export default ProcessArray;
