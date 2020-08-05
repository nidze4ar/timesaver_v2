import { DateTrackType } from './../types/data'
import { ComplicatedTaskType, TaskType } from "../types/data"
export const rand = (): string => Math.random().toString().slice(2)
export const searchID = (arr: ComplicatedTaskType[], id: string): ComplicatedTaskType => arr.filter(v => v.id === id)[0]
export const searchIDObj = (arr: ComplicatedTaskType[], id: string): any => Object.values(arr.filter(v => v.id === id)[0] )
export const sum = (arr: number[]) => arr.reduce( (acc, cur) => acc + cur, 0 ) 
export const sortByTime = (arr: TaskType[]) => arr.sort( (itemA: TaskType, itemB: TaskType) => +itemA.start - +itemB.start )
export const changeID = (arr: TaskType[]): TaskType[] => arr.map((element:TaskType, index) => {
  element.id = index.toString()
  return element
})
export const clone = (cal: any, day: DateTrackType) => cal[day.year] ? Object.assign({}, cal) : cal
export const delColon = (str: string): string => `${str[0]}${str[1]}${str[3]}${str[4]}`
export const insertColon = (str: string|undefined): string => str? str.length === 4? `${str[0]}${str[1]}:${str[2]}${str[3]}`: str: '' 
// глубокое копирование обьектов
let isArray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) === "[object Array]";
}
let isObject = function (obj: any) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
export function cloneDeep(mas: any) {
  let masClone: any = isArray(mas) ? new Array(mas.length) : {};  
  Object.keys(mas).forEach(function (key) {
    if (isArray(mas[key]) || isObject(mas[key]))
      masClone[key] = cloneDeep(mas[key]);
    else
      masClone[key] = mas[key];
  })
  return masClone;
}
