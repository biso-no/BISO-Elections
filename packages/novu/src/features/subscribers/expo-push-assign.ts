import { novu } from "../../../index";

export async function assignPushToken(subscriberId: string, token: string) {
  return await novu.subscribers.setCredentials(subscriberId, "expo", {
    deviceTokens: [token],
  });
}
