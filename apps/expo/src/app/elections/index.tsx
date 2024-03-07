import { YStack } from "tamagui";

import { MyStack } from "~/components/MyStack";
import { ActiveElections } from "~/components/services/elections/active-elections";
import { ElectionHistory } from "~/components/services/elections/election-history";
import { NotStartedElections } from "~/components/services/elections/not-started-elections";
import { api } from "~/utils/api";

export default function Elections() {
  const { data: elections } = api.voter.all.useQuery();

  return (
    <MyStack>
      <ActiveElections elections={elections?.onGoingElections} />
      <NotStartedElections elections={elections?.notStartedElections} />
      <ElectionHistory elections={elections?.completedElections} />
    </MyStack>
  );
}
