import css from "@eslint/css";
import js from "@eslint/js";
import markdown from "@eslint/markdown";
import angular from "angular-eslint";
import jsdoc from "eslint-plugin-jsdoc";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    ignores: ["**/dist/", "**/.angular/"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["**/*.{ts,mts,cts}"],
    plugins: {
      jsdoc,
    },
    extends: [
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      jsdoc.configs["flat/recommended-typescript-error"],
    ],
    rules: {
      "@typescript-eslint/array-type": [
        "error",
        {
          default: "generic",
        },
      ],
      "jsdoc/require-returns": ["error", { checkGetters: false }],
      "jsdoc/require-jsdoc": [
        "error",
        {
          contexts: [
            "TSInterfaceDeclaration",
            "TSMethodSignature",
            "TSPropertySignature",
            "PropertyDefinition",
          ],
          publicOnly: false,
          require: {
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: true,
            MethodDefinition: true,
          },
        },
      ],
      "jsdoc/require-description": [
        "error",
        {
          contexts: [
            "TSInterfaceDeclaration",
            "TSMethodSignature",
            "TSPropertySignature",
            "PropertyDefinition",
            "ClassDeclaration",
            "MethodDefinition",
          ],
          checkGetters: false,
        },
      ],
      "jsdoc/tag-lines": ["error", "any", { startLines: 1 }],
      "jsdoc/require-description-complete-sentence": "error",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ]
    },
  },
  {
    files: ["**/*.md"],
    plugins: { markdown },
    language: "markdown/commonmark",
    extends: ["markdown/recommended"],
  },
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
  },
  {
    files: ["./packages/angular-toolkit/**/src/**/*.ts"],
    ignores: ["**/*.spec.ts"],
    languageOptions: {
      parserOptions: {
        projectService: false,
        tsconfigRootDir: import.meta.dirname + "/packages/angular-toolkit/",
        project: "./tsconfig.json",
      },
    },
    extends: [...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/prefer-signals": "error",
      "@angular-eslint/prefer-output-readonly": "error",
      "@angular-eslint/prefer-signal-model": "error",
      "@angular-eslint/prefer-inject": "error",
      "@angular-eslint/prefer-output-emitter-ref": "error",
      "@angular-eslint/prefer-host-metadata-property": "error",
      "@angular-eslint/sort-keys-in-type-decorator": "error",
      "@angular-eslint/no-uncalled-signals": "error",
      "@angular-eslint/prefer-on-push-component-change-detection": "error",
    },
  },
  {
    files: ["./packages/angular-toolkit/**/src/**/*.html"],
    languageOptions: {
      parserOptions: {
        projectService: false,
        tsconfigRootDir: import.meta.dirname + "/packages/angular-toolkit/",
        project: "./tsconfig.json",
      },
    },
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      "@angular-eslint/template/prefer-control-flow": "error",
      "@angular-eslint/template/prefer-self-closing-tags": "error",
      "@angular-eslint/template/conditional-complexity": "error",
      "@angular-eslint/template/attributes-order": "error",
      "@angular-eslint/template/prefer-built-in-pipes": "error",
      "@angular-eslint/template/no-empty-control-flow": "error",
      "@angular-eslint/template/prefer-at-else": "error",
      "@angular-eslint/template/no-interpolation-in-attributes": [
        "error",
        { allowSubstringInterpolation: true },
      ],
      "@angular-eslint/template/prefer-at-empty": "error",
    },
  },
  {
    files: ["./packages/angular-toolkit/projects/lib/src/**/*.ts"],
    ignores: ["**/*.spec.ts"],
    languageOptions: {
      parserOptions: {
        projectService: false,
        tsconfigRootDir: import.meta.dirname + "/packages/angular-toolkit/projects/lib/",
        project: "./tsconfig.lib.json",
      },
    },
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "bsl",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "bsl",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["./packages/angular-toolkit/projects/dev/src/**/*.ts"],
    ignores: ["**/*.spec.ts"],

    languageOptions: {
      parserOptions: {
        projectService: false,
        tsconfigRootDir: import.meta.dirname + "/packages/angular-toolkit/projects/dev/",
        project: "./tsconfig.app.json",
      },
    },
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
  },
]);
