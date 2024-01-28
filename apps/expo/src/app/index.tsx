import React from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Link, Stack } from "expo-router";

import { Button, Input, Text, View, YStack } from "@acme/ui";

import type { RouterOutputs } from "../utils/api";
import { HomeScreen } from "~/components/home/home-screen";
import { api } from "../utils/api";

export default function Screen() {
  return <HomeScreen />;
}
