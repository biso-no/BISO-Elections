import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { YStack } from "tamagui";

import { EmailForm } from "~/components/auth/EmailForm";

export default function Auth() {
  const supabase = useSupabaseClient();

  return <EmailForm />;
}
