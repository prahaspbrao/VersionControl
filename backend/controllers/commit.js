import fs from "fs/promises";
import path from "path";
import { v4 } from "uuid";

async function commitChanges(message) {
  const repoPath = path.resolve(process.cwd(), ".myGit");
  const stagedPath = path.join(repoPath, "staging");
  const commitPath = path.join(repoPath, "commits");

  try {
    const commitID = v4();
    const commitDir = path.join(commitPath, commitID);
    await fs.mkdir(commitDir, { recursive: true });

    const files = await fs.readdir(stagedPath);

    for (const file of files) {
      await fs.copyFile(
        path.join(stagedPath, file),
        path.join(commitDir, file),
      );
    }

    await fs.writeFile(
      path.join(commitDir, "commit.json"),
      JSON.stringify({ message, date: new Date().toISOString() }),
    );

    console.log(`Commit ${commitID} created with message`);
    
  } catch (error) {
    console.error("Error committing files : ", error);
  }
}

export default commitChanges;
