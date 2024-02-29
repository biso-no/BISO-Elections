import React from "react";
import { Stack, Tabs } from "expo-router";
import { Home, Settings2 } from "@tamagui/lucide-icons";

import { AuthAvatar } from "~/components/header";

export default function TabLayout() {
  return (
    <>
      <Tabs screenOptions={{ tabBarShowLabel: false }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ size, color }) => <Home color={color} size={size} />,
            headerRight: () => <AuthAvatar />,
          }}
        />
        <Tabs.Screen
          name="settings/index"
          options={{
            title: "Settings",
            tabBarIcon: ({ size, color }) => (
              <Settings2 color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
