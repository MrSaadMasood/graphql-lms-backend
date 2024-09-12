const config = {
    schema: './src/query/**/*.graphql',
    generates: {
        './src/': {
            preset: 'graphql-modules',
            presetConfig: {
                baseTypesPath: './__generated__/graphql.ts',
                filename: '../__generated__/module-types.ts',
            },
            plugins: [
                {
                    add: {
                        content: '/* eslint-disable */',
                    },
                },
                'typescript',
                'typescript-resolvers',
            ],
        },
    },
};
export default config;
