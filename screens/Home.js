import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar, faPhone, faMap, faSync } from '@fortawesome/free-solid-svg-icons';
import { useTailwind } from 'tailwind-rn';

const Home = (props) => {
	const tailwind = useTailwind();

	return (
		<View style={tailwind('flex h-full bg-gray-100 items-center p-10')}>
            <View style={tailwind('m-auto w-full')}>
                <View style={tailwind('w-full bg-lime-300 rounded-lg p-6')}>
                    <Text style={tailwind('text-2xl text-black font-bold')}>
                        Quinta da Magarenha
                    </Text>

                    <View style={tailwind('flex flex-row')}>
                        <Text style={tailwind('text-lg text-gray-600 font-bold')}>4,6</Text>
                        <FontAwesomeIcon style={tailwind('text-yellow-500 ml-1')} icon={ faStar } size={25} />
                    </View>

                    <View style={tailwind('flex flex-row mt-4')}>
                        <FontAwesomeIcon style={tailwind('text-lime-600')} icon={ faMap } size={20} />
                        <Text style={tailwind('text-gray-600 ml-2')}>
                            Recta Caçador 577 Nó 20 (A25, Viseu)
                        </Text>
                    </View>

                    <View style={tailwind('flex flex-row mt-1')}>
                        <FontAwesomeIcon style={tailwind('text-lime-600')} icon={ faPhone } size={20} />
                        <Text style={tailwind('text-gray-600 ml-2')}>
                            (+351) 232 479 106
                        </Text>
                    </View>
                </View>
            </View>

            <Pressable 
                style={({pressed}) => pressed ? 
                tailwind('bg-lime-500 items-center mt-2 p-4 rounded-lg') : 
                tailwind('bg-lime-300 items-center mt-2 p-4 rounded-lg')}>
                <FontAwesomeIcon style={tailwind('text-lime-900')} icon={ faSync } size={20} />
            </Pressable>
        </View>
	);
};

export default Home;