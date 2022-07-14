import React from "react"
import { StyleSheet } from "react-native"
import { Text, View } from "../components/Themed"

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Three</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5CAC3",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
})
