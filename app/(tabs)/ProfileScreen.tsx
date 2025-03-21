import React, { useState } from "react";
import { View, Text, Alert, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [num, setNum] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showNumberInput, setShowNumberInput] = useState(false);

  const handleLogOut = () => router.replace("/");

  const handleChangePassword = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }

    setTimeout(() => {
      Alert.alert("Success", `A password reset link has been sent to ${email}.`);
      setShowEmailInput(false);
      setEmail("");
    }, 1500);
  };

  const handleChangeNumber = () => {
    if (!num) {
      Alert.alert("Error", "Please enter your new number.");
      return;
    }

    setTimeout(() => {
      Alert.alert("Success", `Your phone number has been updated to ${num}.`);
      setShowNumberInput(false);
      setNum("");
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {/* User Info */}
      <View style={styles.profileCard}>
        <Image source={{ uri: "https://i.pravatar.cc/100" }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Alex Smith</Text>
          <Text style={styles.userEmail}>alexsmith@example.com</Text>
          <Text style={styles.userPhone}>+91 9876543210</Text>
        </View>
      </View>

      {/* Change Password */}
      <TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={() => setShowEmailInput(!showEmailInput)}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      {showEmailInput && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter your email:</Text>
          <TextInput placeholder="Enter email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
          <TouchableOpacity style={[styles.button, styles.buttonSuccess]} onPress={handleChangePassword}>
            <Text style={styles.buttonText}>Send Reset Email</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Change Number */}
      <TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={() => setShowNumberInput(!showNumberInput)}>
        <Text style={styles.buttonText}>Change Number</Text>
      </TouchableOpacity>

      {showNumberInput && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter your new number:</Text>
          <TextInput placeholder="Enter new number" value={num} onChangeText={setNum} style={styles.input} keyboardType="number-pad" maxLength={10} />
          <TouchableOpacity style={[styles.button, styles.buttonWarning]} onPress={handleChangeNumber}>
            <Text style={styles.buttonText}>Update Number</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Log Out */}
      <TouchableOpacity style={[styles.button, styles.buttonDanger]} onPress={handleLogOut}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f2f5",
  },
  profileCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    marginBottom: 25,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  userEmail: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  userPhone: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  inputContainer: {
    width: "100%",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    color: "#333",
  },
  button: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    elevation: 3,
  },
  buttonPrimary: {
    backgroundColor: "#6200ee",
    shadowColor: "#007bff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonSuccess: {
    backgroundColor: "#28a745",
    shadowColor: "#28a745",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonWarning: {
    backgroundColor: "#ff9800",
    shadowColor: "#ff9800",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonDanger: {
    backgroundColor: "#dc3545",
    shadowColor: "#dc3545",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
