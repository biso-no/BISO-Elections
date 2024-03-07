import type { TabsContentProps } from "tamagui";
import { useState } from "react";
import { Image } from "expo-image";
import {
  Button,
  H5,
  isWeb,
  Separator,
  SizableText,
  Tabs,
  XStack,
  YStack,
} from "tamagui";

import { Carousel } from "./carousel";

const dummyNews = [
  {
    id: 1,
    title: "The quick, brown fox jumps over a lazy dog",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "https://picsum.photos/200/300",
  },
  {
    id: 2,
    title: "The quick, brown fox jumps over a lazy dog",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "https://picsum.photos/200/300",
  },
];

const dummyInstaPosts = [
  {
    id: 1,
    title: "The quick, brown fox jumps over a lazy dog",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "https://picsum.photos/200/300",
  },
  {
    id: 2,
    title: "The quick, brown fox jumps over a lazy dog",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "https://picsum.photos/200/300",
  },
];

export function Feed() {
  const tabs = ["News", "Instagram", "Facebook"];

  return (
    <YStack top={10}>
      <H5>Feed</H5>
      <Tabs
        defaultValue="tab1"
        orientation="horizontal"
        flexDirection="column"
        height={300}
        width="100%"
        borderRadius="$4"
        borderWidth="$0.25"
        overflow="hidden"
        borderColor="$borderColor"
      >
        <Tabs.List
          separator={<Separator vertical />}
          disablePassBorderRadius="bottom"
          aria-label="Manage your account"
        >
          {tabs.map((tab) => (
            <Tabs.Tab key={tab} flex={1} value={tab}>
              <SizableText fontFamily="$body">{tab}</SizableText>
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <Separator />
        <Tabs.Content value="tab1">
          <H5>News feed</H5>
        </Tabs.Content>
        <Tabs.Content value="tab2">
          <H5>Instafeed</H5>
        </Tabs.Content>
        <Tabs.Content value="tab3">
          <H5>Facebook feed</H5>
        </Tabs.Content>
      </Tabs>
    </YStack>
  );
}
