import React, { FC } from 'react';
import { Layout, Button, Modal } from 'antd';
import { Informer } from '../Informer/Informer'

export type InformerProps = {
  /*  getDesidion: (val: number) => void
  setPeriod: (period: number) => void*/
  lang: string
  periods: any[]
  visible: boolean//ui.info_modal_visible
  toggle: () => void
}

const ModalInformer: FC<InformerProps> = ({lang, periods, visible, toggle}) => {
  return(<Layout></Layout>
    /*
    <Modal
          title={text[lang][info.console]} 
          visible={visible}
          centered={true}
          onCancel={toggle}
          footer={             
         <Layout className="footer">
                <Button onClick={toggle}>{text[lang].add}</Button>
                <Button onClick={toggle}>{text[lang].return}</Button>
        </Layout>}
        >
          <Informer 
            lg={lang} 
            text={text} 
            info={info} 
            setPeriod={setPeriod} 
            getDesidion={getDesidion} 
            periods={[]} />          
    </Modal>
    */
  )
}
export default ModalInformer