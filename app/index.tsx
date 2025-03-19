import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleLogin = async () => {
  //   if(email == "abc@gmail.com" && password == "123456"){
  //     Alert.alert("Login Successful", "Welcome back!");
  //     router.push("/(tabs)/HomeScreen"); // Navigate to Home screen after login
  //   }
  //   else{
  //     Alert.alert("Login Failed", "Invalid credentials");
  //   }
  // };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://10.40.6.190:8000/api/auth/sign-in", {
        email,
        password,
      });

      console.log("user credentials: ",response);
      console.log("user credentials data: ",response.data);
      console.log(response.data.data.user.id);
      if (response.status === 200) {
        Alert.alert("Login Successful", "Welcome back!");
        router.push("/(tabs)/HomeScreen"); // Navigate to Home screen after login
      } else {
        Alert.alert("Login Failed", "Invalid credentials");
      }
    } catch (error: any) {
      Alert.alert("Error", error.response?.data?.message || "Something went wrong!");
      console.log(error)
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Login Page</Text>
      <TextInput
        placeholder="Username"
        value={email}
        onChangeText={setEmail}
        style={{
          width: 250,
          height: 40,
          borderWidth: 1,
          marginBottom: 10,
          paddingLeft: 10,
        }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          width: 250,
          height: 40,
          borderWidth: 1,
          marginBottom: 10,
          paddingLeft: 10,
        }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
