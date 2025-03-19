import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";

export default function HomeScreen() {
  // State for appointment counts
  const [pendingCount, setPendingCount] = useState(7);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);

  useEffect(() => {
    fetchAcceptedAppointments();
  }, []);
  
  const fetchPendingAppointments = async () => {
    try {
        const response = await axios.get('http://10.40.6.190:8000/api/lab-assistant/assigned-appointments', {
            params: {
                assistantId: "818e4472-d5ee-4e77-a0b5-e4c6ed2a339c",
                status: "PENDING"
            }
        });

        const count = response.data.data.length;
        setPendingCount(count);

        console.log("Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching completed appointments:", error);
    }
};
  
  const fetchAcceptedAppointments = async () => {
    try {
        const response = await axios.get('http://10.40.6.190:8000/api/lab-assistant/assigned-appointments', {
            params: {
                assistantId: "818e4472-d5ee-4e77-a0b5-e4c6ed2a339c",
                status: "CONFIRMED"
            }
        });

        const count = response.data.data.length;
        setAcceptedCount(count);

        console.log("Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching completed appointments:", error);
    }
};
  
  // State for active tab
  const [activeTab, setActiveTab] = useState("Pending");
  
  const handleAppointments = () => {
    // a list with all appointments
  }

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
            <View style={styles.buttonGroup}>
              {/* <TouchableOpacity style={[styles.button, styles.acceptButton]}>
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.rejectButton]}>
                <Text style={styles.buttonText}>Reject</Text>
              </TouchableOpacity> */}
              <TouchableOpacity onPress={fetchPendingAppointments}
              style={[styles.button, styles.acceptButton]}>
                <Text style={styles.buttonText}>View Appointments</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {activeTab === "Accepted" && (
          <View style={[styles.box, { backgroundColor: "#42A5F5" }]}>
            <Text style={styles.boxTitle}>Accepted Appointments</Text>
            <Text style={styles.count}>{acceptedCount}</Text>
            {/* <TouchableOpacity style={[styles.button, styles.completedButton]}>
              <Text style={styles.buttonText}>Mark as Completed</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={[styles.button, styles.completedButton]}>
              <Text style={styles.buttonText}>See Accepted Appointments</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
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
    width: "90%",
    alignItems: "center",
  },
  box: {
    width: "85%",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },
  count: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 5,
  },
  buttonGroup: {
    flexDirection: "row",
    marginTop: 15,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
  },
  rejectButton: {
    backgroundColor: "#D32F2F",
  },
  completedButton: {
    backgroundColor: "#388E3C",
    marginTop: 15,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
