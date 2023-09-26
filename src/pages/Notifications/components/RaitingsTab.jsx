import React from 'react'
import './styles.css'
import { NotCard } from './NotCard'
const RaitingsTab = () => {
  return (
    <div className='container-notifications'>
    <div>
      <h6>Сегодня</h6>
      <div className='child-container-notifications' style={{height:550,overflow:'auto'}}>
      <NotCard/>
      <NotCard/>
      <NotCard/>
      </div>
    

    </div>
    <div>
      <h6>Вчера</h6>
      <div className='child-container-notifications' style={{height:550,overflow:'auto'}}>
      <NotCard/>
      <NotCard/>
      <NotCard/>
      </div>
    </div>
    <div>
      <h6>TabPersonal</h6>
      <div className='child-container-notifications' style={{height:550,overflow:'auto'}}>
      <NotCard/>
      <NotCard/>
      <NotCard/>
      </div>
    </div>
    <div>
      <h6>TabPersonal</h6>
      <div className='child-container-notifications' style={{height:550,overflow:'auto'}}>
      <NotCard/>
      <NotCard/>
      <NotCard/>
      </div>
    </div>
  </div>
  )
}

export default RaitingsTab