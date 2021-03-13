const Merge = require("webpack-merge").merge;
const commonConfig = require("./webpack.common.js");

module.exports = Merge(commonConfig, {
    devServer: {

    }
});