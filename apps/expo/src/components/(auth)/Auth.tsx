import { Alert, Text, View } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { initiateAppleSignIn } from "~/utils/auth";
import { EmailForm } from "./EmailForm";

export function SignedOutView() {
  const supabase = useSupabaseClient();

  const signInWithApple = async () => {
    try {
      const { token, nonce } = await initiateAppleSignIn();
      const { error } = await supabase.auth.signInWithIdToken({
        provider: "apple",
        token,
        nonce,
      });
      if (error) return Alert.alert("Error", error.message);
    } catch (e) {
      if (typeof e === "object" && !!e && "code" in e) {
        if (e.code === "ERR_REQUEST_CANCELED") {
          // handle that the user canceled the sign-in flow
        } else {
          // handle other errors
        }
      } else {
        console.error("Unexpected error from Apple SignIn: ", e);
      }
    }
  };

  return (
    <View className="space-y-4">
      <Text className="mb-4 text-2xl font-bold text-zinc-200">Sign In</Text>

      {/* Email Sign In */}
      <EmailForm />

      <View className="relative mb-2 flex-row items-center justify-center border-b border-zinc-200 py-2">
        <Text className="absolute top-1/2 bg-zinc-800 px-2 text-lg text-zinc-200">
          or
        </Text>
      </View>

      {/* Sign in with Apple */}
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={8}
        onPress={signInWithApple}
        style={{ height: 40 }}
      />
    </View>
  );
}
