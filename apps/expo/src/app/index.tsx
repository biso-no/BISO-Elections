import { useRouter } from "expo-router";
import { Button, Text, XStack, YStack } from "tamagui";

import { MyStack } from "~/components/MyStack";

export default function Home() {
  const router = useRouter();
  return (
    <MyStack>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button onPress={() => router.push("/(tabs)/")}>
        <Text>Profile</Text>
      </Button>
    </MyStack>
  );
}
