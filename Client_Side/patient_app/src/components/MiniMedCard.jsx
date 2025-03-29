import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

const MiniMedCard = ({ item, onPress, taken }) => {
  return (
    <Pressable style={styles.medCard} onPress={() => onPress(item)}>
      <Text style={styles.medTitle}>
        <Icon2 name="pill" size={20} color="#3A3A3B" /> {item.MedName}
      </Text>

      {/* Conditionally render the green circle with checkmark */}
      {taken && (
        <View style={styles.checkmarkContainer}>
          <Icon2 name="check" size={20} color="white" />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  medCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  medTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3A3A3B",
    marginLeft: 10,
  },
  checkmarkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MiniMedCard;
