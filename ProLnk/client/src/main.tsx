// Suppress benign ResizeObserver loop notification — not a real error
if (typeof window !== "undefined") {
  const _resizeObserverErr = window.onerror;
  window.onerror = (msg, ...rest) => {
    if (typeof msg === "string" && msg.includes("ResizeObserver loop")) return true;
    return _resizeObserverErr ? _resizeObserverErr(msg, ...rest) : false;
  };
  const _origConsoleError = console.error.bind(console);
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("ResizeObserver loop")) return;
    _origConsoleError(...args);
  };
}

import { initSentry } from "@/lib/sentry";
import { initPostHog } from "@/lib/posthog";
import { trpc } from "@/lib/trpc";
import { HelmetProvider } from "react-helmet-async";

initSentry();
initPostHog();
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import { getLoginUrl } from "./const";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Item 59: Global staleTime — stable data cached for 2 minutes to reduce redundant requests
      staleTime: 2 * 60 * 1000,
      retry: (failureCount, error) => {
        if (error instanceof TRPCClientError && error.message === UNAUTHED_ERR_MSG) return false;
        return failureCount < 2;
      },
    },
  },
});

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  window.location.href = getLoginUrl();
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Mutation Error]", error);
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      fetch(input, init) {
        return globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        });
      },
    }),
  ],
});

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </trpc.Provider>
  </HelmetProvider>
);
