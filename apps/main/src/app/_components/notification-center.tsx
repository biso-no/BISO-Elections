"use client";

import {
  NotificationBell,
  PopoverNotificationCenter,
} from "@novu/notification-center";

export function NotificationCenter() {
  return (
    <PopoverNotificationCenter colorScheme="light">
      {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
    </PopoverNotificationCenter>
  );
}
