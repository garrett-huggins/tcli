// rewrite package.json package name
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const TEMPLATES = fs.readdirSync(path.join(__dirname, "..", "..", "templates"));

// get files from templates
const getTemplateFile = (templatePath: string) => {
  // get path of template
  const templateFile = path.join(
    __dirname,
    "..",
    "..",
    "templates",
    templatePath
  );
  return templateFile;
};

// get package.json from templates
const getPackageJson = (templatePath: string) => {
  const packageJson = fs.readFileSync(`${templatePath}/package.json`, "utf8");
  return packageJson;
};

// rewrite package.json package name for each template
const rewritePackageJson = (templatePath: string) => {
  const packageJson = getPackageJson(templatePath);
  const newPackageJson = packageJson.replace(
    /"name": ".*"/g,
    `"name": "<%= projectName %>"`
  );
  return newPackageJson;
};

TEMPLATES.forEach((templatePath) => {
  const templateFile = getTemplateFile(templatePath);
  const newPackageJson = rewritePackageJson(templateFile);
  fs.writeFileSync(`${templateFile}/package.json`, newPackageJson, "utf8");
});
