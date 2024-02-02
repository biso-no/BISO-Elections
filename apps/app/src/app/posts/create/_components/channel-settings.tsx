"use client";

import { useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";

interface Channel {
  id: number;
  name: string;
}

interface ChannelSetting {
  id: number;
  name: string;
}

export function ChannelSettings() {
  const channels = {
    pushNotification: [
      { id: 1, name: "Members" },
      { id: 2, name: "Non-members" },
      { id: 3, name: "Alumni" },
    ],
    email: [
      { id: 4, name: "Members" },
      { id: 5, name: "Non-members" },
      { id: 6, name: "Alumni" },
    ],
  };

  const [selectedChannels, setSelectedChannels] = useState<Channel[]>([]);
  const [selectedSettings, setSelectedSettings] = useState<string[]>([]);

  const handleSettingChange = (setting: string) => {
    if (selectedSettings.includes(setting)) {
      setSelectedSettings(selectedSettings.filter((s) => s !== setting));
    } else {
      setSelectedSettings([...selectedSettings, setting]);
    }
  };

  return (
    <div className="w-1/2 space-y-7 p-6">
      <h2 className="mb-4 text-lg font-bold">Channel Settings</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="push-notification"
            onChange={() => handleSettingChange("pushNotification")}
          />
          <Label className="text-sm font-medium" htmlFor="push-notification">
            Push Notification
          </Label>
        </div>
        {selectedSettings.includes("pushNotification") && (
          <div className="space-y-4">
            {channels.pushNotification.map((channel) => (
              <div key={channel.id} className="flex items-center space-x-2">
                <Checkbox
                  id={channel.name}
                  onChange={() =>
                    setSelectedChannels([...selectedChannels, channel])
                  }
                />
                <Label className="text-sm font-medium" htmlFor={channel.name}>
                  {channel.name}
                </Label>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Checkbox id="email" onChange={() => handleSettingChange("email")} />
          <Label className="text-sm font-medium" htmlFor="email">
            Email
          </Label>
        </div>
        {selectedSettings.includes("email") && (
          <div className="space-y-4">
            {channels.email.map((channel) => (
              <div key={channel.id} className="flex items-center space-x-2">
                <Checkbox
                  id={channel.name}
                  onChange={() =>
                    setSelectedChannels([...selectedChannels, channel])
                  }
                />
                <Label className="text-sm font-medium" htmlFor={channel.name}>
                  {channel.name}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <Button variant="default">Save</Button>
      </div>
    </div>
  );
}
