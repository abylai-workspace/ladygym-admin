module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'styled-components',
    [
      'module-resolver',
      {
        root: './app',
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
}
