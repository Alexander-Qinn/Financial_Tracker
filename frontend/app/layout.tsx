import type { Metadata } from "next";

import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Financial OS",
  description: "Personal finance dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
