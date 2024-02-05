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
        applicationIdentifier="ZRR2BCecmAIx"
        backendUrl="https://api-vccocww.biso.no"
        socketUrl="https://ws-vccocww.biso.no"
      >
        {props.children}
      </DefaultNovuProvider>
    </>
  );
}
