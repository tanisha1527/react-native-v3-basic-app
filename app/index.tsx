import { theme } from "@/theme";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";

export default function Index() {
  const handleDelete = () => {
    Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "YES",
        onPress: () => console.log("OK Pressed"),
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>Coffee</Text>
        <TouchableOpacity
         style={styles.button} 
         onPress={handleDelete} 
         activeOpacity={0.8}>
         <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  itemContainer: {
    borderBottomWidth: 1, 
    borderBottomColor: "#1a759f", 
    paddingHorizontal: 8, 
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "200",
  },
  button: {
    backgroundColor: theme.colorBlack,
    padding: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: theme.colorWhite,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
})