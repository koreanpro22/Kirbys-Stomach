import {
  signOutAction,
  signInWithGoogleAuthAction,
  getSession,
} from "@/app/actions";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function AuthButton() {
  const user = await getSession();

  return (
    <>
      {user ? (
        <>
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Home</Link>
            </div>
            <div className="flex items-center gap-4">
              Hello, {user?.email}!
              <form action={signOutAction}>
                <Button type="submit" variant={"outline"}>
                  Sign out
                </Button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full max-w-5xl flex justify-end items-center p-3 px-5 text-sm">
          <form action={signInWithGoogleAuthAction}>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Sign In
            </button>
          </form>
        </div>
      )}
    </>
  );
}
