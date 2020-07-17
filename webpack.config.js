const parts = require("./webpack.parts");
var path = require("path"); // to get the current path
var merge = require("webpack-merge");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ManifestPlugin = require("webpack-manifest-plugin");
//customize notify webpack
var FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");//remove comment and console.log
//Notify desktop
var notifier = require("node-notifier");
const CopyPlugin = require('copy-webpack-plugin');
//Export
module.exports = env => {
  var dotEnv = parts.getEnvKeys(env.ENVIRONMENT);

  //Modules run in debug mode
  const debugModeModules = merge([
    {
      module: {
        rules: [
          // this will apply to both plain `.scss` files
          // AND `<style lang="scss">` blocks in `.vue` files
          {
            test: /\.(tsx?)|(js)|(ts)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'thread-loader',
                options: {
                  worker: require('os').cpus().length - 1,
                },
              },
              {
                loader: 'babel-loader',
                options: {
                  inputSourceMap: "SourceMap",
                  sourceMaps: "both"
                }
              },
              {
                loader: 'ts-loader',
                options: {
                  happyPackMode: true,
                },
              },
            ],
          },
          {
            test: /\.(sa|sc|c)ss$/,
            use: [
              {
                loader: "style-loader", // creates style nodes from JS strings,
                options: {
                  sourceMap: true
                }
              },
              {
                loader: "css-loader", // creates style nodes from JS strings,
                options: {
                  sourceMap: true
                }
              },
              {
                loader: "sass-loader", // creates style nodes from JS strings,
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          {
            test: /\.(png|jpg|gif|svg|ico)$/,
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/images/"
            }
          },
          {
            test: /\.(json)$/,
            loader: "file-loader",
            options: {
              name: "[name].[ext]?[hash]"
            }
          },
          {
            test: /\.(ttf|woff|woff2|eot)$/,
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/fonts"
            }
          }
        ]
      }
    }
  ]);

  //Module run in production mode
  const productModeModules = merge([
    {
      module: {
        rules: [
          {
            test: /\.bundle\.js$/,
            loader: "bundle-loader",
            options: {
              name: 'my-chunk',
              lazy: true
            }
          },
          // this will apply to both plain `.scss` files
          // AND `<style lang="scss">` blocks in `.vue` files
          {
            test: /\.(sa|sc|c)ss$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader
              },
              "css-loader",
              "sass-loader"
            ]

            // fallback to style-loader in development
          },
          {
            test: /\.(tsx?)|(js)|(ts)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'thread-loader',
                options: {
                  worker: require('os').cpus().length - 1,
                },
              },
              {
                loader: 'babel-loader',
              },
              {
                loader: 'ts-loader',
                options: {
                  happyPackMode: true,
                },
              },
            ],
          },
          {
            test: /\.(png|jpg|gif|svg|ico)$/,
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/images/"
            }
          },
          {
            test: /\.(json)$/,
            loader: "file-loader",
            options: {
              name: "[name].[ext]?[hash]"
            }
          },
          {
            test: /\.(ttf|woff|woff2|eot)$/,
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/fonts"
            }
          }
        ]
      }
    }
  ]);

  //Plugins run in debug mode
  const debugModePluginConfig = merge([
    {
      plugins: [
        new HtmlWebpackPlugin({
          TITLE: process.env.TITLE,
          PUBLIC_URL: process.env.PUBLIC_URL,
          template: path.join(__dirname, "public", "index.html"),
          BASE_URL: process.env.PUBLIC_URL
        }),
        new webpack.LoaderOptionsPlugin(),
        new webpack.DefinePlugin(dotEnv),
        new ManifestPlugin(),
        new FriendlyErrorsWebpackPlugin({
          compilationSuccessInfo: {
            messages: [
              "This website is running at http://localhost:" +
              process.env.DEV_PORT,
              "Using webpack for development and production",
              "Configure Browser and PORT at .env.development",
              "Using webpack for the best performance",
              "Configure webpack at webpack.config.js"
            ],
            notes: []
          },
          onErrors: function (severity, errors) {
            // You can listen to errors transformed and prioritized by the plugin
            // severity can be 'error' or 'warning'
            if (severity !== "error") {
              return;
            }
          },
          // should the console be cleared between each compilation?
          // default is true
          clearConsole: true,
          // add formatters and transformers (see below)
          additionalFormatters: [],
          additionalTransformers: []
        })
      ]
    }
  ]);

  //Plugins run in production mode
  const productionModePluginConfig = merge([
    {
      plugins: [
        new HtmlWebpackPlugin({
          TITLE: process.env.TITLE,
          PUBLIC_URL: process.env.PUBLIC_URL,
          template: path.join(__dirname, "public", "index.html"),
          BASE_URL: process.env.PUBLIC_URL
        }),
        new webpack.LoaderOptionsPlugin(),
        new webpack.DefinePlugin(dotEnv),
        new ManifestPlugin(),
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: "assets/css/[id].[name].css",
          chunkFilename: "assets/css/[id].[name].css"
        }),
        new CopyPlugin({
          patterns: [
            { from: './public/favicon.ico', to: 'favicon.ico' },
            { from: 'deploy'}
          ],
        }),

      ]
    }
  ]);

  //Common config
  var commonConfig = {
    devtool: 'cheap-module-source-map',
    entry: path.join(__dirname, "./src/index.tsx"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "assets/js/[name].bundles.js",
      chunkFilename: "assets/js/components/[id].[name].bundle.js",
      publicPath: process.env.PUBLIC_URL
    },
    resolve: {
      extensions: [
        '.ts', '.tsx', '.js', '.json', '.svg',
      ],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    optimization: {
      minimizer: [
        new TerserJSPlugin({
          terserOptions: {
            compress: {
                drop_console: true
            }
          }
        }),
      ],
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '-',
        automaticNameMaxLength: 30,
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      },
      
    },
    performance: {
      hints: false
      //hints: process.env.NODE_ENV === 'production' ? "warning" : false,
      //maxEntrypointSize: 512000,
      //maxAssetSize: 512000
    }
  };

  //This config are for dev server
  const devServerConfig = merge([
    parts.devServer({
      host: process.env.DEV_HOST,
      port: process.env.DEV_PORT,
      browser: process.env.DEV_BROWSER
    })
  ]);

  //Check mode & merge config
  var mode = env.ENVIRONMENT;
  if (mode === "production" || mode === "staging") {
    return merge(commonConfig, productModeModules, productionModePluginConfig, {
      mode: "production"
    });
  }

  return merge(
    commonConfig,
    debugModeModules,
    devServerConfig,
    debugModePluginConfig,
    { mode: "development" }
  );
};