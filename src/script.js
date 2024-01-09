const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

// Read the component file
const code = fs.readFileSync(__dirname+'/Dashboard.js', 'utf-8');

// Parse the code into AST
const ast = parser.parse(code, {
  sourceType: 'module',
  plugins: ['jsx'],
});

// Find and extract props and components from the AST
const components = [];
const propsMap = new Map();

traverse(ast, {
  JSXOpeningElement(path) {
    const componentName = path.node.name.name;
    components.push(componentName);

    // Extract props
    path.node.attributes.forEach(attribute => {
      if (attribute.type === 'JSXAttribute') {
        const propName = attribute.name.name;
        console.log(attribute);
        const propValue = attribute.value && findPropValue(attribute);

        if (!propsMap.has(componentName)) {
          propsMap.set(componentName, []);
        }

        propsMap.get(componentName).push({ name: propName, value: propValue });
      }
    });
  },
});

function findPropValue(attribute) {
    //for string literals
    if(attribute.value.expression.value) {
        return attribute.value.expression.value;
    //for variables
    }else if(attribute.value.expression.name) {
        return attribute.value.expression.name;
    }
}

console.log(propsMap);
