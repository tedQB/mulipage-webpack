const extractTextPlugin = require('extract-text-webpack-plugin')

const rules = [{
        test: /\.(css|scss|sass)$/,
        use:process.env.NODE_ENV === 'development'? ["style-loader", "css-loader", "sass-loader", "postcss-loader"] : extractTextPlugin.extract({
            fallback:'style-loader',
            use:["css-loader", "sass-loader", "postcss-loader"],
            publicPath:'../'
        })
    },
    {
        test:/\.js$/,
        use:[{
            loader:'babel-loader'
        }]
    },
    {
        test:/\.(png|jpg|gif)$/,
        use:[{
            loader:'url-loader',
            options: {
                limit: 5 * 1024, //小于这个时将会已base64位图片打包处理
                // 图片文件输出的文件夹
                outputPath: "images"
            }
        }]
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
        }
    },
    {
        test: /\.html$/,
        // html中的img标签
        use: {
            loader: 'html-loader?config=raw-loader',
            options: {
                attrs: ['img:src']
            }
        }
    },
    {
        test:/\.less$/,
        use:process.env.NODE_ENV === "development" ? ["style-loader", "css-loader", "less-loader"] : extractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "less-loader"],
            // css中的基础路径
            publicPath: "../"
        })
    }
]

module.exports = rules
