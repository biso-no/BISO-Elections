import React from "react";
import { useRouter } from "expo-router";
import { SizableText, Tabs, YStack } from "tamagui";

const BottomTabs = () => {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <YStack flex={1} justifyContent="flex-end">
      <Tabs orientation="horizontal">
        <Tabs.List flexDirection="row" justifyContent="space-around">
          <Tabs.Tab
            onPress={() => handleNavigate("/")}
            flex={1}
            alignItems="center"
            paddingVertical="$2"
            value="home"
          >
            <SizableText fontFamily="$body">Home</SizableText>
          </Tabs.Tab>

          <Tabs.Tab
            onPress={() => handleNavigate("/settings")}
            flex={1}
            alignItems="center"
            paddingVertical="$2"
            value="settings"
          >
            <SizableText fontFamily="$body">Settings</SizableText>
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </YStack>
  );
};

export default BottomTabs;
