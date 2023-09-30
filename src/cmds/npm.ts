import shell from "shelljs";
import { Spinner } from "cli-spinner";
import { CliOptions } from "../index.js";
import chalk from "chalk";

export function npm(options: CliOptions, CURR_DIR: string) {
  const spinner = new Spinner("%s Installing dependencies...");
  spinner.setSpinnerString(18);
  spinner.start();
  shell.exec("npm install", { silent: true }, (code) => {
    if (code !== 0) {
      console.log("npm install failed");
      return;
    }
    spinner.stop(true);
    console.log(
      chalk.green("Success! ") +
        "Created " +
        options.projectName +
        " at " +
        CURR_DIR +
        `/${options.projectName}`
    );
  });
}
