/* eslint-disable no-undef */
import React, {useState, useEffect, useRef} from 'react';
import {View, Text, SafeAreaView, StatusBar, Dimensions, StyleSheet, ScrollView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const {width} = Dimensions.get('window');
import SelectDropdown from 'react-native-select-dropdown';

const  Dropdown = () => {
  const [countries, setCountries] = useState<any>([]);
  const [cities, setCities] = useState([]);

  const citiesDropdownRef = useRef<any>();

  useEffect(() => {
    setTimeout(() => {
      setCountries([
        {title: 'Egypt', cities: [{title: 'Cairo'}, {title: 'Alex'}]},
        {title: 'Canada', cities: [{title: 'Toronto'}, {title: 'Quebec City'}]},
      ]);
    }, 1000);
  }, []);

 

  return (
    <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.dropdownsRow}>
            <SelectDropdown
              data={countries}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                citiesDropdownRef.current.reset();
                setCities([]);
                setCities(selectedItem.cities);
              }}
              defaultButtonText={'Select country'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.title;
              }}
              rowTextForSelection={(item, index) => {
                return item.title;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
            <View style={styles.divider} />
            <SelectDropdown
              ref={citiesDropdownRef}
              data={cities}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              defaultButtonText={'Select city'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.title;
              }}
              rowTextForSelection={(item, index) => {
                return item.title;
              }}
              buttonStyle={styles.dropdown2BtnStyle}
              buttonTextStyle={styles.dropdown2BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown2DropdownStyle}
              rowStyle={styles.dropdown2RowStyle}
              rowTextStyle={styles.dropdown2RowTxtStyle}
            />
          </View>
        </ScrollView>
  );
};
 export default Dropdown;
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
 

  scrollViewContainer: {
    
  },
  dropdownsRow: {flexDirection: 'row', width: '50%', paddingHorizontal: '5%',position:'relative',
  backgroundColor:'#000',
  marginTop:0,
},

  dropdown1BtnStyle: {
   
    height: 50,
    backgroundColor: 'rgba(207, 84, 144, 1)',
    borderRadius: 18,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: 'red'},
  dropdown1RowStyle: {backgroundColor: 'red', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  divider: {width: 12},
  dropdown2BtnStyle: {
    // flex: 1,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown2BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown2DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown2RowStyle: {backgroundColor: 'red', borderBottomColor: '#C5C5C5'},
  dropdown2RowTxtStyle: {color: '#444', textAlign: 'left'},
});