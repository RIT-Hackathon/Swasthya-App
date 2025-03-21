import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";

export default function CompletedAppointment() {
  const [completedCount, setCompletedCount] = useState(-1);
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [displayCompletedAppointments, setDisplayCompletedAppointments] = useState(false);

  interface Appointment {
    id: string;
    scheduledAt: string;
    testType: string;
    homeAppointment: boolean;
  }

  useEffect(() => {
    fetchCompletedAppointments();
  }, []);

  const fetchCompletedAppointments = async () => {
    try {
      const response = await axios.get(
        "http://192.168.114.68:8000/api/lab-assistant/assigned-appointments",
        {
          params: {
            assistantId: "818e4472-d5ee-4e77-a0b5-e4c6ed2a339c",
            status: "COMPLETED",
          },
        }
      );

      const count = response.data.data.length;
      setCompletedCount(count);
      setCompletedAppointments(response.data.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching completed appointments:", error);
    }
  };

  const handleShowCompletedAppointments = async () => {
    if (displayCompletedAppointments) {
      setDisplayCompletedAppointments(false);
    } else {
      try {
        const data = await fetchCompletedAppointments();
        if (data) {
          setCompletedAppointments(data.data);
          setDisplayCompletedAppointments(true);
        }
      } catch (error) {
        console.error("Error fetching completed appointments:", error);
      }
    }
  };

  const renderAppointments = (appointments: Appointment[]) => {
    return appointments.map((appointment, index) => (
      <View key={appointment.id} style={styles.appointmentContainer}>
        <Text style={styles.appointmentTitle}>Appointment {index + 1}</Text>
        <Text style={styles.appointmentDetails}>ID: {appointment.id}</Text>
        <Text style={styles.appointmentDetails}>Test Type: {appointment.testType}</Text>
        <Text style={styles.appointmentDetails}>
          Home Appointment: {appointment.homeAppointment ? "Yes" : "No"}
        </Text>
        <Text style={styles.appointmentDetails}>
          Date: {new Date(appointment.scheduledAt).toLocaleDateString()}
        </Text>
        <Text style={styles.appointmentDetails}>
          Time: {new Date(appointment.scheduledAt).toLocaleTimeString()}
        </Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completed Appointments</Text>

      <View style={[styles.box, { backgroundColor: "#4CAF50" }]}>
        <Text style={styles.boxTitle}>Completed</Text>
        <Text style={styles.count}>{completedCount}</Text>
        <TouchableOpacity
          onPress={handleShowCompletedAppointments}
          style={[styles.button, styles.completedButton]}
        >
          <Text style={styles.buttonText}>
            {displayCompletedAppointments ? "Hide Completed Appointments" : "View Completed Appointments"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Display Completed Appointments */}
      {displayCompletedAppointments && renderAppointments(completedAppointments)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F2F5",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 25,
  },
  box: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#FFF",
    elevation: 5,
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  count: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 5,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  completedButton: {
    backgroundColor: "#388E3C",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  appointmentContainer: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    width: "90%",
    elevation: 4,
  },
  appointmentTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  appointmentDetails: {
    fontSize: 14,
    color: "#333",
  },
});
