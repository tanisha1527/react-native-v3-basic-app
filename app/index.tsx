import { ShoppingListItem } from "@/components/ShoppiningListItem";
import { Link } from "expo-router";
import { StyleSheet, View} from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Link href="/counter" style={{ textAlign: "center", marginBottom: 18, fontSize: 24 }}>
        Go to counter
      </Link>
       <ShoppingListItem name="coffee" />
       <ShoppingListItem name="Tea" isCompleted />
       <ShoppingListItem name="Sugar" isCompleted />
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