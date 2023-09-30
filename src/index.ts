#!/usr/bin/env node

import fs from "fs";
import path, { dirname } from "path";
import inquirer from "inquirer";
import { fileURLToPath } from "url";
import ejs from "ejs";
import shell from "shelljs";
import cmds from "./cmds/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const CHOICES = fs.readdirSync(path.join(__dirname, "..", "templates"));

const QUESTIONS = [
  {
    name: "template",
    type: "list",
    message: "What project template would you like to generate?",
    choices: CHOICES,
  },
  {
    name: "name",
    type: "input",
    message: "Project name:",
    validate: (input: string) => {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return "Project name may only include letters, numbers, underscores and hashes.";
    },
  },
];

const CURR_DIR = process.cwd();

type postSetupPrompt = {
  question: string;
  type: "input" | "select";
  choices?: string[];
  default?: string;
  name: string;
};

export interface TemplateConfig {
  files?: string[];
  postMessage?: string;
  postSetup?: postSetupPrompt[];
}

export interface CliOptions {
  projectName: string;
  templateName: string;
  templatePath: string;
  tartgetPath: string;
  config: TemplateConfig;
}

inquirer.prompt(QUESTIONS).then((answers) => {
  const projectChoice = answers["template"];
  const projectName = answers["name"];
  const templatePath = path.join(__dirname, "..", "templates", projectChoice);
  const tartgetPath = path.join(CURR_DIR, projectName);
  const templateConfig = getTemplateConfig(templatePath);

  const options: CliOptions = {
    projectName,
    templateName: projectChoice,
    templatePath,
    tartgetPath,
    config: templateConfig,
  };

  if (!createProject(tartgetPath)) {
    return;
  }

  createDirectoryContents(templatePath, projectName);

  if (!postProcess(options)) {
    return;
  }

  handlePostProcess(options);
});

function createProject(projectPath: string) {
  if (fs.existsSync(projectPath)) {
    console.log(`Folder ${projectPath} exists. Delete or use another name.`);
    return false;
  }
  fs.mkdirSync(projectPath);
  return true;
}

const SKIP_FILES = ["node_modules", ".template.json"];

function createDirectoryContents(templatePath: string, projectName: string) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const origFilePath = path.join(templatePath, file);

    const stats = fs.statSync(origFilePath);

    if (SKIP_FILES.indexOf(file) > -1) return;

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, "utf8");

      const templateRender = ejs.render(contents, { projectName });

      const writePath = path.join(CURR_DIR, projectName, file);
      fs.writeFileSync(writePath, templateRender, "utf8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(path.join(CURR_DIR, projectName, file));

      createDirectoryContents(
        path.join(templatePath, file),
        path.join(projectName, file)
      );
    }
  });
}

function getTemplateConfig(templatePath: string): TemplateConfig {
  const configPath = path.join(templatePath, ".template.json");

  if (!fs.existsSync(configPath)) {
    return {};
  }

  const templateConfigContent = fs.readFileSync(configPath, "utf8");

  return JSON.parse(templateConfigContent);
}

function postProcess(options: CliOptions) {
  if (isNode(options)) {
    shell.cd(options.tartgetPath);
    if (!shell.which("npm")) {
      console.log("Sorry, this script requires npm");
      return false;
    } else {
      cmds.npm();
    }
  }
  return true;
}

function isNode(options: CliOptions) {
  return fs.existsSync(path.join(options.templatePath, "package.json"));
}

// handle post process events
function handlePostProcess(options: CliOptions) {
  if (options.config.postSetup) {
    const QUESTIONS = options.config.postSetup;
    inquirer.prompt(QUESTIONS).then((answers) => {
      // if (answers["shadcn"]) {
      //   cmds.shadcn();
      // }
    });
  }
  if (options.config.postMessage) {
    console.log(options.config.postMessage);
  }
}
