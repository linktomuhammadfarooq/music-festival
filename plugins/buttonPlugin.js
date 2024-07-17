const plugin = require("tailwindcss/plugin");
const {
  default: lightOrDarkColor,
  default: lightOrdarkColor,
} = require("@check-light-or-dark/color");

const buttonPlugin = plugin(function ({
  addComponents,
  matchComponents,
  theme,
}) {
  let k = "inherit";
  console.log("theme", theme("colors")[k]);
  addComponents({
    ".btn": {
      display: "inline-block",
      fontWeight: "bold",
      cursor: "pointer",
      padding: `${theme("spacing.2")} ${theme("spacing.4")}`,
      borderRadius: theme("borderRadius.lg"),
    },
  });

  for (let key in theme("colors")) {
    if (typeof theme("colors")[key] !== "string") {
      for (let shade in theme("colors")[key]) {
        const colorType = lightOrdarkColor(theme("colors")[key][shade]);
        console.log("colorstype - shade ", colorType, shade);
        addComponents({
          [`.btn-${key}-${shade}`]: {
            backgroundColor: theme("colors")[key][shade],
            color: colorType === "dark" ? "white" : "black",
          },
        });
      }
    }
  }

  matchComponents({
    btn: (value) => {
      return {
        backgroundColor: value,
        color: lightOrDarkColor(value) ? "white" : "black",
      };
    },
  });
});

module.exports = buttonPlugin;
