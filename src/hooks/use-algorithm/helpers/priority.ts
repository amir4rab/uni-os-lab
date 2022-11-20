import ProcessArray from '../../../types/process';

export const findNextPrioritizedItemPreemptive = 
  (
    processes:ProcessArray, 
    reminders: number[], 
    currentTime: number
  ) => {
  let selectedItem = -1;
  for (let i = 0; i < processes.length; i++) {

    // Skipping incase that the item has been processed before
    if (reminders[i] === 0) continue;

    // Setting the first item
    if (selectedItem === -1) {
      selectedItem = i;
      continue;
    }

    // if the current item hasn't arrived yet
    if ( processes[i].arrivalTime > currentTime ) continue;

    // Changing the item incase we found another item that is more prioritized or has been added before the current selected item
    if (
      processes[i].arrivalTime <= processes[selectedItem].arrivalTime ||
      processes[i].priority < processes[selectedItem].priority
    ) {
      selectedItem = i;
      continue;
    }
  }

  return selectedItem;
};

export const findNextPrioritizedItemNonPreemptive = 
  (
    processes:ProcessArray, 
    seen: boolean[], 
    currentTime: number
  ) => {

  let selectedItem = -1;
  for (let i = 0; i < processes.length; i++) {

    // Skipping incase that the item has been processed before
    if (seen[i]) continue;

    // Setting the first item
    if (selectedItem === -1) {
      selectedItem = i;
      continue;
    }

    // if the current item hasn't arrived yet
    if ( processes[i].arrivalTime > currentTime ) continue;

    // Changing the item incase we found another item that is more prioritized or has been added before the current selected item
    if (
      processes[i].arrivalTime <= processes[selectedItem].arrivalTime ||
      processes[i].priority < processes[selectedItem].priority
    ) {
      selectedItem = i;
      continue;
    }
  }

  return selectedItem;
}