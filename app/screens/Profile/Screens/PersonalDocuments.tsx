import {View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, Alert} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import LGBackround from 'components/blocks/LGBackround/LGBackround';
import Header from 'components/headers/Header';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {ROLE, TOKEN_KEY} from 'constants/constants';
import {storageReadItem} from 'utils/asyncStorage';
import {instance} from 'utils/axios';
import DocumentPicker from 'react-native-document-picker';
import FileViewer from 'react-native-file-viewer';
import {decode as atob, encode as btoa} from 'base-64';
import base64 from 'base64-js';
import RNFS ,{readFileAssets} from 'react-native-fs';
import Share from 'react-native-share';
import { getBase64 } from 'utils/file';
const PersonalDocuments = () => {
  const navigation = useNavigation();
  const [userDocuments, setUserDocuments] = useState<any>([]);
  const [selectedDocuments, setSelectedDocuments] = useState('');
  const [documentname, setDocumentName] = useState('')
  const [selectedVisibles, setSelectedVisibles] = useState(false)
  const [token, setToken] = useState('');
  storageReadItem(TOKEN_KEY, ROLE).then(token => {
    setToken(token);
  });
  useEffect(() => {
    getUserAndDocuments();
  }, [token]);
  const getUserAndDocuments = useCallback(async () => {
    try {
      const response = await instance
        .get('/gym/user/info', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => setUserDocuments(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'application/pdf'});
    return blob;
  }
  const downloadPdfFile = async item => {
const data=dataURItoBlob(item?.content)
console.log(data)


    // try {
    //   // Convert base64 to binary
    //   const binaryData = atob(item?.content);
    //   const bytes = new Uint8Array(binaryData.length);
    //   for (let i = 0; i < binaryData.length; i++) {
    //     bytes[i] = binaryData.charCodeAt(i);
    //   }

    //   // Create a path for the PDF file in the device's document directory
    //   const filePath = `${RNFS.DocumentDirectoryPath}/${'Documents'}.pdf`;

    //   // Write binary data to the file
    //   await RNFS.writeFile(filePath, bytes, 'ascii');

    //   console.log(`PDF saved to: ${filePath}`);
    //   const shareOptions = {
    //     title: 'Share PDF File',
    //     url: `file://${filePath}`,
    //     type: 'application/text',
    //   };

    //   // Open the share dialog
    //   await Share.open(shareOptions);
    // } catch (error) {
    //   console.error('Error downloading and sharing PDF:', error);
    // }
  };
  const openFile = async () => {
    try {
      const res: any = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      await FileViewer.open(res.uri);
      console.log(res);
      const file = res.uri;
      const parts = file.split('/');
       const fileName = parts[parts.length - 1];
      

      setDocumentName(res?.name)
      RNFS.readFile(file, 'base64').then(res => {

        setSelectedDocuments(res);
        // console.log(res);
      setSelectedVisibles(false)

      });
      setSelectedVisibles(false)
    } catch (e) {
      if (DocumentPicker.isCancel(e)) {
        console.log('Document is cancelled');
      } else {
        console.log('Document is cancelled');
      }
    }
  };

  const DownloadData=async(item)=>{
    try {
      const binaryData = new Uint8Array(atob(item?.content).split('').map(char => char.charCodeAt(0)))
      const filePath = `${RNFS.DocumentDirectoryPath}/${'test'}.pdf`;
      await RNFS.writeFile(filePath, binaryData, 'ascii')
      .then(() => {
        console.log('PDF saved successfully:', filePath);
      })
           const shareOptions = {
        title: 'Share PDF File',
        url: `file://${filePath}`,
        type: 'application/text',
      };
      await Share.open(shareOptions);
    } catch (error) {
      
    }
   
    
  }
 const PostData=async()=>{
  try {
    const data={
      fileName:documentname,
      fileBase64:"data:@file/pdf;base64,"+selectedDocuments
    }
    console.log(data);
    const response=await instance.post('/gym/user/files/save',data,{
    headers:{
      Authorization: 'Basic '+ token
    }
    }).then((res)=>console.log(res))
    console.log(response)
  } catch (error) {
    console.log(error)
    
  }
 }
 //create todo
 

  return (
    <LGBackround>
      <Header centerTitle="Документы" onBackPress={() => navigation.goBack()} title="" />

      {userDocuments?.userFiles?.map((item, i) => {
        // console.log(item);
        return (
          <>
            <View style={styles.container} key={i}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.label}>{item?.name}</Text>
                <TouchableOpacity onPress={() => DownloadData(item)}>
                  <Feather name="arrow-down" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </>
        );
      })}

      <View style={styles.container}>
        <TouchableOpacity onPress={()=>{
          if(!selectedVisibles){
            openFile()
          }else{
            PostData()
          }
        }}>
          <Text style={styles.label}>{selectedVisibles ? 'Добавить документ +':'Select документ +' }</Text>
        </TouchableOpacity>
      </View>
    </LGBackround>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    backgroundColor: 'rgba(33, 33, 34, 1)',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  label: {
    color: '#fff',
    textAlign: 'center',
  },
});
export default PersonalDocuments;
