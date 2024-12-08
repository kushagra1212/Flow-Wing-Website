function parseANSI(input) {
  const ansiCodes = {
    "[30m": "ansi-black",
    "[31m": "ansi-red",
    "[32m": "ansi-green",
    "[33m": "ansi-yellow",
    "[34m": "ansi-blue",
    "[35m": "ansi-magenta",
    "[36m": "ansi-cyan",
    "[37m": "ansi-white",
    "[39m": "ansi-reset",
    "[0m": "ansi-reset",
  };

  // Regex to match ANSI escape codes and other content
  const regex = /(\x1b\[[0-9;]*m|[^\x1b]*)/g;

  return input
    .replace(regex, (match) => {
      if (ansiCodes[match]) {
        return `<span class="${ansiCodes[match]}">`;
      } else {
        return match; // Return normal text as is
      }
    })
    .replace(/\x1b\[[0-9;]*m/g, "</span>"); // Close the span after each color code
}
