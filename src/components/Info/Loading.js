import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useTailwind } from 'tailwind-rn';

const InfoLoading = (props) => {
    const tailwind = useTailwind();

    return (
        <View style={tailwind('w-full bg-lime-300 border-lime-500 rounded-lg p-6 items-center')}>
            <View style={tailwind('m-auto w-full items-center')}>
                <ActivityIndicator size="large" color="#84cc16" />
            </View>
        </View>
    );
}

export default InfoLoading;