import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";

const BatchAlert = ({ isVisible, onClose, onSendRequest }) => {
  // Dummy data for medications running low
  const lowStockMedications = [
    { id: "1", name: "Amoxicillin", remaining: "22" },
    { id: "2", name: "Ibuprofen", remaining: "11" },
    { id: "3", name: "Metformin", remaining: "2" },
  ];

  return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
    >
      <View style={styles.modalContainer}>
        <Text style={styles.headerText}>You're Running Low</Text>
        <Text style={styles.description}>
          You're running low on the following medications:
        </Text>

        {/* List of medications */}
        <FlatList
          data={lowStockMedications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text style={styles.medicationItem}>
              • {item.name} ({item.remaining} remaining)
            </Text>
          )}
        />

        <Text style={styles.confirmText}>
          Would you like to send out a batch request?
        </Text>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.denyButton} onPress={onClose}>
            <Text style={styles.buttonText}>Deny</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={onSendRequest}>
            <Text style={styles.buttonText}>Send Request</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 10,
  },
  medicationItem: {
    fontSize: 16,
    color: "#444",
    marginBottom: 5,
  },
  confirmText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
    color: "#222",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  denyButton: {
    flex: 1,
    backgroundColor: "#FF4D4D",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 10,
  },
  sendButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BatchAlert;
