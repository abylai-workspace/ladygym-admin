import React from 'react'
import './styles.css'
import { FreezeCard } from './FreezeCard'
const Freezing = () => {
  return (
    
    <div className='container-notifications'>
     <div>
        <h6>Сегодня</h6>
        <div  style={{height:550,overflow:'auto'}}>
        <FreezeCard/>
        </div>
      

      </div>
      <div>
        <h6>Вчера</h6>
        <FreezeCard/>

        
      </div>
      <div>
        <h6>TabPersonal</h6>
        <FreezeCard/>

        
      </div>
      <div>
        <h6>TabPersonal</h6>
        <FreezeCard/>

       
      </div>
    </div>
  )
}

export default Freezing