const { merge, mergeWithRules } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "easymo",
    projectName: "signup",
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
          use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: ['file-loader']
        }

      ]
    },
  });
  return merge(config, {
    externals: [
      "react",
      "react-dom",
      "react-bootstrap",
      "@easymo/designSystem",
    ]
  });
};
