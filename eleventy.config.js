module.exports = function(eleventyConfig) {
  // Set custom directories for input, output, includes, and data
  // Input directory: src
  // Output directory: docs (for GitHub Pages compatibility)
  // Includes directory: _includes (relative to input directory)
  // Data directory: _data (relative to input directory)

  // Passthrough copy for static assets
  // Copy CSS folder from src to docs
  eleventyConfig.addPassthroughCopy("src/css");
  // Copy JS folder from src to docs
  eleventyConfig.addPassthroughCopy("src/js");
  // Copy assets folder (e.g., for images, fonts) from src to docs
  eleventyConfig.addPassthroughCopy("src/assets");

  return {
    dir: {
      input: "src",
      output: "docs",
      includes: "_includes", // default, but good to be explicit
      data: "_data"        // default, but good to be explicit
    },
    // Optional: default template engine for Markdown files
    markdownTemplateEngine: "njk", // Nunjucks
    // Optional: default template engine for HTML files
    htmlTemplateEngine: "njk" // Nunjucks
  };
};
