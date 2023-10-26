import {View, Text, Dimensions, StyleSheet, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import LGBackround from 'components/blocks/LGBackround/LGBackround';
import Header from 'components/headers/Header';
import {ROLE, TOKEN_KEY} from 'constants/constants';
import {storageReadItem} from 'utils/asyncStorage';
import UserPicture from '../components/UserPictureBefore';
import {instance} from 'utils/axios';
import UserPictureAfter from '../components/UserPictureAfter';

const BeforeAfterImage = () => {
  const [token, setToken] = useState('');
  const [beforeImage, setBeforeImage] = useState([]);
  const [afterImage, setAfterImage] = useState([]);
  storageReadItem(TOKEN_KEY, ROLE).then(token => {
    setToken(token);
  });

  useEffect(() => {
    getBeforeImage();
    getAfterImage();
  }, [token]);
  const getBeforeImage = useCallback(async () => {
    try {
      const response = instance
        .get('/gym/user/images/before', {
          headers: {
            Authorization:`Bearer ${token}`,
          },
        })
        .then(response => {
          setBeforeImage(response?.data);
        });
      return response;
    } catch (error) {
      console.log(error);
    }
  }, [token, beforeImage]);

  const getAfterImage = useCallback(async () => {
    try {
      const response = instance
        .get('/gym/user/images/after', {
          headers: {
            Authorization:`Bearer ${token}`,
            
          },
        })
        .then(response => {
          setAfterImage(response?.data);
        });
      return response;
    } catch (error) {
      console.log(error);
    }
  }, [token, afterImage]);

  return (
    <LGBackround>
      <View>
        <Header centerTitle="Фотографии ДО/ПОСЛЕ" onBackPress={() => {}} title={''} />
        <View style={styles.container}>
          <UserPicture values={beforeImage}  />
          <Text style={styles.headerSubTitle}>После</Text>
          <UserPictureAfter values={afterImage} />
        </View>
      </View>
    </LGBackround>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
  headerSubTitle: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 10,
    marginTop: 20,
  },

  butttonContainer: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: 'rgba(207, 84, 144, 1)',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: Dimensions.get('window').width / 5,
  },
  buttonLabel: {
    color: 'white',
    textAlign: 'center',
  },
  button2: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: Dimensions.get('window').width / 3.5,
  },
  buttonLabel2: {
    color: 'rgba(207, 84, 144, 1)',
    textAlign: 'center',
  },
});
export default BeforeAfterImage;
