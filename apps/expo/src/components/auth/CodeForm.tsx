import { useState } from "react";
import { Alert } from "react-native";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button, Card, Input, Text, View } from "tamagui";

export function CodeForm({ email }: { email: string }) {
  const supabase = useSupabaseClient();

  const [code, setCode] = useState("");

  const verifyCode = async () => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });
    if (error) Alert.alert("Error", error.message);
  };

  return (
    <View>
      <Text>Sign In</Text>
      <Input
        placeholderTextColor="#A1A1A9" // zinc-400
        value={code}
        autoCapitalize="none"
        onChangeText={setCode}
        placeholder="Code"
      />
      <Button onPress={verifyCode}>Verify</Button>
    </View>
  );
}
