module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    quotes: [2, 'single'], // 0 违反错误不处理
    'quote-props': 'off', //对象字面量中的属性名是否强制双引号
    // "no-empty-label": 0,//禁止使用空label
    semi: 'off', // 0 = off, 1 = warn, 2 = error
    '@typescript-eslint/no-explicit-any': 'off', // 关闭any类型时的警告
    '@typescript-eslint/no-use-before-define': [
      2,
      { functions: false, classes: true, variables: true }
    ], // 禁止在变量定义之前使用它们 variables(变量)
  }
};
