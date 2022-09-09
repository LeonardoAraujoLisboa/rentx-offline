module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      ["@babel/plugin-proposal-decorators", {"legacy": true}]
    ]
  };
};
/* foi utilizado o watermelonDB e ai precisa desse plugin ai. Para IOS precisa adicionar um arquivo swift e ai precisa ter um mac, no android nao precisa */