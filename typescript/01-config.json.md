# 作用

ts如何编译就是根据config.json的配置进行的


# 创建

根目录运行 tsc -init 生成 tsconfig.json 文件


# 8 个顶层属性介绍


# compileOnSave

作用是设置保存文件的时候自动编译，但需要编译器支持。
```json
{
	// ...
  "compileOnSave": false,
}
```


# compilerOptions

配置编译选项，非常繁杂，有很多配置，具体看官网 https://www.tslang.cn/docs/handbook/compiler-options.html

```json
{
  "compilerOptions": { // 编译配置项，繁杂很多配置（使用命令时配置文件会被忽略）
    /* Visit https://aka.ms/tsconfig to read more about this file */

    /* Projects */
    // "incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./.tsbuildinfo", // 增量编译文件的存储位置             /* Specify the path to .tsbuildinfo incremental compilation file. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects. */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

    /* Language and Environment */
    "target": "ES5", // 目标语言的版本                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    // "lib": [], // 编译过程中需要引入的库文件的列表 (es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array")                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
    // "jsx": "preserve",                                /* Specify what JSX code is generated. */
    // "experimentalDecorators": true,                   /* Enable experimental support for TC39 stage 2 draft decorators. */
    // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */
    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
    // "reactNamespace": "",                             /* Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
    // "moduleDetection": "auto",                        /* Control what method is used to detect module-format JS files. */

    /* Modules */
    "module": "commonjs", // 指定生成代码的模板标准 target === "ES6" ? "ES6" : "commonjs                               /* Specify what module code is generated. */
    // "rootDir": "./", // 仅用来控制输出的目录结构                                 /* Specify the root folder within your source files. */
    // "moduleResolution": "node",  // 模块解析策略，ts默认用node的解析策略，即相对的方式导入 （不清楚）                    /* Specify how TypeScript looks up a file from a given module specifier. */
    // "baseUrl": "./",  // 如果要解析非相对模块的基地址，默认是当前目录                                /* Specify the base directory to resolve non-relative module names. */
    // "paths": {},  // 路径映射，相对于baseUrl  // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置  "jquery": ["node_modules/jquery/dist/jquery.min.js"]                                 /* Specify a set of entries that re-map imports to additional lookup locations. */
    // "rootDirs": [],  // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错 （不清楚）                                 /* Allow multiple folders to be treated as one when resolving modules. */
    // "typeRoots": [],  // 声明文件目录，默认时node_modules/@types                                /* Specify multiple folders that act like './node_modules/@types'. */
    // "types": [],  // 加载的声明文件包                                    /* Specify type package names to be included without being referenced in a source file. */
    // "allowUmdGlobalAccess": true,  // 允许在模块中全局变量的方式访问umd模块（不清楚）                  /* Allow accessing UMD globals from modules. */
    // "moduleSuffixes": [],                             /* List of file name suffixes to search when resolving a module. */
    // "resolveJsonModule": true,                        /* Enable importing .json files. */
    // "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */

    /* JavaScript Support */
    // "allowJs": true, // 允许编译器编译JS，JSX文件                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
    // "checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用                                 /* Enable error reporting in type-checked JavaScript files. */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */

    /* Emit */
    // "declaration": true, // 生成声明文件，开启后会自动生成声明文件                            /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    // "declarationMap": true,  // 为声明文件生成sourceMap                         /* Create sourcemaps for d.ts files. */
    // "emitDeclarationOnly": true,  // 只生成声明文件，而不会生成js文件                    /* Only output d.ts files and not JavaScript files. */
    "sourceMap": true, // 生成目标文件的sourceMap文件                                /* Create source map files for emitted JavaScript files. */
    // "outFile": "./", // 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
    "outDir": "./dist", // 指定输出目录                                  /* Specify an output folder for all emitted files. */
    "removeComments": true, // 生成的es代码删除注释                          /* Disable emitting comments. */
    // "noEmit": true,  // 不输出文件,即编译后不会生成任何js文件                                 /* Disable emitting files from a compilation. */
    // "importHelpers": true,   // 通过tslib引入helper函数，文件必须是模块（不清楚）                         /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    // "importsNotUsedAsValues": "remove",               /* Specify emit/checking behavior for imports that are only used for types. */
    // "downlevelIteration": true,   // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现                    /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,  // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中                        /* Include sourcemap files inside the emitted JavaScript. */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
    // "noEmitHelpers": true,  // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用                          /* Disable generating custom helper functions like '__extends' in compiled output. */
    // "noEmitOnError": true,  // 发送错误时不输出任何文件                          /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true, // 保留 const 和 enum 声明  生成映射代码                   /* Disable erasing 'const enum' declarations in generated code. */
    // "declarationDir": "./",  // 指定生成声明文件存放目录                         /* Specify the output directory for generated declaration files. */
    // "preserveValueImports": true,                     /* Preserve unused imported values in the JavaScript output that would otherwise be removed. */

    /* Interop Constraints */
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true,  // 兼容处理 cjs 没有defautl属性问题 可支持esm引用                           /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

    /* Type Checking */
    "strict": true,  // 启用所有严格类型检查选项。                                    /* Enable all strict type-checking options. */
    "noImplicitAny": true, // 不允许隐式的 any 类型                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
    "strictNullChecks": true,   // 不允许把null、undefined赋值给其他类型的变量 ，在严格的 null检查模式下， null和 undefined值不包含在任何类型里，只允许用它们自己和 any来赋值（有个例外， undefined可以赋值到 void）                      /* When type checking, take into account 'null' and 'undefined'. */
    // "strictFunctionTypes": true,  // 不允许函数参数双向协变                    /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,  // 严格的bind/call/apply检查                    /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
    // "strictPropertyInitialization": true,  // 类的实例属性必须初始化           /* Check for class properties that are declared but not set in the constructor. */
    "noImplicitThis": true,  // 不允许this有隐式的any类型                         /* Enable error reporting when 'this' is given the type 'any'. */
    // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,  // 在代码中注入'use strict'                           /* Ensure 'use strict' is always emitted. */
    // "noUnusedLocals": true,  // 检查只声明、未使用的局部变量(只提示不报错)                         /* Enable error reporting when local variables aren't read. */
    // "noUnusedParameters": true,  // 检查未使用的函数参数(只提示不报错)                     /* Raise an error when a function parameter isn't read. */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,  // 函数的每个逻辑分支都会有返回值                      /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,    // 防止switch语句贯穿(即如果没有break语句后面不会执行)            /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  },
  "compileOnSave": true, // 在最顶层设置compileOnSave标记，可以让IDE在保存文件的时候根据tsconfig.json重新生成文件。
  "files": [   // 指定待编译的文件（入口文件） （比如指定编译src目类下的a.ts）["src/a.ts"]
    "./src/index.ts"  
  ],
  // "exclude": [], // 需排除的文件或文件夹。
  // "extends": "", // 继承其他配置文件，（把基础配置抽离成tsconfig.base.json文件，然后引入这里）
  // "include": [], // 需要编译的文件或目类
  // "references": [], // 指定引用的工程（理解不深）
}

```

# exclude

指定编译器需要排除的文件或文件夹
```json
// 默认排除 node_modules 文件夹下文件。
{
	// ...
  "exclude": [
    "src/lib" // 排除src目录下的lib文件夹下的文件不会编译
  ]
}
```


# extends

引入其他配置文件，继承配置

```json
// 默认包含当前目录和子目录下所有 TypeScript 文件
{
	// ...
  // 把基础配置抽离成tsconfig.base.json文件，然后引入
	"extends": "./tsconfig.base.json"
}
```


# files

指定需要编译的单个文件列表

```json
// 默认包含当前目录和子目录下所有 TypeScript 文件
{
	// ...
  "files": [
    // 指定编译文件是src目录下的leo.ts文件
    "scr/leo.ts"
  ]
}
```


# include

指定编译需要编译的文件或目录。

```json
{
	// ...
  "include": [
    // "scr" // 会编译src目录下的所有文件，包括子目录
    // "scr/*" // 只会编译scr一级目录下的文件
    "scr/*/*" // 只会编译scr二级目录下的文件
  ]
}
```


# files、include、exclude 优先级

- 通过 "files"属性明确指定的文件却总是会被包含在内，不管"exclude"如何设置。

- 如果 "files" 和 "include" 都没有被指定，编译器默认包含当前目录和子目录下所有的 TypeScript文件（.ts, .d.ts 和 .tsx），但排除在 "exclude" 里指定的文件


# references

指定工程引用依赖。 (不理解)

```json
{
	// ...
  "references": [ // 指定依赖的工程
     {"path": "./common"}
  ]
}
```

# typeAcquisition

设置自动引入库类型定义文件(.d.ts)相关。 包含 3 个子属性：

- enable  : 布尔类型，是否开启自动引入库类型定义文件(.d.ts)，默认为 false；
- include  : 数组类型，允许自动引入的库名，如：["jquery", "lodash"]；
- exculde  : 数组类型，排除的库名。

```json
{
	// ...
  "typeAcquisition": {
    "enable": false,
    "exclude": ["jquery"],
    "include": ["jest"]
  }
}
```






# 常见配置


1. 移除代码中注释

```json
{
  "compilerOptions": {
    "removeComments": true,
  }
}
```


2. 开启null、undefined检测

```json
{
    "compilerOptions": {
        "strictNullChecks": true
    },
}

```
```ts
// 下面会报错 不能将类型“null”分配给类型“string”。ts(2322)
let userName: string
userName = "guor"
userName = null
userName = undefined
```


3. 配置复用

通过 extends 属性实现配置复用，即一个配置文件可以继承另一个文件的配置属性

比如，建立一个基础的配置文件 configs/base.json ，在tsconfig.json 就可以引用这个文件的配置了

```json
// configs/base.json
{
  "compilerOptions": {
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}

// tsconfig.json
{
  "extends": "./configs/base",
  "files": [
    "main.ts",
    "supplemental.ts"
  ]
}
```


4. 生成枚举的映射代码

在默认情况下，使用 const 修饰符后，枚举不会生成映射代码。

设置 preserveConstEnums 编译器选项为 true

```json
{
  "compilerOptions": {
    "target": "es5",
    "preserveConstEnums": true
  }
}
```

5. this 类型注解提示 noImplicitThis

- 这是因为 this 隐式具有 any 类型，如果没有指定类型注解，编译器会提示“"this" 隐式具有类型 "any"，因为它没有类型注释。”。

这个是用于控制当源文件中存在 this 的值是 any 的时候是否报错，noImplicitThis默认为false(严格模式，强制为true)，即当源文件中存在 this 为 any 的情况也不报错，如果设置为 true 则会报错

```js
// ts/index.ts
function foo(bar: string) {
    console.log(this.str); // 这里的this为any
}

// 改正方法为，显示指定this的类型
class Foo {
    str: string;
}
function foo(this: Foo, bar: string) { // 指定this为Foo类型的实例
    console.log(this.str);
}
```


# webpack 配置

需要配置 webpack.config.js，使其能够处理 TypeScript 代码

```js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

# 待学习

如何编写 Typescript 声明文件
https://juejin.cn/post/6844903693226082318#heading-8

https://segmentfault.com/a/1190000011853167?utm_source=tag-newest