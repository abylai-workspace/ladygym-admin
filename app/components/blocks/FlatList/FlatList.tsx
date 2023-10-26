import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { styles } from './style'
import { WithLocalSvg } from 'react-native-svg'
interface FlatListProps {
  title: string
  onPress: () => void,
  icon?: any,
  price?: string,
  discount?: string
}
const FlatList = ({ title, onPress, icon, price, discount }: FlatListProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
    <View style={styles.flatlistContainer}>
      
      <View style={{ flexDirection: 'row' }}>
        {icon &&
          <View style={styles.iconContainer}>

            {/* <WithLocalSvg asset={icon}  style={{width:40,height:40}}/> */}
            <Image source={icon} />
            {/* <Feather name={icon}  size={24} color="rgba(154, 71, 179, 1)" /> */}
          </View>}
        <View style={styles.textContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.icontext}>{title}</Text>
            {discount &&
              <View style={styles.discountContainer}>
                <Text>-30%</Text>
              </View>}

          </View>

          {price && <Text style={styles.price}>{price}</Text>}
        </View>


      </View>
      <View>
      <Feather name="chevron-right" style={styles.clickContainer} size={30} color="gray" />

      </View>
     
    </View>
    </TouchableOpacity>
  )
}

export default FlatList