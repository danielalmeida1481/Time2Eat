import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useTailwind } from 'tailwind-rn';

const Loading = (props) => {
    const tailwind = useTailwind();

    return (
        <View style={tailwind('flex h-full bg-gray-100 items-center p-10')}>
            <View style={tailwind('m-auto w-full items-center')}>
                <ActivityIndicator size="large" color="#84cc16" />
            </View>
        </View>
    );
}

export default Loading;