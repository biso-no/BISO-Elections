import type { CardProps, ThemeName } from "tamagui";
import { ArrowUpRight } from "@tamagui/lucide-icons";
import { Button, Card, H6, Paragraph, Theme, XStack } from "tamagui";

export type EventCardTypes = {
  title?: string;
  description?: string;
  onPress?: () => void;
  text?: string;
  tags?: { text: string; theme: ThemeName }[];
} & CardProps;

export const EventCard = ({
  title,
  description,
  onPress,
  tags = [],
  ...props
}: EventCardTypes) => {
  return (
    <Card gap="$2" padded borderRadius="$0" chromeless {...props}>
      <XStack gap="$2">
        <H6 size="$5" textTransform="capitalize">
          {title}
        </H6>
        {tags.map((tag) => (
          <Theme key={tag.text} name={tag.theme}>
            <Button size="$1" px="$2" br="$10" disabled>
              {tag.text}
            </Button>
          </Theme>
        ))}
      </XStack>
      <XStack gap="$1" ai="center">
        <Paragraph>{description}</Paragraph>
      </XStack>

      {onPress && (
        <Button
          iconAfter={ArrowUpRight}
          size="$2"
          als="flex-end"
          onPress={onPress}
        >
          View
        </Button>
      )}
    </Card>
  );
};
