import { theme } from "@/theme";
import { registerForPushNotificationsAsync } from "@/Utils/registerForPushNotificationsAsync";
import { Text, View, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Duration, isBefore, intervalToDuration } from "date-fns";
import { TimeSegment } from "@/components/TimeSegment";
import { getFromStorage, saveToStorage } from "@/Utils/storage";

const frequency = 10 * 1000;

export const countdownStorageKey = "learning:countdown";

export type persistedCountdownState = {
    currentNotificationId: string | undefined;
    completedAtTimestamp: number[];
}

type CountdownStatus = {
     isOverdue: boolean;
     distance: Duration;
}

export default function CounterScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [countdownState, setCountdownState] = useState<persistedCountdownState>();

    const [status, setStatus] = useState<CountdownStatus>({
         isOverdue: false,
         distance: {},
    });

    useEffect(() => {
        const init = async () => {
            const value = await getFromStorage(countdownStorageKey);
            setCountdownState(value);
        };
        init();
    }, [])

    const lastCompleteAt = countdownState?.completedAtTimestamp?.[0];


    useEffect(() => {
       const interval = setInterval(()=> {
            const timeStamp = lastCompleteAt 
            ? lastCompleteAt + frequency 
            : Date.now();
            if (lastCompleteAt){
                setIsLoading(false);
            }
             const isOverdue = isBefore(timeStamp, Date.now());
             const distance = intervalToDuration(
                 isOverdue ? { start: timeStamp,
                     end: Date.now()} : {
                    start: Date.now(), end: timeStamp,
                 }
             )
             setStatus( { isOverdue, distance})
        }, 1000)
        return () => {
            clearInterval(interval);
        };
    }, [lastCompleteAt])

    const scheduleNotification = async () => {

        let pushNotificationId;
        const result = await registerForPushNotificationsAsync();
        if (result === "granted") {
            pushNotificationId = await Notifications.scheduleNotificationAsync({
                 content: {
                    title: "The thing is due!",
                 },
                 trigger: {
					seconds: frequency / 1000, 
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
    if (countdownState?.currentNotificationId) {
        await Notifications.cancelScheduledNotificationAsync(countdownState.currentNotificationId);
    }

    const newCountdownState: persistedCountdownState = {
        currentNotificationId: pushNotificationId,
        completedAtTimestamp: countdownState? 
        [Date.now(), ...countdownState.completedAtTimestamp] 
        : [Date.now()],
    }
    setCountdownState(newCountdownState);
    await saveToStorage(countdownStorageKey, newCountdownState);

}
   
    if (isLoading) {
        return (
            <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator />
            </View>
           )
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
    activityIndicatorContainer:{
        backgroundColor: theme.colorWhite,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    }
});
