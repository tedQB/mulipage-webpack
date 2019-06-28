module.exports = {
    plugins:[
        require('autoprefixer'),
        require('postcss-plugin-px2rem')({'remUnit':75,'baseDpr':2})
    ]
}
