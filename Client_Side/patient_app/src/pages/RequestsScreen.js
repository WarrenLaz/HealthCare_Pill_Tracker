import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import BatchCard from "../components/BatchCard";

export default function RequestsScreen() {
  const batchData = [
    {
      id: "1",
      date: "January 17, 2025",
      items: ["Aspirin", "Vitamin D", "Vitamin E"],
      status: "Recieved",
    },
    {
      id: "2",
      date: "January 1, 2025",
      items: ["Aspirin", "Vitamin D", "Vitamin E"],
      status: "Recieved",
    },
    {
      id: "3",
      date: "December 12, 2024",
      items: [
        "Aspirin",
        "Vitamin D",
        "Vitamin E",
        "Aspirin",
        "Vitamin D",
        "Vitamin E",
      ],
      status: "Recieved",
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={batchData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.BatchCardContainer}>
            <BatchCard
              date={item.date}
              items={item.items}
              status={item.status}
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
  BatchCardContainer: {
    paddingTop: 8,
    paddingRight: 16,
    paddingLeft: 16,
    width: "100%",
  },
});
