import Link from "next/link";

import { Avatar, AvatarImage } from "~/components/ui/avatar";

export function Header() {
  return (
    <header className="bg-[#F9FAFB] px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <BikeIcon className="h-8 w-8" />
          <nav className="flex space-x-4">
            <Link className="font-semibold text-blue-600" href="#">
              Dashboard
            </Link>
            <Link className="text-gray-600" href="#">
              Newsletters
            </Link>
            <Link className="text-gray-600" href="#">
              Subscribers
            </Link>
            <Link className="text-gray-600" href="#">
              Reports
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <SearchIcon className="h-6 w-6 text-gray-500" />
          <BellIcon className="h-6 w-6 text-gray-500" />
          <CircleIcon className="h-6 w-6 text-gray-500" />
          <Avatar>
            <AvatarImage
              alt="User avatar"
              src="/placeholder.svg?height=32&width=32"
            />
          </Avatar>
        </div>
      </div>
    </header>
  );
}

function BellIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function BikeIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="18.5" cy="17.5" r="3.5" />
      <circle cx="5.5" cy="17.5" r="3.5" />
      <circle cx="15" cy="5" r="1" />
      <path d="M12 17.5V14l-3-3 4-3 2 3h2" />
    </svg>
  );
}

function CircleIcon(props: React.SVGProps<SVGSVGElement>) {
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
    </svg>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
