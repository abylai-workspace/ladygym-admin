import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import * as ImagePicker from 'react-native-image-picker';
import { instance } from 'utils/axios';
import { ROLE, TOKEN_KEY } from 'constants/constants';
import { storageReadItem } from 'utils/asyncStorage';
const UserPictureAfter = ({values}) => {
    const [token,setToken]=useState('')
  
    storageReadItem(TOKEN_KEY,ROLE).then((token)=>{
      setToken(token)
    })
    const onOpenImages = React.useCallback(() => {
        ImagePicker.launchImageLibrary({
          // selectionLimit: 1,
          mediaType: 'photo',
          includeBase64: true,
          includeExtra: true,
          maxWidth: 255,
          maxHeight: 255,
          quality: 1,
        })
          .then((response: any) => {
            if (response.assets && response.assets.length > 0) {
              const selectedImageUri = response.assets[0].base64;
              const newImage = {
                id: new Date().getTime(), // Generate a unique ID using timestamp
                content: selectedImageUri,
              };
    
              values.push(newImage);
              const imageData = {
                photoBase64: `data:image/png;base64,${newImage.content}`,
              };
              try {
                const respon=instance.post('/gym/user/images/after/save',imageData,{
                    headers:{
                        Authorization:`Bearer ${token}`
                      }
                      
                }).then(response => {
                    console.log(response.data);
                })
                return respon
              } catch (error) {
                
              }
            }
            console.log(values);
          })
          .catch(err => {
            console.error('[ImagePicker] error', err);
          });
      }, [values]);

  return (
    <View>
      <ScrollView horizontal={true} nestedScrollEnabled={true}>
        {values?.map((value,index) => {
          return (
            <>
              <View key={index}>
                <Image
                  resizeMode="cover"
                  source={{
                    uri: value.content
                      ? `data:image/jpg;base64,${value.content}`
                      : value.content
                      ? value.content
                      : '',
                  }}
                  key={value?.id}
                  style={styles.image}
                />
              </View>
            </>
          );
        })}
         <TouchableOpacity style={styles.emptyBag} onPress={onOpenImages}>
         <Feather name='plus' size={80}/>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default UserPictureAfter

const styles = StyleSheet.create({
    image:{
        marginRight: 8,
        width: 150,
        height: 150,
        borderRadius: 8,
    },
    emptyBag:{
        backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    width: 150,
    height: 150,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    }
})