import { defineConfig, Options } from "tsup";

export const tsup = defineConfig((options: Options) => ({
  name: "server",
  entry: ["src/index.ts", "src/client.ts"],
  format: ["esm", "cjs"],
  outDir: "dist",
  dts: true,
  sourcemap: true,
  clean: false,
  splitting: true,
  minify: true,
  ...options,
}));
