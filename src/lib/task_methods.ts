import { months, addDays } from './date_methods';
import { rand, sortByTime, changeID, delColon } from './tools'
import { diffTime, demountTime, detail_estimate, addTime, formLabourTime, divTime, buildStringTime } from './time_methods' 
import { getDate } from './date_methods'
import { TaskType, DateTrackType, ComplicatedTaskType } from '../types/data'

export const add_task = (cal: any, day: DateTrackType, task: TaskType): void => {
  cal[day.year][months[day.month]][day.day] = changeID(sortByTime([...getDate(cal, day), task]) )
  return cal
}  
export const remove_task = (cal: any, day: DateTrackType, id: string|undefined) => {     // зависимость от поля id, удаление последнего может вызвать ошпбку
  if(id) cal[day.year][months[day.month]][day.day] = getDate(cal, day).filter((task: TaskType) => task.id !== id); 
  return cal 
}
export const find_task = (cal: any, day: DateTrackType, id: number): TaskType => {
    return getDate(cal, day).filter( (task: TaskType) => +task.id === id)[0];
}
export const edit_task = (cal: any, day: DateTrackType, id: number, task: TaskType) => {
  cal[day.year][months[day.month]][day.day] = [...getDate(cal, day).filter( (task: TaskType) => +task.id !== id), task];
  return cal
}
const fillTime = (t: string) => t ? new RegExp(':').test(t) ? delColon(t): t : `1${rand()[1]}00`
// заполнение простой задачи в распорядок
export const simpleTaskFill = (taskArr: any[]): TaskType => ({
  title: taskArr[0].value ? taskArr[0].value : 'title',
  id: taskArr[1].value ? taskArr[1].value : rand(),
  start: fillTime(taskArr[2].value),
  end: fillTime(taskArr[3].value),
  importance: taskArr[4].value ? taskArr[4].value : rand()[0],
  exclusivity: taskArr[5].checked !== undefined ? taskArr[5].checked : false,
  compressibility: taskArr[6].checked !== undefined ? taskArr[6].checked : false,
  urgent: taskArr[7].checked !== undefined ? taskArr[7].checked : false,
  movable: taskArr[8].checked !== undefined ? taskArr[8].checked : false
  })
// заполнение сложной задачи в распорядок
export const complTaskFill = (taskArr: any[]): ComplicatedTaskType => ({ 
  title: taskArr[0].value ? taskArr[0].value : 'title',
  id: taskArr[1].value ? taskArr[1].value : rand(),
  deadline: taskArr[2].data ? taskArr[2].data : [new Date().toString(), addDays(new Date(), 7).toString()],
  importance: taskArr[3].value ? taskArr[3].value : rand()[0],
  labour: taskArr[4].value ? taskArr[4].value : rand()[0],
  exclusivity: taskArr[5].checked !== undefined ? taskArr[5].checked : false,
  compressibility: taskArr[6].checked !== undefined ? taskArr[6].checked : false,
  urgent: taskArr[7].checked !== undefined ? taskArr[7].checked : false,
  movable: taskArr[8].checked !== undefined ? taskArr[8].checked : false,
})
// заполнение задачи в распорядок
export const buildTask = (complTask: ComplicatedTaskType, start: string, duration: string): TaskType => ({
    title: complTask.title ? complTask.title : 'complTask name',
    id: complTask.id ? complTask.id : rand(),
    start: start ? start : `1${rand()[1]}00`,
    end: start ? addTime(start, duration) : '2400',
    exclusivity: complTask.exclusivity ? complTask.exclusivity : false,
    compressibility: complTask.compressibility ? complTask.compressibility : false,
    urgent: complTask.urgent ? complTask.urgent : false,
    movable: complTask.movable ? complTask.movable : false,
    importance: complTask.importance ? complTask.importance : rand()[0]  
})

// сдвиг задач в распорядке
export const compressGap = (arr: TaskType[]): TaskType[] => {                                                            
  let newArr = []
  for (let i = 0, len = arr.length; i < len; i++) {
    newArr.push(arr[i])
    if(i > 0 && arr[i].start !== arr[i - 1].end && arr[i].movable){
      let durationTask = diffTime(arr[i].start, arr[i].end)
      newArr[i].start = newArr[i - 1].end
      newArr[i].end = addTime(arr[i - 1].end, durationTask)
    } 
  }
 return newArr
}
// сдвиг задач в распорядке
export const compressTask = (arr: TaskType[], compressionRatio = 1): TaskType[] => {                                       
  let newArr = []
  for (let i = 0, len = arr.length; i < len; i++) {
    newArr.push(arr[i])
    let durationTask = demountTime( diffTime(arr[i].start, arr[i].end) )
    if(i > 0 && arr[i].compressibility && durationTask > 10){
      newArr[i].start = arr[i].start
      newArr[i].end = addTime(arr[i].start, buildStringTime(Math.round(divTime(durationTask, compressionRatio, +arr[i].importance) ) ) ) 
    } 
  }
 return newArr
}
// поиск нужного ид в массиве
const findIdIndex = (arr: TaskType[], id: number): number => {
  for (let i = 0, len = arr.length; i < len; i++) {
    if(+arr[i].id === id) return i
  }
  return -1
}
// выбор задачи для записи в gap
const chooseTask = (taskArr: any[], gap: number, pastTaskId: number[]): any => taskArr
  .filter(v => !~pastTaskId.indexOf(v.id) ).filter(v => v.dur < gap || v.dur === gap )[0]

type durationTaskShedule = {id: number, dur: number}
// перемешивание задач в распорядке
export const moveTask = (arr: TaskType[]): TaskType[] => {
  let temp = [] as TaskType[], result = [] as TaskType[], gapDurArr = [] as number[],
  taskArr = [] as durationTaskShedule[], pastTaskId = [] as number[], tgtTask;
  for (let i = 0, len = arr.length; i < len; i++) {
    if(arr[i].movable){
      temp.push(arr[i])
    } else {
      result.push(arr[i])
    }
  }
  for (let i = 0, len = temp.length; i < len; i++) {
    taskArr.push({id: +temp[i].id, dur: demountTime(diffTime(temp[i].start, temp[i].end) ) })
  }
  for (let i = 1, len = arr.length; i < len; i++) {
      gapDurArr.push(demountTime(diffTime(arr[i - 1].end, arr[i].start) ) ) 
  }     
  for (let i = 0, len = gapDurArr.length; i < len; i++) {
    if(gapDurArr[i] && chooseTask(taskArr, gapDurArr[i], pastTaskId) ) {
      tgtTask = chooseTask(taskArr, gapDurArr[i], pastTaskId)     
      let task = temp[findIdIndex(temp, tgtTask.id)]
      task.start = arr[i - 1].end 
      task.end = addTime(arr[i - 1].end, formLabourTime(tgtTask.dur) )
      result.push(task)
      pastTaskId.push(tgtTask.id)
    }
  }
  return result
}