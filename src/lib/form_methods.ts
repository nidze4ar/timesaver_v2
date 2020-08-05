import { TaskType, ComplicatedTaskType, Form  } from '../types/data'

function setFormInputField<TaskFieldValue>(field: [string, TaskFieldValue], index: number): Form {
  return {
    tag: 'input',  
    field: field[0],
    id: index.toString(),
    value: typeof field[1] === 'string' ? field[1] : '',
    checked: false, 
    data: [],  
  }
}
function setFormCheckboxField<TaskFieldValue>(field: [string, TaskFieldValue], index: number): Form {
  return {
    tag: 'checkbox',  
    field: field[0],
    id: index.toString(),
    value: '',
    checked: typeof field[1] === 'boolean' ? field[1] : false,
    data: [], 
  }
}
function setFormCalpikerField<TaskFieldValue>(field: [string, TaskFieldValue], index: number): Form {
  return {
    tag: 'data-picker',  
    field: field[0],
    id: index.toString(),
    value: '',
    checked: false,
    data: field[1],  
  }
}
const parseFields = (field: string, index: number): Form => {
  switch(field) {
    case 'deadline': return setFormCalpikerField([field, []], index)
    case 'exclusivity': 
    case 'compressibility':
    case 'urgent':
    case 'movable': return setFormCheckboxField([field, false], index)
    default: return setFormInputField([field, ''], index)
  }
}
const parseSimpleTask = (taskEntries: [string, string|boolean], index: number): Form => {
  switch(taskEntries[0]) {
    case 'title':
    case 'id':
    case 'start':
    case 'end':
    case 'importance': return setFormInputField<string|boolean>(taskEntries, index) 
    default: return setFormCheckboxField<string|boolean>(taskEntries, index)
  }
}
const parseComplicatedTask = (taskEntries: [string, string|boolean|string[]], index: number): Form => {
  //taskEntries[0] == 'deadline'? console.log(taskEntries[1]): console.log(index)
  switch(taskEntries[0]) {
    case 'title':
    case 'id':
    case 'start':
    case 'end':
    case 'importance':
    case 'labour': return setFormInputField<string|boolean|string[]>(taskEntries, index)    
    case 'deadline': return setFormCalpikerField<string|boolean|string[]>(taskEntries, index)
    default: return setFormCheckboxField<string|boolean|string[]>(taskEntries, index)
  }
}
export const setFormField = (fields: string[]): Form[] => fields.map((field, i) => parseFields(field, i))
export const setFormFieldFromSimpleTask = (task: TaskType): Form[] => Object.entries(task)
  .map((taskEntries, i) => parseSimpleTask(taskEntries, i))
export const setFormFieldFromComplicatedTask = (task: ComplicatedTaskType): Form[] => Object.entries(task)
  .map((taskEntries, i) => parseComplicatedTask(taskEntries, i))
