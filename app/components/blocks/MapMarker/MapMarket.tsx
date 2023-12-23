import {Animated, Dimensions, Platform, Text, TouchableOpacity, View, Linking} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {instance} from 'utils/axios';
import StarRating from '../StarRating/StarRating';
// import LogoCard from '../../../assests/images/logo_slide_card.svg';
import TwoGisButton from '../TwoGisButton';
import {styles} from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppSelector} from 'store/store';
const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

type MapMarketProps = {
  onPress: (id: number) => void;
  setGymInfo: any;
  selectedCity: any;
};

type CityType = {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  gyms: GymType[];
};

type GymType = {
  address: string;
  id: number;
  name: string;
  rating: number;
};

const MapMarket = ({onPress, setGymInfo, selectedCity}: MapMarketProps) => {
  const [position, setPosition] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({latitude: null, longitude: null});
  const [cities, setCities] = useState<CityType[]>([]);

  const _scrollView = useRef<any>(null);
  const tokenStorage = useAppSelector(state => state.authSlice.tokens);
  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      pos => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      error => console.log('GetCurrentPosition Error', JSON.stringify(error)),
      {enableHighAccuracy: true},
    );
  };
  const getUserLocation = useCallback(async () => {
    try {
      if (tokenStorage) {
        const response = await instance.get('/gym/manage/cities');
        await instance
          .get('/gym/manage/all')
          .then(resp => setCities(resp.data))
          .catch(err => console.log(err));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    getUserLocation();
    getCurrentPosition();
  }, [tokenStorage, selectedCity]);

  const widgetsMapper = () => {
    if (!cities.length) return;
    return cities.map((city: CityType, index) => {
      if (city.name === selectedCity) {
        return city.gyms.map(gym => {
          return (
            <View style={styles.card} key={gym.address + gym.name}>
              <TouchableOpacity
                onPress={() => {
                  console.log(gym);
                  onPress(gym?.id);
                  setGymInfo(gym);
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {/* <WithLocalSvg asset={LogoCard} /> */}
                  <StarRating ratings={gym.rating} reviews={gym.rating} />
                </View>
                <View style={styles.textContent}>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Ionicons name="time-outline" size={20} color={'rgba(117, 54, 234, 1)'} />
                      <Text style={styles.cardtitle}>10:00</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignContent: 'center',
                      }}>
                      <Ionicons name="time-outline" size={20} color={'rgba(117, 54, 234, 1)'} />
                      <Text style={styles.cardDescription}>{gym?.address}</Text>
                    </View>
                  </View>
                  <TwoGisButton />
                </View>
              </TouchableOpacity>
            </View>
          );
        });
      } else {
        return null;
      }
    });
  };

  return (
    <View style={styles.container}>
      {position?.latitude !== null && position?.latitude !== null ? (
        <>
          <MapView
            style={{width: '100%', height: '100%'}}
            initialRegion={{
              latitude: 42.333309,
              longitude: 69.586029,
              latitudeDelta: 42.333309,
              longitudeDelta: 69.586029,
            }}
            zoomEnabled={true}
            showsUserLocation={false}
            showsMyLocationButton={false}
            showsCompass={true}
            scrollEnabled={true}
            followsUserLocation={true}
            provider={PROVIDER_GOOGLE}>
            {cities.map((city, index) => {
              return (
                <>
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: parseFloat(city?.latitude),
                      longitude: parseFloat(city?.longitude),
                    }}
                    title={city.name}
                  />
                </>
              );
            })}
          </MapView>

          <Animated.ScrollView
            ref={_scrollView}
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + 20}
            snapToAlignment="center"
            style={styles.scrollView}
            contentInset={{
              top: 0,
              left: SPACING_FOR_CARD_INSET,
              bottom: 0,
              right: SPACING_FOR_CARD_INSET,
            }}
            contentContainerStyle={{
              paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
            }}>
            {widgetsMapper()}
          </Animated.ScrollView>
        </>
      ) : (
        <Text>Loading</Text>
      )}
    </View>
  );
};

export default MapMarket;
