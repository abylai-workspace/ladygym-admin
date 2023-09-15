import React from 'react'
import Modal from '../../../components/UI/modal/Modal'
import Button from '../../../components/UI/button/Button'
import ReactStars from 'react-stars'
import './style.css'
function UserInfo({data,onClose}) {
  console.log(data);
  return (
    <div>
        <Modal title={data.username} onClose={onClose}>
          <Button onClick={onClose}>Изменить фото</Button >
          <h5>О тренере</h5>
          <textarea style={{width:'100%',height:'100%',backgroundColor:'#212122',padding:'10px',borderRadius:'10px',color:'white'}} value={data.userAgent}>
          </textarea>
          <h5>Расписание</h5>
          <input style={{width:'100%',height:'100%',backgroundColor:'#212122',padding:'10px',borderRadius:'10px',color:'white',border:'none'}} value={data.ein}/>
          <input style={{width:'100%',height:'100%',backgroundColor:'#212122',padding:'10px',borderRadius:'10px',color:'white',border:'none',marginTop:'10px'}} value={data.birthDate}/>

          <section class="card">
  <div class="card--content">
    <h5>Тренер</h5>
    <ReactStars
  count={5}
  // onChange={ratingChanged},
  size={14}
  color2={'#CF5490'} />
  <h5>Прекрасный тренер, все понравилось!</h5>
  </div>
  <div class="card--content">
    <h5>Тренер</h5>
    <ReactStars
  count={5}
  // onChange={ratingChanged},
  size={14}
  color2={'#CF5490'} />
  <h5>Прекрасный тренер, все понравилось!</h5>
  </div>
  <div class="card--content">
    <h5>Тренер</h5>
    <ReactStars
  count={5}
  // onChange={ratingChanged},
  size={14}
  color2={'#CF5490'} />
  <h5>Прекрасный тренер, все понравилось!</h5>
  </div>
  <div class="card--content">
    <h5>Тренер</h5>
    <ReactStars
  count={5}
  // onChange={ratingChanged},
  size={14}
  color2={'#CF5490'} />
  <h5>Прекрасный тренер, все понравилось!</h5>
  </div>
  <div class="card--content">
    <h5>Тренер</h5>
    <ReactStars
  count={5}
  // onChange={ratingChanged},
  size={14}
  color2={'#CF5490'} />
  <h5>Прекрасный тренер, все понравилось!</h5>
  </div>
</section>

          <Button onClick={onClose}>Сохранить</Button >

        </Modal>
      
    </div>
  )
}

export default UserInfo
