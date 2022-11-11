export interface Process {
  priority: number;
  type: 'foreground' | 'background';
  name: string;
  id: string;
  arrivalTime: number;
  duration: number;
}

type ProcessArray = Process[];

export default ProcessArray;
