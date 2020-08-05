import React, { FC } from "react"
import { Layout, Menu, Button } from "antd"
import ModalInformer from '../ModalWindow/ModalInformer'
import TaskForm from '../ModalWindow/TaskForm'
import { ComplicatedTaskType, LocaleType, text } from './../../types/data'
import { InitialState as UIType } from './../../store/reducer/ui'
import { InitialState as UXType } from './../../store/reducer/ux'
import './ComplicatedTasks.less'

export type MapProps = {
  calendar: any
  tasks: ComplicatedTaskType[]
  lang: LocaleType
  ui: UIType
  ux: UXType
}
export type DispatchProps = {
  _remove: (id: string) => void
  _toggle: () => void
  _toggleMode: () => void
  _toggleInfoModal: () => void
  changeFieldsValue: (id: string, value: string) => void
  changeCheckBox: (id: string, checked: boolean) => void
  changeData: (data: any[]) => void
  setComplicatedTaskForm: (task: ComplicatedTaskType) => void
}
const ComplicatedTasks: FC<MapProps & DispatchProps> = ({calendar, tasks, lang, ui, ux, ...props}) => {  
  const autoToggleModal = (booline: boolean): void => {    
    if(ui.modal_ACT_mode === booline) {
      props._toggle()
    } else {
      props._toggleMode(); 
      props._toggle();
    }
  }
  const edit = (id: string): void => {
    props.setComplicatedTaskForm(tasks.filter(chosedTask => chosedTask.id === id)[0])
    props._remove(id)
    autoToggleModal(false)
  }  
  const inputText = (value: string, id: string) => props.changeFieldsValue(id, value)
  const inputDeadline = (deadline: string[]) => props.changeData(deadline)
  const setCheckBox = (checked: boolean, id: string) => props.changeCheckBox(id, checked)
    return (
      <Layout>
        <Button onClick={()=>autoToggleModal(true)}>{text[lang].add_compl}</Button>
        <TaskForm
        ui={ui} lang={lang}
          inputText={inputText}
          setCheckBox={setCheckBox} 
          inputDeadline={inputDeadline}
          //remove={removeCompl}
        />
        <ModalInformer
          visible={ui.info_modal_visible}
          lang={lang} 
          toggle={props._toggleInfoModal}
          periods={[]} 
        />
        <Layout>
          <Menu theme='dark' mode="inline">                
          {tasks.length > 0 ? tasks.map((item: ComplicatedTaskType) =>
              <Menu.Item key={item.id} style={{ borderRadius: "0 5px 5px 0" }} onClick={() => edit(item.id)}>        
                 <span>{item.title.toUpperCase()}</span>
              </Menu.Item>) : <p>{text[lang].no_entries}</p>}
          </Menu>
        </Layout>
    </Layout>
    )
  }
export default ComplicatedTasks