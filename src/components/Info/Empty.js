import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useTailwind } from 'tailwind-rn';

const InfoEmpty = (props) => {
    const tailwind = useTailwind();

    return (
        <View style={tailwind('w-full bg-lime-300 border-lime-500 rounded-lg p-6 items-center')}>
            <FontAwesomeIcon style={tailwind('text-yellow-500 ml-1')} icon={ faExclamationTriangle } size={75} />

            <Text style={tailwind('text-black text-2xl font-bold mt-3')}>
                No restaurant found!
            </Text>
        </View>
    );
}

export default InfoEmpty;