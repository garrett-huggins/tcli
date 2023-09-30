import shell from "shelljs";
import { Spinner } from "cli-spinner";

export function npm() {
  const spinner = new Spinner("%s Installing dependencies...");
  spinner.setSpinnerString(18);
  spinner.start();
  shell.exec("npm install", { silent: true }, (code) => {
    if (code !== 0) {
      console.log("npm install failed");
      return;
    }
    spinner.stop(true);
    console.log("Dependencies installed successfully!");
  });
}
