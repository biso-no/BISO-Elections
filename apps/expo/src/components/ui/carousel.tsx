import { useState } from "react";
import { View } from "react-native";
import { AnimatePresence } from "@tamagui/animate-presence";
import { ArrowLeft, ArrowRight } from "@tamagui/lucide-icons";
import { Button, H5, Image, styled, XStack, YStack } from "tamagui";

// @ts-ignore

import photo1 from "../../../assets/photo1.jpg";
// @ts-ignore

import photo2 from "../../../assets/photo2.jpg";
// @ts-ignore

import photo3 from "../../../assets/photo3.jpg";

export const images = [photo1, photo2, photo3].map((x) => x.src ?? x);
const GalleryItem = styled(YStack, {
  zIndex: 1,

  x: 0,

  opacity: 1,
  variants: {
    // 1 = right, 0 = nowhere, -1 = left

    going: {
      ":number": (going) => ({
        enterStyle: {
          x: going > 0 ? 1000 : -1000,

          opacity: 0,
        },

        exitStyle: {
          zIndex: 0,

          x: going < 0 ? 1000 : -1000,

          opacity: 0,
        },
      }),
    },
  } as const,
});
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;

  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};
export function Carousel() {
  const [[page, going], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);

  const paginate = (going: number) => {
    setPage([page + going, going]);
  };
  return (
    <YStack>
      <H5>Featured Events</H5>
      <XStack
        overflow="hidden"
        backgroundColor="#000"
        position="relative"
        height={200}
        top={10}
        borderRadius={16}
        width="100%"
        alignItems="center"
      >
        <AnimatePresence initial={false} custom={{ going }}>
          <GalleryItem key={page} animation="lazy" going={going} zIndex={1}>
            <Image
              source={{
                uri: images[imageIndex],
                width: 800,
                height: 200,
              }}
            />
          </GalleryItem>
        </AnimatePresence>
        <Button
          accessibilityLabel="Carousel left"
          icon={ArrowLeft}
          size="$5"
          position="absolute"
          left="$4"
          circular
          elevate
          onPress={() => paginate(-1)}
          zIndex={2}
        />

        <Button
          accessibilityLabel="Carousel right"
          icon={ArrowRight}
          size="$5"
          position="absolute"
          right="$4"
          circular
          elevate
          onPress={() => paginate(1)}
          zIndex={2}
        />
      </XStack>
    </YStack>
  );
}
