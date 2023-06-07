import { defineConfig } from "umi";

const { NODE_ENV } = process.env;
const isEnv = NODE_ENV == 'development' ? false : true
export default defineConfig({
  routes: [
    { path: '/', redirect: '/home' },
    { path: "/home", component: "home" },
  ],
  publicPath: isEnv ? './' : '/',
  title: 'EasyViewing',
  mfsu: {},
  hash: true,
  npmClient: 'pnpm',
  history: {
    type: 'hash',
  },
});
