import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "home" },
  ],
  title: 'EasyViewing',
  mfsu: {},
  hash: true,
  npmClient: 'pnpm',
});
