
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { countdownStorageKey, persistedCountdownState } from ".";
import { getFromStorage } from "@/Utils/storage";
import { format } from "date-fns";
import { theme } from "@/theme";


const fullDateFormat = `LLL d yyyy, h:mm aaa`;

export default function HistoryScreen() {
  
  const [countdownState, setCountdownState] = useState<persistedCountdownState>()
  

  useEffect(() => {
           const init = async () => {
               const value = await getFromStorage(countdownStorageKey);
               setCountdownState(value);
           };
           init();
       }, [])

  return (
    <FlatList 
    style={styles.list}
    contentContainerStyle={styles.contentContainer}
    ListEmptyComponent={
            <View style={styles.listEmptyContainer}>
              <Text>No History</Text>
            </View>
          }
      data={countdownState?.completedAtTimestamp}
      renderItem={({item}) => (
         <View style={styles.listItem}>
            <Text style={styles.listItemText}>{format(item, fullDateFormat)}</Text>
         </View>
   )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    padding: 20,
  },
  contentContainer:{
     marginTop: 8,
  },
  listItem:{
     backgroundColor: theme.colorLightGrey,
     marginHorizontal: 8,
     padding: 12,
     borderRadius: 6,
     marginBottom: 8,
  },
  listItemText:{
      fontSize: 18,
      color: theme.colorBlack,
  },
  listEmptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

