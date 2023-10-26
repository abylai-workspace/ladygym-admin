import {View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert} from 'react-native';
import React, {useState} from 'react';
import LGBackround from 'components/blocks/LGBackround/LGBackround';
import Header from 'components/headers/Header';
import Input from '../components/Input';
import {useNavigation} from '@react-navigation/native';
import {instance} from 'utils/axios';
import {storageReadItem} from 'utils/asyncStorage';
import {SCREENS, TOKEN_KEY} from 'constants/constants';
import {COLORS} from 'utils/colors';
import { WithLocalSvg } from 'react-native-svg';

const IndexWeght = () => {
  const navigation = useNavigation();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [currentIMT, setCurrentIMT] = useState('');
  const [idealWeight, setIdealWeight] = useState('');
  const [successText, setSuccessText] = useState('');
  const [interpretation, setInterpretation] = useState('');

  const calculateIMT = () => {
    if (weight && height) {
      const weightKg = parseFloat(weight);
      const heightM = parseFloat(height) / 100;
      const imt: any = (weightKg / (heightM * heightM)).toFixed(2);
      setCurrentIMT(imt);
      let interpretation = '';
      if (imt < 18.5) {
        interpretation = 'Недостаточный вес';
      } else if (imt < 24.9) {
        interpretation = 'Нормальный вес';
      } else if (imt < 29.9) {
        interpretation = 'Избыточный вес';
      } else {
        interpretation = 'Ожирение';
      }
      setInterpretation(interpretation);
      // Рассчитываем идеальный вес для данного ИМТ (например, 22 - средний нормальный ИМТ)
      const idealWeightKg: any = 22 * (heightM * heightM);
      setIdealWeight(idealWeightKg.toFixed(2));
    }
    // Интерпретация ИМТ
  };

  const postData = async () => {
    try {
      const response = await instance.post(
        '/gym/user/body/info',
        {
          height: height,
          weight: weight,
        },
        {
          headers: {
            Authorization: `Bearer ${await storageReadItem(TOKEN_KEY)}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200 && response.data) {
        console.log(response.data);
        Alert.alert(response.data.message);
        setSuccessText(response.data.message);
      }
    } catch (error) {}
  };
  return (
    <LGBackround>
      <View>
        <Header centerTitle="ИМТ" onBackPress={() => navigation.goBack()} title="" />
        <TouchableOpacity
          style={styles.history}
          onPress={() => navigation.navigate(SCREENS.PROFILE_HISTORY_INFO as never)}>
          <Text style={{color: '#fff'}}>История</Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.headerTitle}>Индекс Массы Тела</Text>
          <Text style={styles.headerSubTitle}>Расчет идеального веса через Индекс Массы Тела</Text>
          <Text style={styles.headerSubTitle}>Рост</Text>
          <Input
            placeholder={'Введите рост в см'}
            value={height}
            onChangeText={text => {
              setHeight(text);
            }}
          />
          <Text style={styles.headerSubTitle}>Вес</Text>
          <Input
            placeholder={'Введите вес в кг'}
            value={weight}
            onChangeText={text => setWeight(text)}
          />
      <WithLocalSvg asset={require('../../../assests/images/hrline.svg')} style={{marginVertical:15}}/>

          
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
            <View>
              <Text style={styles.headerSubTitle}>Идеальный вес</Text>
              <Input
                placeholder={'0 кг'}
                style={{paddingHorizontal: 40}}
                value={idealWeight}
                onChangeText={() => {}}
              />
            </View>
            <View>
              <Text style={styles.headerSubTitle}>Текущий ИМТ</Text>
              <Input
                placeholder={'0 кг'}
                style={{paddingHorizontal: 40}}
                value={currentIMT}
                onChangeText={() => {}}
              />
            </View>
          </View>
          <Text style={styles.headerSubTitle}>{interpretation}</Text>
          <Text style={styles.headerSubTitleweight}>Недостаточная масса тела</Text>
          <View style={styles.butttonContainer}>
            <TouchableOpacity style={styles.button2} onPress={calculateIMT}>
              <Text style={styles.buttonLabel2}> Рассчитать</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.butttonContainer}>
            <TouchableOpacity style={styles.button} onPress={postData}>
              <Text style={styles.buttonLabel}> Сохранить данные</Text>
            </TouchableOpacity>
          </View>
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
  },
  headerSubTitleweight: {
    color: COLORS.LADY_GYB_BACKGROUND,
    fontSize: 12,
    textDecorationLine: 'underline',
    marginBottom: 10,
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
  history: {
    color: '#fff',
    position: 'absolute',
    right: 20,
    top: 20,
  },
});
export default IndexWeght;
