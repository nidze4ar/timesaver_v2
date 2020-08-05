import { TaskType, GapTime } from './../types/data';
export function formateDate(lang: string){
  return new Date().toLocaleString(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
// фильтрация полей
const filterKeys = (obj: any) => {
  const validKeys = ['title', 'start']
  Object.keys(obj).forEach((key) => validKeys.includes(key) || delete obj[key])
  return obj
}
export const prep_data_timeline = (schedule: TaskType[]) => schedule.map(v => filterKeys(v) )
export const clock = () => `${new Date().getHours()}:${new Date().getMinutes() > 9 ? new Date().getMinutes(): '0' + new Date().getMinutes()}`
export const time_estimate = (schedule: TaskType[]) => {                                   // все свободное время дня
  let acc: number = 0
  for (let i = 1, len = schedule.length; i < len; i++) {
    acc += schedule[i-1].end !== schedule[i].start ? demountTime(diffTime(schedule[i-1].end, schedule[i].start) ) : 0
  }
  return acc // 100
}
// массив количества свободного времени
export const detail_estimate = (schedule: TaskType[]): string[] => {                
  let acc = []  
  for (let i = 1, len = schedule.length; i < len; i++) {
    if(schedule[i].start !== schedule[i-1].end) {
      acc.push(diffTime(schedule[i-1].end, schedule[i].start) )
    }
  }
  return acc.length ? acc : [diffTime(schedule[schedule.length - 1].end, '2400')]
}
// массив преиодоов количества свободного времени
export const detailFreeTime = (schedule: TaskType[]): GapTime => {                
  let acc = []  
  for (let i = 1, len = schedule.length; i < len; i++) {
    if(schedule[i].start !== schedule[i-1].end) {
      acc.push({
        start: schedule[i-1].end,
        duration: diffTime(schedule[i-1].end, schedule[i].start)
      } )
    }
  }
  return acc
}
// находим период самый близкий к прошлому
export const defineTaskStart = (freeTimes: GapTime, lastTime: string): number => {
  if(lastTime) {
    let epsilonStart = freeTimes.map(t => diffTime(minTime(t.start, lastTime), maxTime(t.start, lastTime) ) )
    .map(eps => demountTime(eps) )    
    let minEpsilonStart = Math.min(...epsilonStart)
    return epsilonStart.indexOf(minEpsilonStart)
  } else {
    return 0
  }    
}
const maxTime = (a: string, b: string): string => {
  let max = Math.max(demountTime(a), demountTime(b) )
  if(demountTime(a) === max) {
    return a
  } else {
    return b
  }
}
const minTime = (a: string, b: string): string => {
  let min = Math.min(demountTime(a), demountTime(b) )
  if(demountTime(a) === min) {
    return a
  } else {
    return b
  }
}
// 'ччмм' => мм
const mountTime = (moment: string): number => {
    let hours: number = +moment.slice(0, -2) * 60
    let minutes: number = +moment.slice(-2)
    return hours + minutes
}
// 'ччмм' => чч
export const demountTime = (moment: string): number => {
    let hours: number = +moment.slice(0, -2)
    let minutes: number = +moment.slice(-2)  / 60
    return hours + minutes
}
export const formTime = (moment: string): string => moment.length < 4 ? '0' + moment : moment
export const buildStringTime = (time: number): string => {
  let hours = Math.floor(time)
  let minutes = 60 / (1 / (time - hours) )
  return `${formMin(hours)}${formMin(minutes)}`
}
const formMin = (min: number) => min < 10 ? '0' + min : min.toString()
// чмм
export const diffTime = (a: string, b: string): string => formTime( ( (mountTime(b) - mountTime(a)) - (mountTime(b) - mountTime(a)) % 60) / 60 + formMin( (mountTime(b) - mountTime(a)) % 60) )
export const addTime = (a: string, b: string): string => formTime( ( (mountTime(b) + mountTime(a)) - (mountTime(b) + mountTime(a)) % 60) / 60 + formMin( (mountTime(b) + mountTime(a)) % 60) )
// сжатие маловажных задач
export const divTime = (moment: number, perc: number, importance: number): number => moment * ( (perc + importance) * 5 ) / 100       
// ч => чмм
export const formLabourTime = (labour: number): string => {
  let integerPart = Math.floor(labour).toString()
  let floatPart = Math.floor( (labour - Math.floor(labour) ) * 100)  
  return formTime(integerPart + formMin(Math.floor(floatPart * 0.6) ) )
}



