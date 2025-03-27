import { createAuthClient } from "better-auth/react";

import { BASE_URL } from "~/constant/env";

export const authClient = createAuthClient({
  /** the base url of the server (optional if you're using the same domain) */
  baseURL: import.meta.env.DEV ? "http://localhost:5173" : BASE_URL,
});
