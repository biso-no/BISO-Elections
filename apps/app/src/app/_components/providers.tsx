"use client";

import type { ReactNode } from "react";

import { ThemeProvider } from "~/components/theme-provider";
import { NovuProvider } from "./novu";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <NovuProvider>{children}</NovuProvider>
      </ThemeProvider>
    </>
  );
};
