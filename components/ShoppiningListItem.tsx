import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { theme } from "@/theme";

type Props = {
    name: string;
    isCompleted?: boolean;
}

export function ShoppingListItem({ name, isCompleted }: Props) {
    const handleDelete = () => {
        Alert.alert("Delete Item", `Are you sure you want to delete ${name}?`, [
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
        <View style={[styles.itemContainer, isCompleted ? styles.completedContainer : undefined,]}>
            <Text style={[styles.itemText, isCompleted ? styles.completedText : undefined,]}>{name}</Text>
            <TouchableOpacity
                style={[styles.button, isCompleted ? styles.completedButton : undefined,]}
                onPress={handleDelete}
                activeOpacity={0.8}>
                <Text style={styles.buttonText}>Delete</Text>
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
    button: {
        backgroundColor: theme.colorBlack,
        padding: 8,
        borderRadius: 6,
    },
    completedButton: {
        backgroundColor: theme.colorGrey,
    },
    buttonText: {
        color: theme.colorWhite,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 1,
    },
})