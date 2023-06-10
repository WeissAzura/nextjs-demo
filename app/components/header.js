"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Dialog } from "@headlessui/react";
import { signIn, signOut } from "next-auth/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  return (
    <header className={"section-page bg-gray-100"}>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href={"/"} className="-m-1.5 p-1.5">
            <span className="sr-only">Wirtgen Group</span>
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/download_e97e5ed61d.svg`}
              alt={"logo"}
              className={"h-8 w-auto"}
              width={0}
              height={0}
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            href={"/"}
            className="text-sm font-medium leading-6 text-gray-900"
          >
            Home
          </Link>

          <Link
            href={"/news"}
            className="text-sm font-medium leading-6 text-gray-900"
          >
            News
          </Link>
          <Link
            href={"/customer-support"}
            className="text-sm font-medium leading-6 text-gray-900"
          >
            Customer Support
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            onClick={() => {
              status === "authenticated" ? signOut() : signIn();
            }}
            className="text-sm font-medium leading-6 text-gray-900"
          >
            {status === "authenticated" ? "Log out" : "Log in"}
          </button>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link
              href={"/"}
              className="-m-1.5 p-1.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Wirtgen Group</span>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/Vector_bd3dc6ce95.svg`}
                alt={"logo"}
                className={"h-8 w-auto"}
                width={32}
                height={32}
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  href={"/"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Home
                </Link>
                <Link
                  href={"/news"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-gray-900 hover:bg-gray-50"
                >
                  News
                </Link>
                <Link
                  href={"/customer-support"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Customer Support
                </Link>
              </div>
              <div className="py-6">
                <button
                  onClick={() => {
                    status === "authenticated" ? signOut() : signIn();
                    setMobileMenuOpen(false);
                  }}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {status === "authenticated" ? "Log out" : "Log in"}
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
