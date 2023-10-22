import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Web3ModalProvider from "~/contexts/Web3ModalProvider";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <Web3ModalProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Web3ModalProvider>
  );
};

export default api.withTRPC(MyApp);
