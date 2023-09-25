import React, { useEffect, useMemo, useState } from 'react'
import Modal from '../../../components/UI/modal/Modal'
import Button from '../../../components/UI/button/Button'
import { instance } from '../../../config/api'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const CreateTask = ({onClose,selectedOption}) => {
    const user=useSelector((state) => state?.auth);
    const token=user.token || null
    const [description, setDescription] = useState('');
    const id=selectedOption?.value
    const [selectedDate, setSelectedDate] = useState('2023-09-30'); // Initialize with your date in "YYYY-MM-DD" format
    const [formattedDate, setFormattedDate] = useState(''); // Initialize with an empty string
  
    // useEffect to format the date for display when 'selectedDate' changes
    useEffect(() => {
      if (selectedDate) {
        const dateParts = selectedDate.split('-');
        if (dateParts.length === 3) {
          const [year, month, day] = dateParts;
          const formatted = `${day}-${month}-${year}`;
          setFormattedDate(formatted);
        }
      } else {
        setFormattedDate('');
      }
    }, [selectedDate]);
  
    const handleDateChange = (event) => {
      setSelectedDate(event.target.value);
    };
    
    
    const postTask=()=>{
        const data={
            sum:description,
            date:formattedDate
        }
        try {
            const response=instance.post(`/gym/financials/create/${id}`,data,{
                headers:{
                    Authorization: `Bearer ${token}`
                }

            })
            .then(res=>{
                console.log(res)
                if (res.status===200){
                    toast.success('Задание успешно создано!')
                    onClose()
                }
                if(res.status===404 && res.statusText==='Not Found'){
                    toast.error('Задание не создано!')
                }
            })
            
           if(response.status===404 && response.statusText==='Not Found'){
               toast.error('Задание не создано!')
           }
           return response
            
        } catch (error) {
            console.log(error)
           
            
        }
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
      };

     
  return (
    <Modal title='Создать фин. план' onClose={onClose}>
      <div>
        <h5>Сумма</h5>
       <input type="text" style={{width:'100%',height:40,backgroundColor:'#212122',color:'white',padding:'10px',borderRadius:'10px',marginBottom:'4%'}} value={description} onChange={handleDescriptionChange}/>
        <h5>Крайний срок</h5>
       <input type="text" style={{width:'100%',height:40,backgroundColor:'#212122',color:'white',padding:'10px',borderRadius:'10px',marginBottom:'4%'}} value={selectedDate} onChange={handleDateChange} type="date"/>

      </div>
      <Button onClick={postTask}>Создать</Button>
      
    </Modal>
  )
}

export default CreateTask
