
import { Dispatch } from 'redux'
import ComplicatedTasks, { MapProps, DispatchProps} from './ComplicatedTasks'
import { AppStateType, CoreActionsTypes } from '../../store/store';
import { ComplicatedTaskType } from '../../types/data';
import { connect } from 'react-redux'
import { A_CAL } from '../../store/actions/calendar'
import { A_UI } from '../../store/actions/ui'

const StoredComplTasks = connect<MapProps, DispatchProps, {}, AppStateType>(
  (state: AppStateType) => ({
      calendar: state.core.calendar,
      tasks: state.core.tasks,
      lang: state.ux.lang,
      ui: state.ui,
      ux: state.ux
  }),  
  (dispatch: Dispatch<CoreActionsTypes>) => ({
    _remove(id: string) {
      dispatch(A_CAL.removeComplicatedTask(id) )
    },
    _toggle() {
      dispatch(A_UI.toggleModalACT() )
    },
    _toggleMode() {
      dispatch(A_UI.toggleModeModalACT() )
    },
    _toggleInfoModal() {
      dispatch(A_UI.toggleInfoModal() )
    },
    changeData(data: any[]) {
      dispatch(A_UI.changeData(data) )
    },
    changeFieldsValue(id: string, value: string) {
      dispatch(A_UI.changeFieldsValue(id, value) )
    },
    changeCheckBox(id: string, checked: boolean) {
      dispatch(A_UI.changeCheckBox(id, checked) )
    },
    setComplicatedTaskForm(task: ComplicatedTaskType) {
      dispatch(A_UI.setComplicatedTaskForm(task) )
    }
  })
  )(ComplicatedTasks)
   
export default StoredComplTasks