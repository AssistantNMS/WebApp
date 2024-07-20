import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default [
  { files: ["**/*.{ts,tsx}"] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  {
    rules: {
      'react/display-name': "off",
      '@typescript-eslint/no-namespace': "off",
      '@typescript-eslint/no-var-requires': "off",
      '@typescript-eslint/no-explicit-any': "off", // Create React App does not want this on, don't know what is going on
    }
  }
];