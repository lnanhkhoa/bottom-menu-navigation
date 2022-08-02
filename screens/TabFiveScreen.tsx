import { StyleSheet } from "react-native"

import { Text, View } from "../components/Themed"

export default function TabFiveScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Five</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#84A59D",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
})
