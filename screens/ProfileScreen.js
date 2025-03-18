import React, { useState, useEffect } from "react";
import { View, Text, Button, Switch, StyleSheet, TouchableOpacity } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const auth = getAuth();
  const db = getFirestore();
  const navigation = useNavigation();

  const [userData, setUserData] = useState({ username: "", email: "" });
  const [alertIntensity, setAlertIntensity] = useState(1);
  const [whatsappAlert, setWhatsappAlert] = useState(false);
  const [smsAlert, setSmsAlert] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Profile</Text>

      {/* User Details Card */}
      <View style={styles.card}>
        <Ionicons name="person-circle" size={60} color="#007bff" style={{ alignSelf: "center" }} />
        <Text style={styles.username}>{userData.username || "N/A"}</Text>
        <Text style={styles.email}>{userData.email || "N/A"}</Text>
      </View>

      {/* Alert Intensity Control */}
      <View style={styles.card}>
        <Text style={styles.label}>Alert Intensity: {alertIntensity}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.intensityButton}
            onPress={() => setAlertIntensity((prev) => Math.max(prev - 1, 1))}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.intensityButton}
            onPress={() => setAlertIntensity((prev) => Math.min(prev + 1, 5))}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Alerting Methods */}
      <View style={styles.card}>
        <Text style={styles.label}>Enable Alerts:</Text>

        <View style={styles.toggleRow}>
          <Ionicons name="logo-whatsapp" size={24} color="green" />
          <Text style={styles.toggleText}>WhatsApp</Text>
          <Switch value={whatsappAlert} onValueChange={setWhatsappAlert} />
        </View>

        <View style={styles.toggleRow}>
          <Ionicons name="chatbubble" size={24} color="blue" />
          <Text style={styles.toggleText}>SMS</Text>
          <Switch value={smsAlert} onValueChange={setSmsAlert} />
        </View>

        <View style={styles.toggleRow}>
          <Ionicons name="mail" size={24} color="red" />
          <Text style={styles.toggleText}>Email</Text>
          <Switch value={emailAlert} onValueChange={setEmailAlert} />
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  intensityButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  toggleText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProfileScreen;
