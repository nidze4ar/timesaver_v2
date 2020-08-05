import { A_UX } from '../actions/ux'
import { InferActionsTypes } from './../store';
import { LocaleType } from '../../types/data'
const initialState = {
  lang: 'Ru' as LocaleType,
  completedFillPattern: false,
  aggressivenessExclude: 5,
  aggressivenessSqueezing: 5,
  aggressivenessPermutation: 5,
  compressionRatio: 1,
  minTaskTime: 30,
}
export type InitialState = typeof initialState 
export type ActionsTypes = InferActionsTypes<typeof A_UX>
export const ux = (state = initialState, action: ActionsTypes): InitialState => {
  switch(action.type) {
    case 'CHANGE_LANG': return {...state, lang: action.lang}
    case 'COMPLETE_FILL_PATTERN': return {
      ...state, completedFillPattern: !state.completedFillPattern
    }
    case 'SET_AGGRESSIVENESS_EXCLUDE': return {
      ...state, aggressivenessExclude: action.aggressivenessExclude
    }
    case 'SET_AGGRESSIVENESS_SQUEEZING': return {
      ...state, aggressivenessSqueezing: action.aggressivenessSqueezing
    }
    case 'SET_AGGRESSIVENESS_PERMUTATION': return {
      ...state, aggressivenessPermutation: action.aggressivenessPermutation
    }
    case 'SET_MIN_TASK_TIME': return {...state, minTaskTime: action.minTaskTime}
    default: return state
  }
}