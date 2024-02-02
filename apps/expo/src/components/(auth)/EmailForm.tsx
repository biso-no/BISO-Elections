import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { makeRedirectUri } from "expo-auth-session";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const redirectTo = makeRedirectUri({
  path: "/profile",
});

export function EmailForm() {
  const supabase = useSupabaseClient();

  const [email, setEmail] = useState("");

  const signInWithOtp = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Check your email for the login OTP!");
    }
  };

  return (
    <View className="flex-col justify-center gap-4">
      <TextInput
        className="rounded bg-white/10 p-2 text-zinc-200"
        placeholderTextColor="#A1A1A9" // zinc-400
        value={email}
        autoCapitalize="none"
        onChangeText={setEmail}
        placeholder="Email"
      />

      <Pressable
        onPress={signInWithOtp}
        className="flex-row items-center justify-center rounded-lg bg-emerald-400 p-2"
      >
        <Text className="ml-1 text-xl font-medium">Sign in with Email</Text>
      </Pressable>
    </View>
  );
}
