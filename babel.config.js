module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV)

  const isDevelopment = api.env() !== 'production'

  return {
    presets: [
      '@babel/preset-env',
      // Enable development transform of React with new automatic runtime
      [
        '@babel/preset-react',
        {
          development: isDevelopment,
          runtime: 'automatic',
        },
      ],
    ],
    // Applies the react-refresh Babel plugin on non-production modes only
    ...(isDevelopment && { plugins: ['react-refresh/babel'] }),
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          regenerator: true,
        },
      ],
    ],
  }
}
