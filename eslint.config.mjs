import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});
const eslintConfig = [
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "next/typescript",
      "prettier",
      "next",
      "plugin:import/recommended",
      "plugin:import/typescript",
    ],
    plugins: ["import"],
    // Rules of format the code you can add more from here https://eslint.org/docs/latest/rules
    rules: {
      semi: ["error"],
      quotes: ["error", "double", { allowTemplateLiterals: true }],
      "prefer-arrow-callback": ["error"],
      "prefer-template": ["error"],
      "no-multi-spaces": ["error", { ignoreEOLComments: true }],
      "no-multiple-empty-lines": [
        "error",
        {
          max: 1, // allow only one blank line
          maxEOF: 0, // no blank lines at end of file
          maxBOF: 0, // no blank lines at beginning of file
        },
      ],
      "import/order": [
        "error",
        {
          alphabetize: { order: "asc", caseInsensitive: true },
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always",
        },
      ],
    },
  }),
];
export default eslintConfig;
