import React, { FC } from "react"
import { Layout, Button} from "antd"
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { complTaskFill } from '../../../lib/task_methods'
import { checkFreeTime, checkMaxFreeTime } from '../../../lib/date_methods'
import { FillTaskInIterDay, dysplaySchedule } from '../../../lib/middleware'
import { AppStateType, CoreActionsTypes } from '../../../store/store'
import { TaskType, LocaleType, Form, DateTrackType, ComplicatedTaskType, Settings, text, GapTime, info } from '../../../types/data'
import { A_CAL } from '../../../store/actions/calendar'
import { A_UI } from '../../../store/actions/ui'
import { InitialState as UIType } from './../../../store/reducer/ui'
import { InitialState as UXType } from './../../../store/reducer/ux'

type MapPropsFCC = {
  calendar: any
  tasks: ComplicatedTaskType[]
  ux: UXType
  ui: UIType
}
type DispatchPropsFCC = {
  _add: (task: ComplicatedTaskType) => void
  _remove: (id: string) => void
  _cancel: () => void
  _toggle: () => void
  endEditTaskForm: () => void
  runEstimateTask: (set: Settings) => void
}

const FooterCompl: FC<MapPropsFCC & DispatchPropsFCC> = ({calendar, tasks, ui, ux, ...props}) => {
  const finalize = (func: (arg: any) => void, arg: any) => {
    func(arg)
    props._toggle()
    props.endEditTaskForm()
  } 
  const addCompl = () => finalize(props._add, complTaskFill(ui.formEl) )
  const removeComplTask = (): void => finalize(props._remove, ui.formEl[1].value)  
  const finalEdit = (): void => finalize(props._add, complTaskFill(ui.formEl) )
  const estimate = (): void => {
    const set = {task: complTaskFill(ui.formEl), calendar, ui, ux, info}
    props._remove(ui.formEl[1].value)
    props.runEstimateTask(set)
    props._toggle()
  }  
  const btnRemoveClick = (e: React.MouseEvent<HTMLElement>) => removeComplTask()
  if(ui.modal_ACT_mode) {
    return (
      <Layout className="footer">
            <Button onClick={addCompl}>{text[ux.lang].add}</Button>
            <Button onClick={props._cancel}>{text[ux.lang].return}</Button>
      </Layout>
    )
  } else {
    return (
      <Layout className="footer">
        <Button onClick={estimate}>{text[ux.lang].estimate}</Button>
        <Button onClick={props._cancel}>{text[ux.lang].return}</Button>
        <Button onClick={finalEdit}>{text[ux.lang].edit}</Button>
        <Button onClick={btnRemoveClick}>{text[ux.lang].delete}</Button>
      </Layout>
    )
  }   
}
export const FooterComplContainer = connect<MapPropsFCC, DispatchPropsFCC, {}, AppStateType>(
  (state: AppStateType) => ({
    calendar: state.core.calendar,
      tasks: state.core.tasks,
      ui: state.ui,
      ux: state.ux
  }),  
  (dispatch: Dispatch<CoreActionsTypes>) => ({
    _add(task: ComplicatedTaskType) {
      dispatch(A_CAL.addComplicatedTask(task) )
    },   
    runEstimateTask(set: Settings) {
      checkMaxFreeTime(set) && dispatch(A_CAL.manageSimpleTask(FillTaskInIterDay(dysplaySchedule(set))) )
    },
    _remove(id: string) {
      dispatch(A_CAL.removeComplicatedTask(id) )
    },
    _toggle() {
      dispatch(A_UI.toggleModalACT() )
    },
    _cancel() {
      dispatch(A_UI.cancelModalACT() )
    },
    endEditTaskForm() {
      dispatch(A_UI.endEditTaskForm() )
    }
  })
  )(FooterCompl)

