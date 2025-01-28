import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CustomHeader = ({ title, subtitle }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
      <Text style={styles.headerSubtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 16,
    height: 170,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headerTitle: {
    color: "#407BFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerSubtitle: {
    color: "gray",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
});

export default CustomHeader;
