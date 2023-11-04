import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
import {TextInput} from 'react-native';

import CircularProgress from 'react-native-circular-progress-indicator';
import CustomButton from 'components/blocks/Buttons/SmallPrimaryButton';
import LGBackround from 'components/blocks/LGBackround/LGBackround';
import DatePicker from '@react-native-community/datetimepicker';
import {instance} from 'utils/axios';

interface OnBoarding {
  children: React.ReactNode;
  onNext: () => void;
  onBack: () => void;
  currentStep: any;
  totalSteps: string | number;
  headerText: string;
}
const OnboardingScreen = ({
  children,
  onNext,
  onBack,
  currentStep,
  totalSteps,
  headerText,
}: OnBoarding) => {
  return (
    <View style={styles.onBoardingcontainer}>
      <View style={styles.navigation}>
        {onBack && (
          <TouchableOpacity style={styles.button} onPress={onBack}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
        )}
        <Text style={styles.stepText}>
          Шаг {currentStep} из {totalSteps}
        </Text>
      </View>
      <View>
        <Text style={styles.headerText}>{headerText}</Text>
      </View>
      <View>{children}</View>
      {onNext && (
        <View style={{marginTop: Dimensions.get('window').height * 0.2}}>
          <CustomButton label="Далее" onPress={onNext} variant="fill" />
        </View>
      )}
    </View>
  );
};

const MultiOnboardingComponent = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);

  const [date, setDate] = useState(new Date());
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [desiredWeight, setDesiredWeight] = useState('');
  const [fieldOfActivity, setFieldOfActivity] = useState('');
  const [goalType, setGoalType] = useState([
    {
      id: 1,
      label: 'Сброс веса',
      selected: false,
      goalType: 'KEEPING_FIT',
      image: require('../../assests/images/weight-scale.png'),
    },
    {
      id: 2,
      label: 'Поддержание здоровья',
      selected: false,
      goalType: 'WEIGHT_LOSS',
      image: require('../../assests/images/tree.png'),
    },
    {
      id: 3,
      label: 'Поддержка физической формы',
      selected: false,
      goalType: 'HEALTH_MAINTENANCE',
      image: require('../../assests/images/hand.png'),
    },
    {
      id: 4,
      label: 'Набор мышечной массы',
      selected: false,
      goalType: 'MUSCLE_MASS',
      image: require('../../assests/images/dumbbell.png'),
    },

    // Add more items as needed with their respective goalType
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(date.getDate()).padStart(2, '0')}`; // Format the date as needed

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleBack = () => {
    setCurrentPage(currentPage - 1);
    if (currentPage === 0) {
      navigation.goBack();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const inputContainerStyle = isFocused
    ? {...styles.inputContainer, borderColor: 'rgba(207, 84, 144, 1)'}
    : styles.inputContainer;

  const inputStyle = isFocused ? {...styles.input, color: 'white'} : styles.input;

  const toggleItemSelection = id => {
    setGoalType(prevData =>
      prevData.map(item =>
        item.id === id ? {...item, selected: true} : {...item, selected: false},
      ),
    );
  };

  const selectedItems = goalType.find(item => item.selected);
  const goalTypeValue = `"${selectedItems?.goalType}"`;
  console.log(
    goalTypeValue,
    'goalTypeValue',
    height,
    weight,
    desiredWeight,
    fieldOfActivity,
    formattedDate,
  );
  const postData = async () => {
    try {
      const response = await instance.post('/gym/user/info', {
        height: height,
        weight: weight,
        desiredWeight: desiredWeight,
        fieldOfActivity: fieldOfActivity,
        date: formattedDate,
        //   goalType: goalTypeValue
      });
      if (response.data) {
      }

      console.log(response.data);
    } catch (error) {}
  };
  const renderProgress = () => {
    return (
      <>
        <View style={styles.progressContainer}>
          <Text style={styles.pregressText}>Мы сохраняем {'\n'} ваши данные!</Text>
          <View style={{alignContent: 'center', alignItems: 'center'}}>
            <CircularProgress
              value={75}
              inActiveStrokeColor={'#CF5490'}
              inActiveStrokeOpacity={0.2}
              progressValueColor={'#fff'}
              activeStrokeColor="#CF5490"
              valueSuffix={'%'}
            />
          </View>

          <Text style={styles.pregressSubText}>
            Мы создаем аккаунт и сохраняем {'\n'} ваши персональные данные.
          </Text>
          <View style={{paddingLeft: 40, paddingRight: 40}}>
            <CustomButton label="Продолжить" onPress={postData} variant="fill" />
          </View>
        </View>
      </>
    );
  };
  const renderOnboardingScreen = () => {
    const totalSteps = 6; // Total number of onboarding screens

    switch (currentPage) {
      case 0:
        return (
          <OnboardingScreen
            onNext={handleNext}
            currentStep={1}
            totalSteps={totalSteps}
            onBack={handleBack}
            headerText="Выберите цель">
            <View>
              <FlatList
                data={goalType}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => toggleItemSelection(item.id)}
                    style={[
                      styles.selectedtag,
                      {
                        backgroundColor: item.selected
                          ? 'rgba(207, 84, 144, 1)'
                          : 'rgba(14, 14, 16, 0.6)',
                      },
                    ]}>
                    <Image source={item.image} />
                    <Text style={styles.tagText}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </OnboardingScreen>
        );
      case 1:
        return (
          <OnboardingScreen
            onBack={handleBack}
            onNext={handleNext}
            currentStep={2}
            totalSteps={totalSteps}
            headerText="Ваша дата рождения">
            <View style={inputContainerStyle}>
              <TextInput
                style={inputStyle}
                placeholder="Enter value"
                value={formattedDate}
                // onChangeText={setInputValue}
                onChangeText={() => setShowDatePicker(true)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />

              {showDatePicker && (
                <DatePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>

            {/* Content for the second onboarding screen */}
          </OnboardingScreen>
        );
      case 2:
        return (
          <OnboardingScreen
            onBack={handleBack}
            onNext={handleNext}
            currentStep={3}
            totalSteps={totalSteps}
            headerText="Введите ваш рост">
            {/* Content for the third onboarding screen */}
            <View style={styles.inputContai}>
              <View style={inputContainerStyle}>
                <TextInput
                  style={inputStyle}
                  placeholder="Введите ваш рост"
                  value={height}
                  onChangeText={text => setHeight(text)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  keyboardType="numeric"
                />
              </View>
              <Text style={styles.inputtext}>см</Text>
            </View>
          </OnboardingScreen>
        );
      case 3:
        return (
          <OnboardingScreen
            onBack={handleBack}
            onNext={handleNext}
            currentStep={4}
            totalSteps={totalSteps}
            headerText="Введите ваш вес">
            <View style={styles.inputContai}>
              <View style={inputContainerStyle}>
                <TextInput
                  style={inputStyle}
                  placeholder="Введите ваш вес"
                  value={weight}
                  onChangeText={text => setWeight(text)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  keyboardType="numeric"
                />
              </View>
              <Text style={styles.inputtext}>кг</Text>
            </View>
            {/* Content for the fourth onboarding screen */}
          </OnboardingScreen>
        );
      case 4:
        return (
          <OnboardingScreen
            onBack={handleBack}
            onNext={handleNext}
            currentStep={5}
            totalSteps={totalSteps}
            headerText="Введите ваш желаемый вес">
            <View style={styles.inputContai}>
              <View style={inputContainerStyle}>
                <TextInput
                  style={inputStyle}
                  placeholder="Введите ваш желаемый вес"
                  value={desiredWeight}
                  onChangeText={text => setDesiredWeight(text)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  keyboardType="numeric"
                />
              </View>

              <Text style={styles.inputtext}>кг</Text>
            </View>
            {/* Content for the fifth onboarding screen */}
          </OnboardingScreen>
        );
      case 5:
        return (
          <OnboardingScreen
            onBack={handleBack}
            onNext={handleNext}
            currentStep={6}
            totalSteps={totalSteps}
            headerText="Ваша сфера деятельности">
            <View style={styles.selectedtag}>
              <View style={styles.tagContainer}>
                <Image source={require('../../assests/images/weight-scale.png')} />
              </View>
              <TextInput
                style={inputStyle}
                placeholder="Ваша сфера деятельности"
                value={fieldOfActivity}
                onChangeText={text => setFieldOfActivity(text)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </View>
            {/* <Progress.Circle size={120} showsText={true} thickness={5} progress={progress} /> */}
            {/* Content for the sixth onboarding screen */}
          </OnboardingScreen>
        );
      case 6:
        return renderProgress();
      default:
        return null;
    }
  };

  return (
    <LGBackround>
      <View>{renderOnboardingScreen()}</View>
    </LGBackround>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  onBoardingcontainer: {
    margin: 15,
  },
  navigation: {
    flexDirection: 'row',

    marginTop: 10,
    marginBottom: 20,
  },
  headerText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
  },
  button: {},
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: Dimensions.get('window').width / 4,
    textAlignVertical: 'center',
    verticalAlign: 'middle',
  },
  selectedtag: {
    backgroundColor: 'rgba(14, 14, 16, 0.6)',
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    margin: 10,
    borderColor: 'rgba(33, 33, 34, 1)',
    borderWidth: 1,
  },
  tagContainer: {
    backgroundColor: 'rgba(207, 84, 144, 1)',
    borderRadius: 10,
    padding: 10,
  },
  tagText: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
    marginLeft: 10,
  },
  inputContainer: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
    borderColor: 'white',
  },
  input: {
    // flex: 1,
    color: 'white',
    marginTop: 20,
  },
  inputContai: {
    flexDirection: 'row',
    alignSelf: 'center',
    textAlign: 'center',
  },
  inputtext: {
    color: 'white',
    fontSize: 16,
    marginTop: 13,
    marginLeft: 10,
  },
  nextButton: {
    marginTop: 200,
  },
  progressContainer: {
    marginTop: 50,
  },
  pregressText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: '600',
  },
  pregressSubText: {
    color: 'white',
    fontSize: 16,

    textAlign: 'center',
    marginTop: 50,
  },
});
export default MultiOnboardingComponent;
