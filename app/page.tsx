import { getSession } from "./actions";
import Link from "next/link";

export default async function Home() {

  const user = await getSession();

  return (
    <>
      {/* <Hero /> */}
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">Next steps</h2>
        {/* {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}
        {user && <Link href="/pantry">Go to pantry</Link>}
      </main>
    </>
  );
}
