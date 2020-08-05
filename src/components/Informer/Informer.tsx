import React, { useState, FC } from 'react';
import { Layout, Radio, Button } from 'antd';
import { rand } from '../../lib/tools'
import './Informer.less'
const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
}
type ResultMessageProps = {
  message: string,
  result: number,
  //mainL: MultiLocaleType,
  lg: string
}
/*
const ResultMessage: FC<ResultMessageProps> = props => <Layout><p>{ props.message } { props.result }</p></Layout>
type IEFreeTimeProps = {
  mainL: MultiLocaleType
  getDesidion: (val: number) => void
  lg: string
}
 const InformerFreeTime: FC<IEFreeTimeProps> = props => {
  const { mainL, lg, getDesidion } = props
  const [val, setVal] = useState(0)
  const onChange = (e: any) => setVal(e.target.value)
  const chooseDesidion = () => getDesidion(val)
  return(
    <Layout>
      <p>{mainL[lg].free_time_title}</p>
      <Radio.Group onChange={onChange} value={val}>
        <Radio style={radioStyle} value={1}>
          {mainL[lg].free_time_cancel}
        </Radio>
        <Radio style={radioStyle} value={2}>
          {mainL[lg].free_time_fuckup_dedline}
        </Radio>
        <Radio style={radioStyle} value={3}>
          {mainL[lg].free_time_increase}
        </Radio>
        <Radio style={radioStyle} value={4}>
          {mainL[lg].free_time_ignore}
        </Radio>
        <Radio style={radioStyle} value={5}>
          {mainL[lg].free_time_decrease}
        </Radio>
        <Radio style={radioStyle} value={6}>
          {mainL[lg].free_time_discrete}
        </Radio>
        <Radio style={radioStyle} value={9}>
          dysplaySchedule
        </Radio>       
      </Radio.Group>
      <Button type="primary" onClick={chooseDesidion}>{mainL[lg].choose}</Button>
    </Layout>
  )
}
type IThroughtTime = {
  
  mainL: MultiLocaleType
  getDesidion: (val: number) => void
  lg: string
}
 const InformerThroughtTime: FC<IThroughtTime> = props => {
  const { mainL, getDesidion, lg } = props
  const [val, setVal] = useState(0)
  const onChange = (e: any) => setVal(e.target.value)
  const chooseDesidion = () => getDesidion(val)
  return(
    <Layout>
      <p>В размечаемом периоде недостаточно свободного времени.
        Выберете решение:
      </p>
      <Radio.Group onChange={onChange} value={val}>
        <Radio style={radioStyle} value={1}>
          {mainL[lg].free_time_cancel}
        </Radio>
        <Radio style={radioStyle} value={2}>
          {mainL[lg].free_time_fuckup_dedline}
        </Radio>
        <Radio style={radioStyle} value={3}>
          {mainL[lg].free_time_increase}
        </Radio>
        <Radio style={radioStyle} value={4}>
          {mainL[lg].free_time_ignore}
        </Radio>
        <Radio style={radioStyle} value={5}>
          {mainL[lg].free_time_discrete}
        </Radio>
        <Radio style={radioStyle} value={6}>
          {mainL[lg].free_time_decrease}
        </Radio>       
      </Radio.Group>
      <Button type="primary" onClick={chooseDesidion}>Choose</Button>
    </Layout>
  )
}
type ITotalTime = {
  mainL: MultiLocaleType
  getDesidion: (desId: number) => void
  lg: string
}
 const InformerTotalTime: FC<ITotalTime> = props => {
  const { mainL, getDesidion, lg } = props 
  const [val, setVal] = useState(0)
  const onChange = (e: any) => setVal(e.target.value)
  const chooseDesidion = () => getDesidion(val)
  return(
    <Layout>
      <p>В размечаемом периоде недостаточно свободного времени.
        Выберете решение:
      </p>
      <Radio.Group onChange={onChange} value={val}>
        <Radio style={radioStyle} value={1}>
          Отменить выполнение
        </Radio>
        <Radio style={radioStyle} value={2}>
          Отсрочить дедлайн 
        </Radio>
        <Radio style={radioStyle} value={3}>
          Увеличить свободное место периода
        </Radio>
        <Radio style={radioStyle} value={4}>
          Игнорировать недостаток свободного времени
        </Radio>
        <Radio style={radioStyle} value={5}>
          Уменишить трудоемкость задачи
        </Radio>
        <Radio style={radioStyle} value={6}>
          Записывать задачу раздельно в течении одного дня
        </Radio>       
      </Radio.Group>
      <Button type="primary" onClick={chooseDesidion}>Choose</Button>
    </Layout>
  )
}
type IDoneThroughTime = {
  periods: any
  setPeriod: (period: number) => void
  lg: string
  mainL: MultiLocaleType 
}
const InformerDoneThroughTime: FC<IDoneThroughTime> = props => {
  const { periods, setPeriod, mainL, lg } = props
  const [per, setPer] = useState(0)
  const onChange = (e: any) => setPer(e.target.value)
  const choosePeriod = () => setPeriod(per)
  return(
    <Layout className='lay_throughTime'>
      <p>
        Выберете сквозной период:
      </p>
      <Radio.Group className='rg_throughTime' onChange={onChange} value={per}>
      {periods ? periods.map((v: any) => 
        <Radio value={v.start} key={rand()} className='r_throughTime'>
          <p>{`${v.start}-${Math.ceil(v.freeIime)}`}</p>
        </Radio>) : <div>No</div>}
      </Radio.Group>
      <Button type="primary" onClick={choosePeriod}>Choose период</Button>
    </Layout>
  )
}
type IDysplaySchedule = {
  periods: any
  mainL: MultiLocaleType
  lg: string
}
const InformDysplayRes: FC<IDysplaySchedule> = props => (
  <Layout>
    {props.periods.map((v: any) =><Radio>{v[0].title}</Radio>)}
  </Layout>
)    
type InformerPropsType = {
  info: InitialState,
  getDesidion: (val: number) => void
  setPeriod: (period: number) => void
  lg: string,
  mainL: MultiLocaleType
  periods: any[]
}
/*
export const Informer: FC<InformerPropsType> = props => {
   const { info, getDesidion, setPeriod, lg, mainL, periods } = props
   const error = info.console 
   const tempArr = info.tempNumArr 
   const result = info.tempNum 
   switch(error){     
    case "error_deadline": 
    case "error_non_dedline" : 
    case "done_decrease_task_labour": 
    case "done_increase_task_labour": 
    return(
      <Layout className='inf-result'>
        <ResultMessage message={error} result={result} lg={lg} mainL={mainL} />
      </Layout>
    )
     case "error_free_time": return(
      <Layout className='inf-error-free-time'>
        <InformerFreeTime getDesidion={getDesidion} lg={lg} mainL={mainL} />
      </Layout>
    )
    case "error_throught_time" : return(
      <Layout className='inf-error-throught-time'>
        <InformerThroughtTime lg={lg} mainL={mainL} getDesidion={getDesidion} />
      </Layout>
    )
    case "error_total_time": return(
      <Layout className='inf-error-total-time'>
        <InformerTotalTime lg={lg} mainL={mainL} getDesidion={getDesidion} />
      </Layout>
    )
    case "done_dysplay_schedule": return(
      <Layout>
        <InformDysplayRes lg={lg} mainL={mainL} periods={periods} />
      </Layout>
    )
    // не подходит
    case "done_abort_purpose": return(
      <Layout>
        <InformerDoneThroughTime periods={tempArr} setPeriod={setPeriod} lg={lg} mainL={mainL} />
      </Layout>
    )
    // не подходит
    case "done_postponemented": return(
      <Layout>
        <p>Done:_successfully</p>
      </Layout>
    )    
    default: return(
      <Layout>
        <p>NULL</p>
      </Layout>
    )  
   }  
}

*/
type InformerPropsType = {
  getDesidion: (val: number) => void
  setPeriod: (period: number) => void
  lg: string,
  periods: any[]
}
export const Informer: FC<InformerPropsType> = props => <h1>12365</h1>
