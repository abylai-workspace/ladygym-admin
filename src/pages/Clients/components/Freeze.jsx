import React from 'react'
import Modal from '../../../components/UI/modal/Modal'
import Button from '../../../components/UI/button/Button'

function Freeze({onClose}) {
  return (
    <div>
        <Modal onClose={onClose}>
          <div style={{justifyContent:'center',padding:'10px',borderRadius:'10px',alignContent:'center',alignItems:'center',alignSelf:'center'}}>
            <h1 style={{color:'white',textAlign:'center'}}>До какого числа заморозить?</h1>
            <input style={{width:'70%',height:'100%',marginBottom:'5%',backgroundColor:'#212122',padding:'10px',borderRadius:'10px',color:'white',alignContent:'center',marginLeft:'15%',marginTop:'3%',border:'none'}} type='date'/>
            
<Button>Заморозить</Button>
          </div>
            
        </Modal>
    </div>
  )
}

export default Freeze