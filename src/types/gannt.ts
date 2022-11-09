interface GanntItem {
  startTime: number;
  endTime: number;
  processName: string;
  id: string;
  ogId?: string;
}

type Gantt = GanntItem[];

export default Gantt;
