import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import PSBackground from 'components/PSBackround/PSBackround'
import LGBackround from 'components/blocks/LGBackround/LGBackround'
import Header from 'components/headers/Header'
import { useNavigation } from '@react-navigation/native'
import { instance } from 'utils/axios'
import { storageReadItem } from 'utils/asyncStorage'
import { TOKEN_KEY } from 'constants/constants'
import { ScrollView } from 'react-native'
import moment from 'moment';
import { useSelector } from 'react-redux'

const HistoryBodyInfo = () => {
    const [getData,setGetData]=useState([])
    const navigation=useNavigation()
    const tokenStorage = useSelector((state:any) => state.auth.token);
    const getHistory=useCallback(async() => {
        try {
            const response = await instance.get('/gym/user/body/info/history', {
                headers: {
                    Authorization: `Bearer ${await tokenStorage}`,
                },
            })
             await  setGetData(response.data)
            console.table(JSON.stringify(response.data), 'responseas');
            
        } catch (error) {
            
        }

    },[])
    useEffect(() => {
        getHistory()
    },[])

  

    const getRenderHistory=({item})=>{
        const formattedDate = moment(item?.createdAt).format("DD.MM.YYYY");
        
        return (
            <>
            <View style={styles.userInfo}>
                <View style={styles.timeContainer}>
                <Text>{formattedDate}</Text>

                </View>
                <View style={styles.flex}>
                    <View style={styles.flexConatainer}>
                        <Text style={styles.label}>Мой рост:</Text>
                        <Text style={styles.title}>{item?.height}</Text>

                    </View>
                    <View style={styles.flexConatainer}>
                        <Text  style={styles.label}>Мой вес:</Text>
                        <Text style={styles.title}>{item?.weight}</Text>
                        <Text  style={styles.label}>Идеальный вес:</Text>
                        <Text style={styles.title}>{formattedDate}</Text>

                    </View>
                    <View style={styles.flexConatainer}>
                        <Text  style={styles.label}>Текущий ИМТ:</Text>
                        <Text style={styles.title}>{formattedDate}</Text>
                        <Text  style={styles.label}>ИМТ соответствует:</Text>
                        <Text style={styles.title}>{formattedDate}</Text>

                    </View>
                </View>
            </View>
            </>
        )

    }
  return (
    <LGBackround>
          <Header centerTitle='ИМТ' onBackPress={()=>navigation.goBack()} title=''/>
         
          <FlatList
            data={getData?.reverse()}
            key={item => item.id as never}
            keyExtractor={item => item.id}
            renderItem={getRenderHistory}

          />
        
     
  
    </LGBackround>
  )
}

export default HistoryBodyInfo

const styles = StyleSheet.create({
    userInfo:{
        marginHorizontal:20,
        borderColor:'rgba(255,255,255,0.1)',
        borderWidth:1,
        padding:10,
        marginVertical:10,
        borderRadius:5,
        backgroundColor:'#0E0E10'
    },
    timeContainer:{
        backgroundColor:'rgba(207, 84, 144, 1)',
        width:100,
        paddingHorizontal:10,
        borderRadius:15,
        marginTop:-20

    },
    flex:{
        flexDirection:'row'

    },
    flexConatainer:{
       marginRight:10
    },
    label:{
        color:'gray',
        fontSize:12
    },
    title:{
        color:'white',
        fontSize:14,
        fontWeight:'500'
    }
})