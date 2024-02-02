import { TriggerRecipientsTypeEnum } from "@novu/node";

import { novu } from "../../../index";

export async function triggerTopicEvent(
  workflowId: string,
  topicKey: string,
  payload: {
    title: string;
    message: string;
  },
) {
  console.log("triggerTopicEvent", workflowId, topicKey, payload);
  return await novu.trigger(workflowId, {
    to: [{ type: TriggerRecipientsTypeEnum.TOPIC, topicKey: topicKey }],
    payload: payload,
  });
}

export async function triggerSubscriberEvent(
  workflowId: string,
  subscriberId: string,
  payload: {
    title: string;
    message: string;
  },
) {
  return await novu.trigger(workflowId, {
    to: {
      subscriberId: subscriberId,
    },
    payload: payload,
  });
}
