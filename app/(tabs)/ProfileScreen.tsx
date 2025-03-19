import React, { useState } from "react";
import { View, Text, Alert, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();
  const [email, setEmail] = useState(""); // Email state
  const [num, setNum] = useState(""); // Number state
  const [showEmailInput, setShowEmailInput] = useState(false); // Controls email input visibility
  const [showNumberInput, setShowNumberInput] = useState(false); // Controls number input visibility

  const handleLogOut = () => {
    router.replace("/");
  };

  const handleChangePassword = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }

    setTimeout(() => {
      Alert.alert("Success", `A password reset link has been sent to ${email}.`);
      setShowEmailInput(false); // Hide input after submission
      setEmail(""); // Clear input
    }, 1500);
  };

  const handleChangeNumber = () => {
    if (!num) {
      Alert.alert("Error", "Please enter your new number.");
      return;
    }

    setTimeout(() => {
      Alert.alert("Success", `Your phone number has been updated to ${num}.`);
      setShowNumberInput(false); // Hide input after submission
      setNum(""); // Clear input
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {/* Static User Info */}
      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>johndoe@example.com</Text>
        <Text style={styles.userPhone}>+91 9876543210</Text>
      </View>

      {/* Change Password Section */}
      <TouchableOpacity
        style={[styles.button, styles.buttonPrimary]}
        onPress={() => setShowEmailInput(!showEmailInput)}
      >
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      {showEmailInput && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter your email:</Text>
          <TextInput
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />
          <TouchableOpacity style={[styles.button, styles.buttonSuccess]} onPress={handleChangePassword}>
            <Text style={styles.buttonText}>Send Reset Email</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Change Number Section */}
      <TouchableOpacity
        style={[styles.button, styles.buttonPrimary]}
        onPress={() => setShowNumberInput(!showNumberInput)}
      >
        <Text style={styles.buttonText}>Change Number</Text>
      </TouchableOpacity>

      {showNumberInput && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter your new number:</Text>
          <TextInput
            placeholder="Enter new number"
            value={num}
            onChangeText={setNum}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={10}
          />
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
    backgroundColor: "#F5F5F5",
  },
  userInfoContainer: {
    marginBottom: 30,
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  userEmail: {
    fontSize: 16,
    color: "#777",
    marginTop: 5,
  },
  userPhone: {
    fontSize: 16,
    color: "#777",
    marginTop: 5,
  },
  inputContainer: {
    width: "100%",
    marginTop: 15,
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#444",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
  },
  button: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  buttonPrimary: {
    backgroundColor: "#24a0ed", // Blue for primary actions
  },
  buttonSuccess: {
    backgroundColor: "#4CAF50", // Green for success actions
  },
  buttonWarning: {
    backgroundColor: "#FF9800", // Orange for warning actions
  },
  buttonDanger: {
    backgroundColor: "#D32F2F", // Red for log out
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
