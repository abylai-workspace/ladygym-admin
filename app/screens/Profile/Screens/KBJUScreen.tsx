import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import LGBackround from 'components/blocks/LGBackround/LGBackround';
import Header from 'components/headers/Header';
import {Dimensions} from 'react-native';
import Input from '../components/Input';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from 'utils/colors';
import HrLine from 'components/blocks/HrLine/HrLine';
import RNPickerSelect from 'react-native-picker-select';
import { WithLocalSvg } from 'react-native-svg';
const activityLevelOptions = [
    { label: 'Сидячий, малоподвижный', value: 'sedentary' },
    { label: 'Легкая активность (тренировки 1-3 раза в неделю)', value: 'lightlyActive' },
    // { label: 'Moderately Active', value: 'moderatelyActive' },
    { label: 'Средняя активность (тренировки 3-5 раз в неделю)', value: 'veryActive' },
    { label: 'Высокая активность (ежедневные тренировки)', value: 'superActive' },
  ];
const KBJUScreen = () => {
  const navigation = useNavigation();
  const [age, setAge] = useState();
  const [height, setHeight] = useState(); // in cm
  const [weight, setWeight] = useState<any>(); // in kg
  const [desiredWeight, setDesiredWeight] = useState(); // in kg
  const [activityLevel, setActivityLevel] = useState('sedentary'); // Activity level: sedentary, lightlyActive, moderatelyActive, veryActive, superActive
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [carbohydrates, setCarbohydrates] = useState(0);

  const calculateCalories = () => {
    // Calculate BMR (Basal Metabolic Rate)
    const bmr = 10 * weight + 6.25 * height - 5 * age - 161; // For females

    // Adjust BMR based on activity level
    let tdee = 0;
    switch (activityLevel) {
      case 'sedentary':
        tdee = bmr * 1.2;
        break;
      case 'lightlyActive':
        tdee = bmr * 1.375;
        break;
    //   case 'moderatelyActive':
    //     tdee = bmr * 1.55;
    //     break;
      case 'veryActive':
        tdee = bmr * 1.725;
        break;
      case 'superActive':
        tdee = bmr * 1.9;
        break;
      default:
        break;
    }

    let targetCalories = 0;
    if (desiredWeight < weight) {
      // Weight loss goal
      targetCalories = weight * 24 * tdee - 500; // Create a calorie deficit
    } else if (desiredWeight > weight) {
      // Weight gain goal
      targetCalories = weight * 24 * tdee + 500; // Create a calorie surplus
    } else {
      // Maintain current weight
      targetCalories = weight * 24 * tdee;
    }

    setCalories(targetCalories);

    // Calculate daily macronutrient intake
    const proteinPercentage = 0.25; // 25% of calories from protein
    const fatPercentage = 0.3; // 30% of calories from fat
    const carbohydratePercentage = 0.45; // 45% of calories from carbohydrates

    const dailyProtein = (proteinPercentage * targetCalories) / 4; // 1g protein = 4 calories
    const dailyFat = (fatPercentage * targetCalories) / 9; // 1g fat = 9 calories
    const dailyCarbohydrates = (carbohydratePercentage * targetCalories) / 4; // 1g carbohydrate = 4 calories

    setProtein(dailyProtein);
    setFat(dailyFat);
    setCarbohydrates(dailyCarbohydrates);
  };

  console.log(calories)

  return (
    <LGBackround>
      <ScrollView>
        <Header centerTitle="КБЖУ" onBackPress={() => navigation.goBack()} title="" />
        <View style={styles.container}>
          <Text style={styles.headerTitle}>КБЖУ</Text>
          <Text style={styles.headerSubTitle}>
            Расчет соотношение калорий, белков, жиров и углеводов, которые попадают в организм с
            пищей.
          </Text>
          <Text style={styles.headerSubTitle}>Возраст</Text>
          <Input
            placeholder={'Введите ваш возраст '}
            value={age?.toString()}
            onChangeText={(text:any) => setAge(text)}
          />
          <Text style={styles.headerSubTitle}>Рост</Text>
          <Input
            placeholder={'Введите рост в см'}
            value={height?.toString()}
            onChangeText={(text:any) => setHeight(text)}
          />
          <Text style={styles.headerSubTitle}>Вес</Text>
          <Input
            placeholder={'Введите вес в кг'}
            value={weight?.toString()}
            onChangeText={(text:any) => setWeight(text)}
          />
          <Text style={styles.headerSubTitle}>Желаемый вес</Text>
          <Input
            placeholder={'Желаемый вес'}
            value={desiredWeight?.toString()}
            onChangeText={(text:any)=> setDesiredWeight(text)}
          />
          <Text style={styles.headerSubTitle}>Ваш образ жизни</Text>
          <RNPickerSelect
        style={pickerSelectStyles}
        placeholder={{ label: 'Ваш образ жизни', value: null }}
        onValueChange={(value:any) => setActivityLevel(value)}
        items={activityLevelOptions}
        value={activityLevel}
        useNativeAndroidPickerStyle={false}
      />
      <WithLocalSvg asset={require('../../../assests/images/hrline.svg')} style={{marginVertical:15}}/>
          {/* <HrLine label="Результат" /> */}

          <View style={styles.butttonContainer}>
            <TouchableOpacity style={styles.button2} onPress={calculateCalories}>
              <Text style={styles.buttonLabel2}> Рассчитать</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.flex}>
            <View>
              <Text style={styles.result}>Диапазон калорий: </Text>
              <Text style={styles.result}>Суточная норма белка: </Text>
              <Text style={styles.result}>Суточная норма жиров:</Text>
              <Text style={styles.result}>Суточная норма углеводов: </Text>
            </View>
            <View>
              <Text style={{color: COLORS.LADY_GYB_BACKGROUND}}>{calories.toFixed(2)} ккал</Text>
              <Text style={{color: COLORS.LADY_GYB_BACKGROUND}}>{protein.toFixed(2)} грамм</Text>
              <Text style={{color: COLORS.LADY_GYB_BACKGROUND}}>{fat.toFixed(2)} грамм</Text>
              <Text style={{color: COLORS.LADY_GYB_BACKGROUND}}>
                {carbohydrates.toFixed(2)} грамм
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LGBackround>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
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
  result: {
    color: 'white',
  },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 12,
      paddingVertical: 12,
      paddingHorizontal: 10,
    //   borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: '#fff',
      marginBottom: 15,
      backgroundColor: 'rgba(33, 33, 34, 1)',
    
    },
    inputAndroid: {
      fontSize: 12,
      paddingHorizontal: 15,
      paddingVertical: 10,
    //   borderWidth: 1,
       zIndex:999,
      borderColor: 'gray',
      borderRadius: 8,
      color: '#fff',
      marginBottom: 15,
      width: '100%',
      backgroundColor: 'rgba(33, 33, 34, 1)',
    },
  });
export default KBJUScreen;
