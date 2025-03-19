import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import axios from "axios";

export default function CompletedAppointment() {
    const [completedCount, setCompletedCount] = useState(-1);
    
  const tempFunc = async () => {
    try {
        const response = await axios.get('http://10.40.6.190:8000/api/lab-assistant/assigned-appointments', {
            params: {
                assistantId: "818e4472-d5ee-4e77-a0b5-e4c6ed2a339c",
                status: "COMPLETED"
            }
        });

        const count = response.data.data.length;
        setCompletedCount(count);

        console.log("Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching completed appointments:", error);
    }
};

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Home Screen</Text>
            {/* Completed Appointments Box */}
            <View style={[styles.box, { backgroundColor: "#4CAF50" }]}>
              <Text style={styles.boxTitle}>Completed</Text>
              <Text style={styles.count}>{completedCount}</Text>
              <TouchableOpacity onPress={tempFunc}
               style={[styles.button, styles.acceptButton]}>
                <Text style={styles.buttonText}>View More</Text>
              </TouchableOpacity>
            </View>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
      },
      button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginHorizontal: 5,
      },
      acceptButton: {
        backgroundColor: "#f0f0f0",
      },
      buttonText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
      },
      boxContainer: {
        width: "90%",
        alignItems: "center",
      },
      box: {
        width: "80%",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
      },
      boxTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
      },
      count: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
        marginTop: 5,
      },
    });
    