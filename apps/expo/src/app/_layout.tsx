import React, { Suspense, useEffect } from "react";
import { useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { TamaguiProvider, Text, Theme } from "tamagui";

import { config } from "~/tamagui.config";
import { TRPCProvider } from "../utils/api";
import { supabase } from "../utils/supabase";

SplashScreen.preventAutoHideAsync();
// This is the main layout of the app
// It wraps your pages with the providers they need

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <TRPCProvider>
        <TamaguiProvider config={config}>
          <Suspense fallback={<Text>Loading...</Text>}>
            <Theme name={colorScheme}>
              <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
              >
                {/*
                 * The Stack component displays the current page.
                 * It also allows you to configure your screens
                 */}
                <Stack>
                  {/*
                   * Present the profile screen as a modal
                   * @see https://expo.github.io/router/docs/guides/modals
                   */}
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                </Stack>
                <StatusBar />
              </ThemeProvider>
            </Theme>
          </Suspense>
        </TamaguiProvider>
      </TRPCProvider>
    </SessionContextProvider>
  );
}
