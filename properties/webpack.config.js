const { merge, mergeWithRules } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "easymo",
    projectName: "properties",
    webpackConfigEnv,
    argv,
  });
  const mergeRulesWithMatchingTest = mergeWithRules({
    module: {
      rules: {
        test: "match",
        use: {
          loader: "match",
          options: "replace",
        },
      },
    },
  });
  const config = mergeRulesWithMatchingTest(defaultConfig, {
    module: {
      rules: [
        {
          test: /\.scss?$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg|pdf|docx)(\?v=\d+\.\d+\.\d+)?$/,
          use: ["file-loader"],
        },
      ],
    },
  });

  return merge(config, {
    externals: [
      "react-bootstrap",
      "react",
      "react-dom",
      "@easymo/designSystem",
    ],
    // modify the webpack config however you'd like to by adding to this object
  });
};
