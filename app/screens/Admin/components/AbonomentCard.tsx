import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WithLocalSvg } from 'react-native-svg'
import Slider from '@react-native-community/slider';

const SubscriptionAdditionalType = {
    PERSONAL_TRAINER: "Персональные услуги тренера",
    SPLIT_TRAINER: "Сплит-услуги тренера",
    GROUP: "Групповые тренировки",
    ONLINE: "Онлайн ведение",
    ONE_TIME: "Разовая тренировка с тренером",
    WITHOUT_TRAINER: "Без тренера"
  };
const AbonomentCard = (props) => {
    const {type}=props

    return (
        <View style={styles.container}>
            <View style={styles.flexContainer}>
                <View style={styles.iconContainer}>
                    <WithLocalSvg asset={require('../../../assests/images/sport1.svg')} />
                </View>
                <View style={styles.flexContainer3}>
                    <Text style={styles.text1}>{SubscriptionAdditionalType[type]}</Text>
                    <Text style={styles.text2}>Осталось 12 занятий</Text>
                </View>
            </View>
            <Text style={styles.text3}>{props.name}</Text>
            <Text style={styles.text2}>Осталось {props.days} дней</Text>
            <Slider
  style={{width: '100%', height: 40,marginLeft:-10}}
  minimumValue={0}
  maximumValue={80}

  thumbTintColor='#FFFFFF'
  minimumTrackTintColor="#FFFFFF"
  maximumTrackTintColor="#000000"
/>
        </View>
    )
}

export default AbonomentCard

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 0,
        marginVertical: 10,
        backgroundColor: 'rgba(255, 144, 198, 1)',
        padding: 10,
        paddingHorizontal: 15,
        paddingVertical:15,
        borderRadius: 10,
        marginBottom:20
    },
    flexContainer: {
        flexDirection: 'row',
    },
    iconContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        padding: 10,
        borderRadius: 50
    },
    flexContainer3: {
        marginLeft: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 50
    },
    text1: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
    text2: {
        color: 'white',
        fontSize: 12,
        fontWeight: '400',
    },
    text3: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        marginTop:15
    }
})