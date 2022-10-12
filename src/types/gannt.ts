interface GanntItem {
  startTime: number;
  endTime: number;
  processName: string;
  id: string;
}

type Gantt = GanntItem[];

export default Gantt;
