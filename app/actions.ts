"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


export const signOutAction = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    redirect("/error")
  }
  return redirect("/");

};

export const signInWithGoogleAuthAction = async () => {
  const supabase = await createClient();
  const origin = process.env.NEXT_PUBLIC_SITE_URL;

  console.log("Origin => ", origin)

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`
    }
  })

  if (data.url) {
    redirect(data.url)
  }

  if (error) {
    redirect("/error")
  }

  revalidatePath("/", "layout");
  redirect("/")

}

export async function getSession() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Error retrieving session:", error);
    return null;
  }

  return user; // Contains user info, access token, etc.
}

