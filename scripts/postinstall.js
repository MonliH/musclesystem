let fs = require("fs");
let child_process = require("child_process");

try {
  console.log("Running postinstall script...");
  process.chdir("./node_modules");

  // "use-ammojs": "git+https://github.com/Glavin001/use-ammojs.git",
  let exists = fs.existsSync("./use-ammojs");
  //console.info('oracle db exists: ' + exists);

  if (exists) {
    console.info("remove pervious");
    fs.rmdirSync("./use-ammojs", { force: true, recursive: true });
  }
  console.info("check out from github");
  child_process.execSync(
    "git clone https://github.com/Glavin001/use-ammojs.git --recurse-submodules"
  );
  process.chdir("./use-ammojs");

  console.info("installing...");
  child_process.exec("yarn", (err) => {
    if (err) {
      console.error("error during install: " + err.message);
    } else {
      console.info("postinstall complete.");
    }
  });
} catch (error) {
  console.error(
    "\n\x1b[41mError:\x1b[0m Could not complete the postinstall script."
  );
  console.error(error);
}
