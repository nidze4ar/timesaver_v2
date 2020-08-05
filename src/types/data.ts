import { InitialState as UIType } from './../store/reducer/ui'
import { InitialState as UXType } from './../store/reducer/ux'
import { InitialState as CoreType } from './../store/reducer/calendar'
import lg from '../lib/lg.json'
export const text = JSON.parse(lg)
export type Info = {
  tempNumArr: number[]
  lastDayTaskStart: string
  dayFreeTime: GapTime[]
  tempNum: number
  dedlinePostponement: number
  dateTrack: DateTrackType
}
export const info: Info = {
  tempNumArr: [],
  lastDayTaskStart: '',
  dayFreeTime: [],
  tempNum: 0,
  dedlinePostponement: 0,
  dateTrack: {year: 0, month: 0, day: 0} 
}
export type TaskType = {
  [key: string]: any
  title: string,
  id: string,
  start: string,
  end: string,
  importance: string,
  exclusivity: boolean,
  compressibility: boolean,
  urgent: boolean,
  movable: boolean
}
export type ComplicatedTaskType = {
  title: string,
  id: string,
  deadline: string[],
  importance: string,
  exclusivity: boolean,
  compressibility: boolean,
  urgent: boolean,
  movable: boolean,  
  labour: string
}
export type DateTrackType = {
  [key: number]: any
  year: number
  month: number
  day: number
}
export type Settings = {
  task: ComplicatedTaskType
  calendar: any 
  ux: UXType 
  ui: UIType
  info: Info
}
export type Form = {
  tag: string  
  field: string
  id: string
  value: string
  checked: boolean
  data: any
}
export type LocaleType = 'Ru'|'En'|'fr'|'es'|'de'|'zh'
export type GapTime = {start: string, duration: string}[]
export type ModalProps = {
  ui: UIType
  lang: LocaleType
  core?: CoreType
  inputText: (value: string, id: string) => void
  setCheckBox: (checked: boolean, id: string) => void
  inputDeadline?: (d_str: string[]) => void 
  remove?: (id?: number) => void
}
export type NewTaskDate = {
  start: Date
  end: Date
  duration: number
  tasklabourPerDay: number
}