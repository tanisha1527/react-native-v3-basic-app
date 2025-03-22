import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { theme } from "@/theme";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from "@expo/vector-icons/Entypo";

type Props = {
    name: string;
    isCompleted?: boolean;
    onDelete: () => void;
}

export function ShoppingListItem({ name, isCompleted, onDelete }: Props) {
    const handleDelete = () => {
        Alert.alert("Delete Item", `Are you sure you want to delete ${name}?`, [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            {
                text: "YES",
                onPress: () => onDelete(),
            },
        ]);
    }


    return (
        <View style={[styles.itemContainer, isCompleted ? styles.completedContainer : undefined,]}>
            <View style={styles.row}>
                <Entypo
                    name={isCompleted ? "check" : "circle"}
                    size={24}
                    color={isCompleted ? theme.colorGrey : theme.colorCerulean}
                />
                <Text
                    style={[
                        styles.itemText,
                        isCompleted ? styles.completedText : undefined,
                    ]}
                >
                    {name}
                </Text>
            </View>
            <TouchableOpacity
                onPress={handleDelete}
                activeOpacity={0.8}>
                <AntDesign name="closecircle" size={24} color={isCompleted ? theme.colorGrey : theme.colorRed} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "#1a759f",
        paddingHorizontal: 8,
        paddingVertical: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    completedContainer: {
        backgroundColor: theme.colorLightGrey,
        borderBottomColor: theme.colorLightGrey,
    },
    itemText: {
        fontSize: 18,
        fontWeight: "200",
    },
    completedText: {
        color: theme.colorGrey,
        textDecorationLine: "line-through",
        textDecorationColor: theme.colorGrey,
    },
    row: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
    },
})