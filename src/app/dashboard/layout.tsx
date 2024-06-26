import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import NavBar from "./_components/navbar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    redirect("/");
  }
  return (
    <html lang="fr">
      <body>
        <NavBar user={data.user} />
        {children}
      </body>
    </html>
  );
}
