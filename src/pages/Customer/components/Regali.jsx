import React from 'react'
import Modal from '../../../components/UI/modal/Modal'
import { Icon } from '@iconify/react'

function Regali({data,onClose}) {
  return (
    <Modal title='Регалии' onClose={onClose}>
        <div style={{display:'flex',justifyContent:'space-between',backgroundColor:'#212122',padding:'10px',borderRadius:'10px'}}>
            <h5 className='text-center'>Справки</h5>
            <Icon icon='material-symbols:download' width="24" color="white"/>
        </div>

    </Modal>
  )
}

export default Regali