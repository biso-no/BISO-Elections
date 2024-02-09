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
        applicationIdentifier={process.env.NOVU_APP_ID!}
        backendUrl={process.env.NOVU_API_URL}
        socketUrl={process.env.NOVU_SOCKET_URL}
      >
        {props.children}
      </DefaultNovuProvider>
    </>
  );
}
