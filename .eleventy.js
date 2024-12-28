import dotenv from "dotenv";
dotenv.config();

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/.htaccess");
  eleventyConfig.addPassthroughCopy("src/*.txt");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/icons": "/" });
  eleventyConfig.addPassthroughCopy({ "src/txt": "/" });

  eleventyConfig.addFilter("toCanonicalUrl", (url) => {
    if (url.slice(-1) === "/") {
      return url;
    } else {
      return `${url}/`;
    }
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "dist",
      templateFormats: ["md", "njk"],
      passthroughFileCopy: true,
    },
  };
}
