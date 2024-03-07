import { useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button, Input, Text, View, YStack } from "tamagui";

import { MyStack } from "../MyStack";

export function EmailForm() {
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [phase, setPhase] = useState<"inputEmail" | "inputCode">("inputEmail");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    if (phase === "inputEmail") {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) {
        setError(error.message);
      } else {
        setPhase("inputCode");
        setError("");
      }
    } else if (phase === "inputCode") {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: "email",
      });
      if (error) {
        setError(error.message);
      } else {
        setError("Successfully signed in");
        router.push("/profile");
      }
    }
  };

  return (
    <View flex={1} justifyContent="center" alignItems="center" padding="$4">
      <Text size="$4" fontWeight="bold" marginBottom="$2">
        {phase === "inputEmail" ? "Sign In" : "Enter Code"}
      </Text>
      {phase === "inputEmail" && (
        <>
          <Input
            placeholder="Email Address"
            value={email}
            type="email"
            onChangeText={setEmail}
            width={200}
            marginBottom="$2"
          />
          {error && (
            <Text color="red" marginBottom="$2">
              {error}
            </Text>
          )}
          <Button onPress={handleLogin}>Send Magic Link</Button>
        </>
      )}
      {phase === "inputCode" && (
        <>
          <Input
            placeholder="Verification Code"
            value={code}
            onChangeText={setCode}
            width={200}
            marginBottom="$2"
          />
          {error && (
            <Text color="red" marginBottom="$2">
              {error}
            </Text>
          )}
          {/* This button would not be used in a real-world scenario with Supabase's magic link auth. */}
          <Button onPress={handleLogin}>Verify Code</Button>
        </>
      )}
    </View>
  );
}
