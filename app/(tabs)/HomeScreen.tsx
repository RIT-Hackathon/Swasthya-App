import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";

export default function HomeScreen() {
  // State for appointment counts
  const [pendingCount, setPendingCount] = useState(7);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [displayPendingAppointments, setDisplayPendingAppointments] = useState(false);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);
  const [displayAcceptedAppointments, setDisplayAcceptedAppointments] = useState(false);

  interface Appointment {
    id: string;
    scheduledAt: string;
    status: string;
    testType: string;
    homeAppointment: boolean;
  }

  useEffect(() => {
    fetchAcceptedAppointments();
    fetchPendingAppointments();
  }, []);

  const fetchPendingAppointments = async () => {
    try {
      const response = await axios.get(
        "http://192.168.71.68:8000/api/lab-assistant/assigned-appointments",
        {
          params: {
            assistantId: "818e4472-d5ee-4e77-a0b5-e4c6ed2a339c",
            status: "PENDING",
          },
        }
      );

      const count = response.data.data.length;
      setPendingCount(count);
      setPendingAppointments(response.data.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching pending appointments:", error);
    }
  };

  const fetchAcceptedAppointments = async () => {
    try {
      const response = await axios.get(
        "http://192.168.71.68:8000/api/lab-assistant/assigned-appointments",
        {
          params: {
            assistantId: "818e4472-d5ee-4e77-a0b5-e4c6ed2a339c",
            status: "CONFIRMED",
          },
        }
      );

      const count = response.data.data.length;
      setAcceptedCount(count);
      setAcceptedAppointments(response.data.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching accepted appointments:", error);
    }
  };

  const handleShowPendingAppointments = async () => {
    if (displayPendingAppointments) {
      setDisplayPendingAppointments(false);
    } else {
      try {
        const data = await fetchPendingAppointments();
        if (data) {
          setPendingAppointments(data.data);
          setDisplayPendingAppointments(true);
        }
      } catch (error) {
        console.error("Error fetching pending appointments:", error);
      }
    }
  };

  const handleShowAcceptedAppointments = async () => {
    if (displayAcceptedAppointments) {
      setDisplayAcceptedAppointments(false);
    } else {
      try {
        const data = await fetchAcceptedAppointments();
        if (data) {
          setAcceptedAppointments(data.data);
          setDisplayAcceptedAppointments(true);
        }
      } catch (error) {
        console.error("Error fetching accepted appointments:", error);
      }
    }
  };

  // State for active tab
  const [activeTab, setActiveTab] = useState("Pending");

  const showAppointments = (appointments: Appointment[]) => {
    return appointments.map((appointment, index) => (
      <View key={appointment.id} style={styles.appointmentContainer}>
        <Text style={styles.appointmentTitle}>Appointment {index + 1}</Text>
        <Text>Appointment ID: {appointment.id}</Text>
        <Text>Test Type: {appointment.testType}</Text>
        <Text>Home Appointment: {appointment.homeAppointment ? "Yes" : "No"}</Text>
        <Text>Status: {appointment.status}</Text>
        <Text>Date: {new Date(appointment.scheduledAt).toLocaleDateString()}</Text>
        <Text>Time: {new Date(appointment.scheduledAt).toLocaleTimeString()}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointments</Text>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Pending" && styles.activeTab]}
          onPress={() => setActiveTab("Pending")}
        >
          <Text style={[styles.tabText, activeTab === "Pending" && styles.activeTabText]}>
            Pending
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "Accepted" && styles.activeTab]}
          onPress={() => setActiveTab("Accepted")}
        >
          <Text style={[styles.tabText, activeTab === "Accepted" && styles.activeTabText]}>
            Accepted
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.boxContainer}>
        {activeTab === "Pending" && (
          <View style={[styles.box, { backgroundColor: "#FFA726" }]}>
            <Text style={styles.boxTitle}>Pending Appointments</Text>
            <Text style={styles.count}>{pendingCount}</Text>
            <TouchableOpacity
              onPress={handleShowPendingAppointments}
              style={[styles.button, styles.acceptButton]}
            >
              <Text style={styles.buttonText}>
                {displayPendingAppointments ? "Hide Pending Appointments" : "View Pending Appointments"}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === "Accepted" && (
          <View style={[styles.box, { backgroundColor: "#42A5F5" }]}>
            <Text style={styles.boxTitle}>Accepted Appointments</Text>
            <Text style={styles.count}>{acceptedCount}</Text>
            <TouchableOpacity
              onPress={handleShowAcceptedAppointments}
              style={[styles.button, styles.completedButton]}
            >
              <Text style={styles.buttonText}>
                {displayAcceptedAppointments ? "Hide Accepted Appointments" : "View Accepted Appointments"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Display appointments when button is clicked */}
      {activeTab === "Pending" && displayPendingAppointments && showAppointments(pendingAppointments)}
      {activeTab === "Accepted" && displayAcceptedAppointments && showAppointments(acceptedAppointments)}
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
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#E0E0E0",
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  activeTab: {
    backgroundColor: "#007BFF",
    borderRadius: 25,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  activeTabText: {
    color: "#FFF",
  },
  boxContainer: {
    width: "100%",
    alignItems: "center",
  },
  box: {
    width: "90%",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#FFF",
    elevation: 6,
  },
  appointmentTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  appointmentContainer: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    width: "90%",
    elevation: 4,
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8,
  },
  count: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#007BFF",
    marginTop: 5,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
  },
  completedButton: {
    backgroundColor: "#1976D2",
  },
  buttonText: {
    color: "#FFF",
  },
});
