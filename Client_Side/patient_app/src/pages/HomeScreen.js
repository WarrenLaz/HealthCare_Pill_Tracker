import React, { useState, useMemo } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import LogModal from "../components/LogModal";
import MiniMedCard from "../components/MiniMedCard";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import { IPADDRESS } from '@env';
export default function HomeScreen() {
  const [isLog, setIsLog] = useState(false); // state for controlling log modal visibility
  const [Med, setMed] = useState(null); // state for tracking selected medication
  const [selectedDate, setSelectedDate] = useState(moment()); // state for tracking selected date, default to current date
  const { auth } = useAuth();
  const medsData = auth.token.Prescriptions;
  const p_id = auth.token._id;

  async function sendLog(MedName_, mid_, amount_, dose, id_) {
    console.log("Logging data:", {
      MedName_,
      mid_,
      amount_,
      dose,
      id_,
    });

    try {
      const response = await axios.post(
        `http://${IPADDRESS}:8000/Logs`,
        {
          log: {
            pid: id_,
            mid: mid_,
            dosage: dose,
            mdate: new Date().toISOString(),
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

  // function to open log modal and set selected medication
  function pressMed(med) {
    setMed(med);
    setIsLog(true);
  }

  // function to close log modal
  function closeModal() {
    setIsLog(false);
  }

  // function to check if a medication should be displayed on the selected date
  //THIS FUNCTION NEEDS WORK, right now it displays meds from start date to enddate which is (startdate + 30days)
  //  we need the actual end date (fix backend)
  function shouldDisplayMed(med, date) {
    const startDate = moment(med.StartDate).format("YYYY-MM-DD");
    const endDate = moment(startDate).add(30, "days").format("YYYY-MM-DD");

    // Check if the selected date is within the start and end dates
    if (!date.isBetween(startDate, endDate, "day", "[]")) return false;

    // get medication interval (daily, weekly, etc.)
    const interval = med.Interval.toLowerCase();
    // get the day of the week for selected date
    const dayOfWeek = date.format("dddd");

    // if medication is daily, always show it
    // if medication is weekly, only show it on one day per week ( the day of the startdate)
    return (
      interval === "daily" ||
      (interval === "weekly" && dayOfWeek === moment(startDate).format("dddd"))
    );
  }

  // memoized function to filter medications based on frequency and selected date
  const filteredMedsByFrequency = useMemo(() => {
    return (frequency) =>
      medsData.filter(
        (med) =>
          // check if the medication should be displayed on the selected date
          shouldDisplayMed(med, selectedDate) &&
          // check if the medication has a frequency detail that matches the given frequency
          med.FrequencyDetails?.some((detail) => detail.frequency === frequency)
      );
  }, [medsData, selectedDate]); // re-run the filtering only when medications data or selected date changes

  return (
    <View style={styles.container}>
      {/* calendar strip to allow users to select a date */}
      <CalendarStrip
        scrollable
        style={styles.calendarStrip}
        calendarHeaderStyle={styles.calendarHeader}
        dateNumberStyle={styles.dateText}
        dateNameStyle={styles.dateText}
        highlightDateNameStyle={styles.highlightedDate}
        highlightDateNumberStyle={styles.highlightedDate}
        calendarColor="#ffffff"
        selectedDate={selectedDate}
        onDateSelected={setSelectedDate} // update selected date when user picks a new one
      />

      {/* list of our generic medication times (morning, lunch, etc.) */}
      <FlatList
        contentContainerStyle={styles.medsList}
        data={[
          "Before Breakfast",
          "At Breakfast",
          "MidMorning",
          "At Lunch",
          "Midday",
          "At Dinner",
          "Before Bed",
        ]}
        keyExtractor={(item) => item}
        renderItem={({ item: frequency }) => {
          // get medications that match the selected frequency and date
          const filteredMeds = filteredMedsByFrequency(frequency);

          // if no medications exist for this time, don't render anything
          if (filteredMeds.length === 0) return null;

          return (
            <View>
              {/* display section header for each frequency */}
              <Text style={styles.sectionHeader}>{frequency}</Text>
              {/* render each medication as a mini med card */}
              {filteredMeds.map((med) => (
                <MiniMedCard key={med._id} item={med} onPress={pressMed} />
              ))}
            </View>
          );
        }}
      />

      {/* modal for logging medication intake */}
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
  container: { flex: 1, backgroundColor: "#ffffff", paddingTop: 50 },
  calendarStrip: { height: 80, marginBottom: 10, paddingBottom: 5 },
  medsList: { padding: 20, backgroundColor: "#F1F4FF", flexGrow: 1 },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#333",
  },
  calendarHeader: { color: "black", fontSize: 16 },
  dateText: { color: "black", fontSize: 14 },
  highlightedDate: { color: "blue" },
});
