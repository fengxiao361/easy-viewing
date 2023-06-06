import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "home" },
  ],
  outputPath: 'esy',
  base: '/easy-viewing/esy/',
  publicPath: '/easy-viewing/esy/',
  title: 'EasyViewing',
  mfsu: {},
  hash: true,
  npmClient: 'pnpm',
});
