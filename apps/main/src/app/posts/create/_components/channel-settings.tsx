"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";

interface Channel {
  id: number;
  name: string;
}

interface ChannelSetting {
  id: number;
  name: "push" | "email";
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

  const { register } = useFormContext();

  const [selectedChannels, setSelectedChannels] = useState<Channel[]>([]);
  const [selectedSettings, setSelectedSettings] = useState<ChannelSetting[]>(
    [],
  );

  useEffect(() => {
    if (selectedChannels.length === 0) {
      setSelectedSettings([]);
    }
  }, [selectedChannels]);

  const handleChannelClick = (channel: Channel) => {
    if (selectedChannels.some((c) => c.id === channel.id)) {
      setSelectedChannels(selectedChannels.filter((c) => c.id !== channel.id));
    } else {
      setSelectedChannels([...selectedChannels, channel]);
    }
  };

  const handleSettingClick = (setting: ChannelSetting) => {
    if (selectedSettings.some((s) => s.id === setting.id)) {
      setSelectedSettings(selectedSettings.filter((s) => s.id !== setting.id));
    } else {
      setSelectedSettings([...selectedSettings, setting]);
    }
  };

  //Render 2 checkboxes. One for push notifications and one for email.
  //When a checkbox is selected, render the channels for that setting.
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Channel Settings</h2>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <Checkbox
            checked={selectedSettings.some((s) => s.name === "push")}
            onCheckedChange={() => handleSettingClick({ id: 1, name: "push" })}
          />
          <Label>Push notifications</Label>
        </div>
        <div className="flex items-center space-x-4">
          <Checkbox
            checked={selectedSettings.some((s) => s.name === "email")}
            onCheckedChange={() => handleSettingClick({ id: 2, name: "email" })}
          />
          <Label>Email</Label>
        </div>
      </div>
      <h2 className="mb-4 mt-6 text-xl font-bold">Channels</h2>
      <div className="flex flex-col space-y-4">
        {selectedSettings.some((s) => s.name === "push") && (
          <div className="flex flex-col space-y-4">
            <Label>Push notifications</Label>
            {channels.pushNotification.map((channel) => (
              <div className="flex items-center space-x-4" key={channel.id}>
                <Checkbox
                  checked={selectedChannels.some((c) => c.id === channel.id)}
                />
                <Label>{channel.name}</Label>
              </div>
            ))}
          </div>
        )}
        {selectedSettings.some((s) => s.name === "email") && (
          <div className="flex flex-col space-y-4">
            <Label>Email</Label>
            {channels.email.map((channel) => (
              <div className="flex items-center space-x-4" key={channel.id}>
                <Checkbox
                  checked={selectedChannels.some((c) => c.id === channel.id)}
                  onCheckedChange={() => handleChannelClick(channel)}
                />
                <Label>{channel.name}</Label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
