const { exec } = require('child_process');

function runPythonScraper(updatedString) {
  return new Promise((resolve, reject) => {
    const command = `python scraper.py ${updatedString}`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      if (stderr) {
        reject(stderr);
        return;
      }

      resolve(stdout);
    });
  });
}

module.exports = runPythonScraper;