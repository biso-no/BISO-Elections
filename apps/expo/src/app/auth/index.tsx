import { useState } from "react";
import { Alert } from "react-native";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button, Card, Input, Text, View } from "tamagui";

import { EmailForm } from "~/components/auth/EmailForm";

export default function Auth() {
  const supabase = useSupabaseClient();

  return (
    <View>
      <EmailForm />
    </View>
  );
}
