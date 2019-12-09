module.exports = {
  entry: './src/source.js',
  output: {
    filename: './final.js'
  }, 
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['css-loader'],
      },
    ],
  },
};
