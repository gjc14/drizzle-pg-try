import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home/home.tsx"),
  route("/api/auth/*", "routes/auth.tsx"),
] satisfies RouteConfig;
