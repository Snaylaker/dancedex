import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "DanceDex",
  description: "Dance more",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="mx-auto w-11/12 font-sans antialiased ">
        <Toaster
          toastOptions={{
            style: {
              font: "inherit",
            },
          }}
          position="top-center"
          reverseOrder={false}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
