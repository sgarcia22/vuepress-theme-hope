import convert = require("xml-js");
import { encodeCDATA, encodeXML, generator } from "../utils";

import type { Feed } from "../feed";
import type { FeedAuthor, FeedCategory } from "../../types";
import type {
  AtomAuthor,
  AtomCategory,
  AtomContent,
  AtomEntry,
} from "./typings";

const genAuthororContributor = (author: FeedAuthor): AtomAuthor => {
  const { name, email, url } = author;

  return {
    name,
    ...(email ? { email } : {}),
    ...(url ? { uri: encodeXML(url) } : {}),
  };
};

const genCategory = (category: FeedCategory): AtomCategory => {
  const { name, scheme } = category;

  return {
    _attributes: {
      term: name,
      scheme,
    },
  };
};

/**
 * Returns an Atom 1.0 feed
 *
 * @see http://www.atomenabled.org/developers/syndication/
 */
export const renderAtom = (feed: Feed): string => {
  const { channel, links } = feed.options;

  const content: AtomContent = {
    _declaration: {
      _attributes: {
        version: "1.0",
        encoding: "utf-8",
      },
    },
    feed: {
      _attributes: {
        xmlns: "http://www.w3.org/2005/Atom",
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ...(channel.language ? { "xml:lang": channel.language } : {}),
      },
      id: channel.link,
      title: channel.title,

      ...(channel.description ? { subtitle: channel.description } : {}),

      ...(channel.author
        ? { author: genAuthororContributor(channel.author) }
        : {}),

      updated: channel.lastUpdated
        ? channel.lastUpdated.toISOString()
        : new Date().toISOString(),
      generator: generator,
      link: [{ _attributes: { rel: "self", href: encodeXML(links.atom) } }],
    },
  };

  if (channel.link)
    content.feed.link.push({
      _attributes: { rel: "alternate", href: encodeXML(channel.link) },
    });

  if (channel.hub)
    content.feed.link.push({
      _attributes: { rel: "hub", href: encodeXML(channel.hub) },
    });

  if (channel.image) content.feed.logo = channel.image;

  if (channel.icon) content.feed.icon = channel.icon;

  if (channel.copyright) content.feed.rights = channel.copyright;

  content.feed.category = Array.from(feed.categories).map((category) => ({
    _attributes: { term: category },
  }));

  content.feed.contributor = Array.from(feed.contributors)
    .filter((contributor) => contributor.name)
    .map((contributor) => genAuthororContributor(contributor));

  /**
   * "entry" nodes
   */
  content.feed.entry = feed.items.map((item) => {
    // entry: required elements
    const entry: AtomEntry = {
      title: { _attributes: { type: "html" }, _text: encodeXML(item.title) },
      id: encodeXML(item.guid || item.link),
      link: { _attributes: { href: encodeXML(item.link) } },
      updated: item.lastUpdated.toISOString(),
    };

    // entry: recommended elements
    if (item.description)
      entry.summary = {
        _attributes: { type: "html" },
        _cdata: encodeCDATA(item.description),
      };

    if (item.content)
      entry.content = {
        _attributes: { type: "html" },
        _cdata: encodeCDATA(item.content),
      };

    // author(s)
    if (Array.isArray(item.author))
      entry.author = item.author
        .filter((author) => author.name)
        .map((author) => genAuthororContributor(author));
    else if (item.author && item.author.name)
      entry.author = [genAuthororContributor(item.author)];

    if (Array.isArray(item.category))
      // category
      entry.category = item.category.map((category) => genCategory(category));
    else if (item.category) entry.category = [genCategory(item.category)];

    // contributor
    if (Array.isArray(item.contributor))
      entry.contributor = item.contributor.map((contributor) =>
        genAuthororContributor(contributor)
      );

    // published
    if (item.pubDate) entry.published = item.pubDate.toISOString();

    // rights
    if (item.copyright) entry.rights = item.copyright;

    return entry;
  });

  return convert.js2xml(content, {
    compact: true,
    ignoreComment: true,
    spaces: 2,
  });
};
