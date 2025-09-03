import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettierPlugin from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import react from "eslint-plugin-react";

export default [
  {
    ignores: ["dist"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parser: tseslint.parser,
      globals: globals.browser,
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier: prettierPlugin,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/jsx-no-target-blank": "off",
      "react/jsx-no-target-blank": "off",
      quotes: ["warn", "single"],
      "prettier/prettier": "warn",
      "no-multiple-empty-lines": "warn",
      "react/react-in-jsx-scope": "off",
      "simple-import-sort/exports": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-namespace": "warn",
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            ["^react", "^@?\\w"],
            ["^src", "^@/utils", "^@/hooks"],
            ["^\\."],
            ["^index"],
          ],
        },
      ],
    },
    settings: {
      "import/resolver": {
        typescript: {},
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
      react: {
        version: "detect",
      },
    },
  },
];
