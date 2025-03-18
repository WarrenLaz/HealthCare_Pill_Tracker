import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import LogModal from "../components/LogModal";
import MiniMedCard from "../components/MiniMedCard";

export default function HomeScreen() {
  const [isLog, setIsLog] = useState(false);
  const [Med, setMed] = useState(null);
  const { auth } = useAuth();
  const medsData = auth.token.Prescriptions;
  const p_id = auth.token._id;

  async function sendLog(MedName_, mid_, amount_, dose, id_) {
    console.log("Logging data:", { MedName_, mid_, amount_, dose, id_ });

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
        { headers: { "Content-Type": "application/json" } }
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
        keyExtractor={(item) => item._id.toString()} // Ensure it's a unique value and converted to a string
        renderItem={({ item }) => (
          <MiniMedCard item={item} onPress={pressMed} />
        )}
      />

      {isLog && Med && (
        <LogModal
          sendLog={sendLog}
          Med={Med}
          id={p_id}
          closeModal={closeModal}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F4FF",
    padding: 20,
    paddingTop: 80,
  },
});
