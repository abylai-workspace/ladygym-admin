import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LGBackround from 'components/blocks/LGBackround/LGBackround';
import HeaderTitle from 'screens/HomeScreen/components/HeaderTitle';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import CustomButton from 'components/blocks/Buttons/SmallPrimaryButton';
import { instance } from 'utils/axios';
import { storageReadItem } from 'utils/asyncStorage';
import { NORMAL_TOKEN_KEY, TOKEN_KEY } from 'constants/constants';

const DAYS_OF_WEEK = [
  {
    name: 'ПН',
    slug: 'MONDAY',
  },
  {
    name: 'ВТ',
    slug: 'TUESDAY',
  },
  {
    name: 'СР',
    slug: 'WEDNESDAY',
  },
  {
    name: 'ЧТ',
    slug: 'THURSDAY',
  },
  {
    name: 'ПТ',
    slug: 'FRIDAY',
  },
  {
    name: 'СБ',
    slug: 'SATURDAY',
  },
  {
    name: 'ВС',
    slug: 'SUNDAY',
  },
];

const {width, height} = Dimensions.get('window');

const TrainerSchedule = ({route}) => {
  const navigation = useNavigation();
  const trainerSchedule = route.params.trainers;
  const [brands, setBrands] = useState(DAYS_OF_WEEK);
  const [token, setToken] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<any[]>([]);

  const [dateFrom, setDateFrom] = useState(new Date());
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [dateTo, setDateTo] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    const formattedTime = currentDate.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });    
    setTimeFrom(formattedTime); 
    setDateFrom(currentDate);
  };

  const onChangeTo = (event, selectedDate) => {
    const currentDate = selectedDate; 
    const formattedTime = currentDate.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });    
    setTimeTo(formattedTime); 
    setDateTo(currentDate);
  }

  const onChangeandroid = (event, selectedDate) => {
    const currentDate = selectedDate;
    const formattedTime = currentDate.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });    
    setTimeTo(formattedTime); ; 
    setShowDatePicker(false);
    setDateFrom(currentDate);
  };

  const onChangeToAndroid = (event, selectedDate) => {
    const currentDate = selectedDate;
    const formattedTime = currentDate.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });    
    setTimeTo(formattedTime); 
    setShowDatePicker(false);
    setDateTo(currentDate);
  };

  const renderBrands = ({item, index}) => {
    const {name, slug} = item;
    const isSelected = selectedBrands.filter(i => i === slug).length > 0;
    console.log([name], slug);

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => {
            if (isSelected) {
              setSelectedBrands(prev => prev.filter(i => i !== slug));
            } else {
              setSelectedBrands(prev => [...prev, slug]);
            }
          }}
          style={[styles.item, isSelected && {backgroundColor: 'rgba(207, 84, 144, 1)'}]}>
          <Text style={{color: isSelected ? 'white' : '#fff'}}>{name}</Text>
        </TouchableOpacity>
      </View>
    );
  };


  useEffect(() => {
    storageReadItem(NORMAL_TOKEN_KEY).then(token => {
      setToken(token);
    });
  }, [])


  

  const onSubmitSchedule = () => {
      try {
        const response = instance.post(
          `/gym/trainer/schedule/${trainerSchedule?.id}`,
          {
            workTimeFrom: timeFrom,
            workTimeTo: timeTo,
            daysOfWeek: selectedBrands
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response?.status === 200) {
          navigation.goBack();
        }
        console.log(response, 'response',           {
          workTimeFrom: timeFrom,
          workTimeTo: timeTo,
          daysOfWeek: selectedBrands
        }, );
        
        return response;
      } catch (error) {}
  };

  console.log(selectedBrands, '123');

  console.log(timeFrom?.toString(), ':dateFrom', timeTo, ':dateTo');

  // console.log(trainerSchedule?.id, 'route');
  return (
    <LGBackround>
      <HeaderTitle title={'Расписание тренеров'} onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <View style={styles.timeContainer}>
          <View>
            <Text style={styles.timeText}>Начало</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(!showDatePicker)}>
              <Text>Open</Text>
            </TouchableOpacity>
            {Platform.OS === 'ios' ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={dateFrom}
                mode="time" // You can change this to "date" or "time" if needed
                is24Hour={true}
                display="spinner"
                onChange={onChange}
                style={styles.timePicker}
                accentColor="#fff"
                textColor="#fff"
              />
            ) : (
              <>
                {showDatePicker && (
                  <>
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={dateFrom}
                      mode="time" // You can change this to "date" or "time" if needed
                      is24Hour={true}
                      display="spinner"
                      onChange={onChangeandroid}
                      style={styles.timePicker}
                      accentColor="#fff"
                      textColor="#fff"
                    />
                  </>
                )}
              </>
            )}
            {Platform.OS === 'android' && <Text>{dateFrom?.toString()}</Text>}
          </View>
          <View>
            <Text style={styles.timeText}>Конец</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(!showDatePicker)}>
              <Text>Open</Text>
            </TouchableOpacity>
            {Platform.OS === 'ios' ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={dateTo}
                mode="time" // You can change this to "date" or "time" if needed
                is24Hour={true}
                display="spinner"
                onChange={onChangeTo}
                style={styles.timePicker}
                accentColor="#fff"
                textColor="#fff"
              />
            ) : (
              <>
                {showDatePicker && (
                  <>
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={dateTo}
                      mode="time" // You can change this to "date" or "time" if needed
                      is24Hour={true}
                      display="spinner"
                      onChange={onChangeToAndroid}
                      style={styles.timePicker}
                      accentColor="#fff"
                      textColor="#fff"
                    />
                  </>
                )}
              </>
            )}
          </View>
        </View>
        <Text style={{color: '#fff'}}>Дни недели</Text>
        <FlatList data={brands} renderItem={renderBrands} horizontal scrollEnabled={false} />
        {/* <Text style={{color: '#fff'}}>selected: {date.toLocaleString()}</Text> */}
        <CustomButton label="Сохранить" variant="fill" style={{marginTop: 20}} onPress={onSubmitSchedule} />
      </View>

      {/* <Text>TrainerSchedule</Text> */}
    </LGBackround>
  );
};

export default TrainerSchedule;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  calendarContainer: {
    backgroundColor: 'transparent',
    marginHorizontal: 20,

    color: '#fff',
  },
  timePicker: {
    height: 140,
    width: width / 2,
    color: '#fff',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  timeText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    margin: 2,
    width: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    height: 45,
    borderRadius: 50,
  },
  selectedBrandsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  selectedBrandText: {
    margin: 5,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
});
