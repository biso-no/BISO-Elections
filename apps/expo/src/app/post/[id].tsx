import { SafeAreaView, Text, View } from "react-native";
import { Stack, useGlobalSearchParams } from "expo-router";

import { api } from "~/utils/api";

export default function Post() {
  const { id } = useGlobalSearchParams();
  if (!id || typeof id !== "string") throw new Error("unreachable");
  const { data: post } = api.post.byId.useQuery({ id });

  if (!post) return null;

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: post.title }} />
      <View>
        <Text>{post.title}</Text>
        <Text>{post?.content}</Text>
      </View>
    </SafeAreaView>
  );
}
