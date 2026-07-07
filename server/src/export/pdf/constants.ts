import path from "path";

export const PDF = {
  PAGE_MARGIN: 40,

  FONT_PATH: path.join(
    process.cwd(),
    "assets",
    "fonts",
    "NotoSans-Regular.ttf"
  ),

  COLORS: {
    PRIMARY: "#2563EB",
    SUCCESS: "#16A34A",
    DANGER: "#DC2626",
    TEXT: "#1F2937",
    MUTED: "#6B7280",
    BORDER: "#E5E7EB",
  },

  FONT: {
    TITLE: 24,
    SUBTITLE: 16,
    TEXT: 11,
    SMALL: 9,
  },
};