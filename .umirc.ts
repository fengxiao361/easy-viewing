import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "home" },
  ],
  outputPath: 'esy',
  publicPath: '/easy-viewing/esy/',
  title: 'EasyViewing',
  mfsu: {},
  hash: true,
  npmClient: 'pnpm',
  history: {
    type: 'hash',
  },
});
