import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { auth } from "@/auth";
import { logout } from "@/actions/user";

export const Header = async () => {
  const session = await auth();

  return (
    <header>
      <nav className="bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-primary">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/">Home</Link>
                {session?.user ? (
                  <>
                    <Button asChild>
                      <Link href="/notes">Start making notes</Link>
                    </Button>
                    <Button onClick={logout} variant="destructive">
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button asChild>
                    <Link href="/auth/signin">Login</Link>
                  </Button>
                )}
              </div>
            </div>

            <div className="-mr-2 flex md:hidden">
              <Sheet>
                <SheetTrigger>
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="flex flex-col w-[300px] sm:w-[400px]"
                >
                  <SheetHeader>
                    <SheetTitle>Header</SheetTitle>
                    <SheetDescription>Explore our sections</SheetDescription>
                  </SheetHeader>
                  <nav className="flex-grow px-2 pt-2 pb-3 space-y-2 sm:px-3">
                    <Link href="/">Home</Link>
                  </nav>
                  <SheetFooter className="sm:justify-start">
                    {session?.user ? (
                      <div className="flex flex-col w-full space-y-2">
                        <Button asChild>
                          <Link href="/notes">Start making notes</Link>
                        </Button>
                        <Button onClick={logout} variant="destructive">
                          Logout
                        </Button>
                      </div>
                    ) : (
                      <Button className="w-full" asChild>
                        <Link href="/auth/signin">Login</Link>
                      </Button>
                    )}
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
