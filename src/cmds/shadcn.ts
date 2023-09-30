import shell from "shelljs";
import fs from "fs";

export function shadcn() {
  // start spinner
  console.log("Adding react...");
  shell.exec("npx astro add react -y", { silent: true });
  console.log("Adding tailwindcss...");
  shell.exec("npx astro add tailwindcss -y", { silent: true });
  // get tsconfig.json
  const tsconfig = JSON.parse(fs.readFileSync("tsconfig.json", "utf8"));
  // add shadcn url paths
  tsconfig.compilerOptions = {
    baseUrl: ".",
    paths: {
      "@/*": ["src/*"],
    },
  };
  // write tsconfig.json
  fs.writeFileSync("tsconfig.json", JSON.stringify(tsconfig, null, 2));

  console.log("Adding shadcn...");
  const config = [
    {
      q: "Would you like to use TypeScript (recommended)?",
      a: "yes",
    },
    {
      q: "Which style would you like to use?",
      a: "Default",
    },
    { q: "Where is your global CSS file?", a: "./src/styles/globals.css" },
    { q: "Do you want to use CSS variables for colors?", a: "yes" },
    {
      q: "Where is your tailwind.config.js located?",
      a: "tailwind.config.cjs",
    },
    { q: "Configure the import alias for components:", a: "@/components" },
    { q: "Configure the import alias for utils:", a: "@/lib/utils" },
    { q: "Are you using React Server Components?", a: "no" },
  ];
  config.forEach((c) => {
    console.log(c.q, ": ", c.a);
  });
  shell.exec("npx shadcn-ui@latest init");
}
