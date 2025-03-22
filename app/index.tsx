import { ShoppingListItem } from "@/components/ShoppingListItem";
import { theme } from "@/theme";
import { useState } from "react";
import { StyleSheet, TextInput, FlatList, View, Text } from "react-native";


type ShoppingListItemType = {
  id: string;
  name: string;
}

export default function Index() {
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);
  const [Value, setValue] = useState("");

  const handleSubmit = () => {
    if (Value) {
      const newShoppingList = [
        { id: new Date().toTimeString(), name: Value },
        ...shoppingList,
      ];
      setShoppingList(newShoppingList);
      setValue("");
    }

  };

  return (
    <FlatList
     data={shoppingList}
     style={styles.container}
     contentContainerStyle={styles.contentContainer}
     stickyHeaderIndices={[0]}
     ListEmptyComponent={
       <View style={styles.listEmptyContainer}>
          <Text>Your shopping list is empty</Text>
       </View>
     }
     ListHeaderComponent={
      <TextInput placeholder="E.g. coffee"
       style={styles.textInput} 
       value={Value}
       onChangeText={setValue}
       returnKeyType="done"
       onSubmitEditing={handleSubmit} 
      />
    }
      renderItem={({item}) => {
         return <ShoppingListItem name={item.name} />
      }}
    />
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
  textInput: {
    borderColor: theme.colorLightGrey,
    borderWidth: 2,
    padding: 8,
    marginHorizontal: 12,
    marginBottom: 12,
    fontSize: 18,
    borderRadius: 50,
    backgroundColor: theme.colorWhite,
  },
  listEmptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
}) 