import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import LogModal from "../components/LogModal";
import MiniMedCard from "../components/MiniMedCard";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment"; // Import moment

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
        "http://192.168.0.127:8000/Logs",
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
      {/* Adjusted CalendarStrip with skinnier styling */}
      <CalendarStrip
        scrollable
        style={styles.calendarStrip}
        calendarHeaderStyle={{ color: "black", fontSize: 16 }}
        dateNumberStyle={{ color: "black", fontSize: 14 }}
        dateNameStyle={{ color: "black", fontSize: 14 }}
        highlightDateNameStyle={{ color: "blue" }}
        highlightDateNumberStyle={{ color: "blue" }}
        calendarColor={"#ffffff"}
        selectedDate={moment()} // Set the current date as selected
        onDateSelected={(date) => console.log("Selected Date:", date.format())} // Example of onDateSelected handler
      />

      <View style={styles.medsList}>
        <FlatList
          data={medsData}
          keyExtractor={(item) => item._id.toString()} // Ensure it's a unique value and converted to a string
          renderItem={({ item }) => (
            <MiniMedCard item={item} onPress={pressMed} />
          )}
        />
      </View>

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
    backgroundColor: "#ffffff",
    padding: 0,
    paddingTop: 50,
  },
  calendarStrip: {
    height: 80, // Reduced height for a skinnier calendar strip
    marginBottom: 10, // Reduced margin to fit it as a header
    paddingTop: 0, // Adjust the top padding
    paddingBottom: 5, // Adjust the bottom padding
  },
  medsList: {
    padding: 20,
    height: "100%",
    backgroundColor: "#F1F4FF",
  },
});
