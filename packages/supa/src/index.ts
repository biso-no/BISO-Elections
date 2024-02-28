import { adminAuthClient } from "../index";

export const inviteVoter = async (email: string) => {
  const { error, data } = await adminAuthClient.inviteUserByEmail(email, {
    redirectTo: "http://localhost:3000/auth/callback",
  });
  if (error) {
    console.error("Error inviting user:", error);
  }
  if (data.user) {
    const { data: updateUserData, error: updateUserError } =
      await adminAuthClient.updateUserById(data.user.id, {
        app_metadata: {
          roles: ["user"],
        },
      });
    if (updateUserError) {
      console.error("Error updating user:", updateUserError);
    }
  }
  return { data, error };
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

export const isAdmin = (user: { app_metadata: { roles: string[] } }) => {
  return user.app_metadata.roles.includes("admin");
};
