
import { TaskType, ComplicatedTaskType } from './../../types/data'

export const A_UI = {
  toggleModalAST: () => ({
    type: 'TOGGLE_MODAL_ADD_SIMPLE_TASK',
  } as const ),
  cancelModalAST: () => ({
    type: 'CANCEL_MODAL_ADD_SIMPLE_TASK',
  } as const),
  toggleModalACT: () => ({
    type: 'TOGGLE_MODAL_ADD_COMPLICATED_TASK',
  } as const),
  cancelModalACT: () => ({
    type: 'CANCEL_MODAL_ADD_COMPLICATED_TASK',
  } as const),
  toggleModeModalAST: () => ({
    type: 'TOGGLE_MODE_MODAL_ADD_SIMPLE_TASK'
  } as const),
  toggleModeModalACT: () => ({
    type: 'TOGGLE_MODE_MODAL_ADD_COMPLICATED_TASK'
  } as const),
  togglePatternModal: () => ({
    type: 'TOGGLE_PATTERN_MODAL'
  } as const),
  toggleModePatternModal: () => ({
    type: 'TOGGLE_MODE_PATTERN_MODAL'
  } as const),
  toggleInfoModal: () => ({
    type: 'TOGGLE_INFO_MODAL'
  } as const),
  changeFieldsValue: (id: string, value: string) => ({
    type:  'CHANGE_FIELD_VALUE',
    id, value
  } as const),
  changeData: (data: string[]) => ({
    type:  'CHANGE_FIELD_DATA',
    data
  } as const),
  changeCheckBox: (id: string, checked: boolean) => ({
    type:  'CHANGE_FIELD_CHECKBOX',
    id, checked
  } as const),
  setSimpleTaskForm: (task: TaskType) => ({
    type: 'RUN_EDIT_SIMPLE_TASK', task
  } as const),
  setComplicatedTaskForm: (task: ComplicatedTaskType) => ({
    type: 'RUN_EDIT_COMPLE_TASK', task
  } as const),
  endEditTaskForm: () => ({
    type: 'END_EDIT_COMPLE_TASK'
  } as const)
} 



