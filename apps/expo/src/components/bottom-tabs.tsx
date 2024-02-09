import { Tabs as DefaultTabs } from "expo-router/tabs";
import { AntDesign } from "@expo/vector-icons";

export function BottomTabs() {
  return (
    <DefaultTabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#18181A",
        },
        tabBarStyle: {
          backgroundColor: "#18181A",
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#999999",
        tabBarShowLabel: false,
      }}
    >
      <DefaultTabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),

          href: "/",
        }}
      />
      <DefaultTabs.Screen
        name="profile/index"
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
          href: "/profile",
        }}
      />
    </DefaultTabs>
  );
}
