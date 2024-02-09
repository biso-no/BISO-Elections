import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function AlreadyVoted() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thank you for your vote!</CardTitle>
        <CardContent>
          <CardDescription className="text-center text-gray-500">
            The next session will begin shortly!
          </CardDescription>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
