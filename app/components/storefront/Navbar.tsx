import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBagIcon } from "lucide-react";
import { UserDropDown } from "./UserDropDown";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { redis } from "@/app/lib/redis";
import { Cart } from "@/app/lib/interfaces";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const cart: Cart | null = await redis.get(`cart-${user?.id}`);
  const total = cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <nav className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/">
          <h1 className="text-xl font-bold text-black lg:text-3xl cursor-pointer">
            Shoes<span className="text-primary">Anjor</span>
          </h1>
        </Link>
        <NavbarLinks />
      </div>
      <div className="flex items-center">
        {user ? (
          <>
            <Link href="/bag" className="group p-2 flex items-center mr-2">
              <ShoppingBagIcon className="size-6 text-gray-400 group-hover:text-gray-600" />
              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {total}
              </span>
            </Link>
            <UserDropDown
              email={user.email as string}
              name={user.given_name as string}
              userImage={
                user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
              }
            />
          </>
        ) : (
          <div className="md:flex md:flex-1 md:items-center md:justify-end md:space-x-2">
            <Button variant={"ghost"} asChild>
              <LoginLink>Sing In</LoginLink>
            </Button>
            <span className="h-6 w-px bg-gray-200"></span>
            <Button variant={"ghost"} asChild>
              <RegisterLink>Create Account</RegisterLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
