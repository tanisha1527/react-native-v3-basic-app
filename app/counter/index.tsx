import { theme } from "@/theme";
import { registerForPushNotificationsAsync } from "@/Utils/registerForPushNotificationsAsync";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Duration, isBefore, intervalToDuration } from "date-fns";
import { TimeSegment } from "@/components/TimeSegment";

const timeStamp = Date.now() + 1000;

type CountdownStatus = {
     isOverdue: boolean;
     distance: Duration;
}

export default function CounterScreen() {

    const [status, setStatus] = useState<CountdownStatus>({
         isOverdue: false,
         distance: {},
    })

    console.log(status);

    useEffect(() => {
       const interval = setInterval(()=> {
             const isOverdue = isBefore(timeStamp, Date.now());
             const distance = intervalToDuration(
                 isOverdue ? { start: timeStamp, end: Date.now()} : {
                    start: Date.now(), end: timeStamp,
                 }
             )
             setStatus( { isOverdue, distance})
        }, 1000)
        return () => {
            clearInterval(interval);
        };
    }, [])

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
        <View style={[styles.container, status.isOverdue ? styles.containerLate : undefined, ]}>
            {status.isOverdue ? (
                <Text style={[styles.heading, styles.whiteText]}>Thing overdue by</Text>
            ): (<Text style={styles.heading}>Thing due in...</Text>)}
            <View style={styles.row}>
                <TimeSegment unit="Days" number={status.distance.days ?? 0} textStyle={status.isOverdue ? styles.whiteText : undefined} />
                <TimeSegment unit="Hours" number={status.distance.hours ?? 0} textStyle={status.isOverdue ? styles.whiteText : undefined} />
                <TimeSegment unit="minutes" number={status.distance.minutes ?? 0} textStyle={status.isOverdue ? styles.whiteText : undefined} />
                <TimeSegment unit="seconds" number={status.distance.seconds ?? 0} textStyle={status.isOverdue ? styles.whiteText : undefined} />
            </View>
            <TouchableOpacity style={styles.button} activeOpacity={0.8}
                onPress={scheduleNotification}>
                <Text style={styles.text}>I've done the thing!</Text>
            </TouchableOpacity>
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
    row: {
        flexDirection: "row",
        marginBottom: 24,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
    },
    containerLate: {
        backgroundColor: theme.colorRed,
    },
    whiteText: {
        color: theme.colorWhite,
    },
});
