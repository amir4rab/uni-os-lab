export interface Process {
  priority: number;
  name: string;
  id: string;
  insertionTime: number;
  duration: number;
}

type ProcessArray = Process[];

export default ProcessArray;
