import { LocaleType } from '../../types/data';

export const A_UX = {
  langChange: (lang: LocaleType) => ({
    type: 'CHANGE_LANG',
    lang
  } as const ),
  complFillPattern: () => ({
    type: 'COMPLETE_FILL_PATTERN'
  } as const ),
  setAggressivenessExclude: (aggressivenessExclude: number) => ({
    type: 'SET_AGGRESSIVENESS_EXCLUDE',
    aggressivenessExclude
  } as const ),
  setAggressivenessSqueezing: (aggressivenessSqueezing: number) => ({
    type: 'SET_AGGRESSIVENESS_SQUEEZING',
    aggressivenessSqueezing
  } as const ),
  setAggressivenessPermutation: (aggressivenessPermutation: number) => ({
    type: 'SET_AGGRESSIVENESS_PERMUTATION',
    aggressivenessPermutation
  } as const ),
  setMinimumTaskTime: (minTaskTime: number) => ({
    type: 'SET_MIN_TASK_TIME',
    minTaskTime
  } as const )
} 

