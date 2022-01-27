import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSync, faSearch, faWalking, faCar, faPen } from '@fortawesome/free-solid-svg-icons';
import { useTailwind } from 'tailwind-rn';
import InfoFull from '../components/Info/Full';
import InfoEmpty from '../components/Info/Empty';
import Config from '../config';

const axios = require('axios');

const Home = (props) => {
	const tailwind = useTailwind();

    const [searchType, setSearchType] = useState(1);
    const [customRadius, onChangeCustomRadius] = useState(5);
    const [justStarted, setJustStarted] = useState(true);
    const [info, setInfo] = useState(null);

    const radius = {
        "walk": 1,
        "car": 10
    };

    function GetRandomRestaurant() {
        axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
            params: {
                location: Config.TEST_LOCATION,
                radius: (searchType === 1 ? radius.walk : radius.car) * 1000,
                type: 'restaurant',
                key: Config.GOOGLE_API_KEY
            }
        }).then((response) => {
            if (response.data.results.length === 0) {
                setInfo(null);
                setJustStarted(false);
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
                }).catch((error) => {
                    console.log(error);
                });
            }
        }).catch((error) => {
            console.log(error);
        });
    }

	return (
		<View style={tailwind('flex h-full bg-gray-100 items-center p-10')}>
            <View style={tailwind('m-auto w-full items-center')}>
                <Text style={tailwind('text-4xl text-lime-500 font-bold mb-3')}>
                    Time2Eat
                </Text>

                { justStarted ?
                null :
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
                : null }
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
        </View>
	);
};

export default Home;