import { adminAuthClient } from "../index";

export const inviteVoters = async (emails: string[]) => {
  for (const email of emails) {
    const { error, data } = await adminAuthClient.inviteUserByEmail(email);
    if (error) {
      console.error("Error inviting user:", error);
    }
    if (data.user) {
      const { data: updateUserData, error: updateUserError } =
        await adminAuthClient.updateUserById(data.user.id, {
          app_metadata: {
            roles: ["election_participant"],
          },
        });
      if (updateUserError) {
        console.error("Error updating user:", updateUserError);
      }
    }
  }
};

export const changeRole = async (userId: string, role: string) => {
  const { data, error } = await adminAuthClient.updateUserById(userId, {
    app_metadata: {
      roles: [role],
    },
  });
  if (error) {
    console.error("Error changing user role:", error);
  }
  return data;
};
