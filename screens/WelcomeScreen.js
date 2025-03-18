import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'

export default function WelcomeScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView className="flex-1 bg-black">
            <View className="flex-1 flex justify-around my-4">
                <View className="relative items-center">
                    <Image 
                        source={require("../assets/images/wl.jpg")}
                        style={{ width: 350, height: 350, position: 'absolute', top: -5
                        }} 
                    />
                    <Text 
                        className="absolute text-white font-extrabold text-5xl text-center"
                        style={{
                            position: 'absolute', 
                            top: 175, 
                            left: 120, 
                            transform: [{ translateX: -75 }, { translateY: -20 }], // Center the text
                            textShadowColor: 'rgba(0, 0, 0, 0.8)', 
                            textShadowOffset: { width: 2, height: 2 }, 
                            textShadowRadius: 5
                        }}
                    >
                        CRIME ALERT
                    </Text>
                </View>
                <View className="space-y-4">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}
                        className="py-3 bg-blue-900 mx-7 rounded-xl">
                        <Text className="text-xl font-bold text-center text-white">
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                    <View className="flex-row justify-center">
                        <Text className="text-white font-semibold">Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text className="font-semibold text-gray-400"> Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}