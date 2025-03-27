import { auth } from "~/lib/auth.server";
import type { Route } from "./+types/home";
import { Auth } from "./AuthComponent";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const session = await auth.api.getSession(request);
  return { session };
};

export default function Home({ loaderData }: Route.ComponentProps) {
  const { session } = loaderData;

  return <Auth session={session} />;
}
