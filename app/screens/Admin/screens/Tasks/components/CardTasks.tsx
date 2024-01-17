import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Slider from '@react-native-community/slider';
import { instance } from 'utils/axios';
import { storageReadItem } from 'utils/asyncStorage';
import { ROLE, TOKEN_KEY } from 'constants/constants';

const CardTasks = ({data}) => {
    const [token,setToken]=useState('')
    const [role,setRole]=useState('')
   useEffect(()=>{
    storageReadItem(TOKEN_KEY,ROLE).then((token)=>{
        setToken(token)
      })
   },[data,token])
   storageReadItem(ROLE,TOKEN_KEY).then((token)=>{
    setRole(token)
  })
    const onWaitingTask =useCallback(async(task) => {
        try {
            const response = await instance.post(`/gym/tasks/status/${task?.id}?status=IN_PROGRESS`,
            {},
            {
             headers:{
               Authorization: `Bearer ${token}`
             }
            })
            console.log(response)
            
        } catch (error) {
            
        }
    },[token])

  
    const onCompletedTasks = useCallback(async(task) => {
       
        try {
        const response = await instance.post(`/gym/tasks/status/${task?.id}?status=COMPLETED`,
        {},
        {
         headers:{
           Authorization: `Bearer ${token}`
         }
        })
        console.log(response)
     
        } catch (error) {
         console.log(error)
         
        }
     },[token])
 const cardData=data?.reverse()
  return (
    <>
      {cardData?.map((item, index) => {
        let sliderValue = 0;
        let wainting
        let prrogress
        let finish

        if (item?.status === 'WAITING') {
          sliderValue = 0;
          wainting = '#fff';
          prrogress = 'rgba(255, 255, 255, 0.2)';
          finish = 'rgba(255, 255, 255, 0.2)';
        } else if (item?.status === 'IN_PROGRESS') {

          sliderValue = 50;
          wainting = '#fff';
          prrogress = '#fff';
          finish = 'rgba(255, 255, 255, 0.2)';
        } else if (item?.status === 'COMPLETED') {
          sliderValue = 100;
          wainting = '#fff';
          prrogress = '#fff';
          finish = '#fff';
        }

        let buttonText = '';
        let buttonVisible = true;
      
        if (item?.status  === 'WAITING') {
          buttonText = 'Начать выполнение';
        } else if (item?.status  === 'IN_PROGRESS') {
          buttonText = 'Завершить';
        } else if (item?.status  === 'COMPLETED') {
          buttonVisible = false;
        }

        let backgroundColor = '';
        let buttonColor

        if (item?.status === 'WAITING') {
          backgroundColor = 'rgba(255, 144, 198, 1)';
          buttonColor='#fff'
        } else if (item?.status === 'IN_PROGRESS') {
          backgroundColor = 'rgba(255, 144, 198, 1)';
          buttonColor='rgba(255, 144, 198, 1)'
        } else if (item?.status === 'COMPLETED') {
          backgroundColor = 'rgba(178, 178, 178, 1)';
        }
       
        let buttonBackround
        if (item?.status === 'WAITING') {
            buttonBackround = 'rgba(255, 255, 255, 0.3)';
          } else if (item?.status === 'IN_PROGRESS') {
            buttonBackround = '#fff';
          } else if (item?.status === 'COMPLETED') {
            buttonBackround = 'rgba(178, 178, 178, 1)';
          }

        const handleButtonClick = () => {
            if (item?.status === 'WAITING') {
                onWaitingTask(item)
              } else if (item?.status === 'IN_PROGRESS') {
                onCompletedTasks(item)
              } else if (item?.status === 'COMPLETED') {
               null
              }
        }
        return (
          <View style={[styles.container,]} key={index}>
            <View style={[styles.containerCard,{backgroundColor:backgroundColor}]}>
              <Text style={styles.text3}>Задание №{index}</Text>
              <Text style={styles.text2}>{item?.description}</Text>
              <Slider
                style={{width: '100%', height: 40, marginLeft: -10,
                
            }}
                minimumValue={0}
                maximumValue={100}
                value={sliderValue}
                disabled={true}
                thumbTintColor="#FFFFFF"
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                
                
              />
              <View style={styles.flexContainer}>
                <Text style={{width: 100,color:wainting}}>В ожидании</Text>
                <Text style={{width: 100,color:prrogress}}>В процессе</Text>
                <Text style={{width: 80,color:finish}}>Готово</Text>
              </View>
             {role==='TOP' || role==='MANAGER' &&
              <Text style={{textAlign:'right',right:10,color:'white',marginTop:10,fontSize:12}}>Администратор:{item?.assignedUserName}</Text>
             }
              {buttonVisible && (
                   <TouchableOpacity style={[styles.button,{backgroundColor:buttonBackround}]} onPress={handleButtonClick}>
                   <Text style={{textAlign: 'center', color: buttonColor}}>
                     {buttonText}
                   </Text>
                 </TouchableOpacity>
              )}
             
            </View>
          </View>
        );
      })}
    </>
  );
};

export default CardTasks;

const styles = StyleSheet.create({
  container: {
    marginVertical: 0,
    marginHorizontal: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '500',
  },
  containerCard: {
    marginHorizontal: 0,
    marginVertical: 0,
    padding: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: 10,
    borderRadius: 50,
  },
  flexContainer3: {
    marginLeft: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  text1: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  text2: {
    color: 'white',
    fontSize: 12,
    fontWeight: '400',
  },
  text3: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 15,
  },
  button: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginTop: 15,
    borderRadius: 15,
    paddingVertical: 10,
    borderColor: '#fff',
    borderWidth: 1,
  },
});