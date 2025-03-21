import { Tabs } from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { theme } from "@/theme";


export default function RootLayout() {
  return (
     <Tabs screenOptions={{ tabBarActiveTintColor: theme.colorCerulean}}>
        <Tabs.Screen name="index" options={{title: 
        "Shopping List", 
        tabBarIcon: ({ color, size }) =>{
          return <Feather name="list" size={size} color={color} />
        }
        }}/>
        <Tabs.Screen name="counter" options={{title: "counter",
          tabBarIcon: ({ color, size }) =>{
            return <Feather name="clock" size={size} color={color} />
          }
        }}/>
        <Tabs.Screen name="idea" options={{title: "idea",
          tabBarIcon: ({ color, size }) =>{
            return <FontAwesome5 name="lightbulb" size={size} color={color} />
          }
        }}/>
     </Tabs>
  );
}
