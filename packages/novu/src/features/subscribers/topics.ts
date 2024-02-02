import { novu } from "../../../index";

export const assignBisoMember = async (subscriberId: string) => {
  const subscribers = [subscriberId];

  const subscriber = await novu.topics.addSubscribers("news-members", {
    subscribers,
  });

  return subscriber;
};
