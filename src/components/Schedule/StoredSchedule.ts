import {connect} from 'react-redux'
import { A_CAL } from '../../store/actions/calendar'
import { A_UI } from '../../store/actions/ui'
import Schedule from './Schedule'
import { Dispatch } from 'redux'
import { MapPropsType, DispatchPropsType } from './Schedule';
import { AppStateType, CoreActionsTypes } from '../../store/store';
import { TaskType } from '../../types/data';

const StoredSchedule = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(
  (state: AppStateType) => ({    
    ui: state.ui,
    ux: state.ux,
    calendar: state.core.calendar, 
    chosenDay: state.core.chosenDay, 
    schedule: state.core.schedule
  }),  
  (dispatch: Dispatch<CoreActionsTypes>) => ({
    taskManage(new_calend: any) {
      dispatch(A_CAL.manageSimpleTask(new_calend) )
    },
    _toggleModal() {     
      dispatch(A_UI.toggleModalAST() )
    },    
    _toggleModeModal() {     
      dispatch(A_UI.toggleModeModalAST() )
    }, 
    changeFieldsValue(id: string, value: string) {
      dispatch(A_UI.changeFieldsValue(id, value) )
    },
    changeCheckBox(id: string, checked: boolean) {
      dispatch(A_UI.changeCheckBox(id, checked) )
    },
    setSimpleTaskForm(task: TaskType) {
      dispatch(A_UI.setSimpleTaskForm(task) )
    }
  })
  )(Schedule);
       
export default StoredSchedule

