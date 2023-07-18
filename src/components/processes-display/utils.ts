import type SchedulingAlgorithm from '../../types/scheduling-algorithm';

export const isPriority = (algorithms: SchedulingAlgorithm[]) =>
  algorithms.includes('priority') || algorithms.includes('priority-preemptive');

export const isFeedBackQueue = (algorithms: SchedulingAlgorithm[]) =>
  algorithms.includes('multi-level-feedback-queue');

export const isRoundRobin = (algorithms: SchedulingAlgorithm[]) =>
  algorithms.includes('round-robin') || algorithms.includes('multi-level');

// export const isMultiLevel = (algorithms: SchedulingAlgorithm[]) =>
//   algorithms.includes('multi-level');
