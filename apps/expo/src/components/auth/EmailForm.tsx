import { useState } from "react";
import { Alert } from "react-native";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button, Card, Input, Text, View } from "tamagui";

import { CodeForm } from "./CodeForm";

export function EmailForm() {
  const supabase = useSupabaseClient();

  const [email, setEmail] = useState("");
  const [isVerifyCodeVisible, setIsVerifyCodeVisible] = useState(false);

  const signInWithEmail = async () => {
    const { error, data } = await supabase.auth.signInWithOtp({ email });
    if (error) Alert.alert("Error", error.message);
    console.log(data);
  };

  return (
    <View>
      {!isVerifyCodeVisible ? (
        <View>
          <Input
            placeholderTextColor="#A1A1A9" // zinc-400
            value={email}
            autoCapitalize="none"
            onChangeText={setEmail}
            placeholder="Email"
          />
          <Button onPress={signInWithEmail}>Sign in with email</Button>
          <Button onPress={() => setIsVerifyCodeVisible(true)}>
            Sign in with code
          </Button>
        </View>
      ) : (
        <CodeForm />
      )}
    </View>
  );
}
