import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  FlatList,
  Modal,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import useAuth from "../hooks/useAuth";

const Log = ({ sendLog, Med, id, closeModal }) => {
  const [Amount, setAmount] = useState(0);
  const [selectedFrequency, setSelectedFrequency] = useState(null);

  return (
    <Modal animationType="fade" transparent={true} visible={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Pressable onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeText}>X</Text>
          </Pressable>
          <Text style={styles.medName}>{Med.MedName}</Text>
          <FlatList
            data={Med.FrequencyDetails}
            keyExtractor={(item) => item.frequency}
            renderItem={({ item }) => (
              <Pressable
                style={[
                  styles.frequencyCard,
                  selectedFrequency === item.frequency && styles.selectedCard,
                ]}
                onPress={() => {
                  setAmount(item.pillCount);
                  setSelectedFrequency(item.frequency);
                }}
              >
                <Text style={styles.frequencyText}>{item.frequency}</Text>
                <Text style={styles.pillCount}>
                  {item.pillCount} {Med.Form}
                </Text>
              </Pressable>
            )}
          />
          <Pressable
            style={styles.takeButton}
            onPress={() => {
              // Log the values when the Take button is pressed
              if (selectedFrequency && Amount > 0) {
                sendLog(Med.MedName, Med._id, Amount, Med.Dosage, id); // Log when Take button is clicked
              }
            }}
          >
            <Icon name="check" size={50} color="#fff" />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default function HomeScreen() {
  const [log, setLog] = useState({});
  const [isLog, setIsLog] = useState(false);
  const [Med, setMed] = useState(null);
  const { auth } = useAuth();
  const medsData = auth.token.Prescriptions;
  const p_id = auth.token._id;

  async function sendLog(MedName_, mid_, amount_, dose, id_) {
    // Log current data
    console.log("Logging data:", {
      MedName_: MedName_,
      mid_,
      amount_,
      dose,
      id_,
    });

    try {
      const response = await axios.post(
        "http://141.215.213.8:8000/Logs",
        {
          log: {
            pid: id_,
            mid: mid_,
            dosage: dose,
            mdate: new Date(),
            MedName: MedName_,
            amount: amount_,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Log sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  }

  function pressMed(med_) {
    setMed(med_);
    setIsLog(true);
  }

  function closeModal() {
    setIsLog(false);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={medsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.medCard} onPress={() => pressMed(item)}>
            <Text style={styles.medTitle}>
              <Icon2 name="pill" size={20} color="#3A3A3B" /> {item.MedName}
            </Text>
          </Pressable>
        )}
      />
      {isLog && Med && (
        <Log sendLog={sendLog} Med={Med} id={p_id} closeModal={closeModal} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F4FF",
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#CBD4FF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "85%",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  closeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3A3A3B",
  },
  medName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#3A3A3B",
    marginBottom: 20,
  },
  frequencyCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    backgroundColor: "#407BFF",
  },
  frequencyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3A3A3B",
  },
  pillCount: {
    fontSize: 16,
    color: "#3A3A3B",
    marginTop: 6,
  },
  takeButton: {
    backgroundColor: "#407BFF",
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  medCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  medTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3A3A3B",
    marginLeft: 10,
  },
});
