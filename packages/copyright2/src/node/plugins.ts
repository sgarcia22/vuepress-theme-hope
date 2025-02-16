import { getLocales } from "@mr-hope/vuepress-shared";
import { removeEndingSlash, removeLeadingSlash } from "@vuepress/shared";
import { path } from "@vuepress/utils";
import { copyrightLocales } from "./locales";

import type { Page, Plugin, PluginConfig } from "@vuepress/core";
import type { CopyrightOptions } from "../shared";

export const copyrightPlugin: Plugin<CopyrightOptions> = (
  {
    hostname,
    author = "",
    license = "",
    disableCopy = false,
    disableSelection = false,
    global = false,
    triggerWords = 100,
    locales,
  },
  app
) => {
  const currentlocales = getLocales(app, copyrightLocales, locales);
  const { base } = app.options;

  return {
    name: "vuepress-plugin-copyright2",

    define: (): Record<string, unknown> => ({
      COPYRIGHT_GLOBAL: global,
      COPYRIGHT_DISABLE_COPY: disableCopy,
      COPYRIGHT_DISABLE_SELECTION: disableSelection,
      COPYRIGHT_TRIGGER_WORDS: triggerWords,
    }),

    extendsPage: (page: Page<{ copyright: string }>): void => {
      const locale = currentlocales[page.pathLocale];

      const authorText = author
        ? locale.author.replace(
            ":author",
            typeof author === "function" ? author(page) : author
          )
        : "";

      const licenseText = license
        ? locale.license.replace(
            ":license",
            typeof license === "function" ? license(page) : license
          )
        : "";

      const linkText = hostname
        ? locale.link.replace(
            ":link",
            `${removeEndingSlash(hostname)}${base}${removeLeadingSlash(
              page.path
            )}`
          )
        : "";

      page.data.copyright = [authorText, licenseText, linkText]
        .filter((item) => item)
        .join("\n");
    },

    clientAppSetupFiles: path.resolve(__dirname, "../client/appSetup.js"),
  };
};

export const copyright = (
  options: CopyrightOptions | false
): PluginConfig<CopyrightOptions> => ["copyright2", options];
