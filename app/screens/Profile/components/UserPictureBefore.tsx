import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import {useTranslation} from 'react-i18next';
import Feather from 'react-native-vector-icons/Feather'
import { ROLE, TOKEN_KEY } from 'constants/constants';
import { storageReadItem } from 'utils/asyncStorage';
import { instance } from 'utils/axios';
/* toggle includeExtra */

const screenDimensions = Dimensions.get('screen');
const PHOTO_SIZE = {
  height: 224,
  width: 224,
};

const UserPictureBefore = ({values}) => {
  const {t} = useTranslation();
  const [userImage,setUserImage] = useState<any>([])
  const [token,setToken]=useState('')
  
  storageReadItem(TOKEN_KEY,ROLE).then((token)=>{
    setToken(token)
  })

  const selectImage = React.useCallback(() => {
    ImagePicker.launchImageLibrary({
        // selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: true,
        includeExtra: true,
        maxWidth: 255,
        maxHeight: 255,
        quality: 1,
    }, (response:any) => {
      const selectedImageUri = response.assets[0].base64;
      const newImage = {
        id: new Date().getTime(), // Generate a unique ID using timestamp
        content: selectedImageUri,
      };
     
      setUserImage([...userImage,newImage]);
     
      const imageData = {
        photoBase64: `data:image/png;base64,${newImage.content}`,
      };
      console.log(imageData);
      try {
        const respon=instance.post(`/gym/user/images/before/save`,imageData,{
          headers:{
            Authorization:`Bearer ${token}`
          }
          
        }).then(res=>{
          console.log(res.data)
        })
        return respon
        
      } catch (error) {
        
      }
    });
},[userImage]);
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

          const existingImageIndex = values.findIndex(image => image.id === newImage.id);

          if (existingImageIndex !== -1) {
            const updatedValues = [...values];
            updatedValues[existingImageIndex] = newImage;
            values(updatedValues);
            console.log(updatedValues);
          } else {
            values.push(newImage);
          }
        }

        console.log(values);

        // const selectedImageUri = resp.assets[0]?.base64;
        // // Push the selected image URI into the values array
        // values.push({
        //   id: new Date().getTime(),
        //   content: selectedImageUri,
        // });
        // console.log(values)
      })
      .catch(err => {
        console.error('[ImagePicker] error', err);
      });
  }, [values]);

  const onOpenImagesCamera = React.useCallback(() => {
    ImagePicker.launchCamera({
      // selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
      includeExtra: true,
      maxWidth: 255,
      maxHeight: 255,
      quality: 1,
    })
      .then(response =>{
        if (response.assets && response.assets.length > 0) {
          const selectedImageUri = response.assets[0].base64;
          const newImage = {
            id: new Date().getTime(), // Generate a unique ID using timestamp
            content: selectedImageUri,
          };

          const existingImageIndex = values.findIndex(image => image.id === newImage.id);

          if (existingImageIndex !== -1) {
            const updatedValues = [...values];
            updatedValues[existingImageIndex] = newImage;
            values(updatedValues);
            console.log(updatedValues);
          } else {
            values.push(newImage);
          }
        }
      })
      .catch(err => {
        console.error('[ImagePicker] error', err);
      });
  }, [values]);

  const alert = React.useCallback(() => {
    Alert.alert('selectImage', 'upload', [
      {
        text: t('BagScreen.takephoto'),
        onPress: () => onOpenImagesCamera(),
      },
      {text: t('BagScreen.uploadfromgallery'), onPress: () => onOpenImages()},
    ]);
  }, [t, onOpenImagesCamera, onOpenImages]);

  
  return (
    <View style={{ width: '100%' }}>
      <ScrollView horizontal={true} nestedScrollEnabled={true}>
        {values?.map((value, index) => {
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
                  style={styles.bag}
                />
              </View>
            </>
          );
        })}
      </ScrollView>
      <Text style={styles.headerSubTitle}>До</Text>
      <ScrollView horizontal={true} nestedScrollEnabled={true}>
        {userImage?.map((value, index) => {
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
                  style={styles.beforeImage}
                />
              </View>
            </>
          );
        })}
        <TouchableOpacity style={styles.emptyBag} onPress={selectImage}>
         <Feather name='plus' size={80}/>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default UserPictureBefore;

const styles = StyleSheet.create({
  imageContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  bag: {
    // marginTop: 5,
    marginRight: 8,
    width: PHOTO_SIZE.width,
    height: PHOTO_SIZE.height,
    borderRadius: 8,
  },
  beforeImage:{
    marginRight: 8,
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  emptyBag: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    width: 150,
    height: 150,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: '#fff',
  },
  headerSubTitle: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 10,
    marginTop: 20,
  },
});
