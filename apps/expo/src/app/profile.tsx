import { useRouter } from "expo-router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Button, Text, View } from "tamagui";

export default function ProfileScreen() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  if (!user) {
    return (
      <View>
        <Text>Not signed in</Text>
        <Button onPress={() => router.push("/auth/")}>
          <Text>Sign in</Text>
        </Button>
      </View>
    );
  }

  return (
    <View>
      <Text>Signed in as {user?.email}</Text>
      <Button onPress={() => supabase.auth.signOut()}>
        <Text>Sign out</Text>
      </Button>
    </View>
  );
}
