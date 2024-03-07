import { useRouter } from "expo-router";
import { Card, H5, SizableText } from "tamagui";

import { MyStack } from "~/components/MyStack";

export default function Services() {
  const router = useRouter();

  return (
    <MyStack>
      <H5>Services</H5>
      <Card
        onPress={() => {
          router.push("/elections/");
        }}
      >
        <SizableText>Elections</SizableText>
      </Card>
    </MyStack>
  );
}
