// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
    // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
    test: /\.less$/,
    use: [
        'style-loader', 
        'css-loader',
        {
            loader: 'less-loader',
            options: {
                javascriptEnabled: true
            }
        }]
    });
    config.module.rules.push({
        test: /\.(js|jsx)$/,
        exclude: [/libraries/, /\.min\.js$/],
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        require.resolve('@babel/preset-env'), // Resolve path for use from external projects
                        {
                            useBuiltIns: 'entry',
                            corejs: '2',
                            targets: '> 0.25%, not dead, ie 11'
                        }
                    ],
                    require.resolve('@babel/preset-react') // Resolve path for use from external projects
                ],
                plugins: [
                    require.resolve('babel-plugin-styled-components'), // Resolve path for use from external projects
                    require.resolve('babel-plugin-transform-remove-strict-mode')
                ]
            }
        }
    });

    // Return the altered config
    return config;
};