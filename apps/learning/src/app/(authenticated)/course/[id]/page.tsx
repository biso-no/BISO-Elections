/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Yz8seFkbkSr
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Image from "next/image";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { VideoPlayer } from "../../_components/video-player";

export default function Component() {
  return (
    <div>
      <main className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <h1 className="text-3xl font-bold text-gray-900">
              UI Design, A User-Centered Approach
            </h1>
            <div className="mt-3 flex items-center">
              <Avatar>
                <AvatarImage alt="Kiara Weaver" src="/instructor.jpg" />
                <AvatarFallback>KW</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">
                  Kiara Weaver
                </div>
                <div className="mt-1 flex items-center">
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1 text-sm text-yellow-600">4.9</span>
                  <span className="ml-1 text-sm text-gray-500">
                    (1395 reviews)
                  </span>
                </div>
              </div>
            </div>
            <VideoPlayer videoUri="/video.mp4" />
            <div className="mt-6">
              <span className="w-full rounded-md bg-muted" />
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center">
                  <Button className="mr-2" variant="ghost">
                    Summary
                  </Button>
                  <Button className="mr-2" variant="ghost">
                    Discussion (50)
                  </Button>
                  <Button className="mr-2" variant="ghost">
                    Resources & documents
                  </Button>
                  <Button variant="ghost">Transcript</Button>
                </div>
                <div className="flex items-center">
                  <ThumbsUpIcon className="mr-2 h-6 w-6 text-gray-400" />
                  <ShareIcon className="mr-2 h-6 w-6 text-gray-400" />
                  <BookmarkIcon className="h-6 w-6 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage alt="Anna" src="/user-anna.jpg" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-900">
                    Anna <span className="text-xs text-gray-500">12:03 PM</span>
                  </p>
                  <p className="mt-1 text-sm text-gray-700">
                    Deserunt minim incididunt cillum nostrud do voluptate
                    excepteur excepteur minim ex minim est laborum labore.
                    Mollit commodo in do dolor ut in mollit sit esse nostrud
                    ipsum laboris incididunt nulla officia sunt minim. Nisi
                    dolore velit ea occaecat labore minim ea do.
                  </p>
                  <div className="mt-2 flex items-center">
                    <Button className="text-sm" variant="ghost">
                      Like
                    </Button>
                    <Button className="text-sm" variant="ghost">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-start space-x-4">
                <Avatar>
                  <AvatarImage alt="Kiara Weaver" src="/user-kiara.jpg" />
                  <AvatarFallback>KW</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-900">
                    Kiara Weaver{" "}
                    <span className="text-xs text-gray-500">08:20 AM</span>
                  </p>
                  <p className="mt-1 text-sm text-gray-700">
                    Deserunt minim incididunt cillum nostrud do voluptate
                    excepteur excepteur minim ex minim est laborum labore.
                    Mollit commodo in do dolor ut in mollit sit esse
                  </p>
                  <div className="mt-2 flex items-center">
                    <Button className="text-sm" variant="ghost">
                      Like
                    </Button>
                    <Button className="text-sm" variant="ghost">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-start space-x-4">
                <Avatar>
                  <AvatarImage alt="Lisa" src="/user-lisa.jpg" />
                  <AvatarFallback>L</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-900">
                    Lisa <span className="text-xs text-gray-500">10:50 AM</span>
                  </p>
                  <p className="mt-1 text-sm text-gray-700">
                    Ipsum reprehenderit nisi culpa qui commodo aliqua do officia
                    Lorem amet nisi nulla ullamco anim do ae amet eiusmod quis.
                    Voluptate eiusmod ipsum aliqua eu eiusmod dolore pariatur
                    est ullamco Lorem
                  </p>
                  <div className="mt-2 flex items-center">
                    <Button className="text-sm" variant="ghost">
                      Like
                    </Button>
                    <Button className="text-sm" variant="ghost">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
              <Button className="mt-4" variant="ghost">
                Show more discussion (47)
              </Button>
            </div>
          </div>
          <div>
            <div className="sticky top-8">
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900">
                  Sessions
                </h2>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">
                      01. Consectetur adipiscing elit
                    </span>
                    <CheckIcon className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">
                      02. Mollit voluptate adipisicing
                    </span>
                    <CheckIcon className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">
                      03. Officia pariatur Lorem sit
                    </span>
                    <CheckIcon className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between rounded-md bg-blue-100 p-2">
                    <span className="text-sm font-medium text-blue-700">
                      04. Voluptate adipisicing
                    </span>
                    <PlayIcon className="h-5 w-5 text-blue-700" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">
                      05. Exercitation elit incididunt esse
                    </span>
                    <LockIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">
                      06. Deserunt pariatur elusm
                    </span>
                    <LockIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Unlock Creativity</CardTitle>
                  <CardDescription>
                    Ut sit aute non mollit consequat consequat conse
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    alt="Unlock Creativity"
                    className="h-auto w-full"
                    src="/placeholder.png"
                    width={400}
                    height={225}
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="secondary">30% OFF</Badge>
                  <Button>View more</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function BookmarkIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function LockIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function ShareIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ThumbsUpIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
