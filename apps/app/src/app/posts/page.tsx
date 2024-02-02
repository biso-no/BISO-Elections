import Link from "next/link";

import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export default function Component() {
  return (
    <main className="px-8 py-6">
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <Link href="/posts/create">
            <a className="text-blue-600">Create Post</a>
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Card className="bg-white shadow-sm">
            <CardContent>
              <NewspaperIcon className="h-6 w-6 text-pink-500" />
              <p className="mt-2 text-sm text-gray-500">Total newsletters</p>
              <p className="font-semibold">170 Newsletters</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent>
              <WorkflowIcon className="h-6 w-6 text-purple-500" />
              <p className="mt-2 text-sm text-gray-500">Lifecycle Analysis</p>
              <p className="font-semibold">4 Channels - 170 Posts</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent>
              <ContactIcon className="h-6 w-6 text-green-500" />
              <p className="mt-2 text-sm text-gray-500">Push Interactions</p>
              <p className="font-semibold">2 Channels - 56 Clicks</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent>
              <TypeIcon className="h-6 w-6 text-yellow-500" />
              <p className="mt-2 text-sm text-gray-500">Conversions</p>
              <p className="font-semibold">+57 Subscribers</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="mb-4 text-lg font-semibold">20 boards</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Recent Posts</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Author</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                <CheckCircleIcon className="mr-2 inline h-5 w-5 text-blue-500" />
                Join the recruitment day!
              </TableCell>
              <TableCell>2 hours ago</TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    alt="John Smith"
                    src="/placeholder.svg?height=32&width=32"
                  />
                </Avatar>
                John Smith
              </TableCell>
              <TableCell>
                <MoreVerticalIcon className="h-5 w-5 text-gray-500" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <MessageCircleIcon className="mr-2 inline h-5 w-5 text-red-500" />
                Winter Games is coming!
              </TableCell>
              <TableCell>Yesterday</TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    alt="Elizabeth Clark"
                    src="/placeholder.svg?height=32&width=32"
                  />
                </Avatar>
                Elizabeth Clark
              </TableCell>
              <TableCell>
                <MoreVerticalIcon className="h-5 w-5 text-gray-500" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <AlertCircleIcon className="mr-2 inline h-5 w-5 text-orange-500" />
                Make sure to sign up for Fadderullan!
              </TableCell>
              <TableCell>Dec 20, 2022</TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    alt="Ashley Watson"
                    src="/placeholder.svg?height=32&width=32"
                  />
                </Avatar>
                Ashley Watson
              </TableCell>
              <TableCell>
                <MoreVerticalIcon className="h-5 w-5 text-gray-500" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <InfoIcon className="mr-2 inline h-5 w-5 text-teal-500" />
                Fadderullan is closing up! Join the last day
              </TableCell>
              <TableCell>Dec 18, 2021</TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    alt="Richard Davis"
                    src="/placeholder.svg?height=32&width=32"
                  />
                </Avatar>
                Richard Davis
              </TableCell>
              <TableCell>
                <MoreVerticalIcon className="h-5 w-5 text-gray-500" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex space-x-1">
            <Button className="px-4 py-1" variant="outline">
              1
            </Button>
            <Button className="px-4 py-1" variant="outline">
              2
            </Button>
            <Button className="px-4 py-1" variant="outline">
              ...
            </Button>
            <Button className="px-4 py-1" variant="outline">
              10
            </Button>
          </div>
          <ChevronLeftIcon className="h-6 w-6 text-gray-500" />
        </div>
      </div>
    </main>
  );
}

function AlertCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ContactIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <circle cx="12" cy="10" r="2" />
      <line x1="8" x2="8" y1="2" y2="4" />
      <line x1="16" x2="16" y1="2" y2="4" />
    </svg>
  );
}

function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function MessageCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
    </svg>
  );
}

function MoreVerticalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}

function NewspaperIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8" />
      <path d="M15 18h-5" />
      <path d="M10 6h8v4h-8V6Z" />
    </svg>
  );
}

function TypeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" x2="15" y1="20" y2="20" />
      <line x1="12" x2="12" y1="4" y2="20" />
    </svg>
  );
}

function WorkflowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="8" x="3" y="3" rx="2" />
      <path d="M7 11v4a2 2 0 0 0 2 2h4" />
      <rect width="8" height="8" x="13" y="13" rx="2" />
    </svg>
  );
}
