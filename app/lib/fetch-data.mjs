import path from "path";
import fs from "fs";

const GITHUB_API_REPO =
  "https://raw.githubusercontent.com/iv4n89/free_learning_resources/refs/heads/main/resources.json";

(async () => {
  const response = await fetch(GITHUB_API_REPO);
  const data = await response.json();
  const filePath = path.join("data.json");
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
})();
