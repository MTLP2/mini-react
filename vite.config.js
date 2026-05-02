import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsx: "transform",
    jsxFactory: "Reacto.createElement",
    jsxFragment: "Reacto.Fragment",
  },
});
