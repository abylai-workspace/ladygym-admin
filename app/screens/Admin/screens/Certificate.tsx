import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LGBackround from 'components/blocks/LGBackround/LGBackround'
import HeaderTitle from 'screens/HomeScreen/components/HeaderTitle'
import { useNavigation } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather'
const Certificate = () => {
    const navigation=useNavigation()
  return (
    <LGBackround>
      <HeaderTitle title='О клиенте' styles={{ marginTop: 10 }} onPress={()=>navigation.goBack()} />
      <View style={styles.container}>
    
      <View style={styles.flex}>
          <Text style={{ color: '#fff' }}>Документы</Text>
          <TouchableOpacity onPress={()=>{}}>
            <Feather name="download" style={styles.clickContainer} size={30} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    </LGBackround>
  )
}

export default Certificate

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 20,
      },
      flex:{
       
flexDirection:'row',
justifyContent:'space-between',
backgroundColor:'rgba(255,255,255,0.1)',
borderColor:'rgba(255,255,255,0.5)',
borderWidth:1,
marginBottom:10,
paddingHorizontal:10,
borderRadius:10,
paddingVertical:10,
alignItems:'center'
      }
})