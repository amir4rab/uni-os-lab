interface GanttItem {
  startTime: number;
  endTime: number;
  processName: string;
  id: string;
  ogId?: string;
}

type Gantt = GanttItem[];

export default Gantt;
