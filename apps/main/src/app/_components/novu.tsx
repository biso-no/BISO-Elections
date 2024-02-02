"use client";

import { NovuProvider as DefaultNovuProvider } from "@novu/notification-center";

import { api } from "~/trpc/react";

interface Props {
  children: React.ReactNode;
}

export function NovuProvider(props: Props) {
  const { data } = api.auth.me.useQuery();

  return (
    <>
      <DefaultNovuProvider
        subscriberId={data?.id}
        applicationIdentifier="WOTPhMCjY9sj"
        backendUrl="https://api-e04swc0.biso.no"
        socketUrl="https://ws-e04swc0.biso.no"
      >
        {props.children}
      </DefaultNovuProvider>
    </>
  );
}
