import React from "react";
import { Stack, Tabs } from "expo-router";
import { Home, Settings2 } from "@tamagui/lucide-icons";

import { AuthAvatar } from "~/components/header";
import { api } from "~/utils/api";

export default function TabLayout() {
  const { data: profile } = api.profile.get.useQuery();

  const firstName = profile?.name?.split(" ")[0];

  const title = "Hi " + firstName ?? "Home";

  return (
    <>
      <Tabs screenOptions={{ tabBarShowLabel: false }}>
        <Tabs.Screen
          name="index"
          options={{
            title: title,
            tabBarIcon: ({ size, color }) => <Home color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="services/index"
          options={{
            title: "Services",
            tabBarIcon: ({ size, color }) => <Home color={color} size={size} />,
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
