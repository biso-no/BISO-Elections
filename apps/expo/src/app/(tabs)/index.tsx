import { useRouter } from "expo-router";
import { Button, ScrollView, Text, View } from "tamagui";

import { MyStack } from "~/components/MyStack";
import { Carousel } from "~/components/ui/carousel";
import { Feed } from "~/components/ui/feed";

export default function Home() {
  const router = useRouter();
  return (
    <MyStack>
      <ScrollView>
        <Carousel />
        <Feed />
      </ScrollView>
    </MyStack>
  );
}
