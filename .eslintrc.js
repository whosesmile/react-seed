// Configuring Rules
// "off" or 0 - turn the rule off
// "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
// "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)

module.exports = {
  // A wrapper around the Babel parser that makes it compatible with ESLint     default Esprima
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module", //模块开发
    "ecmaVersion": 6, //For ES6 syntax
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true, //启用对实验性的 object rest/spread properties 的支持
    },
  },
  "env": {
    "es6": true, //for new ES6 global variables（该选项会自动设置 ecmaVersion 解析器选项为 6）
    "browser": true,
    "commonjs": true,
  },
  "globals": {
    "wx": true,
    "CF": true, //全局变量能被重写
    "axios": false, //全局变量不能被重写
    "process": false,
    "WeixinJSBridge": false,
  },
  "plugins": [
    "eslint-plugin-react",
  ],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    // "plugin:eslint-plugin-react/recommended"
  ],
  "rules": {
    // 不能有未定义的变量
    "no-undef": 1,
    // 不能有无法执行的代码
    "no-unreachable": 1,
    // 不能有声明后未被使用的变量或参数
    "no-unused-vars": [1, { "vars": "all", "args": "after-used", "ignoreRestSiblings": true }],
    // 未定义前不能使用
    "no-use-before-define": 1,
    // "indent": [1, 2],
    "linebreak-style": [1, "unix"],
    // js中字符串的是单引号
    "quotes": [1, "single"],
    "semi": [1, "always"],
    "no-empty": [1, { "allowEmptyCatch": true }],
    "no-alert": 1,
    "no-console": 1,
    "no-multiple-empty-lines": [1, { "max": 1 }], //最多1个空行

    // React & JSX
    "react/prop-types": 0,
    // Our transforms set this automatically dom属性检测
    // "react/jsx-boolean-value": [2, "always"],
    "react/jsx-no-undef": 2,
    // We don"t care to do this
    // "react/jsx-sort-prop-types": OFF,
    // "react/jsx-space-before-closing": 2,
    "react/jsx-tag-spacing": 1,
    // 排除检测React 因为代码可能没有引用他 正常检查会有语法错误
    "react/jsx-uses-react": 2,
    // "react/jsx-uses-axios": 2,
    // "react/no-is-mounted": OFF,
    // This isn"t useful in our test code
    "react/react-in-jsx-scope": 2,
    // jsx 空标签  标签没有关闭
    "react/self-closing-comp": 1,
    // We don"t care to do this
    "react/jsx-wrap-multilines": [2, { declaration: false, assignment: false }],
    // 判断虚拟dom 有没有使用
    "react/jsx-uses-vars": [1]
  },
};
