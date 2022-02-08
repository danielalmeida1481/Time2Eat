import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, TextInput, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSync, faSearch, faWalking, faCar, faPen, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { useTailwind } from 'tailwind-rn';
import * as Location from 'expo-location';

import Loading from '../components/Common/Loading';
import InfoFull from '../components/Info/Full';
import InfoEmpty from '../components/Info/Empty';
import InfoLoading from '../components/Info/Loading';
import Config from '../../config';

const axios = require('axios');

const Home = (props) => {
	const tailwind = useTailwind();

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingInfo, setIsLoadingInfo] = useState(false);
    const [searchType, setSearchType] = useState(1);
    const [customRadius, onChangeCustomRadius] = useState(5);
    const [justStarted, setJustStarted] = useState(true);
    const [info, setInfo] = useState(null);
    const [location, setLocation] = useState(null);

    const radius = {
        "walk": 1,
        "car": 10
    };

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setIsLoading(false);
                return;
            }

            let userLocation = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
            setLocation(userLocation);
            setIsLoading(false);
        })();
    }, []);

    function GetRandomRestaurant() {
        setIsLoadingInfo(true);

        const searchLocation = (location === null ? Config.TEST_LOCATION : `${location.coords.latitude}, ${location.coords.longitude}`);
        axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
            params: {
                location: searchLocation,
                radius: (searchType === 1 ? radius.walk : radius.car) * 1000,
                type: 'restaurant',
                key: Config.GOOGLE_API_KEY
            }
        }).then((response) => {
            if (response.data.results.length === 0) {
                setInfo(null);

                setJustStarted(false);
                setIsLoadingInfo(false);
            } else {
                const random_index = Math.floor(Math.random() * (response.data.results.length - 1));
                const restaurant = response.data.results[random_index];

                axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
                    params: {
                        place_id: restaurant.place_id,
                        key: Config.GOOGLE_API_KEY
                    }
                }).then((response_details) => {
                    const restaurant_details = response_details.data.result;

                    setInfo({
                        name: restaurant_details.name || 'None',
                        stars: restaurant_details.rating || 'None',
                        location: restaurant_details.formatted_address || 'None',
                        phoneNumber: restaurant_details.formatted_phone_number || 'None'
                    });

                    setJustStarted(false);
                    setIsLoadingInfo(false);
                }).catch((error) => {
                    console.log(error);
                    setIsLoadingInfo(false);
                });
            }
        }).catch((error) => {
            console.log(error);
            setIsLoadingInfo(false);
        });
    }

	return (
		<View style={tailwind('flex h-full bg-gray-100 items-center p-10')}>
            {
                /**
                 * Check if app loaded
                 */
                isLoading ? <Loading />
                :
                location === null ?
                /**
                 * Loaded but location === null
                 */
                <View style={tailwind('m-auto w-full items-center')}>
                    <Text style={tailwind('text-4xl text-lime-500 font-bold mb-3')}>
                        Time2Eat
                    </Text>

                    <View style={tailwind('w-full bg-lime-300 border-lime-500 rounded-lg p-6 items-center')}>
                        <FontAwesomeIcon style={tailwind('text-yellow-500 ml-1')} icon={ faLocationArrow } size={75} />

                        <Text style={tailwind('text-black text-2xl font-bold mt-3')}>
                            Couldn't get your current location!
                        </Text>
                    </View>
                </View>
                :
                /**
                 * Loaded and location is !== null
                 */
                <>
                    <View style={tailwind('m-auto w-full items-center')}>
                        <Text style={tailwind('text-4xl text-lime-500 font-bold mb-3')}>
                            Time2Eat
                        </Text>

                        {
                            /**
                             * Loading animation for when GetRandomRestaurant is called
                             */
                            isLoadingInfo ?
                            <InfoLoading />
                            :
                            /**
                             * Render information and all the available buttons
                             */
                            justStarted ? null :
                            info === null ?
                            <InfoEmpty />:
                            <InfoFull 
                            name={info.name}
                            stars={info.stars}
                            location={info.location}
                            phoneNumber={info.phoneNumber} /> }

                            <View style={tailwind('flex flex-row mt-3')}>
                                <Pressable 
                                    onPress={() => { setSearchType(1) }}
                                    style={({pressed}) => pressed || searchType === 1 ? 
                                    tailwind('bg-lime-500 items-center mt-2 p-4 rounded-lg grow') : 
                                    tailwind('bg-lime-300 items-center mt-2 p-4 rounded-lg grow')}>
                                    <FontAwesomeIcon style={tailwind('text-lime-900')} icon={ faWalking } size={20} />
                                    <Text style={tailwind('font-bold text-gray-600')}>{radius.walk} km</Text>
                                </Pressable>

                                <Pressable 
                                    onPress={() => { setSearchType(2) }}
                                    style={({pressed}) => pressed || searchType === 2 ? 
                                    tailwind('bg-lime-500 items-center mt-2 p-4 rounded-lg grow ml-2') : 
                                    tailwind('bg-lime-300 items-center mt-2 p-4 rounded-lg grow ml-2')}>
                                    <FontAwesomeIcon style={tailwind('text-lime-900')} icon={ faCar } size={20} />
                                    <Text style={tailwind('font-bold text-gray-600')}>{radius.car} km</Text>
                                </Pressable>

                                {/* <Pressable 
                                    onPress={() => { setSearchType(3) }}
                                    style={({pressed}) => pressed || searchType === 3 ? 
                                    tailwind('bg-lime-500 items-center mt-2 p-4 rounded-lg grow ml-2') : 
                                    tailwind('bg-lime-300 items-center mt-2 p-4 rounded-lg grow ml-2')}>
                                    <FontAwesomeIcon style={tailwind('text-lime-900')} icon={ faPen } size={20} />
                                </Pressable> */}
                            </View>

                            { searchType === 3 ? 
                            <View style={tailwind('mt-4')}>
                                <TextInput 
                                    style={tailwind('rounded-lg bg-lime-300 border-lime-500 w-10 border-2 text-center')} 
                                    onChangeText={onChangeCustomRadius}
                                    value={customRadius.toString()} 
                                    keyboardType='numeric' />
                            </View>
                            : null
                        }
                    </View>
                    
                    <Pressable 
                        onPress={() => {
                            GetRandomRestaurant();
                        }}
                        style={({pressed}) => pressed ? 
                        tailwind('bg-lime-500 items-center mt-2 p-4 rounded-lg') : 
                        tailwind('bg-lime-300 items-center mt-2 p-4 rounded-lg')}>

                        { justStarted ? 
                        <FontAwesomeIcon style={tailwind('text-lime-900')} icon={ faSearch } size={20} /> : 
                        <FontAwesomeIcon style={tailwind('text-lime-900')} icon={ faSync } size={20} />
                        }
                    </Pressable>
                </>
            }
        </View>
	);
};

export default Home;