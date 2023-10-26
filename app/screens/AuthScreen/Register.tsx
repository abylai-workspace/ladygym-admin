import {
  Alert,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import LGBackround from 'components/blocks/LGBackround/LGBackround';
import {instance, register} from 'utils/axios';

import {Formik} from 'formik';
import * as Yup from 'yup';
// import CheckBox from '@react-native-community/checkbox';
import Feather from 'react-native-vector-icons/Feather';
import CustomButton from 'components/blocks/Buttons/SmallPrimaryButton';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {COLORS} from 'utils/colors';
import {useTimer} from 'hooks/useTimer';
import Checkbox from 'components/blocks/Checkbox';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from 'constants/constants';

const CELL_COUNT = 6;

const Register = () => {
  const navigation=useNavigation();
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [sendOtp, setSendOtp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [value, setValue] = useState('');
  const [otpCode, setOtpCode] = useState('');

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [counter, startTimer, stopTimer] = useTimer();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegistration = async values => {
    if (!isChecked) {
      return Alert.alert('Please check the checkbox');
    }
    try {
      const response = await instance.post('/gym/auth/registration', {
        ...values,
        role: 'USER', // Assuming role is fixed for user registration
      });

      if (response) {
        startTimer();
        setPhoneNumber(values.phoneNumber);
      } else {
        Alert.alert('Server error');
      }

      console.log(response.data);

      setSendOtp(true);
    } catch (error) {
      console.error('Registration failed:', error);
      return error;
    }
  };

  const confirmOtp = async () => {
      try {
        const response = await instance.post('/gym/auth/verify', {
          phoneNumber: phoneNumber,
          code: '1111',
        });
        console.log(response.data, 'phone');
        navigation.navigate(SCREENS.LOGIN as never);
      } catch (error) {
        console.error('Registration failed:', error);
        return error;
      }
    }
    
  const handleCheckboxChange = useCallback(() => {
    setIsChecked(!isChecked);
    Keyboard.dismiss();
  }, [isChecked, setIsChecked]);

  useEffect(() => {
    if (!sendOtp && otpCode && otpCode.length === CELL_COUNT) {
      confirmOtp(otpCode);
    }
  }, [otpCode]);

  useEffect(() => {
    if (sendOtp) {
      stopTimer();
    }
  });
  return (
    <LGBackround>
      <View style={styles.container}>
        {/* <GoBack /> */}
        {!sendOtp && <Text style={styles.text}>Добро пожаловать</Text>}
        {sendOtp && <Text style={styles.text}>Подтвердите свой аккаунт</Text>}

        {!sendOtp && <Text style={styles.subtext}>Сеть женских фитнес-клубов «LADY GYM» </Text>}
        {sendOtp && <Text>Мы отправили вам 6-значный код подтверждения на {phoneNumber}</Text>}
        {!sendOtp && (
          <ScrollView>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                password: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleRegistration}>
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
                  <Text style={styles.subtext1}>Имя</Text>
                  <TextInput
                    onChangeText={handleChange('firstName')}
                    value={values.firstName}
                    style={styles.inputStyle}
                    placeholder="Введите ваше имя"
                    placeholderTextColor={'#4e4e4e'}
                  />
                  {touched.firstName && errors.firstName && (
                    <Text style={styles.errorText}>{errors.firstName}</Text>
                  )}
                  <Text style={styles.subtext1}>Фамилия</Text>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={handleChange('lastName')}
                    value={values.lastName}
                    placeholder="Введите вашу фамилию"
                    placeholderTextColor={'#4e4e4e'}
                  />
                  {touched.lastName && errors.lastName && (
                    <Text style={styles.errorText}>{errors.lastName}</Text>
                  )}
                  <Text style={styles.subtext1}>Email</Text>
                  <TextInput
                    value={values.email}
                    style={styles.inputStyle}
                    onChangeText={handleChange('email')}
                    onBlur={() => setFieldTouched('email')}
                    placeholder="Введите вашу email"
                    placeholderTextColor={'#4e4e4e'}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                  <Text style={styles.subtext1}>Номер телефона</Text>

                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={handleChange('phoneNumber')}
                    value={values.phoneNumber}
                    keyboardType="phone-pad"
                    placeholder="Введите ваш номер телефона"
                    placeholderTextColor={'#4e4e4e'}
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                  )}
                  <Text style={styles.subtext1}>Пароль</Text>
                  <TextInput
                    value={values.password}
                    style={styles.inputStyle}
                    placeholder="Password"
                    onChangeText={handleChange('password')}
                    secureTextEntry={!showPassword}
                    placeholderTextColor={'#4e4e4e'}
                  />

                  <Feather
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    onPress={togglePasswordVisibility}
                    style={styles.icon}
                  />

                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                  <View style={{flexDirection: 'row', marginTop: 20, margin: 10}}>
                    <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
                    {/* <CheckBox onCheckColor={Platform.OS === 'ios' ? '#fff':'#F43'} tintColor='#fff' lineWidth={1} /> */}
                    <Text style={{color: '#fff', fontSize: 12, marginLeft: 10}}>
                      Я ознакомлен, согласен и принимаю условия {'\n'}
                      <Text style={{color: '#CF5490', textDecorationLine: 'underline'}}>
                        Оферты
                      </Text>{' '}
                      и{' '}
                      <Text style={{color: '#CF5490', textDecorationLine: 'underline'}}>
                        Политики конфиденциальности
                      </Text>{' '}
                    </Text>
                  </View>

                  <CustomButton label="Зарегистрироваться" onPress={handleSubmit} variant="fill" />
                </View>
              )}
            </Formik>
            <View style={styles.footerText}>
              <Text style={{textAlign: 'center', color: '#4e4e4e'}}>У вас есть аккаунт? </Text>
              <TouchableOpacity onPress={() => navigation.navigate(SCREENS.LOGIN as never)}>
                <Text style={{textAlign: 'center', color: '#CF5490'}}>Войти</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
        {sendOtp && (
          <>
            <KeyboardAvoidingView>
              <CodeField
                ref={ref}
                {...props}
                value={value}
                keyboardType="number-pad"
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                renderCell={({index, symbol, isFocused}) => (
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
                onBlur={() => {}}
              />
              <Text style={styles.timer}> {`${counter}`}</Text>

              <View style={{marginTop: 300}}>
                <CustomButton
                  label="Подтвердить"
                  onPress={confirmOtp}
                  variant="fill"
                />
              </View>
            </KeyboardAvoidingView>
          </>
        )}
      </View>
    </LGBackround>
  );
};

export default Register;

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
  },
  // container: {
  //   marginTop: Platform.OS === 'ios' ? 20 :0,
  //   margin:10
  // },
  icon: {
    marginRight: 10,
    color: '#fff',
    alignSelf: 'flex-end',
    marginTop: Platform.OS === 'ios' ? -35 : -40,
    marginBottom: 20,
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
    marginBottom: 20,
  },
  subtext1: {
    fontSize: 15,
    color: 'white',
    marginTop: 5,
  },
  formContainer: {
    padding: 0,
    paddingLeft: 0,
  },
  inputStyle: {
    backgroundColor: '#212121',
    borderRadius: 12,
    padding: 15,
    marginBottom: 2,
    marginTop: 10,
    fontSize: 16,
    color: 'white',
  },
  errorText: {
    fontSize: 12,
    color: '#FF0D10',
    marginBottom: 0,
  },
  footerText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  codeFieldRoot: {marginTop: 20, width: width / 1.3, alignSelf: 'center'},
  cell: {
    width: 45,
    height: 45,
    lineHeight: 34,
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: 6,
    fontSize: 18,
    textTransform: 'uppercase',
    color: COLORS.white,
    padding: 5,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: COLORS.orange,
  },
  timer: {
    fontSize: 16,
    color: '#797979',
    marginTop: 10,
    textAlign: 'center',
  },
});
