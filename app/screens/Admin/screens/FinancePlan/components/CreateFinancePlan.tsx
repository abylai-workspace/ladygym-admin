import { Alert, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LGBackround from 'components/blocks/LGBackround/LGBackround'
import HeaderTitle from 'screens/HomeScreen/components/HeaderTitle'
import { useNavigation } from '@react-navigation/native'
import CustomDateInput from 'components/blocks/CustomDateInput/CustomDateInput'
import Feather from 'react-native-vector-icons/Feather'
import { instance } from 'utils/axios'
import { storageReadItem } from 'utils/asyncStorage'
import { ROLE, TOKEN_KEY } from 'constants/constants'
import CustomButton from 'components/blocks/Buttons/SmallPrimaryButton'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'


const CreateFinancePlan = ({route}) => {
    const id=route?.params?.clients

    const navigation = useNavigation()
    const [sum,setSum]=useState<any>('')
    const [date, setDate] = useState<any>(new Date());
    const [token, setToken] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [role, setRole] = useState('');

    storageReadItem(TOKEN_KEY, ROLE).then(token => {
        setToken(token);
      });
      storageReadItem(ROLE,TOKEN_KEY).then(token => {
        setRole(token);
      });

    

    const postFinancePlan = async () => {
        const data={
            sum:sum,
            endDate:date,
           
        }
        console.log(data)
      
       
        try {
            const response = await instance?.post(`/gym/financials/create/${id}`,data,{
                headers:{
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",


                }
            })
            .then(res=>{
               Alert.alert(
                   'Финансовый план создан',
               )
                navigation.goBack()
              
            })
            console.log(response)
           
           
            return response
            
        } catch (error) {
            console.log(error)
            
        }
    }
 

    const formatDate = (date) => {
      const dateFormat=  moment(date).format('YYYY-MM-DD')
      setDate(dateFormat)
    } 
    console.log(sum)
  return (
    <LGBackround>
        <HeaderTitle title='Создать финансовый план' styles={{ marginTop: 10 }} onPress={()=>navigation.goBack()} />
        <View style={styles.container}>
            <Text style={styles.label}>Сумма</Text>
            <TextInput style={styles.input} 
            onChangeText={(text)=>setSum(text)}
            value={sum}
            placeholder='Введите сумму'
            keyboardType='numeric'
            
            
            />
            <Text style={styles.label}>Крайний срок</Text>
           <Pressable onPress={()=>setShowDatePicker(true)}>
            <TextInput style={styles.input} value={date} editable={false}/>
            </Pressable>
            <DatePicker
            modal
            open={showDatePicker}
            date={new Date()}
            mode="date"
            onConfirm={(date) => {
                setShowDatePicker(false);
                formatDate(date)
              
            }}
            onCancel={() => {
                setShowDatePicker(false);
            }}
            />
          
           
         
           <CustomButton variant='fill' label='Создать' onPress={()=>{
            console.log(sum)
               postFinancePlan()
           }} style={{marginTop:20}}/>
        </View>
    </LGBackround>
  )
}

export default CreateFinancePlan

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 20
    },
    label:{
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
        marginTop: 10
    },
    inputContainer: {
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 10,
        marginBottom: 20,
        borderColor: 'white',
      },
    input:{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 10,
        color: '#fff',
        borderRadius: 10,
        marginTop: 10,
        borderColor: 'rgba(255, 255, 255, 0.4)',
        borderWidth: 1

    }
})