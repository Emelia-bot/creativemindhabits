
const { DateTime } = require("luxon");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");


module.exports = function(eleventyConfig) {
  
  // Copy assets folder to output
  eleventyConfig.addPassthroughCopy("src/assets");
eleventyConfig.addPassthroughCopy("src/assets/js");  
  // Date filters
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("LLLL dd, yyyy");
  });

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  // Get the first `n` elements of a collection
  eleventyConfig.addFilter("head", (array, n) => {
    if(!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if( n < 0 ) {
      return array.slice(n);
    }
    return array.slice(0, n);
  });

  // Create collections
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // Markdown configuration
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let opts = {
    permalink: markdownItAnchor.permalink.headerLink()
  };

  eleventyConfig.setLibrary("md", markdownIt(options).use(markdownItAnchor, opts));
  
    eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://creativemindhabits.com",
    },
  });

  return {
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
