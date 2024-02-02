import { useEffect } from "react";
import { Linking, Pressable, Text, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import { SignedOutView } from "~/components/(auth)/Auth";

WebBrowser.maybeCompleteAuthSession();

export default function Profile() {
  const user = useUser();
  const supabase = useSupabaseClient();

  useEffect(() => {
    const handleUrlRedirect = async (url: string) => {
      console.log("Received URL:", url);
      if (!url) return;

      // Extract the part after the '#'
      const fragment = url.split("#")[1];
      if (!fragment) return;

      // Convert the fragment into an object
      const params = new URLSearchParams(fragment);
      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token");

      if (
        typeof access_token !== "string" ||
        typeof refresh_token !== "string"
      ) {
        console.log(
          "An Error occurred. Email links are only valid for 1 click. Try requesting another link.",
        );

        return;
      }

      try {
        supabase.auth.onAuthStateChange((event, session) => {
          console.log(event, session);
        });

        const data = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });
        console.log("Data", data);
        return data;
      } catch (error) {
        console.error(error);
      }
    };

    Linking.getInitialURL()
      .then((url) => {
        if (url !== null) {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          handleUrlRedirect(url);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    const subscription = Linking.addEventListener("url", ({ url }) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      handleUrlRedirect(url);
    });

    return () => {
      subscription.remove();
    };
  }, [supabase.auth]);

  return (
    <View className="flex-1 bg-zinc-800 p-4">
      {user ? <SignedInView /> : <SignedOutView />}
    </View>
  );
}

function SignedInView() {
  const supabase = useSupabaseClient();
  const user = useUser();

  return (
    <View className="flex gap-4">
      <Text className="text-zinc-200">Signed in as {user?.email}</Text>
      <Pressable
        onPress={() => supabase.auth.signOut()}
        className="flex-row items-center justify-center gap-2 rounded-lg bg-zinc-200 p-2"
      >
        <Text className="text-xl font-semibold text-zinc-900">Sign out</Text>
      </Pressable>
    </View>
  );
}
