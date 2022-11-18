import ProcessArray from '../../../types/process';

/** Sorts processes array based on processes insertion time **/
const sortProcessesByArrivalTime = (processes: ProcessArray) =>
  processes.sort(({ arrivalTime: aIn }, { arrivalTime: bIn }) =>
    aIn < bIn ? -1 : aIn === bIn ? 0 : 1,
  );

export default sortProcessesByArrivalTime;