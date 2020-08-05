import React, { FC } from 'react'
import { Layout, Menu, Button } from "antd";
import Timeline from '../Timeline/Timeline'
import TaskForm from '../ModalWindow/TaskForm'
import { schedule_render } from '../../lib/date_methods'
import { prep_data_timeline, formateDate, clock, time_estimate } from '../../lib/time_methods'
import { cloneDeep, insertColon } from '../../lib/tools'
import { InitialState as UXType } from './../../store/reducer/ux'
import { InitialState as UIType } from './../../store/reducer/ui'
import './Schedule.less'
import './index.css'
import { TaskType, DateTrackType, text } from '../../types/data';
export type MapPropsType = {
  calendar: any
  chosenDay: DateTrackType
  schedule: TaskType[]
  ux: UXType
  ui: UIType
}
export type DispatchPropsType = {
  taskManage: (new_calend: any) => void
  _toggleModal: () => void
  _toggleModeModal: () => void
  changeFieldsValue: (id: string, value: string) => void 
  changeCheckBox: (id: string, checked: boolean) => void
  setSimpleTaskForm: (task: TaskType) => void  
}
const Schedule: FC<MapPropsType & DispatchPropsType> = ({calendar, chosenDay, ui, ux, ...props}) => {
  const autoToggleModal = (bool: boolean): void => {    
    if(ui.modal_AS_mode === bool){
      props._toggleModal()
    } else {
      props._toggleModeModal() 
      props._toggleModal();
    }
  }
  const edit = (id: string) => {
    props.setSimpleTaskForm(schedule_render(chosenDay, calendar).filter(chosedTask => chosedTask.id === id)[0])
    autoToggleModal(false)
  }
  const inputText = (value: string, id: string) => props.changeFieldsValue(id, value)
  const setCheckBox = (checked: boolean, id: string) => props.changeCheckBox(id, checked)
  const startAdd = () => {
    autoToggleModal(true)
  }
  //chosenDay.day && console.log(time_estimate(schedule_render(chosenDay, calendar)))
  return(
    <Layout>
      <Button onClick={startAdd}>{text[ux.lang].add_task}</Button>
      <TaskForm      
        ui={ui}
        lang={ux.lang}
        inputText={inputText}
        setCheckBox={setCheckBox}
        //remove={removeTask}
      />
      <Menu theme='dark' mode="inline">                
        { props.schedule.length ? schedule_render(chosenDay, calendar).map(item =>
          <Menu.Item key={item.id} style={{ borderRadius: "0 5px 5px 0" }}
             onClick={() => edit(item.id)}>        
             <span>{item.title.toUpperCase() + 
            new Array(20).fill(String.fromCharCode(+'0160')).join('') +
              ' Start: '+ insertColon(item.start) + ' End: '+ insertColon(item.end)}</span>
          </Menu.Item>) : <Menu.Item>{text[ux.lang].no_entries}</Menu.Item> }
          { props.schedule.length ? 
          <Timeline 
              name={formateDate(ux.lang) + '  ' + clock()}
              data={schedule_render(chosenDay, calendar) ? 
              prep_data_timeline(cloneDeep(schedule_render(chosenDay, calendar)) ) : []}
            /> : <p>NO data</p> }
      </Menu>
    </Layout>
  )
}
export default Schedule