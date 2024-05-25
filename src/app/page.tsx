import signIn from "@/actions/SignIn"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function Example() {
  const supabase = createClient()
  const isLoggedIn = await supabase.auth.getUser()
  if (isLoggedIn) {
    redirect("/dashboard")
  }

  return (
    <div className="h-full ">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            DanceDex Lorem ipsum dolor sit amet consectetur adipisicing elit
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-200">
            Avec DanceDex, vous pouvez enregistrer vous passes et les retrouver plus tard.

          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <form action={signIn}>
              <Button >Connecte toi avec google</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
