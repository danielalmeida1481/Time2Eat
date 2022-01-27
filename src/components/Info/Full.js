import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar, faPhone, faMap } from '@fortawesome/free-solid-svg-icons';
import { useTailwind } from 'tailwind-rn';

const InfoFull = (props) => {
    const tailwind = useTailwind();

    const name = props.name || '';
    const stars = props.stars || '';
    const location = props.location || '';
    const phoneNumber = props.phoneNumber || '';

    return (
        <View style={tailwind('w-full bg-lime-300 border-lime-500 rounded-lg p-6')}>
            <Text style={tailwind('text-2xl text-black font-bold')}>
                {name}
            </Text>

            <View style={tailwind('flex flex-row')}>
                <Text style={tailwind('text-lg text-gray-600 font-bold')}>{stars}</Text>
                <FontAwesomeIcon style={tailwind('text-yellow-500 ml-1')} icon={ faStar } size={25} />
            </View>

            <View style={tailwind('flex flex-row mt-4')}>
                <FontAwesomeIcon style={tailwind('text-lime-600')} icon={ faMap } size={20} />
                <Text style={tailwind('text-gray-600 ml-2')}>
                    {location}
                </Text>
            </View>

            <View style={tailwind('flex flex-row mt-1')}>
                <FontAwesomeIcon style={tailwind('text-lime-600')} icon={ faPhone } size={20} />
                <Text style={tailwind('text-gray-600 ml-2')}>
                    {phoneNumber}
                </Text>
            </View>
        </View>
    );
}

export default InfoFull;