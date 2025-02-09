import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Pressable, View, FlatList } from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons"
import useAuth from "../hooks/useAuth";


const Log = ({sendLog, Med, id}) => {
  const [Amount, setAmount] = useState(0);
  return(
  <View style={styles.container}>
  <Text style={styles.texts}>{Med.MedName}</Text>
  <StatusBar style="auto" />
  <FlatList
        data={Med.FrequencyDetails}
        keyExtractor={(item) => item.frequency}
        renderItem={( {item} ) => (
          <Pressable style={styles.card} onPress={setAmount(item.pillCount)}>
              <Text style={styles.title}> {item.frequency} </Text>
              <Text style={styles.title}> {item.pillCount} {Med.Form} </Text>
          </Pressable>
        )}
      />
  <Pressable style={styles.takebutton} onPress={() => sendLog(Med.MedName, Amount, id)}>
    <Icon name="check" size={50} color="#fff" />
  </Pressable>
  </View>
  );
}

export default function HomeScreen() {
  const [log, setLog] = useState({});
  const [islog, setislog] = useState(false);
  const [Med, setMed] = useState("");
  const {auth} = useAuth();
  const medsData = auth.token.Prescriptions;
  const p_id = auth.token._id;
  console.log(p_id)
  async function sendLog(MedName_, amount_, id_) {
    setLog({ pid : id_, date : new Date(), MedName : MedName_, amount : amount_ });
    console.log(log);
    try {
      const response = await axios.post(
        "http://192.168.0.118:8000/Logs", //ip for school server; anywhere else change to local host OR ip of server (check login.js for command)
        { log },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //console.log(response.data); // Should log the success message from the server
    } catch (error) {
      console.error("Error sending data:", error);
    }
  }
  async function pressMed(med_) {
    //(med_);
    setMed(med_);
    setislog(true);
  }
  
  //console.log("auth: " , auth.token.Prescriptions);
  return (
  <View style={styles.innercontainer}>
    <FlatList
        data={medsData}
        keyExtractor={(item) => item.id}
        renderItem={( {item} ) => (
              <Pressable style={styles.card} onPress={() => pressMed(item)}>
              <Text style={styles.title}>{<Icon2 name="pill" size={20} color="#3A3A3B" />} {item.MedName} </Text>
              </Pressable>
        )}
      />
    {islog ? <Log sendLog= {sendLog} Med={Med} id = {p_id}/> : null}
  </View>
  );
}

const styles = StyleSheet.create({
  innercontainer:{
    backgroundColor: "#F1F4FF",
  },
  container: {
    padding: 25,
    backgroundColor: "#CBD4FF",
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
