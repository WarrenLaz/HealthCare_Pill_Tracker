import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import MedCard from "../components/MedCard";

export default function MedsScreen() {
  const medsData = [
    {
      id: "1",
      name: "Aspirin",
      times: ["After Dinner", "Before Bed"],
      dosage: "25mcg",
      frequency: "Take 2",
      remaining: 23,
    },
    {
      id: "2",
      name: "Vitamin D",
      times: ["After Breakfast"],
      dosage: "25mcg",
      frequency: "Take 2",
      remaining: 10,
    },
    {
      id: "3",
      name: "Ibuprofen",
      times: ["Before Breakfast", "Before Bed"],
      dosage: "25mcg",
      frequency: "Take 2",
      remaining: 15,
    },
    {
      id: "4",
      name: "Aspirin",
      times: ["After Dinner", "Before Bed"],
      dosage: "25mcg",
      frequency: "Take 2",
      remaining: 23,
    },
    {
      id: "5",
      name: "Vitamin D",
      times: ["After Breakfast"],
      dosage: "25mcg",
      frequency: "Take 2",
      remaining: 10,
    },
    {
      id: "6",
      name: "Ibuprofen",
      times: ["Before Breakfast", "Before Bed"],
      dosage: "25mcg",
      frequency: "Take 2",
      remaining: 15,
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={medsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.medCardContainer}>
            <MedCard
              name={item.name}
              times={item.times}
              dosage={item.dosage}
              frequency={item.frequency}
              remaining={item.remaining}
            />
          </View>
        )}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false} // Hide vertical scroll indicator for FlatList
        showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator for FlatList
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F4FF",
    paddingRight: 8,
    paddingLeft: 8,
  },
  flatListContainer: {
    marginTop: 16,
    paddingBottom: 16,
  },
  medCardContainer: {
    paddingTop: 8,
    paddingRight: 16,
    paddingLeft: 16,
    width: "100%",
  },
});
