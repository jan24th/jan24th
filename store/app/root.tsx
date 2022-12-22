import type { LinksFunction, MetaFunction } from "@remix-run/server-runtime";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, } from "@remix-run/react";
import tailwindStylesheetUrl from "~/styles/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStylesheetUrl },
];
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
    <head>
      <Meta/>
      <Links/>
    </head>
    <body>
    <Outlet/>
    <ScrollRestoration/>
    <Scripts/>
    <LiveReload/>
    </body>
    </html>
  );
}
