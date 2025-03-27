import { auth } from "~/lib/auth.server";
import { Welcome } from "../welcome/welcome";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  if (
    !(email && typeof email === "string") ||
    !(password && typeof password === "string")
  ) {
    throw new Error("Invalid email or password");
  }

  const response = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
    asResponse: true, // returns a response object instead of data
  });
  return response;
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  return null;
};

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Welcome />;
}
