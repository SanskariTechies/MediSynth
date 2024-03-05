resolve: {
    fallback: {
      events: require.resolve('events/')
    }
}
  
module.exports = {
  plugins: [
      new NodePolyfillPlugin()
  ]
}