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
    "[1m": "ansi-bold", // Bold style
    "[1;31m": "ansi-bold-red", // Bold red style,
    "[1;32m": "ansi-bold-green", // Bold green style
    "[1;33m": "ansi-bold-yellow", // Bold yellow style
    "[1;34m": "ansi-bold-blue", // Bold blue style
    "[1;35m": "ansi-bold-magenta", // Bold magenta style
    "[1;36m": "ansi-bold-cyan", // Bold cyan style
    "[1;37m": "ansi-bold-white", // Bold white style
  };

  let openTags = [];
  const regex = /(\x1b\[[0-9;]*m|[^\x1b]+)/g;

  return (
    input.replace(regex, (match) => {
      if (ansiCodes[match]) {
        if (match === "[0m" || match === "[39m") {
          // Close all open tags on reset
          const closeAllTags = openTags
            .reverse()
            .map(() => "</span>")
            .join("");
          openTags = [];
          return closeAllTags;
        }

        // Open a new span
        openTags.push(ansiCodes[match]);
        return `<span class="${ansiCodes[match]}">`;
      } else {
        // Regular text, escape HTML entities
        return match
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/\^/g, "&#94;"); // Handle caret symbol
      }
    }) +
    openTags
      .reverse()
      .map(() => "</span>")
      .join("")
  ); // Close any remaining open tags
}

const FLOW_WING_LOCAL_STORAGE = {
  CODE_LOCAL_STORAGE_KEY: "code_flow_wing",
  INPUT_LOCAL_STORAGE_KEY: "input_flow_wing",
};
