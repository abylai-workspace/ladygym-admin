import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import LGBackround from 'components/blocks/LGBackround/LGBackround';
import HeaderTitle from 'screens/HomeScreen/components/HeaderTitle';
import { useNavigation } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import { fetchGymsFilialAbonoments } from 'store/slices/abonomentsChoose';
import { COLORS } from 'utils/colors';
import moment from 'moment'
import { fetchGymsSubscriptionAdditional } from 'store/slices/abonomentAdditionalType';
import CustomSwitch from 'components/blocks/CustomSwitch/CustomSwitch';
import Input from 'screens/Admin/components/Input';
import { instance } from 'utils/axios';
import { ROLE, SCREENS, TOKEN_KEY } from 'constants/constants';
import { storageReadItem } from 'utils/asyncStorage';
import SelectRadio from '../components/SelectRadio';
import useShare from 'hooks/useShare';
const BuyAbonoment = ({route}) => {
  const navigation = useNavigation();
  const [tokenStorage,setToken]=useState('')
  storageReadItem(TOKEN_KEY,ROLE).then((token)=>{
    setToken(token)
  })
  const shareContent=useShare()
  const { gymId,subscriptionTypeId,gymName,subscriptionTypeName } = route.params
  const dispatch = useDispatch();
  const gymsFilial = useSelector((state: any) => state?.byAbonoments);
  const status = useSelector((state: any) => state.byAbonoments.status);
  const error = useSelector((state: any) => state.byAbonoments.error);
  const subscriptionAdditional=useSelector((state:any)=>state?.subscriptionAdditional)
  const statusSub=useSelector((state:any)=>state.subscriptionAdditional.status)
  const errorSub=useSelector((state:any)=>state.subscriptionAdditional.error)



  const [selectedValue, setSelectedValue] = useState('')
  const [selectValue2,setSelectValue2]=useState('')
  const handleSelection = (value) => {
    console.log(value)
    setSelectedValue(value)
  }
  const handleSelectiontwo=(value)=>{
    setSelectValue2(value)
  }

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGymsFilialAbonoments());
    }
  }, [dispatch, status]);
  useEffect(()=>{
    if(statusSub==='idle'){
      dispatch(fetchGymsSubscriptionAdditional())
    }

  },[dispatch,statusSub])
if(statusSub=='loading'){
  return <Text>Loading...</Text>;

}else if(status==='failed'){
  return <Text>Error: {errorSub}</Text>;

}
  if (status === 'loading') {
    return <Text>Loading...</Text>;
  } else if (status === 'failed') {
    return <Text>Error: {error}</Text>;
  }

  
  // console.log(subscriptionAdditional, 'subscriptionAdditional')
const buSendRequest=async()=>{
  try {
    const response=await instance.post('/gym/subscriptions/create',{
      gymId:gymId,
      subscriptionTypeId:subscriptionTypeId,
      timeType:selectedValue,
      additionalType:selectValue2
    },{
      headers:{
        Authorization: `Bearer ${await tokenStorage}`,
        'Content-Type': 'application/json',
      }
      
    })
    if(response.data){
      sendWhatsAppMessageToContact()
      navigation.navigate(SCREENS.HOME as never)
    }
    console.log(response.data)
  } catch (error) {
    
  }
}
  const sendWhatsAppMessageToContact =async () => {
  
  const phoneNumber = '77078775016'; // Replace with the recipient's phone number
  const message=`Hello you abonoment gym ${gymId}  ${gymName } and subscriptionTypeId ${subscriptionTypeId} ${subscriptionTypeName}`
  const whatsappUrl = `https://wa.me/${phoneNumber}&text=${encodeURIComponent(message)}`;
   shareContent(message,'Share via',whatsappUrl)
   console.log(message)

};
  const renderItem = ( {item,index }) => {
    return (
      <>
    
      <View key={index} style={[styles.containerFlatlist, { borderColor: selectedValue === item ? COLORS.LADY_GYB_BACKGROUND : 'transparent' }]}>
        <View style={styles.flexContainer}>
          <View >
            <View style={styles.flexContainer}>
              <Text style={styles.label}>{item.label} - </Text>
              <Text style={styles.price}>{item.price} ₸ </Text>
            </View>
            <View style={styles.flexContainer}>
              <Text style={styles.time}>{item.startTime}  </Text>
              {item.endTime && <Text style={styles.time}>{item.endTime}   | </Text>}
              {item.arrivalAmount >1 &&  <Text style={styles.time}>{item.arrivalAmount} посещений</Text>}

            </View>
          </View>
          <TouchableOpacity
            key={item}
            onPress={() => handleSelection(item.enumName)}
            style={styles.radioButton}
          >
            <View style={[styles.radioButtonCircle, { borderColor: selectedValue === item.enumName ? '#CF5490' : 'transparent' }]}>
              {selectedValue === item.enumName && <View style={styles.selectedRb} />}
            </View>
          </TouchableOpacity>

        </View>
        
      </View>
      </>
    )
  }

  return (
    <LGBackround>
      <View style={styles.container}>
        <HeaderTitle title="Покупка абонемента" onPress={() => navigation.goBack()} />
        <ScrollView nestedScrollEnabled={true} style={{width:'100%'}}>
        <View style={{ marginHorizontal: 15 }}>
          <FlatList data={gymsFilial?.gyms} 
          renderItem={renderItem}
           keyExtractor={(item)=>item?.id?.toString()} />
          <View style={styles.addducoments}>
            <TouchableOpacity >
            <Text style={styles.text}>Добавить документ +</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>При выборе студенческого абонемента необходимо предоставить справку
            с места учебы, либо любой подтверждающий документ</Text>
          <Text style={styles.headerTitle}>Покупка абонемента</Text>
          <FlatList 
          data={subscriptionAdditional.gyms}
          renderItem={({ item, index }) => (
            <SelectRadio
              item={item}
              selectValue2={selectValue2}
              handleSelectiontwo={handleSelectiontwo}
              index={index}
            />
          )}
          keyExtractor={(item)=>item?.id?.toString()}
          nestedScrollEnabled={false}
          />
        </View>
        <View style={styles.hr}/>
        <View style={{flexDirection:'row'}}>
        <CustomSwitch value={false}/>
        <Text style={styles.discountText}>Скидка 15% {'\n'}
Накоплено</Text>

        </View>
        <Text style={styles.discountText2}>Скидка не может превышать 15%</Text>
        <View style={styles.hr}/>
        <Text style={styles.headerTitle2}>
        У вас есть промокод?
        </Text>
        <View style={{marginHorizontal:20}}>
        <Input placeholder='Введите его здесь' value='1234' onChangeText={(e)=>console.log(e)}/>

        </View>
          <TouchableOpacity style={styles.button} onPress={buSendRequest}>
                    <Text style={styles.buttonLabel}> Купить </Text>
                </TouchableOpacity>
        </ScrollView>
      </View>
    </LGBackround>
  );
};

export default BuyAbonoment;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
    marginVertical: 10,
    marginBottom:70
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  flexContainer2:{
    flexDirection: 'row',
    justifyContent: 'space-between',
   marginTop:10
  },
  containerFlatlist: {
    borderColor: 'red',
    borderWidth: 1,
    marginVertical: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',


  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    // alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: 10
  },
  radioButtonCircle: {
    height: 20,
    width: 20,
    borderRadius: 15,
    borderWidth: 2,
    backgroundColor: COLORS.LADY_GYB_SUB_TEXT,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',


  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.LADY_GYB_BACKGROUND,
  },
  label: {
    color: COLORS.white,
    fontWeight: '500',
    fontSize: 14
  },
  price: {
    color: COLORS.LADY_GYB_BACKGROUND,
    fontWeight: '500',
    fontSize: 14
  },
  time: {
    fontSize: 10,
    color: '#fff'
  },
  subtitle: {
    color: 'gray',
    fontSize: 10
  },
  headerTitle:{
 marginTop:20,
 color:'#fff',
 fontWeight:'600',
 marginLeft:5,
 marginBottom:5
  },
  headerTitle2:{
    marginTop:10,
    color:'#fff',
    fontWeight:'600',
    marginLeft:20,
    marginBottom:5
  },
  addducoments:{
    paddingHorizontal:20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical:15,
    borderRadius:10,
    marginVertical:5

  },
  text:{
    textAlign:'center',
    color:'#fff',
    fontWeight:'500'
  },
  hr:{
    marginVertical:10,
    borderColor:'rgba(255,255,255,0.2)',
    borderWidth:0.3,
    marginHorizontal:20
  },
  discountText:{
    marginTop:10
  },
  discountText2:{
    marginHorizontal:20,
    color:'gray',
    fontSize:10
  },
  butttonContainer: {
    marginHorizontal: 10,
  marginTop:10
},
button: {
    backgroundColor: 'rgba(207, 84, 144, 1)',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: Dimensions.get('window').width / 5,
    marginHorizontal:20,
    marginVertical:10


},
buttonLabel: {
    color: 'white',
    textAlign: 'center',
},
});
