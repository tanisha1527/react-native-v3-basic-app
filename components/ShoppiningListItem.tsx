import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { theme } from "@/theme";

type Props = {
    name: string;
}

export function ShoppingListItem({ name }: Props) {
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
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{name}</Text>
            <TouchableOpacity
                style={styles.button}
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