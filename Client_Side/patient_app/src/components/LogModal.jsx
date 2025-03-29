import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const LogModal = ({ sendLog, Med, id, closeModal }) => {
  const [Amount, setAmount] = useState(0);
  const [selectedFrequency, setSelectedFrequency] = useState(null);

  return (
    <Modal animationType="fade" transparent={true} visible={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Pressable onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeText}>X</Text>
          </Pressable>
          <Text style={styles.medName}>{Med.MedName}</Text>
          <FlatList
            data={Med.FrequencyDetails}
            keyExtractor={(item) => item.frequency}
            renderItem={({ item }) => (
              <Pressable
                style={[
                  styles.frequencyCard,
                  selectedFrequency === item.frequency && styles.selectedCard,
                ]}
                onPress={() => {
                  setAmount(item.pillCount);
                  setSelectedFrequency(item.frequency);
                }}
              >
                <Text style={styles.frequencyText}>{item.frequency}</Text>
                <Text style={styles.pillCount}>
                  {item.pillCount} {Med.Form}
                </Text>
              </Pressable>
            )}
          />
          <Pressable
            style={styles.takeButton}
            onPress={() => {
              if (selectedFrequency && Amount > 0) {
                sendLog(
                  Med.MedName,
                  Med._id,
                  Amount,
                  Med.Dosage,
                  id,
                  selectedFrequency
                );
                closeModal(); // Close the modal after logging
              }
            }}
          >
            <Icon name="check" size={50} color="#fff" />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#CBD4FF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "85%",
  },
  closeButton: { position: "absolute", top: 10, right: 10, padding: 10 },
  closeText: { fontSize: 18, fontWeight: "bold", color: "#3A3A3B" },
  medName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#3A3A3B",
    marginBottom: 20,
  },
  frequencyCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    width: "100%",
    elevation: 3,
  },
  selectedCard: { backgroundColor: "#407BFF" },
  frequencyText: { fontSize: 18, fontWeight: "bold", color: "#3A3A3B" },
  pillCount: { fontSize: 16, color: "#3A3A3B", marginTop: 6 },
  takeButton: {
    backgroundColor: "#407BFF",
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

export default LogModal;
