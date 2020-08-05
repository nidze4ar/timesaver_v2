import { diffTime, demountTime, time_estimate} from './time_methods'
import { compressTask, moveTask } from './task_methods'
import { default_weekends } from './patterns'
import { TaskType, DateTrackType, Settings, NewTaskDate} from '../types/data'
export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const monthsDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
export type PrepareDateType = {
  start: Date
  end: Date
  duration: number
}
type CheckType = {
  start: string
  end: string
  freeIime: number
}
export const getDate = (cal: any, day: DateTrackType): TaskType[] => cal[day.year][months[day.month]][day.day]
// извлечение даты из дедлайна
export const prepareDate = (arr: string[]): PrepareDateType => ({
  start: new Date(arr[0]),
  end: new Date(arr[1]),
  duration: daysLag(new Date(arr[1]), new Date(arr[0]))
})
// длительность периода
export const daysLag = (a: Date, b: Date) => Math.ceil(Math.abs(b.getTime() - a.getTime()) / (1000 * 3600 * 24) )
// перемещение по календарю
export const addDays = (date: Date, days: number) => new Date(date.setDate(date.getDate() + days) )
export const buildIterDate = (day: Date): DateTrackType => ({
  year: day.getFullYear(),
  month: day.getMonth(),
  day: day.getDate() - 1
})
// заполнение календаря при первом запуске
export const fill_calendar = (weekdays: TaskType[] | [], weekends: TaskType[] | []) => {  
  const fillObject = (year: number) => {
    let obj: {[key:string]: any} = {};
    for (let i = 0, len = 12; i < len; i++) {    
      obj[months[i]] = new Array(year % 4 === 0 && i === 1 ? 29 : monthsDay[i]).fill(weekdays)
      for (let j = 0, len = obj[months[i]].length; j < len; j++) {
        let days = new Date(year, i, j).getDay()
          if(days === 5 || days === 6){
            obj[months[i]][j] = weekends
         }
       }      
     }
    return obj
  }
  let calendar: {[key:string]: any} = {}
  for (let i = 0, len = 7; i < len; i++) {     
    calendar[new Date().getFullYear() + i] = fillObject(new Date().getFullYear() + i)
  }  
  return calendar
}
// извлечение событий выбранного дня
export const schedule_render = (date: DateTrackType, calendar: any) => {
  if(calendar[date.year]) {
    if(Array.isArray(getDate(calendar, date) ) ){
      return getDate(calendar, date) 
    } else {
      return default_weekends               
    }     
  }  
  return default_weekends                   
}
// отсрочка дедлайна задачи если свободного времени не хватает
export const doPostponement = (settings: Settings) => {
  let d = prepareDate(settings.task.deadline), freeTime = 0, days = 0, now = addDays(d.start, -1)
  while(freeTime < +settings.task.labour * 2) {  // may be 3?
    now = addDays(now, 1)
    freeTime += time_estimate(getDate(settings.calendar, buildIterDate(now ) ) )
    days++
  }
  settings.info.dedlinePostponement = days         
  return settings
}
// достаточность времени для создании задачи
export const checkFreeTime = (arg: Settings) => {
  let d: PrepareDateType = prepareDate(arg.task.deadline), res = 0, now = addDays(d.start, -1)// d.start
  for (let i = -1, len = d.duration; i < len; i++) {
    now = addDays(now, 1)
    res += time_estimate(getDate(arg.calendar, buildIterDate(now) ) )
  }
  return res > +arg.task.labour  
}
export const checkMaxFreeTime = (arg: Settings) => {
  let d: PrepareDateType = prepareDate(arg.task.deadline), res = 0, now = addDays(d.start, -1)// d.start
  for (let i = -1, len = d.duration; i < len; i++) {
    now = addDays(now, 1)
    res += time_estimate(compressTask(moveTask(getDate(arg.calendar, buildIterDate(now)))))
  }
  return res > +arg.task.labour  
}
/*
// сквозное время (одиноковре на всем протяжении)
export const checkThroughFreeTime = (calendar: any, task: ComplicatedTaskType) => {
  let d: PrepareDateType = prepareDate(task.deadline) 
  let daysTasks: TaskType[][]= []
  let res: CheckType[][] = []
  let now = d.start
  for (let i = -1, len = d.duration; i < len; i++) {
    now = addDays(now, 1)
    daysTasks.push(getDate(calendar, buildIterDate(now) ) )   
  }   
  res = daysTasks.map( (v: TaskType[]) => periodEstimate(v) )
                 .map( (v: CheckType[]) => v
                 .filter( (i: CheckType)  => i.freeIime > +task.labour / d.duration) )                
  if(res.some(v=>!v) ) return false
  return findThroughFreeTime(res, +task.labour)
}
*/
// массив начала и длительности периодов свободного времени
const periodEstimate = (schedule: TaskType[]): CheckType[] => {                
  let acc = []  
  for (let i = 1, len = schedule.length; i < len; i++) {    
    if(schedule[i].start !== schedule[i-1].end) {
      acc.push({start: schedule[i-1].end, end: schedule[i].start,
        freeIime: demountTime(diffTime(schedule[i-1].end, schedule[i].start) )
      })
    }
  }  
  return acc
}
/*
// поиск одновременных периодов 
export const findThroughFreeTime = (arr: CheckType[][], taskDuration: number) => { 
  let res = arr[0], temp = arr[1]    
  for (let i = 1, len = arr.length - 1; i < len; i++) {
    res = res.filter((v: CheckType) => checkIintersectionPeriod(v, temp, taskDuration) )
    if(!res) return false
    temp = arr[i + 1]
  }
  return res
}
// пересечение периодов time и одного из arr
export const checkIintersectionPeriod = (time: CheckType, arr: CheckType[], dur: number): boolean =>
  !!(arr.filter((v: CheckType) => demountTime(diffTime(Math.min(+v.start, +time.start).toString(), Math.min(+v.end, +time.end).toString() ) ) > dur
  || demountTime(diffTime(Math.min(+v.start, +time.start).toString(), Math.min(+v.end, +time.end).toString() ) ) > dur))
*/
export const defineNewTaskDate = (set: Settings): NewTaskDate => {
  let start = new Date(set.task.deadline[0])
    let end = new Date(set.task.deadline[1])
    let duration = daysLag(end, start)
    let tasklabourPerDay = +set.task.labour / duration > 0.2 ? +set.task.labour / duration: 0.2
  return { start, end, duration, tasklabourPerDay }
}


