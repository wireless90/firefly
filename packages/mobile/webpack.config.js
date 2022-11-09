const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { DefinePlugin } = require('webpack')
const path = require('path')
const sveltePreprocess = require('svelte-preprocess')
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin')

const mode = process.env.NODE_ENV || 'development'
const prod = mode === 'production'
const hardcodeNodeEnv = typeof process.env.HARDCODE_NODE_ENV !== 'undefined'
const stage = process.env.STAGE || 'alpha'
/**
 * If stage = 'prod' -> 'Firefly'
 * If stage = 'alpha' -> 'Firefly Alpha'
 */
const appName =
    stage === 'prod' ? 'Firefly Shimmer' : `Firefly Shimmer - ${stage.replace(/^\w/, (c) => c.toUpperCase())}`

const appProtocol = stage === 'prod' ? 'firefly' : `firefly-${stage.toLowerCase()}`

const resolve = {
    alias: {
        svelte: path.dirname(require.resolve('svelte/package.json')),
        '@auxiliary': path.resolve(__dirname, '../shared/lib/auxiliary'),
        '@contexts': path.resolve(__dirname, '../shared/lib/contexts'),
        '@components': path.resolve(__dirname, './components/'),
        '@core': path.resolve(__dirname, '../shared/lib/core'),
        '@features': path.resolve(__dirname, '../mobile/features'),
        '@lib': path.resolve(__dirname, '../shared/lib'),
        '@ui': path.resolve(__dirname, '../shared/components/'),
        '@views': path.resolve(__dirname, './views/'),
    },
    extensions: ['.mjs', '.js', '.ts', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
    fallback: {
        path: false,
        fs: false,
        crypto: false,
    },
}

// ------------------------ Output ------------------------
const output = {
    publicPath: prod ? '../' : '/',
    path: path.join(__dirname, '/public'),
    filename: '[name].js',
    chunkFilename: 'build/[name].[id].js',
}

// ------------------------ Module rules ------------------------
const rendererRules = [
    {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
    },
    {
        test: /\.json$/,
        loader: 'json-loader',
    },
    {
        test: /\.svelte$/,
        use: {
            loader: 'svelte-loader',
            options: {
                compilerOptions: {
                    dev: !prod,
                },
                emitCss: prod,
                hotReload: !prod,
                preprocess: sveltePreprocess({
                    sourceMap: false,
                    postcss: true,
                }),
            },
        },
    },
    {
        test: /\.(woff|woff2)?$/,
        type: 'asset/resource',
        generator: {
            filename: ({ filename }) => filename.replace('../shared/', ''),
        },
    },
    {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
    },
    {
        // required to prevent errors from Svelte on Webpack 5+
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
            fullySpecified: false,
        },
    },
]

// ------------------------ Plugins ------------------------
const rendererPlugins = [
    new CopyPlugin({
        patterns: [
            {
                from: '../shared/assets/**/*',
                // we ignore the fonts since the `asset/resource` handles them
                filter: prod ? (asset) => !asset.includes('fonts') : undefined,
                to({ context, absoluteFilename }) {
                    return path.relative(context, absoluteFilename).replace(/..[\\/]shared[\\/]/g, '')
                },
            },
            {
                from: '../shared/locales/*',
                to() {
                    return 'locales/[name].[ext]'
                },
            },
        ],
    }),
    new MiniCssExtractPlugin({
        filename: '[name].css',
    }),
    new DefinePlugin({
        APP_NAME: JSON.stringify(appName),
        'process.env.PLATFORM': JSON.stringify(process.env.PLATFORM || 'mobile'),
        'process.env.STAGE': JSON.stringify(stage),
        'process.env.APP_PROTOCOL': JSON.stringify(appProtocol),
    }),
]

// ------------------------ Webpack config ------------------------
module.exports = [
    {
        entry: {
            'build/index': ['./main.js'],
        },
        resolve,
        output,
        module: {
            rules: rendererRules,
        },
        mode,
        plugins: rendererPlugins,
        devtool: prod ? false : 'cheap-module-source-map',
        devServer: {
            hot: true,
        },
    },
]
