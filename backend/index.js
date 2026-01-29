import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import initRepo from "./controllers/init.js";
import addFile from "./controllers/add.js";
import pull from "./controllers/pull.js";
import push from "./controllers/push.js";
import commitChanges from "./controllers/commit.js";
import revert from "./controllers/revert.js";

yargs(hideBin(process.argv))
  .command("init", "Initialize the new repository", {}, initRepo)
  .command(
    "add <file>",
    "Add a file to the repository",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to add to the staging area",
        type: "string",
      });
    },
    (argv) => {
      addFile(argv.file);
    },
  )
  .command(
    "commit <message>",
    "Commit the changes",
    (yargs) => {
      yargs.positional("message", {
        describe: "Commit message",
        type: "string",
      });
    },
    (argv) => {
      commitChanges(argv.message);
    },
  )
  .command("push", "Push the files to S3", {}, push)
  .command("pull", "Pull the commits from S3", {}, pull)
  .command(
    "revert <commitID>",
    "Revert the changes",
    (yargs) => {
      yargs.positional("commitID", {
        describe: "Comit ID to revert to",
        type: "string",
      });
    },
    revert,
  )
  .demandCommand(1, "You need atleast one command")
  .help().argv;
