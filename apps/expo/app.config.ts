import type { ExpoConfig } from "@expo/config";

/*
if (
  !process.env.EXPO_PUBLIC_SUPABASE_URL ||
  !process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
) {
  throw new Error(
    "Please provide SUPABASE_URL and SUPABASE_ANON_KEY in your .env file",
  );
}
*/
const defineConfig = (): ExpoConfig => ({
  name: "bisodev",
  slug: "bisodev",
  scheme: "bisodev",
  version: "0.1.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "dark",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#18181A",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "com.biso.dev",
    supportsTablet: true,
    usesAppleSignIn: true,
  },
  android: {
    package: "com.biso.dev",
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#18181A",
    },
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: "917fffac-6399-4a38-9c67-63381bf19b89",
    },
  },
  plugins: [
    "./expo-plugins/with-modify-gradle.js",
    "expo-apple-authentication",
  ],
});

export default defineConfig;
