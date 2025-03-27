import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { db } from "~/db/db.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const result = await db.execute("select 1");
  console.log(result);

  return {};
};

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Welcome />;
}
