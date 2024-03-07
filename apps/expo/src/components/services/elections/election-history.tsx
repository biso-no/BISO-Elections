import { Card, H5, ListItem, SizableText, YStack } from "tamagui";

import type { RouterOutputs } from "~/utils/api";

interface ElectionHistory {
  elections?: RouterOutputs["voter"]["all"]["completedElections"];
}

export function ElectionHistory({ elections }: ElectionHistory) {
  if (!elections) return null;

  return (
    <YStack>
      <H5>History</H5>
      <YStack space="$2">
        {elections?.map((election) => (
          <Card key={election.id} width="100%" padding="$3" borderRadius="$4">
            <ListItem
              icon={() => <SizableText>{election.election.name}</SizableText>}
            />
          </Card>
        ))}
      </YStack>
    </YStack>
  );
}
