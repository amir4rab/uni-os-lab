import type Gantt from '../types/gantt';

interface UseGenerateCSVResult {
  ganttToCSV: (data: Gantt) => Blob;
}

const useGenerateCSV = (): UseGenerateCSVResult => {
  const ganttToCSV: UseGenerateCSVResult['ganttToCSV'] = (data) => {
    // Setting CSV files headers
    let csv = 'Process Name, Start time, End Time, Duration \n';

    data.map(({ processName, endTime, startTime }, index) => {
      const duration = endTime - startTime;

      // Appending data to CSV string
      csv = csv + `${processName}, ${startTime}ms, ${endTime}ms, ${duration}ms`;

      // Incase current item isn't the last item, we add a line breaker
      if (index !== data.length - 1) csv = csv + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });

    return blob;
  };

  return {
    ganttToCSV,
  };
};

export default useGenerateCSV;
