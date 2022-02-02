const webpack = require('webpack')
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require( 'path' );
const fs = require('fs'); // to check if the file exists
const dotenv = require('dotenv');

module.exports= env => {

  const currentPath = path.join(__dirname);
  // Create the fallback path (the production .env)
  const basePath = currentPath + '/.env';
  // We're concatenating the environment name to our filename to specify the correct env file!
  const envPath = basePath + '.' + env.ENVIRONMENT;

  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed;
  // reduce it to a nice object, the same as before (but with the variables from the file)
  // const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
  //   prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
  //   return prev;
  // }, {});
  // console.log(envKeys);
  // const envKeys = []


return {
    context: __dirname,
    entry: './src/index.js',
    output: {
        path: path.resolve( __dirname, 'build' ),
        filename: 'main.js',
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true,
        port:5000
     },
     
    module: {
        rules: [
            {
              test: /\.js?$/,
              exclude: /node_modules/,
              use: 'babel-loader'
            },
            {
              test: /\.(sa|sc|c)ss$/,
               use: [
                  {
                      loader: 'style-loader', // inject CSS to page
                  },
                  {
                      loader: 'css-loader', // translates CSS into CommonJS modules
                  },
                  {
                    loader: 'postcss-loader', // Run post css actions
                    options: {
                      plugins: function () { // post css plugins, can be exported to postcss.config.js
                        return [
                          require('precss'),
                          require('tailwindcss'),
                          require('autoprefixer')
                        ];
                      }
                    }
                    }, {
                      loader: 'sass-loader' // compiles SASS to CSS
                    }
              ]
            },
            {
                test: /\.(jpe?g|png|j?g|svg|gif|ico)?$/,
                exclude: /node_modules/,
                use: ['file-loader?name=[name].[ext]']
            },

        ]
    },
    optimization: {
      sideEffects: false,// <----- in production defaults to true if left blank
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
              cache:true,
              parallel: true,
              uglifyOptions: {
                compress: false,
                ecma: 6,
                mangle: true
              },
              sourceMap: true,
              output: {
                  comments: false,
              },
          },
          // exclude: [/\.min\.js$/gi] // skip pre-minified libs
        }),
      ],
    },
    plugins: [
    // fix "process is not defined" error:
    // (do "npm install process" before running the build)
    //
        new NodePolyfillPlugin(),
        // new webpack.DefinePlugin(envKeys),
        new HtmlWebPackPlugin({
          template: path.resolve( __dirname, 'public/index.html' ),
          filename: 'index.html',
          evn:process.env,
          favicon: './public/favicon.ico',
          manifest: './public/manifest.json'

        }),
        new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks 
        // new BundleAnalyzerPlugin(),
      

    ],
    mode: 'development',
    resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],// other stuff
    
  },

}
};
