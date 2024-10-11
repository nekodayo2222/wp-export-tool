const fs = require("fs");
const srcDir = "./artifacts/json/posts/";
const destDir = "./artifacts/csv/posts/";
const headers = "id,title,link,categories";

async function main() {
  // read the directory
  const files = await fs.readdirSync(srcDir);
  // exclude .gitkeep file
  files.splice(files.indexOf(".gitkeep"), 1);
  // loop through each file
  files.forEach(async (file) => {
    // read the file
    const content = await fs.readFileSync(srcDir + file, "utf8");
    const data = JSON.parse(content);
    const csv = data.map((d) => {
      return `${d.id},${d.title.rendered},${d.link},${d.categories.join(";")}`;
    });
    // write to file
    fs.writeFileSync(
      destDir + file.replace(".json", ".csv"),
      headers + "\n" + csv.join("\n")
    );
  });
}

main();
