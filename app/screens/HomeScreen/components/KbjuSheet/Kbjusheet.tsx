import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ModalBottom from '../GymInformation/ModalBottom'
import KBJUScreen from 'screens/Profile/Screens/KBJUScreen'
import Input from 'screens/Profile/components/Input'
import { Dimensions } from 'react-native'
import Header from 'screens/Profile/components/Header'
import HeaderTitle from '../HeaderTitle'
import HrLine from 'components/blocks/HrLine/HrLine'


interface Props {
    isModalVisible: boolean;
    toggleModal: () => void;
    goBack: () => void;
}
const Kbjusheet = ({isModalVisible, toggleModal, goBack}: Props) => {
  return (
    <ModalBottom isModalVisible={isModalVisible} toggleModal={toggleModal}>
     <HeaderTitle title="КБЖУ" onPress={goBack}/>
       <View style={styles.container}>
            <Text style={styles.headerTitle}>КБЖУ</Text>
            <Text style={styles.headerSubTitle}>Расчет соотношение калорий, белков, жиров 
и углеводов, которые попадают в организм с пищей.</Text>
            <Text style={styles.headerSubTitle}>Возраст</Text>
            <Input placeholder={'Введите ваш возраст '} onChangeText={(text) => {}}/>
            <Text style={styles.headerSubTitle}>Рост</Text>
            <Input placeholder={'Введите рост в см'} onChangeText={(text) => {}}/>
            <Text style={styles.headerSubTitle}>Вес</Text>
            <Input placeholder={'Введите вес в кг'} onChangeText={(text) => {}}/>
            <Text style={styles.headerSubTitle}>Желаемый вес</Text>
            <Input placeholder={'Желаемый вес'} onChangeText={(text) => {}}/>
            <Text style={styles.headerSubTitle}>Ваш образ жизни</Text>
            <Input placeholder={'Ваш образ жизни'} onChangeText={(text) => {}}/>
         
            <HrLine label='Результат'/>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
               <Text>
               Идеальный вес
               </Text>
               <Text>
               Идеальный вес
               </Text>
            </View>
            <Text style={styles.headerSubTitle}>ИМТ соответствует</Text>
            <Text style={styles.headerSubTitle}>Недостаточная масса тела</Text>
            <View style={styles.butttonContainer}>
                <TouchableOpacity style={styles.button2}>
                    <Text style={styles.buttonLabel2}> Рассчитать</Text>
                </TouchableOpacity>
            </View>
            
            
        </View>
    </ModalBottom>
     
  )
}

export default Kbjusheet

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20
     },  
     headerTitle:{
         color:'#fff',
         fontSize:20,
         fontWeight:'500',
     },
     headerSubTitle:{
         color:'#fff',
         fontSize:12,
 marginBottom:10,
     },
 
     butttonContainer: {
         marginHorizontal: 10,
       marginTop:10
     },
     button: {
         backgroundColor: 'rgba(207, 84, 144, 1)',
         borderRadius: 20,
         padding: 10,
         paddingHorizontal: Dimensions.get('window').width / 5
 
 
     },
     buttonLabel: {
         color: 'white',
         textAlign: 'center',
     },
     button2: {
         backgroundColor: 'rgba(207, 84, 144, 1)',
         borderRadius: 20,
         padding: 10,
         paddingHorizontal: Dimensions.get('window').width / 3.5
 
 
     },
     buttonLabel2: {
         color: 'white',
         textAlign: 'center',
     },
})