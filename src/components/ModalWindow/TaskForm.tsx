import React, { FC, Fragment } from "react"
import cn from 'classnames'
import { Layout, Modal, Input, Checkbox, Tooltip, DatePicker, Menu } from "antd"
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { RangePickerPresetRange } from 'antd/lib/date-picker/interface'
import { FooterMainContainer } from './modalFooterContainers/FooterMainContainer'
import { FooterSheduleContainer } from './modalFooterContainers/FooterSheduleContainer'
import { FooterComplContainer } from './modalFooterContainers/FooterComplContainer'
import { number_validation, string_validation, date_validation } from '../../lib/validation'
import { schedule_render } from '../../lib/date_methods'
import { InitialState as UIType } from './../../store/reducer/ui'
import { insertColon } from "../../lib/tools"
import './taskForm.less'
import { Form, ModalProps, LocaleType, text } from '../../types/data'
const { RangePicker } = DatePicker
//import locale from 'antd/es/date-picker/locale/zh_CN';
const ModalTaskForm: FC<ModalProps> = ({ui, lang, inputText, setCheckBox, inputDeadline, ...props}) => {
  const {modal_AS_visible: sw3, modal_AS_mode: sw4, modal_ACT_visible: sw5, modal_ACT_mode: sw6, 
         pattern_modal_visible: sw7, pattern_modal_mode: sw8, modalType} = ui
  const modal_container = cn({'modal': modalType !== '1', 'start_modal': modalType === '1'})
  const modal_input = cn({'modal-input': modalType !== '1', 'start-modal-input': modalType === '1'})
  const modal_list = cn({'modal_list': modalType !== '1', 'start_modal_list': modalType === '1'})
  const inputDate = (date: RangePickerPresetRange, d_str: string[]): void => inputDeadline && inputDeadline(d_str)
  const inputTask = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {value, id}: {value: string, id: string} = e.currentTarget
    inputText(value, id)
  }  
  const checkTask = (e: CheckboxChangeEvent): void => {
    const {checked, id}: {checked: boolean, id?: string} = e.target
    id && setCheckBox(checked, id)
  }
  const getTitleModal = (ui: UIType, modalType: string, lang: LocaleType) => {
    switch(modalType){
      case '1': return sw8 ? text[lang].weekends : text[lang].weekdays
      case '2': return sw4 ? text[lang].modal_title : text[lang].edit_task
      case '3': return sw6 ? text[lang].modal_title : text[lang].edit_task
      default: return 'Unknown modalType'
    }
  }
  const getVisibleModal = (modalType: string) => {
    switch(modalType){
      case '1': return sw7
      case '2': return sw3
      case '3': return sw5
      default: return false
    }
  }
  const validationInput = (str: string) => {    
    if(~['labour', 'importance'].indexOf(str)){
      return number_validation(str) ? str: `${text[lang][str]} ${text[lang].wrong}`
    } else if(~['time'].indexOf(str)) {
      if(props.core) {
        return date_validation(str, schedule_render(props.core.chosenDay, props.core.calendar)) ? str: `${text[lang][str]} ${text[lang].wrong}`
      } else {
        return str
      }
    } else {
      return string_validation(str) ? str: `${text[lang][str]} ${text[lang].wrong}`
    }
  }
  const buildFormElementFrom = (el: Form) => {
    let isTime = el.field === 'start'||el.field === 'end'
    switch(el.tag){
      case 'input': return <Tooltip
                            trigger='focus'
                            title={validationInput(el.field)}
                            placement="topLeft"
                            overlayClassName={`${el.field}-input`}
                            key={el.id}>
                           <Input addonBefore={text[lang][el.field]} type={isTime ? 'time' : ''}
                            onChange={inputTask} id={el.id} className='input' size='large'
                            placeholder={text[lang].insert+' '+text[lang][el.field]}
                            value={isTime ? insertColon(el.value) : el.value} />
                           </Tooltip>
      case 'checkbox': return <Checkbox onChange={checkTask} id={el.id} key={el.id} checked={el.checked}>                                  
                                {text[lang][el.field]}
                              </Checkbox>
      case 'data-picker': return <Fragment key={el.id}>
        <DatePicker showTime id={el.id} placeholder={text[lang].dedline} disabled={true} /><br />
                                    <RangePicker
                                      showTime={{format: 'HH:mm'}}
                                      format="YYYY-MM-DD HH:mm"
                                      placeholder={[text[lang].cal_start, text[lang].cal_end]}
                                      onChange={inputDate}/>
                                  </Fragment>
      default: return <p>Error: el tag undefined!</p>
    }
  }
  return(
    <Modal
      closable={false}
      title={getTitleModal(ui, modalType, lang)} 
      visible={getVisibleModal(modalType)}
      footer={modalType === '1'? <FooterMainContainer /> :  
      modalType === '2' ? <FooterSheduleContainer /> : <FooterComplContainer />}
      centered={true}>
        <Layout className={modal_container}>
          <Layout className={modal_input}>
            {ui.formEl.map((el: Form) => buildFormElementFrom(el))}
          </Layout>
           <Layout className={modal_list}>
              {sw7 && props.core && <Menu theme='dark' mode="inline">                
                        {props.core[sw8 ? 'weekends': 'weekdays'].length ? 
                        props.core[sw8 ? 'weekends': 'weekdays'].map(item=>
                        <Menu.Item key={item.id} style={{ borderRadius: "0 5px 5px 0" }} 
                          onClick={() => props.remove && props.remove(+item.id)}>        
                          <span>{`${item.title.toUpperCase()} Start: ${insertColon(item.start)}`}</span>
                        </Menu.Item>) : <Menu.Item>{text[lang].no_entries}</Menu.Item>}
                </Menu>} 
            </Layout>
        </Layout>
    </Modal>
  )
}
export default ModalTaskForm
