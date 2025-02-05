import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import MedCard from "../components/MedCard";
import useAuth from "../hooks/useAuth";

export default function MedsScreen() {
  const {auth} = useAuth();
  const medsData = auth.token.Prescriptions;

  return (
    <View style={styles.container}>
      <FlatList
        data={medsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.medCardContainer}>
            <MedCard
              name={"item.MedName"}
              times={1}
              dosage={"item.Dosage"}
              frequency={1}
              remaining={1} 
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
