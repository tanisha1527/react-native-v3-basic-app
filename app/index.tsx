import { ShoppingListItem } from "@/components/ShoppiningListItem";
import { StyleSheet, View} from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
       <ShoppingListItem name="coffee" />
       <ShoppingListItem name="Tea" />
       <ShoppingListItem name="Sugar" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
}) 