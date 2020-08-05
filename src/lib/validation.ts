import { delColon } from './tools';
import { TaskType } from './../types/data';
import { detailFreeTime, defineTaskStart, diffTime, formLabourTime, addTime } from './time_methods'

export const date_validation = (str: string, schedule: TaskType[]): boolean => {
  const reg = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]/;
  const freeTime = detailFreeTime(schedule)
  const nearestPeriod = defineTaskStart(freeTime, delColon(str) )
  const endNearestPeriod = addTime(freeTime[nearestPeriod].start, formLabourTime(+freeTime[nearestPeriod].duration))
  const enougthTime = diffTime(freeTime[nearestPeriod].start, delColon(str)) < 
  diffTime(freeTime[nearestPeriod].start, endNearestPeriod)
  return reg.test(str) && enougthTime
}
export const number_validation = (str: string): boolean => {
  const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
  return ((!isNaN(+str) && reg.test(str)) || str === '' || str === '-') 
}

export const string_validation = (str: string): boolean => {
  const reg = /^[a-zA-Z0-9]+$/;
  return ((!isNaN(+str) && reg.test(str))) 
}

export const ID_validation = (id:number, arr: any[]): boolean => arr.map(item => item.id === id).length ? true : false


