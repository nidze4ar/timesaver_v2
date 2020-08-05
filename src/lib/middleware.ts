import { compressGap, compressTask, moveTask, buildTask } from './task_methods'
import { detailFreeTime, time_estimate, defineTaskStart, demountTime, formLabourTime } from './time_methods'
import { months, prepareDate, addDays, buildIterDate, defineNewTaskDate } from './date_methods'
import { TaskType, Settings, GapTime } from '../types/data';

const universalCalendarMiddleWare = (set: Settings, func: (cal: any, set: Settings) => void): Settings => {
  let d = prepareDate(set.task.deadline)
  let now = d.start
  set.info.tempNum = 0
  set.info.tempNumArr = []
  set.info.dayFreeTime = []
  for (let i = -1, len = d.duration-1; i < len; i++) {
    now = addDays(now, 1)
    let DATE = set.info.dateTrack = buildIterDate(now)   
    func(set.calendar[DATE.year][months[DATE.month]][DATE.day], set)
  }
  return set
}
const runDysplaySchedule = (schedule: TaskType[], set: Settings) => {
  set.info.dayFreeTime = [...set.info.dayFreeTime, detailFreeTime(schedule)]
  return set
}
export const FillTaskInIterDay = (set: Settings): any => {
  const { info } = set
  let d = defineNewTaskDate(set), now = addDays(d.start, -1), DATE, iterDay, taskStart, lastTime, freePeriods: GapTime
  info.lastDayTaskStart = ''
  for (let i = 0, len = d.duration; i < len; i++) {
    now = addDays(now, 1)
    DATE = info.dateTrack = buildIterDate(now)
    freePeriods = info.dayFreeTime[i].filter(time => demountTime(time.duration) > d.tasklabourPerDay)
    iterDay = set.calendar[DATE.year][months[DATE.month]][DATE.day]
    if(freePeriods.length) {
      lastTime = info.lastDayTaskStart ? info.lastDayTaskStart: freePeriods[0].start
      taskStart = freePeriods[defineTaskStart(freePeriods, lastTime)].start
    } else {
      iterDay = time_estimate(compressTask(moveTask(iterDay))) > time_estimate(compressTask(compressGap(iterDay))) ? 
      compressTask(moveTask(iterDay)) : compressTask(compressGap(iterDay))
      freePeriods = detailFreeTime(iterDay).filter(time => demountTime(time.duration) > d.tasklabourPerDay)
      lastTime = info.lastDayTaskStart ? info.lastDayTaskStart: freePeriods[0].start
      taskStart = freePeriods[defineTaskStart(freePeriods, lastTime)].start
    }
    info.lastDayTaskStart = taskStart    
    set.calendar[DATE.year][months[DATE.month]][DATE.day] = [...iterDay, 
      buildTask(set.task, taskStart, formLabourTime(d.tasklabourPerDay) ) ]
  }  
  return set.calendar
}
/*
const runDecreaseTaskLabour = (schedule: TaskType[], set: Settings) => {
  if(typeof detail_estimate(schedule) === 'object') {
    let maxGap = Math.max(...detail_estimate(schedule).map(v => +v) )
    set.info.tempNum = set.info.tempNum + maxGap / 100
    set.task.labour = Math.round(set.info.tempNum).toString()
    set.info.console = 'done_decrease_task_labour'
  }
}
const runIncreaseFreeTime = (schedule: TaskType[], set: Settings): void => {
  const runExcludeTask = (arr:  TaskType[]) => set.ux.aggressivenessExclude ? arr.filter(task => task.exclusivity === false) : arr,
  runCompressTask = (arr:  TaskType[]) => set.ux.aggressivenessSqueezing ? compressTask(arr, set.ux.compressionRatio) : arr,
  runCompressGap = (arr:  TaskType[]) => set.ux.aggressivenessSqueezing ? compressGap(arr) : arr,
  runmoveTask = (arr:  TaskType[]) => set.ux.aggressivenessPermutation ? moveTask(arr) : arr
  set.calendar[set.info.dateTrack.year][months[set.info.dateTrack.month]][set.info.dateTrack.day] = 
  runmoveTask(runCompressGap(runCompressTask(runExcludeTask(schedule) ) ) )
  if(set.info.console !== 'done_increase_task_labour') {
    set.info.console = 'done_increase_task_labour'
  }
}
// заполнение периодов с одинаковым времением начала
const runSameStartFlood = (schedule: TaskType[], set: Settings): void => {
  const date = set.info.dateTrack
  let start = detail_estimate(schedule)
      .map(period => markStartFreeTime(schedule, period) )
      .map(time => ({time, dif: diffTime(set.info.tempNum.toString(), time)}))
      .sort( (difObjA, difObjB) => +difObjA.dif - +difObjB.dif)[0]
  //set.info.tempNum = start
  let tempInjectTask = buildTask(set.task, start.time, set.task.labour)
  set.calendar[date.year][months[date.month]][date.day] = [...schedule, tempInjectTask]
  //set.info.console = 'CE'
}
// заполнение задачи в самый длинный свободный период дня
const runAccumFlood = (schedule: TaskType[], set: Settings): void => {
  const date = set.info.dateTrack
  const maxFreePeriod = formTime(Math.max(...detail_estimate(schedule).map(v => +v) ).toString() )  
  const start = markStartFreeTime(schedule, maxFreePeriod)
  set.info.tempNum = set.info.tempNum + +maxFreePeriod
  set.calendar[date.year][months[date.month]][date.day] = +set.task.labour - set.info.tempNum > 0 ? 
  [...schedule, buildTask(set.task, start, maxFreePeriod)] : schedule
  set.info.console = 'CE'
}
const runSplitFlood = (schedule: TaskType[], set: Settings): void => {
  const date = set.info.dateTrack
  let periods: string[] = detail_estimate(schedule).sort( (a: string, b: string) => demountTime(a) - demountTime(b) ) 
  periods.length = 2 //why?
  let startArr: string[] = periods.map(period => markStartFreeTime(schedule, period) )
  set.info.tempNum = set.info.tempNum + periods.map(v => +v).reduce((acc, cur) => acc + cur)
  set.calendar[date.year][months[+date.month]][date.day] = +set.task.labour - set.info.tempNum > 0 ? 
  [...schedule, ...startArr.map( (start, i) => buildTask(set.task, start, periods[i] ) )] : schedule
  set.info.console = 'CE'
}
*/
export const dysplaySchedule = (setting: Settings) => universalCalendarMiddleWare(setting, runDysplaySchedule)
/*
export const increaseFreeTime = (setting: Settings) => universalCalendarMiddleWare(setting, runIncreaseFreeTime)
export const decreaseTaskLabour = (setting: Settings) => universalCalendarMiddleWare(setting, runDecreaseTaskLabour)
export const floodSchedule = (setting: Settings) => universalCalendarMiddleWare(setting, runFloodSchedule)
export const sameStartFlood = (setting: Settings) => universalCalendarMiddleWare(setting, runSameStartFlood)
export const accumFlood = (setting: Settings) => universalCalendarMiddleWare(setting, runAccumFlood)
export const splitFlood = (setting: Settings) => universalCalendarMiddleWare(setting, runSplitFlood)
*/