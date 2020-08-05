import { InferActionsTypes } from './../store';
import { ComplicatedTaskType, DateTrackType, TaskType } from './../../types/data'
import { A_CAL } from './../actions/calendar'

const initialState = {
  calendar: {},
  chosenDay: { year: 0, month: 0, day: 0 } as DateTrackType,
  schedule: [] as TaskType[],
  tasks: [] as ComplicatedTaskType[],
  weekdays: [] as TaskType[],
  weekends: [] as TaskType[],
  quickTask: [] as TaskType[] 
}

export type InitialState = typeof initialState
export type ActionsTypes = InferActionsTypes<typeof A_CAL>

export const core = (state = initialState, action: ActionsTypes): InitialState => {
  switch(action.type) {
    case 'SET_CAL': return {...state, calendar: action.calendar}
    case 'CHOSE_DAY': return {...state, chosenDay: action.day}
    case 'MANAGE_SIMPLE_TASK': return {...state, calendar: action.calendar} 
    case 'ADD_COMPLICATED_TASK': return {...state, tasks: [...state.tasks, action.task] }
    case 'REMOVE_COMPLICATED_TASK': return {
      ...state, tasks: state.tasks.filter( (task: ComplicatedTaskType) => task.id !== action.id)
    }    
    case 'SET_SCHEDULE': return {...state, schedule: action.schedule}
    case 'SET_WEEKDAY_PATTERN': return {...state, weekdays: action.weekdays}
    case 'SET_WEEKEND_PATTERN': return {...state, weekends: action.weekends}
    default: return state
  }
}

