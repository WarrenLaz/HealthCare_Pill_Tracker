import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

const MiniMedCard = ({ item, onPress }) => {
  return (
    <Pressable style={styles.medCard} onPress={() => onPress(item)}>
      <Text style={styles.medTitle}>
        <Icon2 name="pill" size={20} color="#3A3A3B" /> {item.MedName}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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

export default MiniMedCard;
