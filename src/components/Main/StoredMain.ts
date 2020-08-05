import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { AppStateType, CoreActionsTypes } from '../../store/store';
import { DateTrackType, TaskType, LocaleType } from '../../types/data'
import { A_CAL } from '../../store/actions/calendar'
import { A_UX } from '../../store/actions/ux'
import { A_UI } from '../../store/actions/ui'
import Main, { MapPropsType, DispatchPropsType} from './Main'

const StoredMain = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(
  (state: AppStateType) => ({
    core: state.core,
    ui: state.ui,
    ux: state.ux,
  }),  
  (dispatch: Dispatch<CoreActionsTypes>) => ({
    _setCalendar(calendar: any) {     
      dispatch(A_CAL.setCalendar(calendar) )
    },
    _choseDay(day: DateTrackType) {
     dispatch(A_CAL.choseDay(day) )
    },
    _langChange(lang: LocaleType) {
     dispatch(A_UX.langChange(lang) )
    },
    _setSchedule(schedule: TaskType[]) {     
      dispatch(A_CAL.setSchedule(schedule) )
    },    
    togglePatternModal() {    
    dispatch(A_UI.togglePatternModal() )
    },
    _setWeekdaysPattern(weekdays: TaskType[]) {
      dispatch(A_CAL.setWeekdaysPattern(weekdays) )
    },
    _setWeekendsPattern(weekends: TaskType[]) {
      dispatch(A_CAL.setWeekendsPattern(weekends) )
    },
    changeFieldsValue(id: string, value: string) {
      dispatch(A_UI.changeFieldsValue(id, value) )
    },
    changeCheckBox(id: string, checked: boolean) {
      dispatch(A_UI.changeCheckBox(id, checked) )
    }
  })
  )(Main)
    
export default StoredMain
  
  

  