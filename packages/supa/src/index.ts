import { adminAuthClient } from "../index";

export const inviteVoters = async (emails: string[]) => {
  for (const email of emails) {
    const { error } = await adminAuthClient.inviteUserByEmail(email);
    if (error) {
      console.error("Error inviting user:", error);
    }
  }
};
