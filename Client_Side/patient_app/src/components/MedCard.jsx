import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const MedCard = ({ name, times, dosage, frequency, remaining }) => (
  <View style={styles.card}>
  <Text style={styles.title}>{name}</Text>
    <View style={styles.infoRow}>
      <Icon name="calendar-today" size={20} color="#3A3A3B" />
      {/* 
    "Before Breakfast",
    "MidMorning",
    "At Breakfast",
    "At Lunch",
    "Midday",
    "At Dinner",
    "Before Bed"
      */}
      <FlatList
          data={times}
          renderItem={ ({item}) => (
          <Text style={styles.infoText}> {
          (item.frequency == "MidMorning") || (item.frequency == "Before Breakfast") 
          || (item.frequency == "At Breakfast")  ? 
          <Icon name="sunny" size={20} color="#3A3A3B"/> :  
          <Icon name="nightlight" size={20} color="#3A3A3B"/>
          } {item.frequency} 
          [{item.pillCount}] </Text>
        ) }
          keyExtractor={(item) => item.frequency}
      />
    </View>

    <View style={styles.infoRow}>
      <Icon name="info" size={20} color="#3A3A3B" />
      <Text style={styles.infoText}>
        {dosage} - {frequency}
      </Text>
    </View>
    <View style={styles.infoRow}>
      <Icon name="trending-down" size={20} color="#3A3A3B" />
      <Text style={styles.infoText}>Remaining: {remaining}</Text>
    </View>
  </View>
);

export default MedCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3A3A3B",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    opacity: 0.85,
  },
  infoText: {
    marginLeft: 8,
    color: "#3A3A3B",
    fontSize: 16,
    opacity: 0.85,
  },
});
