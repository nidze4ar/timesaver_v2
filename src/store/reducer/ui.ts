import { A_UI } from '../actions/ui'
import { InferActionsTypes } from './../store'
import { setFormField, setFormFieldFromSimpleTask, setFormFieldFromComplicatedTask } from '../../lib/form_methods'
import { Form } from './../../types/data'

const initialState = {
  modal_AS_visible: false, 
  modal_AS_mode: false, 
  modal_ACT_visible: false, 
  modal_ACT_mode: false, 
  pattern_modal_visible: false, 
  pattern_modal_mode: false, 
  info_modal_visible: false, 
  formEl: [] as Form[],
  modalType: '1',
  simpleTaskEdit: false,
  complTaskEdit: false,
  start: false
}

const complTaskField = ['title', 'id', 'deadline', 'importance', 'labour', 'exclusivity', 'compressibility', 'urgent', 'movable']
const simplTaskField = ['title', 'id', 'start', 'end', 'importance', 'exclusivity', 'compressibility', 'urgent', 'movable']
export type InitialState = typeof initialState 
export type ActionsTypes = InferActionsTypes<typeof A_UI>
export const ui = (state = initialState, action: ActionsTypes): InitialState => {
  switch(action.type) {    
    case 'TOGGLE_MODAL_ADD_SIMPLE_TASK': return {
      ...state,
      modal_AS_visible: !state.modal_AS_visible,
      modalType: '2', formEl: state.simpleTaskEdit ? state.formEl: setFormField(simplTaskField)
    }
    case 'CANCEL_MODAL_ADD_SIMPLE_TASK': return {
      ...state,
      modal_AS_visible: false,
    }    
    case 'TOGGLE_MODAL_ADD_COMPLICATED_TASK': return {
      ...state,
      modal_ACT_visible: !state.modal_ACT_visible,
      modalType: '3', formEl: state.complTaskEdit ? state.formEl: setFormField(complTaskField)
    }
    case 'CANCEL_MODAL_ADD_COMPLICATED_TASK': 
    return {
      ...state,
      modal_ACT_visible: false,
    }
    case 'TOGGLE_MODE_MODAL_ADD_SIMPLE_TASK': return {
      ...state,
      modal_AS_mode: !state.modal_AS_mode,
    }
    case 'TOGGLE_MODE_MODAL_ADD_COMPLICATED_TASK': return {
      ...state,
      modal_ACT_mode: !state.modal_ACT_mode,
    }
    case 'TOGGLE_PATTERN_MODAL': return {...state, start: true,
      pattern_modal_visible: !state.pattern_modal_visible,
      modalType: '1', formEl: setFormField(simplTaskField),
    }
    case 'TOGGLE_MODE_PATTERN_MODAL': return {
      ...state,
      pattern_modal_mode: !state.pattern_modal_mode,
    }
    case 'TOGGLE_INFO_MODAL': return {
      ...state,
      info_modal_visible: !state.info_modal_visible,
    }
    case 'CHANGE_FIELD_VALUE': 
    return {...state, formEl: state.formEl.map((field: Form) => {
      field.value = field.id === action.id ? action.value: field.value
      return field
    })}
    case 'CHANGE_FIELD_CHECKBOX': 
    return {...state, formEl: state.formEl.map((field: Form) => {
      field.checked = field.id === action.id ? action.checked: field.checked
      return field      
    })}
    case 'CHANGE_FIELD_DATA': return {...state, formEl: state.formEl.map((field: Form) => {
      field.data = field.field === 'deadline' ? action.data: field.data
      return field
    })}
    case 'RUN_EDIT_SIMPLE_TASK': return {...state, simpleTaskEdit: true, formEl: setFormFieldFromSimpleTask(action.task)}
    case 'RUN_EDIT_COMPLE_TASK': return {...state, complTaskEdit: true, formEl: setFormFieldFromComplicatedTask(action.task)}
    case 'END_EDIT_COMPLE_TASK': return {...state, complTaskEdit: false}
    default: return state
  } 
}