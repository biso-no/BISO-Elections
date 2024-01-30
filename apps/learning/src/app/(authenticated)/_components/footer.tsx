import Image from "next/image";
import Link from "next/link";

import { Button } from "~/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-gray-800 py-8 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 md:grid-cols-4">
        <div>
          <Image
            alt="Logo"
            className="mb-4 h-10"
            height="40"
            src="/icon.png"
            style={{
              aspectRatio: "40/40",
              objectFit: "cover",
            }}
            width="40"
          />
          <p className="text-sm">Product</p>
          <ul className="mt-2 space-y-2 text-sm">
            <li>Features</li>
            <li>Pricing</li>
          </ul>
        </div>
        <div>
          <p className="text-sm">Resources</p>
          <ul className="mt-2 space-y-2 text-sm">
            <li>Blog</li>
            <li>User guides</li>
            <li>Webinars</li>
          </ul>
        </div>
        <div>
          <p className="text-sm">Company</p>
          <ul className="mt-2 space-y-2 text-sm">
            <li>About</li>
            <li>Join us</li>
          </ul>
        </div>
        <div>
          <p className="text-sm">Subscribe to our newsletter</p>
          <div className="mt-2">
            <input
              className="mr-2 rounded-md bg-gray-700 p-2 text-sm"
              placeholder="Enter your email"
              type="email"
            />
            <Button className="bg-blue-500">Subscribe</Button>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm">
        <select className="rounded-md bg-gray-700 p-2 text-white">
          <option>English</option>
          <option>Norwegian</option>
        </select>
        <div className="mt-4">
          <span>©Markus Heien</span>
          <span className="mx-2">|</span>
          <Link className="hover:underline" href="https://biso.no">
            BISO
          </Link>
          <span className="mx-2">|</span>
          <Link className="hover:underline" href="#">
            Terms
          </Link>
          <span className="mx-2">|</span>
          <Link className="hover:underline" href="#">
            Privacy
          </Link>
        </div>
        <div className="mt-4">
          <FacebookIcon className="inline-block h-6 w-6" />
          <InstagramIcon className="inline-block h-6 w-6" />
        </div>
      </div>
    </footer>
  );
}

function FacebookIcon(props: React.ComponentProps<"svg">) {
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

function InstagramIcon(props: React.ComponentProps<"svg">) {
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
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
