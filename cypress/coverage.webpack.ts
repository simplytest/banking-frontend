/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

export default {
    module: {
        rules: [
            {
                test: /\.(ts)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        plugins: ["babel-plugin-istanbul"],
                    },
                },
                enforce: "post",
                include: require("path").join(__dirname, "..", "src"),
                exclude: [
                    /node_modules/,
                    /cypress/,
                    /(ngfactory|ngstyle)\.js/],
            },
        ],
    },
};
