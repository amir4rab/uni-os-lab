export interface Process {
  priority: number;
  type: 'foreground' | 'background';
  cpuBursts: 'short' | 'long',
  ioBursts: 'low' | 'high',
  name: string;
  id: string;
  arrivalTime: number;
  duration: number;
}

type ProcessArray = Process[];

export default ProcessArray;
