import {
  Dimensions,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSheetDialog from 'components/BottomSheetDialog/BottomSheetDialog';
import AccessVisitBottomSheet from './components/Bottoms/AccessVisitBottomSheet';
import SuccessBottom from './components/Bottoms/SuccessBottom';
import ErrorBottomSheet from './components/Bottoms/ErrorBottomSheet';

const screenDimensions = Dimensions.get('screen');

const QRScreen = () => {
  const [visibleAccess, setVisibleAccess] = useState(false);
  return (
    <ImageBackground
      source={require('../.././../../assests/images/scanback.png')}
      style={styles.container}>
      <TouchableOpacity
        style={styles.absolute}
        onPress={() => {
          setVisibleAccess(true);
        }}>
        <Ionicons name="scan" size={24} color="white" />
        <Text style={{color: '#fff', textAlign: 'center', width: 230}}>
          Отсканируйте QR код клиента
        </Text>
      </TouchableOpacity>
      {/* <AccessVisitBottomSheet 
    visibile={visibleAccess}
    onClose={()=>setVisibleAccess(false)}
    onPress={()=>{}}
    /> */}
      {/* <SuccessBottom
    successVisible={visibleAccess}
    onClose={()=>setVisibleAccess(false)}
    /> */}
      <ErrorBottomSheet errorVisible={visibleAccess} onClose={() => setVisibleAccess(false)} />
    </ImageBackground>
  );
};

export default QRScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  absolute: {
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 60,
    borderRadius: 10,
    left: 0,
    bottom: Platform.OS === 'ios' ? 120 : 100,
    right: 0,
  },
});
