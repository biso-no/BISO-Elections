import { novu } from "../../../index";

export const createSubscriber = async (subscriberId: string) => {
  const subscriber = await novu.subscribers.identify(subscriberId, {});
  return subscriber;
};

export const assignDeviceToken = async (
  subscriberId: string,
  deviceToken: string,
) => {
  const subscriber = await novu.subscribers.setCredentials(
    subscriberId,
    "expo-push-2EaCEkjHf",
    {
      deviceTokens: [deviceToken],
    },
  );
  return subscriber;
};
