import React, { useEffect, FC } from "react";
import { Layout, Calendar } from "antd";
import { schedule_render, buildIterDate } from '../../lib/date_methods'
import { InitialState as UXType } from './../../store/reducer/ux'
import { TaskType, DateTrackType } from "../../types/data"
import moment, { Moment } from 'moment'
const { Sider } = Layout
type PropsType = {
  schedule: TaskType[]
  chosenDay: DateTrackType
  calendar: any
  ux: UXType
  choseD: (day: DateTrackType) => void
  setSched: (schedule: TaskType[]) => void
}
const SideBar: FC<PropsType> = ({schedule, chosenDay, calendar, ux, choseD, setSched}) => {
  useEffect(() => {
    if(!schedule.length && ux.completedFillPattern ){
        handleClick(moment())
      }
    }
  )
  const handleClick = (dateString: Moment|undefined): void => {
    dateString && choseD(buildIterDate(new Date(dateString.format('YYYY MM DD') ) ) )
    setSched(schedule_render(chosenDay, calendar))    
  }
    return (
      <Sider width={320} style={{ background: "#fff" }} breakpoint="sm" collapsedWidth="0">
         <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
          <Calendar fullscreen={false} onChange={handleClick} className='calendar' />
        </div>       
      </Sider>
    );
  }
export default SideBar
