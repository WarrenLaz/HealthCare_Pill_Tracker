import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Pressable, View, FlatList } from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";
import useAuth from "../hooks/useAuth";

const Log = ({sendLog, MedName}) => {
  return(
  <View style={styles.container}>
  <Text style={styles.texts}>{MedName}</Text>
  <StatusBar style="auto" />
  <Pressable style={styles.takebutton} onPress={sendLog}>
    <Icon name="check" size={50} color="#fff" />
  </Pressable>
  </View>
  );
};

export default function HomeScreen() {
  let log = new Date();
  const [Log, setLog] = useState({});
  const [islog, setislog] = useState(false);
  const [MedName_, setMedName] = useState("");
  const [amount_, setAmount] = useState("");
  const {auth} = useAuth();
  const medsData = auth.token.Prescriptions;
  
  async function sendLog() {
    setLog({ date : new Date(), MedName : MedName_, amount : amount_ });
    try {
      const response = await axios.post(
        "http://192.168.0.117:8000/Logs", //ip for school server; anywhere else change to local host OR ip of server (check login.js for command)
        { date },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data); // Should log the success message from the server
    } catch (error) {
      console.error("Error sending data:", error);
    }
  }
  async function pressMed(MedName, amount) {
    console.log(MedName);
    setAmount()
    setMedName(MedName);
    setislog(true);
  }
  console.log("auth: " , auth.token.Prescriptions);
  return (
  <View style={styles.container}>
    <FlatList
        data={medsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (






          <View style={styles.card}>
          <FlatList 
          data = {item.FrequencyDetails}
          keyExtractor={(item_) => item_.frequency}
          renderItem={
            (item_) => (
              <Pressable onPress={() => pressMed(item.MedName, item_.pillCount)}>
              <Text style={styles.title}> {item.MedName} - {item_.pillCount} </Text>
              </Pressable>
            )


          }
          > 
          </FlatList>
          </View>


        )}
      />
    {islog ? <Log sendLog= {sendLog} MedName={MedName_}/> : null}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F4FF",
    alignItems: "center",
    justifyContent: "center",
  },
  takebutton: {
    backgroundColor: "#407BFF",
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  texts: {
    color: "#3A3A3B",
    fontFamily: "inter-black",
    marginBottom: 20,
    fontSize: 30,
  },
  //----
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
