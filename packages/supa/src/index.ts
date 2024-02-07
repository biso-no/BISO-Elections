import { adminAuthClient, databaseClient } from "../index";

export const inviteVoter = async (email: string) => {
  //Check if user exist, if not invite
  const user = await databaseClient
    .from("profile")
    .select("*")
    .eq("email", email);
  if (user.error) {
    console.error("error", user.error);
    throw new Error(user.error.message);
  }
  if (user.data.length === 0) {
    console.log("Inviting user");
    const { data, error } = await adminAuthClient.inviteUserByEmail(email);
    return { data, error };
  }
};
