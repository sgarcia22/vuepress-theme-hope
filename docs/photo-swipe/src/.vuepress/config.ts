import hope from "vuepress-theme-hope";
import { version } from "../../../../lerna.json";

export default hope.config({
  title: "Photo preview",
  description: "Photo swipe Plugin for VuePress",

  base: "/v1/photo-swipe/",
  dest: "./dist",

  locales: {
    "/": { lang: "en-US" },
    "/zh/": {
      lang: "zh-CN",
      title: "图片预览",
      description: "VuePress 的图片预览插件",
    },
  },

  themeConfig: {
    logo: "/logo.svg",
    hostname: "https://vuepress-theme-hope.github.io",

    author: "Mr.Hope",
    repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
    docsBranch: "v1",
    docsDir: "docs/photo-swipe/src",

    nav: [
      { text: "Home", icon: "home", link: "/" },
      { text: "Guide", icon: "creative", link: "/guide.html" },
      { text: "Config", icon: "config", link: "/config.html" },
      {
        text: version,
        icon: "note",
        items: [
          {
            text: "V2 Docs",
            link: "https://vuepress-theme-hope.github.io/v2/photo-swipe/",
          },
        ],
      },
    ],

    locales: {
      "/zh/": {
        nav: [
          { text: "主页", icon: "home", link: "/zh/" },
          { text: "指南", icon: "creative", link: "/zh/guide.html" },
          { text: "配置", icon: "config", link: "/zh/config.html" },
          {
            text: version,
            icon: "note",
            items: [
              {
                text: "V2 文档",
                link: "https://vuepress-theme-hope.github.io/v2/photo-swipe/zh/",
              },
            ],
          },
        ],
      },
    },

    blog: false,

    footer: {
      display: true,
      copyright: "MIT Licensed | Copyright © 2019-present Mr.Hope",
    },

    comment: {
      type: "waline",
      serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    },

    cleanUrl: false,

    git: {
      timezone: "Asia/Shanghai",
    },

    mdEnhance: {
      codegroup: true,
    },

    pwa: {
      favicon: "/v1/photo-swipe/favicon.ico",
      themeColor: "#46bd87",
      cachePic: true,
      apple: {
        icon: "/v1/photo-swipe/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/v1/photo-swipe/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        name: "vuepress-plugin-photo-swipe",
        short_name: "photo-swipe plugin",
        icons: [
          {
            src: "/v1/photo-swipe/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/v1/photo-swipe/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/v1/photo-swipe/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/v1/photo-swipe/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Guide",
            short_name: "Guide",
            url: "/v1/photo-swipe/guide.html",
            icons: [
              {
                src: "/v1/photo-swipe/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/v1/photo-swipe/assets/icon/guide-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
          },
          {
            name: "Config",
            short_name: "Config",
            url: "/v1/photo-swipe/config.html",
            icons: [
              {
                src: "/v1/photo-swipe/assets/icon/config-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/v1/photo-swipe/assets/icon/config-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
          },
        ],
      },
    },
  },

  plugins: [{ globalUIComponents: ["V2Notice"] }],
});
