import { View, ImageSourcePropType, Dimensions, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import Carousel,{Pagination} from 'react-native-snap-carousel';


type CarouselProps = {
    images: any[];
}

const Carousels = ({images}: CarouselProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);
    const renderItem = ({ item }) => (
        <View >
         <Image source={item.image} />
        </View>
      );
  return (
    <View  style={{alignItems:'center',marginTop:10}}>
   <Carousel
      data={images}
      ref={carouselRef}
      renderItem={renderItem}
      sliderWidth={300}
      itemWidth={300}
      onSnapToItem={(index) => setActiveSlide(index)}
    />
    <Pagination
      dotsLength={images.length}
   
      activeDotIndex={activeSlide}
      containerStyle={{
        marginTop:-20
      }}
      dotStyle={{
        width: 20,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 0,
        backgroundColor:  'rgba(207, 84, 144, 1)',

      }}
      inactiveDotStyle={{
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 0,
        backgroundColor:  '#fff',
      }}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
      tappableDots={true} // Enable tappable dots
      carouselRef={carouselRef} // Assign the ref to the Pagination
    
    />
   </View>
  )
}

export default Carousels