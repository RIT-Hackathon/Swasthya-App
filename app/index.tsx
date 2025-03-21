import React, { useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import axios from "axios";
import { useRouter } from "expo-router";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://192.168.71.68:8000/api/auth/sign-in", {
        email,
        password,
      });
      console.log("User credentials data:", response.data);

      if (response.status === 200) {
        Alert.alert("Login Successful", "Welcome back!");
        router.push("/(tabs)/HomeScreen");
      } else {
        Alert.alert("Login Failed", "Invalid credentials");
      }
    } catch (error: any) {
      Alert.alert("Error", error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} loading={loading} style={styles.button}>
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#6200ee",
  },
  input: {
    width: "100%",
    marginBottom: 15,
  },
  button: {
    width: "100%",
    paddingVertical: 5,
  },
});
