import { DateTrackType, TaskType, ComplicatedTaskType } from './../../types/data';

export const A_CAL = {              
  setCalendar: (calendar: any) => ({
    type:  'SET_CAL',
    calendar
  } as const),
  manageSimpleTask: (calendar: any) => ({
    type:  'MANAGE_SIMPLE_TASK',
    calendar
  } as const),
  choseDay: (day: DateTrackType) => ({
    type:  'CHOSE_DAY',
    day
  } as const),
  addComplicatedTask: (task: ComplicatedTaskType) => ({
    type:  'ADD_COMPLICATED_TASK',
    task
  } as const),
  removeComplicatedTask: (id: string) => ({
    type:  'REMOVE_COMPLICATED_TASK',
    id
  } as const),
  setSchedule: (schedule: TaskType[]) => ({
    type:  'SET_SCHEDULE',
    schedule
  } as const),
  setWeekdaysPattern: (weekdays: TaskType[]) => ({
    type:  'SET_WEEKDAY_PATTERN',
    weekdays
  } as const),
  setWeekendsPattern: (weekends: TaskType[]) => ({
    type:  'SET_WEEKEND_PATTERN',
    weekends
  } as const)
}



