/*
 * @Date: 2023-04-19 09:23:41
 * @Description: file content
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'linebreak-style': [0, 'error', 'window'],
    '@typescript-eslint/triple-slash-reference': 0, // ts三斜线
    '@typescript-eslint/no-explicit-any': 0, // 允许使用any
    'no-undef': 0,
    'no-console': 'off',
    camelcase: 'off',
    eqeqeq: ['off'],
    semi: ['error', 'never'], // 分号
    'import/extensions': 0, // 导入报错问题
    'import/no-unresolved': 0, // 导入报错问题
    'import/no-extraneous-dependencies': 0, // 导入报错问题
    'no-param-reassign': 0,
    'no-unused-vars': 0,
    'object-curly-newline': ['error', { ObjectPattern: 'never' }], // 对象换行规则
    'arrow-body-style': 0,
    '@typescript-eslint/no-unused-vars': 2,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/ban-types': 0,
    'import/prefer-default-export': 0,
    'no-shadow': 0,
    'prefer-arrow-callback': 0,
    'func-names': 0, // 可以写匿名函数
    'no-plusplus': 0, // 运行自增
    'max-len': 0, // 最大长度
    'no-unused-expressions': 0,
    'newline-per-chained-call': 0,
    'no-mixed-operators': 0, // 可以用加减乘除
    'no-use-before-define': 0, // 可以在定义之前使用
  },
}
