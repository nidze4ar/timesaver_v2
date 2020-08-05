import React, { FC } from "react"
import { Layout, Button} from "antd"
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { add_task, remove_task, edit_task, simpleTaskFill } from '../../../lib/task_methods'
import { rand } from '../../../lib/tools'
import { AppStateType, CoreActionsTypes } from '../../../store/store';
import { LocaleType, Form, DateTrackType, text } from '../../../types/data'
import { A_CAL } from '../../../store/actions/calendar'
import { A_UI } from '../../../store/actions/ui'
type MapPropsFSC = {
  switcher: boolean
  form: Form[]
  lang: LocaleType
  calendar: any
  chosenDay: DateTrackType
}
type DispatchPropsFSC = {
  taskManage: (new_calend: any) => void
  _toggleModal: () => void
  cancelModal: () => void
  _toggleModeModal: () => void
  endEditTaskForm: () => void
}
export const FooterShedule: FC<MapPropsFSC & DispatchPropsFSC> = ({switcher, form, lang, chosenDay, calendar, ...props}) => {  
  const addSimpleTask = () => closeModalWith(add_task( calendar, chosenDay, simpleTaskFill(form) ) )  
  const closeModalWith = (calendar: any) => {
    props.taskManage(calendar)
    props._toggleModal()
    props.endEditTaskForm()
  } 
  const finalEditTask = () => {
    props.taskManage(remove_task(calendar, chosenDay, form[1].value && form[1].value ) )
    closeModalWith(add_task(calendar, chosenDay, simpleTaskFill(form) ) )
  }
  const btnRemoveClick = (e: React.MouseEvent<HTMLElement>) => closeModalWith(remove_task(calendar, chosenDay, form[1].value && form[1].value ) )
  if(switcher) {
    return (
      <Layout className="footer">
            <Button onClick={addSimpleTask}>{text[lang].add_task}</Button>
            <Button onClick={props.cancelModal}>{text[lang].return}</Button>
      </Layout>
    )
  } else {
    return (
      <Layout className="footer">
        <Button onClick={props.cancelModal}>{text[lang].return}</Button>
        <Button onClick={finalEditTask}>{text[lang].edit}</Button>
        <Button onClick={btnRemoveClick}>{text[lang].delete}</Button>
      </Layout>
    )
  }   
}
export const FooterSheduleContainer = connect<MapPropsFSC, DispatchPropsFSC, {}, AppStateType>(
  (state: AppStateType) => ({
    calendar: state.core.calendar,
    chosenDay: state.core.chosenDay, 
    switcher: state.ui.modal_AS_mode,
    form: state.ui.formEl,
    lang: state.ux.lang
  }),  
  (dispatch: Dispatch<CoreActionsTypes>) => ({
    taskManage(new_calend: any) {
      dispatch(A_CAL.manageSimpleTask(new_calend) )
    },
    _toggleModal() {     
      dispatch(A_UI.toggleModalAST() )
    },
    cancelModal() {
      dispatch(A_UI.cancelModalAST() )
    },
    _toggleModeModal() {     
      dispatch(A_UI.toggleModeModalAST() )
    },
    endEditTaskForm() {
      dispatch(A_UI.endEditTaskForm() )
    }
  })
  )(FooterShedule)