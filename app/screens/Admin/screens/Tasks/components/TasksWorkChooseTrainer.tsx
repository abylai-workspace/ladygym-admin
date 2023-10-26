import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LGBackround from 'components/blocks/LGBackround/LGBackround';
import HeaderTitle from 'screens/HomeScreen/components/HeaderTitle';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {instance} from 'utils/axios';
import {storageReadItem} from 'utils/asyncStorage';
import {ROLE, SCREENS, TOKEN_KEY} from 'constants/constants';
import { FlatList } from 'react-native';

const TasksWorkChooseTrainer = ({route}) => {
  
  const [trainers, setTrainers] = useState<any[]>([]);
  const [admins, setAdmins] = useState<any[]>([]);
  const [token, setToken] = useState('');
  const [value, setValue] = useState('');
  const navigation = useNavigation();
  const personal = route?.params?.personal;

  storageReadItem(TOKEN_KEY, ROLE).then(token => {
    setToken(token);
  });

  useEffect(() => {
    fetchTrainers();
    fetchAdmins();
  }, [token]);
  const fetchTrainers = async () => {
    try {
      const response = instance
        .get(`/gym/user/personal`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          const allUsers = res.data;
          console.log(allUsers);
          const trainersAndManagers = allUsers.filter(user => {
            return user.role === 'TRAINER' && user.deleted === false;
          });
          console.log(trainersAndManagers);
          setTrainers(trainersAndManagers);
         
        });
      return response;
    } catch (error) {}
  };
  const fetchAdmins = async () => {
    try {
      const response = instance
        .get(`/gym/user/personal`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          const allUsers = res.data;
          const trainersAndManagers = allUsers.filter(user => {
            return user.role === 'ADMIN' && user.deleted === false;
          });
          setAdmins(trainersAndManagers);
         
        });
      return response;
    } catch (error) {}
  };



  
const filterTrainers = trainers.filter(trainer => {
  return trainer.firstName?.toLowerCase().includes(value.toLowerCase());
})
const filterAdmins = admins.filter(admin => {
  return admin.firstName?.toLowerCase().includes(value.toLowerCase());
})

const onPress = (item) => {
  
  navigation.navigate(SCREENS.ADMIN_CREATE_TASKS, {
    clients: item,
  });
}
  const renderItem = ({item}) => {
    const fullName=item.firstName + " " + item.lastName;
    
    console.log(item);
    return (
        <TouchableOpacity style={styles.blockContainer} onPress={()=>onPress(item?.id)}>
        <View style={{flexDirection:'row'}}>
            
             <Text style={styles.price}>{fullName?.slice(0, 30)}</Text>
        </View>
        <Feather name="chevron-right"  size={30} color="gray" />
    </TouchableOpacity>
    );
  };
  return (
    <LGBackround>
      <HeaderTitle
        title={personal == 1 ? 'Выбрать тренера' : 'Выбрать админа'}
        styles={{marginTop: 10}}
        onPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        <TextInput placeholder={personal == 1 ? 'Выбрать тренера' : 'Выбрать админа'} style={styles.inputContainer} 
        placeholderTextColor="gray"
        onChangeText={text => setValue(text)}
        value={value}
        />
      </View>
      <FlatList data={personal==1? filterTrainers : filterAdmins} renderItem={renderItem}
      keyExtractor={item => item.id}
      />
    </LGBackround>
  );
};

export default TasksWorkChooseTrainer;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  blockContainer:{
    marginHorizontal: 20,
    backgroundColor:'rgba(255,255,255,0.1)',
    marginVertical:4,
    padding:10,
    borderRadius:10,
    borderColor:'rgba(255,255,255,0.4)',
    borderWidth:1,
    flexDirection:'row',
    justifyContent:'space-between',
    
},
price:{
    color:'white',
    fontSize:16,
    fontWeight:'500',
    marginLeft:10,
    alignSelf: 'center',
}
});
