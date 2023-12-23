import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import ModalBottom from '../GymInformation/ModalBottom';
import Input from 'screens/Profile/components/Input';
import HeaderTitle from '../HeaderTitle';

interface ModalProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  goBack: () => void;
}
const ImgBottomSheet = ({isModalVisible, toggleModal, goBack}: ModalProps) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [currentIMT, setCurrentIMT] = useState('');
  const [idealWeight, setIdealWeight] = useState('');

  //   const weight = parseFloat(this.state.weight);
  //     const height = parseFloat(this.state.height) / 100; // Преобразование роста в метры
  //     const bmi = (weight / (height * height)).toFixed(2);
  //     this.setState({ bmi });
  const calculateIMT = () => {
    if (weight && height) {
      const weightKg = parseFloat(weight);
      const heightM = parseFloat(height) / 100;
      const imt: any = (weightKg / (heightM * heightM)).toFixed(2);
      setCurrentIMT(imt);

      // Рассчитываем идеальный вес для данного ИМТ (например, 22 - средний нормальный ИМТ)
      const idealWeightKg: any = 21 * (heightM * heightM);
      setIdealWeight(idealWeightKg.toFixed(2));
    }
  };
  return (
    <ModalBottom isModalVisible={isModalVisible} toggleModal={toggleModal}>
      <HeaderTitle title="Расчет ИМТ" onPress={goBack} />

      <View style={styles.container}>
        <Text style={styles.headerTitle}>Индекс Массы Тела</Text>
        <Text style={styles.headerSubTitle}>Расчет идеального веса через Индекс Массы Тела</Text>
        <Text style={styles.headerSubTitle}>Рост</Text>
        <Input
          placeholder={'Введите рост в см'}
          onChangeText={text => setHeight(text)}
          value={height}
        />
        <Text style={styles.headerSubTitle}>Вес</Text>
        <Input
          placeholder={'Введите вес в кг'}
          onChangeText={text => setWeight(text)}
          value={weight}
        />
        <Text style={{textAlign: 'center', marginTop: 20, color: '#fff', fontSize: 14}}>
          Результат
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
          <View>
            <Text style={styles.headerSubTitle}>Идеальный вес</Text>
            <Input
              placeholder={'0 кг'}
              style={{paddingHorizontal: 40}}
              value={idealWeight}
              onChangeText={text => setIdealWeight(text)}
            />
          </View>
          <View>
            <Text style={styles.headerSubTitle}>Текущий ИМТ</Text>
            <Input
              placeholder={'0 кг'}
              style={{paddingHorizontal: 40}}
              value={currentIMT}
              onChangeText={text => setCurrentIMT(text)}
            />
          </View>
        </View>
        <Text style={styles.headerSubTitle}>ИМТ соответствует</Text>
        <Text style={styles.headerSubTitle2}>Недостаточная масса тела</Text>
      </View>
      <View style={styles.butttonContainer}>
        <TouchableOpacity style={styles.button2} onPress={calculateIMT}>
          <Text style={styles.buttonLabel2}> Рассчитать</Text>
        </TouchableOpacity>
      </View>
    </ModalBottom>
  );
};

export default ImgBottomSheet;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
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
  headerSubTitle2: {
    color: 'rgba(207, 84, 144, 1)',
    fontSize: 12,
    marginBottom: 10,
    textDecorationLine: 'underline',
  },

  butttonContainer: {
    marginHorizontal: 10,
    marginTop: Dimensions.get('window').height / 5,
  },

  button2: {
    backgroundColor: 'rgba(207, 84, 144, 1)',
    borderRadius: 20,
    padding: 10,
    paddingVertical: 14,
    paddingHorizontal: Dimensions.get('window').width / 3.5,
  },
  buttonLabel2: {
    color: '#fff',
    textAlign: 'center',
  },
});
