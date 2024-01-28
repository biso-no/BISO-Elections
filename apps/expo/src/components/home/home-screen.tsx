import React from "react";
import { useRouter } from "expo-router";
import { ArrowRight } from "@tamagui/lucide-icons";

import {
  Banner,
  Button,
  EventCard,
  H4,
  isWeb,
  OverviewCard,
  Paragraph,
  ScrollView,
  Separator,
  Theme,
  TodoCard,
  useMedia,
  XStack,
  YStack,
} from "@acme/ui";

import { api } from "~/utils/api";

export function HomeScreen() {
  return (
    <XStack>
      <ScrollView f={3} fb={0}>
        <YStack gap="$6" pt="$5" pb="$8">
          <YStack gap="$8">
            <OverviewSection />
          </YStack>
        </YStack>
      </ScrollView>

      <Separator vertical />

      {isWeb && <EventCards />}
    </XStack>
  );
}

const events = [
  {
    title: "Event #1",
    description: "Lorem ipsum dolor sit, amet.",
    text: "Show Event",
    onPress: () => {},
    tags: [
      { text: "New", theme: "green_alt2" },
      { text: "Hot", theme: "orange_alt2" },
    ],
  },
  {
    title: "Event #2",
    description: "Lorem ipsum dolor sit, amet.",
    text: "Show Event",
    onPress: () => {},
    tags: [{ text: "1 Day Remaining", theme: "blue_alt2" }],
  },
  {
    title: "Event #3",
    description: "Lorem ipsum dolor sit, amet.",
    text: "Show Event",
    onPress: () => {},
    tags: [{ text: "Ongoing", theme: "alt1" }],
  },
  {
    title: "Event #4",
    description: "Lorem ipsum dolor sit, amet.",
    text: "Show Event",
    onPress: () => {},
    tags: [{ text: "Finished", theme: "alt2" }],
  },
];

const EventCards = () => {
  const router = useRouter();

  return (
    <ScrollView f={1} fb={0} $md={{ display: "none" }}>
      <YStack separator={<Separator />}>
        <YStack>
          {events.map((event, i) => (
            <EventCard
              key={i}
              title={event.title}
              description={event.description}
              onPress={event.onPress}
              text={event.text}
              tags={event.tags}
            />
          ))}
        </YStack>
        <YStack p="$3">
          <Theme name="blue_alt1">
            <Banner onPress={() => {}} cursor="pointer">
              <H4>Upgrade Now!</H4>
              <Paragraph size="$2" mt="$1">
                Upgrade to access exclusive features and more!
              </Paragraph>
            </Banner>
          </Theme>
        </YStack>
        <YStack>
          <TodoCard label="Contribute to OSS" checked={false} />
          <TodoCard
            label="Learn about Tamagui's latest features"
            checked={true}
          />
          <TodoCard label="Upgrade to the new Expo version" checked={false} />
          <TodoCard label="Do the dishes" checked={false} />
        </YStack>
      </YStack>
    </ScrollView>
  );
};

const OverviewSection = () => {
  return (
    <YStack gap="$4">
      <XStack px="$4.5" ai="center" gap="$2" jc="space-between" mb="$4">
        <H4 fontWeight="400">Overview</H4>
        <Theme name="alt2">
          <Button
            size="$2"
            chromeless
            onPress={() => {}}
            iconAfter={ArrowRight}
          >
            View All Stats
          </Button>
        </Theme>
      </XStack>

      <ScrollAdapt>
        <XStack
          flexWrap="wrap"
          ai="flex-start"
          jc="flex-start"
          px="$4"
          gap="$8"
          mb="$4"
        >
          <OverviewCard
            $gtMd={{ minWidth: 200, flex: 1, flexBasis: 0 }}
            $md={{ width: 150 }}
            title="MRR"
            value="$18,908"
            badgeText="+0.5%"
            badgeState="success"
          />

          <OverviewCard
            $gtMd={{ minWidth: 200, flex: 1, flexBasis: 0 }}
            $md={{ width: 150 }}
            title="ARR"
            value="$204,010"
            badgeText="+40.5%"
            badgeState="success"
          />

          <OverviewCard
            $gtMd={{ minWidth: 200, flex: 1, flexBasis: 0 }}
            $md={{ width: 150 }}
            title="Today's new users"
            value="4 Users"
            badgeText="+25%"
            badgeState="success"
          />

          <OverviewCard
            $gtMd={{ minWidth: 200, flex: 1, flexBasis: 0 }}
            $md={{ width: 150 }}
            title="Weekly Post Views"
            value="30,104"
            badgeText="-2%"
            badgeState="failure"
          />

          {/* <OverviewCard
              $gtMd={{ minWidth: 200, flex: 1, flexBasis: 0 }}
              $md={{ width: 150 }}
              title="This week's new users"
              value="14 Users"
              badgeText="-2%"
              badgeState="failure"
            />
  
            <OverviewCard
              $gtMd={{ minWidth: 200, flex: 1, flexBasis: 0 }}
              $md={{ width: 150 }}
              title="Monthly Post Views"
              value="150,104"
              badgeText="+1%"
              badgeState="success"
            /> */}
        </XStack>
      </ScrollAdapt>
    </YStack>
  );
};

function ScrollAdapt({ children }: { children: React.ReactNode }) {
  const { md } = useMedia();
  return md ? (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <>{children}</>
  );
}
