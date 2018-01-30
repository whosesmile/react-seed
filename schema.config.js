var fs = require('fs');
var path = require('path');

// 递归目录查找模块
function modules() {
  var result = [];
  var base = path.join(__dirname, './src/modules');
  fs.readdirSync(base).forEach(function(file) {
    file = path.resolve(base, file);
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory() && fs.existsSync(path.join(file, 'index.jsx'))) {
      result.push(path.basename(file));
    }
  });
  return result;
}

// 代码模板
let code = '';
let sync = ['home'];

// 模块列表
const list = modules().filter(item => sync.indexOf(item) === -1);

// 左侧补零
const lpad = (n, l = 2) => {
  n = n + '';
  while (n.length < l) n = '0' + n;
  return n;
};

// 首字大写
const toUp = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// 生成模板
code += `
  // code splitting:
  // https://reacttraining.com/react-router/web/guides/code-splitting

  import React from 'react';
  import { Bundle } from './components';
`;

// 异步模块
list.forEach(name => {
  code += `
    import ${name} from './modules/${name}/ducks';
    import load${toUp(name)} from 'bundle-loader?lazy&name=${name}!./modules/${name}';
    const ${toUp(name)} = (props) => (
      <Bundle load={load${toUp(name)}}>
        {(Compo) => <Compo {...props} />}
      </Bundle>
    );
  `;
});

// 同步模块
sync.forEach(name => {
  code += `
    import ${name} from './modules/${name}/ducks';
    import ${name}Routes from './modules/${name}';
  `;
});

code += `
  const routes = [
    ${sync.map(name => `...${name}Routes`).join(',\n')},
    ${list.map(name => {
      return `{ path: '/${name}', component: ${toUp(name)} }`;
    }).join(',\n')},
  ];

  const reducers = { ${[...sync, ...list].join(', ')} };

  export {
    routes,
    reducers,
  };
`;

fs.writeFileSync('./src/schema.jsx', code, 'utf8');
