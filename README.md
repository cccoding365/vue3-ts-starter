<h1 align="center"> Vue3 Typescript Starter  </h1>
<p align="center"> 一个 Vue3 + Typescript 项目模板 </p>

> vite、eslint、prettier、husky、commitlint、lint-staged、stylelint

> Node版本：v16.20.1 包管理工具：pnpm v8.6.12

## 1.使用 vite 脚手架初始化项目

```bash
pnpm create vite vue3-ts-starter --template vue-ts
```

修改项目配置

```js
// vite.config.js

server: {
	// 主机
	host: "localhost",
	// 端口号
	port: 9999,
	// 自动打开浏览器
	open: true,
},
```

## 2.添加 eslint 代码质量校验和 prettier 代码格式校验

**安装所需的包：**

```bash
pnpm install eslint eslint-plugin-vue eslint-config-prettier prettier eslint-plugin-import eslint-plugin-prettier eslint-config-airbnb-base -D
```

- **eslint:** ESLint 的核心库
- **prettier:** Prettier 格式化代码的核心库
- **eslint-config-airbnb-base:** Airbnb 的代码规范（依赖 plugin-import ）
- **eslint-config-prettier:** ESLint 结合 Prettier 的格式化
- **eslint-plugin-vue:** ESLint 在 Vue 里的代码规范
- **eslint-plugin-import:** 项目里面支持 ESLint
- **eslint-plugin-prettier:** 将 Prettier 结合进 ESLint 的插件

**配置相应的 script 命令：**

```json
// package.json

script: {
	"lint:create": "eslint --init"
}
```

**执行该命令进行 eslint 的初始化，** 将创建文件`.eslintrc.cjs`：

```bash
npm run lint:create
```

**安装缺少的依赖：**

```bash
pnpm install typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-import-resolver-alias @types/eslint @types/node -D
```

## 3.安装 eslint 后的相关配置

```cjs
// .eslintrc.cjs

module.exports = {
	// 环境:
	env: {
		// 浏览器
		browser: true,
		// 最新es语法
		es2021: true,
		// node环境
		node: true,
	},
	// 扩展的eslint规范语法，可以被继承的规则
	// 字符串数组：每个配置继承它前面的配置
	// 分别是：
	// eslint-plugin-vue提供的
	// eslint-config-airbnb-base提供的
	// eslint-config-prettier提供的
	// 前缀 eslint-config-, 可省略
	extends: ["plugin:vue/vue3-strongly-recommended", "airbnb-base", "prettier"],
	// eslint 会对我们的代码进行检验
	// parser的作用是将我们写的代码转换为ESTree（AST）
	// ESLint会对ESTree进行校验
	parser: "vue-eslint-parser",
	// 解析器的配置项
	parserOptions: {
		// es的版本号，或者年份都可以
		ecmaVersion: "latest",
		parser: "@typescript-eslint/parser",
		// 源码类型 默认是script，es模块用module
		sourceType: "module",
		// 额外的语言类型
		ecmaFeatures: {
			tsx: true,
			jsx: true,
		},
	},
	// 全局自定义的宏，这样在源文件中使用全局变量就不会报错或者警告
	globals: {
		defineProps: "readonly",
		defineEmits: "readonly",
		defineExpose: "readonly",
		withDefault: "readonly",
	},
	// 插件
	// 前缀 eslint-plugin-, 可省略
	// vue官方提供了一个ESLint插件 eslint-plugin-vue，它提供了parser和rules
	// parser为 vue-eslint-parser，放在上面的parsr字段，rules放在extends字段里，选择合适的规则
	plugins: ["vue", "@typescript-eslint"],
	settings: {
		// 设置项目内的别名
		"import/reslover": {
			alias: {
				map: [["@", "./src"]],
			},
		},
		// 允许的扩展名
		"import/extensions": [".js", ".jsx", ".ts", ".tsx", ".mjs"],
	},
	// 自定义规则，覆盖上面extends继承的第三方库的规则，根据组内成员灵活定义
	rules: {
		"import/no-extraneous-dependencies": 0,
		"no-param-reassing": 0,
		"vue/multi-word-commponent-names": 0,
		"vue/attribute-hyphenation": 0,
		"vue/v-on-event-hyphenation": 0,
	},
};
```

**配置相应的 script 命令：**

```json
// package.json

script: {
	"lint": "eslint \"src/**/*.{js,vue,ts}\" --fix"
}
```

**安装相关的插件并在 vite.config.js 中添加对应的配置：**

```js
// vite.config.js

import eslintPlugin from "vite-plugin-eslint";

// ...

plugins: [...,eslintPlugin()];
```

**新建文件 .eslintrcignore 进行忽略校验的配置：**

```
*.sh
node_modules
*.md
*.woff
*.ttf
.vscode
.idea
dist
/public
/docs
.husky
/bin
.eslintrc.js
prettier.config.js
/src/mock/*

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

.DS_Store
dist-ssr
*.local

/cypress/videos/
/cypress/screenshots/

# Editor directories and files
.vscode
!.vscode/extensions.json
.idea
*.suo
*.njsproj
*.sln
*.sw?

components.d.ts
```

## 4.安装 prettier 后的相关配置

```js
// .prettierc.cjs

module.exports = {
	// 一行最多多少字符
	printWidth: 80,
	// 使用2个空格缩进
	tabWidth: 2,
	// 使用tab缩进，不使用空格
	useTabs: true,
	// 行尾需要分号
	semi: true,
	// 使用单引号
	singleQuote: false,
	// 对象的key仅在必要时使用引号
	quoteProps: "as-needed",
	// jsx不使用单引号，而使用双引号
	jsxSingleQuote: false,
	// 尾随逗号
	trailingComma: "es5",
	// 大括号内的收尾需要空格
	bracketSpacing: true,
	// 箭头函数，只有一个参数的时候，也需要括号
	arrowParens: "always",
	// 每个文件格式化的范围是文件的全部内容
	rangeStart: 0,
	rangeEnd: Infinity,
	// 不需要写文件开头的@prettier
	requirePragma: false,
	// 不需要自动在文件开头插入@prettier
	insertPragma: false,
	// 使用默认的折行标准
	proseWrap: "always",
	// 根据显示样式决定html要不要折行
	htmlWhitespaceSensitivity: "css",
	// 换行符使用lf
	endOfLine: "lf",
};
```

**新建文件 .perttierignore 进行忽略校验的配置：**

```
/dist/*
.local
.output.js
/node_modules/**
src/.DS_Store

**/*.svg
**/*.sh

/public/*
components.d.ts
```

**配置相应的 script 命令：**

```json
// package.json

script: {
	"prettier-format": "prettier --config .prettierrc.cjs \"src/**/*.{vue,js,ts}\" --write"
}
```

**配置 tsconfig.json**

```json
// tsconfig.json

{
	"compilerOptions": {
		// 指定es的目标版本
		"target": "ESNext",
		"useDefineForClassFields": true,
		"module": "ESNext",
		// 决定如何处理模块
		"moduleResolution": "node",
		"strict": true,
		"jsx": "preserve",
		"sourceMap": true,
		"resolveJsonModule": true,
		"isolatedModules": true,
		"esModuleInterop": true,
		// 编译过程中需要引入的库文件的列表
		"lib": ["ESNext", "DOM", "DOM.Iterable"],
		// 默认所有可见的"@types"包会在编译过程中被包含进来
		"types": ["vite/client"],
		"skipLibCheck": true,
		"noEmit": true,
		// 解析非相对模块名的基准目录
		"baseUrl": ".",
		// 模块名到基于baseurl的路径映射的列表
		"paths": {
			"@/": ["scr/"],
			"*.ts": ["*"]
		}
	},
	"include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
	"references": [{ "path": "./tsconfig.node.json" }]
}
```

## 6.安装 husky、lint-staged、commitlint

**安装相应的依赖：**

```bash
pnpm install husky lint-staged @commitlint/config-conventional @commitlint/cli -D
```

**将项目目录初始化为 Git 仓库：**

```bash
git init
```

**配置 script 命令：**

```json
// package.json

script: {
	"prepare": "husky install"
}
```

**执行命令将 husky 安装完毕：**

```bash
npm run prepare
```

**添加 pre-commit 钩子**

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

**对该钩子进行相关的配置：**

```json
// package.json

"lint-staged": {
    "*.{js,jsx,vue,ts,tsx}": [
		"npm run lint",
		"npm run prettier-format"
    ]
}
```

**添加 commit-msg 钩子**

```bash
npx husky add .husky/commit-msg "npx --no -- commitlint --edit ${1}"
```

**新建 commitlint.config.cjs 文件并进行相关的配置：**

```js
// commitlint.config.cjs

module.exports = {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"type-enum": [
			2,
			"always",
			[
				// 编译相关的修改，例如发布版本，对项目构建或者依赖的改动
				"build",
				// 新功能(feature)
				"feat",
				// 修复bug
				"fix",
				// 更新某功能
				"update",
				// 重构
				"refactor",
				// 文档
				"docs",
				// 构建过程或者辅助工具的变动,如增加依赖库等
				"chore",
				// 不影响代码运行的变动
				"style",
				// 撤销commit,回滚到上一个版本
				"revert",
				// 性能优化
				"perf",
				// 测试(单元,集成测试)
				"test",
			],
		],
		"type-case": [0],
		"type-empty": [0],
		"scope-empty": [0],
		"scope-case": [0],
		"subject-full-stop": [0, "never"],
		"subject-case": [0, "never"],
		"header-max-length": [0, "always", 74],
	},
};
```

## 7.安装 stylelint 进行 CSS 代码格式校验

**安装相关的校验库：**

```bash
pnpm install stylelint stylelint-config-standard -D
```

**新建 .stylelintrc.cjs 文件，并进行相关配置：**

```cjs
// .stylelintrc.cjs

module.exports = {
	extends: ["stylelint-config-standard"],
};
```

**安装对各种预处理 CSS 的依赖支持：**

```bash
# 对 less 的支持
pnpm install stylelint-less stylelint-config-recommended-less -D

# 对 scss 的支持
pnpm install stylelint-scss stylelint-config-recommended-scss postcss -D

# 对 vue 的支持
pnpm install postcss-html stylelint-config-standard-scss stylelint-config-recommended-vue postcss -D
```

**根据具体场景在 .stylelintrc.cjs 文件中修改配置：**

```cjs
// .stylelintrc.cjs

extends: [
	"stylelint-config-standard",
	"stylelint-config-recommended-less",
	"stylelint-config-recommended-vue",
]
```

**配置 script 命令：**

```json
// package.json

script: {
	"lint:css": "stylelint **/*.{vue,css,less} --fix"
}
```

**安装并在 vite.config.js 中配置相关的插件：**

```bash
pnpm install vite-plugin-stylelint -D
```

```js
// vite.config.js
import stylelitPlugin from 'vite-plugin-stylelint';

// ...

plugins: [...,stylelitPlugin()],
```

**lint-staged 相关配置：**

```json
// package.json

"lint-staged": {
    "*.{js,jsx,vue,ts,tsx}": [
    	"npm run lint",
    	"npm run prettier-format"
    ],
    "*.{vue,less,css,scss,sass}": [
    	"npm run lint:css"
    ]
}
```

**新建并配置 .stylelintignore 文件：**

```
/dist/*
/public/*
```

**完善 .stylelintrc.cjs 内部的其他配置：**

```cjs
// .stylelintrc.cjs

module.exports = {
	extends: ["stylelint-config-standard", "stylelint-config-recommended-vue"],
	overrides: [
		// 若项目中存在scss文件，添加以下配置
		{
			files: ["*.scss", "**/*.scss"],
			customSyntax: "postcss-scss",
			extends: ["stylelint-config-recommended-scss"],
		},
		// 若项目中存在less文件，添加以下配置
		{
			files: ["*.less", "**/*.less"],
			customSyntax: "postcss-less",
			extends: ["stylelint-config-recommended-less"],
		},
	],
};
```

## 8.环境变量配置

**在 package.json 文件中配置对应的脚本：**

```json
"build:pre": "vue-tsc --noEmit && vite build --mode staging",
"build:prod": "vue-tsc --noEmit && vite build --mode production"
```

**新建文件并分别进行常量配置:**

- .env
- .env.staging
- .env.production

```js
// development
VITE_BASE_URL = "http://dev.xxx.com/api";

// staging
VITE_BASE_URL = "http://pre.xxx.com/api";

// production
VITE_BASE_URL = "https://xxx.com/api";
```
