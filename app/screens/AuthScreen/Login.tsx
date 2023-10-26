import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Alert,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import React, { useEffect } from 'react';
import {decode as atob, encode as btoa} from 'base-64'
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import CustomButton from 'components/blocks/Buttons/SmallPrimaryButton';
import LGBackround from 'components/blocks/LGBackround/LGBackround';
import { instance, login, saveAccessTokens } from 'utils/axios';
import { REFRESH_TOKEN_KEY, SCREENS, TOKEN_KEY } from 'constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import {  loginStart, loginSuccess, logout } from 'store/slices/authSlice';
import { setRole } from 'store/slices/roleSlice';
import { setAccessToken } from 'store/slices/tokenSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageDeleteItem } from 'utils/asyncStorage';
const Login = ({login}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username Name is required'),
    password: Yup.string()
      .min(2, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const onLogin = async (values) => {
    dispatch(loginStart())

    const credentials = `${values.username}:${values.password}`;
  const base64Credentials = btoa(credentials);
    try {
      const response =  await instance.post('/gym/auth/login', null,{
        headers: {
          Authorization: `Basic ${base64Credentials}`,
        },
      });
      const {role,accessToken}=response.data
      // await saveAccessTokens(response)
      dispatch(setRole(role))
      dispatch(loginSuccess({ user: values,token:accessToken }));
      login()
      await saveAccessTokens(response)
      // if(role === 'ADMIN'){
      //   // navigation.navigate(SCREENS.ABONEMENT_FILIAL as never);
      //   // saveAccessTokens(response);


      // }else{
      //   // await storageDeleteItem(TOKEN_KEY)
      //   // await storageDeleteItem(REFRESH_TOKEN_KEY)
      // await saveAccessTokens(response)
      // }
      return { success: true };
      // navigation.navigate(SCREENS.MULTIONBOARDING as never);
    } catch (error) {
      console.error('Registration failed:', error);
      return error;
    }
  }
  
 
  return (
    <LGBackround>
      <ScrollView>
        <View style={styles.container}>
          {/* <GoBack /> */}
          <Text style={styles.text}>Добро пожаловать</Text>
          <Text style={styles.subtext}>
            Сеть женских фитнес-клубов «LADY GYM»{' '}
          </Text>

          <Formik
          initialValues={{
            username: '', password: ''
          }}

          validationSchema={validationSchema}
          onSubmit={onLogin}>
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
            }) => (
              <View style={styles.formContainer}>
                <Text style={styles.subtext1}>Номер телефона</Text>
                <TextInput
                  value={values.username}
                  style={styles.inputStyle}
                  onChangeText={handleChange('username')}
                keyboardType='numeric'
                  placeholder="Введите ваш номер телефона"
                  placeholderTextColor={'#4e4e4e'}
                />
                {touched.username && errors.username && (
                  <Text style={styles.errorText}>{errors.username}</Text>
                )}
                <Text style={styles.subtext1}>Пароль</Text>
                <TextInput
                  value={values.password}
                  style={styles.inputStyle}
                  keyboardType='numeric'
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                  placeholder="Введите ваш пароль"
                  placeholderTextColor={'#4e4e4e'}
                  secureTextEntry
                />
                {touched.password && errors.password && (
                  <>
                    <Text style={styles.errorText}>{errors.password}</Text>
                    <TouchableOpacity>
                      <Text style={styles.restoreText}>
                        Восстановить пароль.
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
                 <View style={{marginTop:Platform.OS === 'ios' ? Dimensions.get('window').height/2.5 :Dimensions.get('window').height/4,margin:15}}>
               <View style={styles.footerText}>
              <Text style={{textAlign: 'center', color: '#4e4e4e'}}>
              У вас нет аккаунта? {' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate(SCREENS.REGISTER as never)}>
                <Text style={{textAlign: 'center', color: '#CF5490'}}>
                Зарегистрироваться
                </Text>
              </TouchableOpacity>
            </View>
            <CustomButton
                  label="Подтвердить"
                  onPress={handleSubmit}
                  // onPress={code => confirmOtp(code)}
                  variant="fill"
                />
              
             
           
          </View>
              </View>
            )}
          </Formik>
         
        </View>
      </ScrollView>
    </LGBackround>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    marginTop: 30,
    margin: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    marginBottom: 7,
  },
  subtext: {
    fontSize: 15,
    color: 'white',
    marginTop:5,
    marginBottom:30
  },
  subtext1: {
    fontSize: 15,
    color: 'white',
    
  },
  formContainer: {
    padding: 0,
    
  },
  inputStyle: {
    backgroundColor: '#212121',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    marginTop: 10,
    fontSize: 16,
    color: 'white',
  },
  errorText: {
    fontSize: 12,
    color: '#FF0D10',
    marginBottom: 10,
    width: 300,
  },
  restoreText: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 10,
    width: 300,
  },
  footerText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom:10
  },
});
export default Login;
