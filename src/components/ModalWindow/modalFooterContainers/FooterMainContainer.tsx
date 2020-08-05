import React, { FC } from "react"
import { Layout, Button} from "antd"
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { sortByTime, changeID } from '../../../lib/tools'
import { default_weekdays, default_weekends } from '../../../lib/patterns'
import { simpleTaskFill } from '../../../lib/task_methods'
import { AppStateType, CoreActionsTypes } from '../../../store/store';
import { TaskType, LocaleType, Form, text } from '../../../types/data'
import { A_CAL } from '../../../store/actions/calendar'
import { A_UX } from '../../../store/actions/ux'
import { A_UI } from '../../../store/actions/ui'
type MapPropsFMC = {
  weekdays: TaskType[]
  weekends: TaskType[]
  switcher: boolean
  form: Form[]
  lang: LocaleType
}
type DispatchPropsFMC = {
  setPattern: (weekdays: TaskType[], weekends: TaskType[]) => void
  setWeekdays: (weekdays: TaskType[]) => void
  setWeekends: (weekends: TaskType[]) => void
  toggleMode: () => void
}
const FooterMain: FC<MapPropsFMC & DispatchPropsFMC> = ({switcher, weekends, weekdays, form, lang, toggleMode, 
  setPattern, setWeekdays, setWeekends}) => {
  const add = () => switcher ? 
  setWeekends(changeID(sortByTime([...weekends, simpleTaskFill(form)]))): 
  setWeekdays(changeID(sortByTime([...weekdays, simpleTaskFill(form)])));
  const done = () => switcher ? setPattern(weekdays, weekends) : toggleMode()
  return(
  <Layout className="footer">
      <Button onClick={add}>{text[lang].add_task}</Button>
      <Button onClick={done}>{text[lang].done}</Button>
      <Button onClick={done}>{text[lang].return}</Button>
  </Layout>
  )
}
export const FooterMainContainer = connect<MapPropsFMC, DispatchPropsFMC, {}, AppStateType>(
  (state: AppStateType) => ({
    weekdays: state.core.weekdays,
    weekends: state.core.weekends,
    switcher: state.ui.pattern_modal_mode,
    form: state.ui.formEl,
    lang: state.ux.lang
  }),  
  (dispatch: Dispatch<CoreActionsTypes>) => ({
    toggleMode() {
      dispatch(A_UI.toggleModePatternModal() )
    },
    setWeekdays(weekdays: TaskType[]) {
      dispatch(A_CAL.setWeekdaysPattern(weekdays) )
    },
    setWeekends(weekends: TaskType[]) {
      dispatch(A_CAL.setWeekendsPattern(weekends) )
    },
    setPattern(weekdays: TaskType[], weekends: TaskType[]){
      weekdays.length ? dispatch(A_CAL.setWeekdaysPattern(weekdays) ) :  
      dispatch(A_CAL.setWeekdaysPattern(default_weekdays) )                 // режим дня по умолчанию
      weekends.length ? dispatch(A_CAL.setWeekendsPattern(weekends) ) :
      dispatch(A_CAL.setWeekendsPattern(default_weekends) )                 // режим дня по умолчанию
      dispatch(A_UI.togglePatternModal() )      
      dispatch(A_UX.complFillPattern() )
    }
  })
  )(FooterMain)