import { ShoppingListItem } from "@/components/ShoppingListItem";
import { theme } from "@/theme";
import { useState } from "react";
import { StyleSheet, TextInput, FlatList, View, Text } from "react-native";


type ShoppingListItemType = {
  id: string;
  name: string;
  completedAtTimeStamp?: number;
  lastUpdatedTimeStamp: number;
}

export default function Index() {
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);
  const [Value, setValue] = useState("");

  const handleSubmit = () => {
    if (Value) {
      const newShoppingList = [
        { id: new Date().toTimeString(), name: Value, lastUpdatedTimeStamp: Date.now() },
        ...shoppingList,
      ];
      setShoppingList(newShoppingList);
      setValue("");
    }

  };

  const handleDelete = (id: string) => {
        const newShoppingList = shoppingList.filter((item) => item.id !== id);
        setShoppingList(newShoppingList);
  }

  const handleToggleComplete = (id: string) => {
        const newShoppingList = shoppingList.map((item) => {
           if (item.id == id) {
              return {
                 ...item,
                 lastUpdatedTimeStamp: Date.now(),
                 completedAtTimeStamp: item.completedAtTimeStamp ? 
                 undefined : Date.now(),
              }
           }
           return item;
        })
        setShoppingList(newShoppingList);
  }

  return (
    <FlatList
     data={orderShoppingList(shoppingList)}
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
         return <ShoppingListItem 
          name={item.name}
          onDelete={() => handleDelete(item.id) }
          onToggleComplete={() => handleToggleComplete(item.id)}
          isCompleted={Boolean(item.completedAtTimeStamp)} />
      }}
    />
  );
}

function orderShoppingList(shoppingList: ShoppingListItemType[]) {
  return shoppingList.sort((item1, item2) => {
    if (item1.completedAtTimeStamp && item2.completedAtTimeStamp) {
      return item2.completedAtTimeStamp - item1.completedAtTimeStamp;
    }

    if (item1.completedAtTimeStamp && !item2.completedAtTimeStamp) {
      return 1;
    }

    if (!item1.completedAtTimeStamp && item2.completedAtTimeStamp) {
      return -1;
    }

    if (!item1.completedAtTimeStamp && !item2.completedAtTimeStamp) {
      return item2.lastUpdatedTimeStamp - item1.lastUpdatedTimeStamp;
    }

    return 0;
  });
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 12,
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