import { StyleSheet } from "react-native"

import { Text, View } from "../components/Themed"

export default function TabFourScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Four</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F28482",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
})
