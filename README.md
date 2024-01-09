### About AST

- AST is a hierarchical and tree like representation of the source code.
- It is being generated during the parsing phase of the compilation.
- AST is independent of the coding language in use.
- AST can help us get detailed information about the code written inside the source.
- AST helps us traverse and parse the source code in a tree like structure

### POC

We need to find all the props being passed to a component inside a React Component.

### Big Picture

We need to find all the props of a component in a react component and replace or update them with some other props or their values.

### 1. Find out what all components are being used in the React Component

```jsx
npm install @babel/core @babel/parser @babel/traverse
```

```jsx
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
    console.log(components);
  },
});
```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/7b6e8688-1898-4a40-acf0-25e592b34cd7/ead5ff99-c210-4059-9499-3cca49cf5c8d/Untitled.png)

1. Find the props of the component in a React Component

```jsx
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
```

---

### Notes: ( TLMR )

1. We can use Babel for parsing and traversing an AST.
2. Is there any other way to traverse and parse an AST ?  
    1. Yes
    2. All programming language have their own tools for traversal of an AST
    3. For JS - We can use Babel or EsPrisma. Esprisma have some limitations ( not diving deep into this ), so we will be using the Babel.
3. Babel can help us in - Source code transformations (codemods)
4. Plugin Based architecture - 
    1. Eslint - for linting
    2. Babel - for transpiling
    3. JSCodeShift - a tool from Meta for writing codemods for code transformation — will read more on this
5. In AST, we can get the component Names from this path - path.node.name.name
6. We can get the props list - path.node.attributes

---

### Links And References:

```jsx
https://babeljs.io/videos

```