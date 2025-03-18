import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase"; // Ensure Firebase is initialized

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle user login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);

      Alert.alert("Success", "Login Successful!");

      // Navigate to the CrimeDetailsScreen after successful login
      navigation.replace("CrimeDetailsScreen");

    } catch (error) {
      let message = "Login failed. Please try again.";
      if (error.code === "auth/invalid-email") {
        message = "Invalid email format.";
      } else if (error.code === "auth/user-not-found") {
        message = "No account found. Please sign up first.";
      } else if (error.code === "auth/wrong-password") {
        message = "Incorrect password. Try again.";
      }
      setErrorMessage(message);
      Alert.alert("Login Failed", message);
    }
  };

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image source={require('../assets/images/loginimg.jpg')} style={{ width: 240, height: 200 }} />
        </View>
      </SafeAreaView>

      <View style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }} className="flex-1 bg-gray-900 px-8 pt-8">
        <View className="form space-y-2">
          <Text className="text-white ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-800 text-white rounded-2xl mb-3"
            placeholder="Email"
            placeholderTextColor="gray"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text className="text-white ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-800 text-white rounded-2xl"
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="gray"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          {errorMessage ? <Text className="text-red-500 text-sm mt-2">{errorMessage}</Text> : null}

          <TouchableOpacity className="flex items-end">
            <Text className="text-gray-400 mb-5">Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity className="py-3 bg-blue-500 rounded-xl" onPress={handleLogin}>
            <Text className="text-xl font-bold text-center text-white">Login</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-xl text-gray-400 font-bold text-center py-5">Or</Text>
        <View className="flex-row justify-center space-x-12">
          <TouchableOpacity className="p-2 bg-gray-700 rounded-2xl">
            <Image source={require('../assets/icons/google.png')} className="w-10 h-10" />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-400 font-semibold">Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text className="font-semibold text-blue-400"> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
