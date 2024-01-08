import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import LGBackround from 'components/blocks/LGBackround/LGBackround';
import HeaderTitle from 'screens/HomeScreen/components/HeaderTitle';
import CustomButton from 'components/blocks/Buttons/SmallPrimaryButton';
import DatePicker from '@react-native-community/datetimepicker';
// import Input from './Input';
import {useNavigation} from '@react-navigation/native';
import {storageReadItem} from 'utils/asyncStorage';
import {NORMAL_TOKEN_KEY, SCREENS} from 'constants/constants';
import {instance} from 'utils/axios';

const FreezeScreen = ({route}) => {
  const navigation = useNavigation();
  const subscriptionId = route.params?.subscriptionId;
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [token, setToken] = useState('');

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const inputContainerStyle = isFocused
    ? {
        ...styles.inputContainer,
        borderColor: 'rgba(207, 84, 144, 1)',
      }
    : styles.inputContainer;

  const inputStyle = isFocused
    ? {...styles.input, color: 'white'}
    : styles.input;

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  useEffect(() => {
    storageReadItem(NORMAL_TOKEN_KEY).then(token => {
      setToken(token);
    });
  }, []);

  const freeze = async () => {
    await instance
      .post(
        '/gym/subscriptions/freeze',
        {
          subscriptionId,
          daysToFreeze: day,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        navigation.goBack();
      });
  };

  // const formattedDate = `${date.getFullYear()}-${String(
  //   date.getMonth() + 1,
  // ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; // Format the date as needed

  return (
    <LGBackround>
      <HeaderTitle title="Заморозить" onPress={() => navigation.goBack()} />
      <Text
        style={{
          textAlign: 'center',
          color: '#fff',
          fontSize: 20,
          marginTop: 20,
          marginBottom: 20,
        }}>
        На сколько дней заморозить?
      </Text>
      <View style={[inputContainerStyle]}>
        <TextInput
          style={inputStyle}
          keyboardType="number-pad"
          placeholder="Введите кол-во дней"
          // value={formattedDate}
          // onChangeText={setInputValue}
          // onChangeText={() => setShowDatePicker(true)}
          onChangeText={text => setDay(text)}
          value={day}
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

      <CustomButton variant="fill" label="Заморозить" onPress={freeze} />
    </LGBackround>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // resizeMode: 'cover',
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
    fontSize: 20,
  },
  input: {
    // flex: 1,
    color: '#FFF',
    fontSize: 20,
  },
});
export default FreezeScreen;
