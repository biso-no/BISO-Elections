import fs from "fs";
import path from "path";
import { createTransport } from "nodemailer";

import { adminAuthClient } from "../index";

const transporter = createTransport({
  host: "smtp-mail.outlook.com",
  port: 587, // Or 465 for SSL
  secure: false, // true for 465, false for other ports
  auth: {
    user: "app@biso.no", // Your email
    pass: "Kuz51521", // Your email account password or app-specific password
  },
});

const readTemplate = (fileName: string): string => {
  const filePath = path.join(process.cwd(), "public", "tmpl", fileName);
  return fs.readFileSync(filePath, "utf8");
};

interface EmailOptions {
  email: string;
}

export const sendInvitationEmail = async ({ email }: EmailOptions) => {
  let template = readTemplate("link.html");

  const { data, error } = await adminAuthClient.generateLink({
    type: "magiclink",
    email: email,
    options: {
      redirectTo: process.env.NEXT_PUBLIC_URL,
    },
  });

  // Replace placeholders with actual values
  template = template
    .replace("{{ .SiteURL }}", data.properties?.redirect_to ?? "")
    .replace("{{ .Email }}", data.user?.email ?? "")
    .replace("{{ .Token }}", data.properties?.email_otp ?? "");

  const mailOptions = {
    from: "app@biso.no",
    to: email,
    subject: "Welcome to BISO Election",
    html: template,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

export const inviteVoter = async (email: string) => {
  const { error, data } = await adminAuthClient.inviteUserByEmail(email, {
    redirectTo: process.env.NEXT_PUBLIC_URL,
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

export const sendInviteToExistingUser = async (email: string) => {
  const { error, data } = await adminAuthClient.inviteUserByEmail(email, {
    redirectTo: process.env.NEXT_PUBLIC_URL,
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
