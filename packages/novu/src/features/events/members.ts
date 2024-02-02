import { novu } from "../../../index";

interface IEvent {
  topic?: string;
  subscribers?: string[];
  title: string;
  description: string;
  href?: string;
}

export const triggerEvent = async (event: IEvent) => {
  const { topic, subscribers, title, description, href } = event;

  if (topic) {
    await novu.trigger("news-notifications-members", {
      to: [{ type: "topic", topicKey: topic }],
      payload: {},
    });
  } else if (subscribers) {
    await novu.trigger("news-members", {
      to: [{ type: "subscribers", subscriberIds: subscribers }],
      payload: {},
    });
  } else {
    await novu.trigger("news-members", {
      to: [{ type: "all" }],
      payload: {},
    });
  }
};
