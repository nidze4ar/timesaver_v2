import React, { FC, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Layout, Select } from "antd"
import StoredSchedule from "../Schedule/StoredSchedule"
import StoredComplTasks from "../ComplicatedTasks/StoredComplTasks"
import StoreStat from "../../store/container/StoreStat"
import StoredPatternPref from "../../store/container/StoredPatternPref"
import StoredTEP from "../../store/container/StoredTEP"
import SideBar from "../SideBar/SideBar"
import Navigation from '../Navigation/Navigation'
import { fill_calendar } from '../../lib/date_methods'

import { TaskType, DateTrackType, LocaleType, text } from './../../types/data'
import  './Main.less'
import { InitialState as coreType} from './../../store/reducer/calendar'
import { InitialState as uiType } from './../../store/reducer/ui'
import { InitialState as uxType } from './../../store/reducer/ux'
import TaskForm from '../ModalWindow/TaskForm'

import BarChartV4 from './../../components/ModalWindow/graphs/ScheduleTask'
const { Header, Content, Footer } = Layout
const { Option } = Select
export type MapPropsType = {
  core: coreType
  ui: uiType
  ux: uxType
}
export type DispatchPropsType = {
  _setCalendar: (calendar: any) => void
  _choseDay: (day: DateTrackType) => void
  _langChange: (lang: LocaleType) => void
  _setWeekdaysPattern: (weekdays: TaskType[]) => void
  _setSchedule: (schedule: TaskType[]) => void
  _setWeekendsPattern: (weekends: TaskType[]) => void
  changeFieldsValue: (id: string, value: string) => void
  changeCheckBox: (id: string, checked: boolean) => void
  togglePatternModal: () => void
}
const Main: FC<MapPropsType & DispatchPropsType> = props => {
  const {core, ui, ux, _setCalendar, _choseDay, _langChange, _setWeekdaysPattern,
     _setSchedule, _setWeekendsPattern, changeFieldsValue, changeCheckBox,
      togglePatternModal} = props 
  const { weekdays, weekends } = core  
  useEffect(() => {
    const startCondition = Object.entries(core.calendar).length === 0 && ux.completedFillPattern
    if(!ui.start && (!weekdays.length || !weekends.length) ) togglePatternModal();
    if(startCondition) _setCalendar(fill_calendar(weekdays, weekends) )
  })
  const remove = (id?: number) => ui.pattern_modal_mode ? _setWeekendsPattern(weekends
    .filter( (task: TaskType) => +task.id !==id ) ) : _setWeekdaysPattern(weekdays
    .filter( (task: TaskType)=> +task.id !== id) )
  const langChange = (e: LocaleType) => _langChange(e)
  const inputText = (value: any, id: string) => changeFieldsValue(id, value)
  const setCheckBox = (checked: any, id: string) => changeCheckBox(id, checked)
  return ( 
      <Router>               
          <Layout className="time_saver">
            <Header className="time_saver_header">
              <h1>{text[ux.lang].title}</h1>
              <Select defaultValue={ux.lang} onChange={langChange} className='langChange'>
                <Option value="En">English</Option>
                <Option value="Ru">Русский</Option>
                <Option value="es">Espanol</Option>
                <Option value="fr">Franch</Option>
                <Option value="de">German</Option>
                <Option value="zh">zh-Hans</Option>               
              </Select>
            </Header> 
            <Navigation lang={ux.lang} text={text} />           
            <Content className="time_saver_content">
            <Layout>
              <SideBar 
                choseD={_choseDay} 
                setSched={_setSchedule} 
                schedule={core.schedule} 
                chosenDay={core.chosenDay} 
                calendar={core.calendar} 
                ux={ux}
              />
              <Switch>
                  <Route exact path='/' component={StoredSchedule}/>
                  <Route path='/compl' component={StoredComplTasks}/>
                  <Route path='/stat' component={StoreStat}/>
                  <Route path='/set' component={StoredPatternPref}/>
                  <Route path='/tep' component={StoredTEP}/>
                </Switch>                
                <TaskForm
                  core={core}                  
                  ui={ui}
                  lang={ux.lang}
                  inputText={inputText}
                  setCheckBox={setCheckBox}
                  remove={remove}
                />
                
                <BarChartV4 
                data={[15, 8, 42, 4]}               
                width='600'
                height='300'
                animDuration='30'
                />
              </Layout> 
            </Content>
            <Footer className="time_saver_footer">&copy; My Company</Footer>
          </Layout>        
      </Router>
    );
  }
export default Main

