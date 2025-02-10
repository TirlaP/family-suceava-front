import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable errors for unescaped entities in JSX.
      "react/no-unescaped-entities": "off",
      // Change unused variables to warnings.
      "@typescript-eslint/no-unused-vars": "off",
      // Optionally, disable explicit any rule (not recommended long-term)
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off"
    },
  },
];

export default eslintConfig;
