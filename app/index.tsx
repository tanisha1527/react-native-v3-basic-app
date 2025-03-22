import { ShoppingListItem } from "@/components/ShoppingListItem";
import { theme } from "@/theme";
import { useState } from "react";
import { ScrollView, StyleSheet, TextInput} from "react-native";


type ShoppingListItemType = {
  id: string;
  name: string;
}

const initialList: ShoppingListItemType[] = [
  { id: "1", name: "coffee" },
  { id: "2", name: "tea" }, 
  { id: "3", name: "milk" },
]

export default function Index() {
  const [shoppingList, setShoppingList] = useState(initialList);
  const [Value, setValue] = useState("");

  const handleSubmit = () => {
     if (Value) {
        const newShoppingList = [
          {id: new Date().toTimeString(), name: Value},
          ...shoppingList,
        ];
        setShoppingList(newShoppingList);
        setValue("");
     }

  };

  return (
    <ScrollView style={styles.container}
     contentContainerStyle={styles.contentContainer}
     stickyHeaderIndices={[0]}
     >
       <TextInput placeholder="E.g. coffee"
        style={styles.textInput} 
        value={Value}
        onChangeText={setValue}
        returnKeyType="done"
        onSubmitEditing={handleSubmit} 
       />
       {shoppingList.map((item) => (
           <ShoppingListItem name={item.name} key={item.id} />
       ))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
  },
  contentContainer: {
    paddingTop: 18,
    paddingBottom: 24,
  },
  textInput:{
    borderColor: theme.colorLightGrey,
    borderWidth: 2,
    padding: 8,
    marginHorizontal: 12,
    marginBottom: 12,
    fontSize: 18,
    borderRadius: 50,
    backgroundColor: theme.colorWhite,
  }
}) 