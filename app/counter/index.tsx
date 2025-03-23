import { theme } from "@/theme";
import { registerForPushNotificationsAsync } from "@/Utils/registerForPushNotificationsAsync";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export default function CounterScreen() {

    const scheduleNotification = async () => {
        const result = await registerForPushNotificationsAsync();
        if (result === "granted") {
            await Notifications.scheduleNotificationAsync({
                 content: {
                    title: "I'm a notification from your app! 📨",
                 },
                 trigger: {
					seconds: 5, 
				} as Notifications.TimeIntervalTriggerInput, 
			});
		} else {
            if (Device.isDevice) {
                 Alert.alert(
                       "Unable to schedule notification",
                       "Enable the notifications permission for Expo Go in settings",
                     );
            }
    };

}

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} activeOpacity={0.8}
                onPress={scheduleNotification}>
                <Text style={styles.text}>Schedule Notification</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Counter</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    text: {
        color: theme.colorWhite,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    button: {
        backgroundColor: theme.colorBlack,
        padding: 12,
        borderRadius: 6,
    },
});
