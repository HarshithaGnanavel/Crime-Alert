import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'

export default function SignUpScreen() {
    const navigation = useNavigation()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async () => {
        if (username && email && password) {
            try {
                // Create user with email and password
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                const user = userCredential.user

                // Save user data to Firestore
                await setDoc(doc(db, "users", user.uid), {
                    username: username,
                    email: user.email,
                    uid: user.uid,
                    createdAt: new Date()
                })

                console.log("User registered successfully!")

                // Navigate to CrimeDetailsScreen
                navigation.navigate("CrimeDetailsScreen")

            } catch (err) {
                console.log("Error:", err.message)
            }
        } else {
            console.log("Please fill all fields")
        }
    }

    return (
        <View className="flex-1 bg-black">
            <SafeAreaView className="flex">
                <View className="flex-row justify-start">
                    <TouchableOpacity 
                        onPress={() => navigation.goBack()}
                        className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4" >
                        <ArrowLeftIcon size={20} color="white" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center">
                    <Image source={require('../assets/images/loginimg.jpg')} 
                        style={{ width: 300, height: 90 }} />
                </View>
            </SafeAreaView>
            <View className="flex-1 px-8 pt-8"
                style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, backgroundColor: '#1E1E1E' }} >
                <View className="form space-y-2">
                    <Text className="text-gray-300 ml-4">Full Name</Text>
                    <TextInput
                        className="p-4 bg-gray-800 text-white rounded-2xl mb-3"
                        value={username}
                        onChangeText={value => setUsername(value)}
                        placeholder='Enter Name'
                        placeholderTextColor="gray"
                    />
                    <Text className="text-gray-300 ml-4">Email Address</Text>
                    <TextInput
                        className="p-4 bg-gray-800 text-white rounded-2xl mb-3"
                        value={email}
                        onChangeText={value => setEmail(value)}
                        placeholder='Enter Email'
                        placeholderTextColor="gray"
                    />
                    <Text className="text-gray-300 ml-4">Password</Text>
                    <TextInput
                        className="p-4 bg-gray-800 text-white rounded-2xl mb-7"
                        secureTextEntry
                        value={password}
                        onChangeText={value => setPassword(value)}
                        placeholder='Enter Password'
                        placeholderTextColor="gray"
                    />
                    <TouchableOpacity
                        className="py-3 rounded-xl"
                        style={{ backgroundColor: '#3B82F6' }}
                        onPress={handleSubmit}
                    >
                        <Text className="font-xl font-bold text-center text-white">
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text className="text-xl text-gray-400 font-bold text-center py-5">
                    Or
                </Text>
                <View className="flex-row justify-center space-x-12">
                    <TouchableOpacity className="p-2 bg-gray-800 rounded-2xl">
                        <Image source={require('../assets/icons/google.png')} 
                            className="w-10 h-10" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center mt-7">
                    <Text className="text-gray-400 font-semibold">Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text className="font-semibold text-blue-400"> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
