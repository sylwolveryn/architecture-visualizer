const FRONT_END_FRAMEWORKS = {
    PREACT: "preact",
    VUE: "vue",
    EMBER: "ember",
    METEOR: "meteor",
    MITHRIL: "mithril",
    REACT: "react",
    REACT_NATIVE: "react-native",
    ANGULAR_JS: "angular",
    ANGULAR: "@angular/core",
    IONIC: "@ionic/core",
    SVELTE: "svelte",
}
const BACK_END_FRAMEWORKS = {
    EXPRESS: "express",
    KOA: "koa",
    Hapi: "@hapi/hapi",
}
const TEST_FRAMEWORKS = {
    JEST: "jest",
    CYPRESS: "cypress",
    MOCHA: "mocha",
    CHAI: "chai",
    SINON: "sinon",
    JASMIN: "jasmin",
    ENZYME: "enzyme",
    KARMA: "karma",
    ISTANBUL: "istanbul",
    NYC: "nyc",
    REACT_TESTING_LIBRARY: "@testing-library/react",
}

const DOMINANT_LIBRARIES = {
    MOBX: "mobx",
    RAMDA: "ramda",
    LODASH: "lodash",
    JQUERY: "jquery",
    RXJS: "rxjs",
    AXIOS: "axios",
    CHALK: "chalk",
    DEBUG: "debug",
    MOMENT: "moment",
    TS_LIB: "tslib",
    GLOB: "glob",
    COLORS: "colors",
    INQUIRER: "inquirer",
    WEBPACK: "webpack",
    BABEL: "@babel/core",
    UUID: "uuid",
    CLASSNAMES: "classnames",
    semver: "semver",
    LESS: "less",
    SASS: "sass",
    NODE_SASS: "node-sass",
    STYLUS: "stylus",
    POST_CSS: "postcss",
    RIMRAF: "rimraf",
    REDUX: "redux",
    WINSTON: "winston",
    GULP: "gulp",
    GRUNT: "grunt",
    AWS_SDK: "aws-sdk",
    EJS: "ejs",
    MONGODB: "mongodb",
    MOONGOOSE: "mongoose",
    REDIS: "redis",
    CHOKIODAR: "chokidar",
    CO: "co",
    IMMUTABLE: "immutable",
    MYSQL: "mysql",
    CORS: "cors",
    GRAPHQL: "graphql",
    REDUX_THUNK: "redux-thunk",
    POSTGRES: "pg",
    D3: "d3",
    PASSPORT: "passport",
    PUPPETEER: "puppeteer",
    SEQUELIZE: "sequelize",
    NORMALIZE_CSS: "normalize.css",
    NODEMON: "nodemon",
    FIREBASE: "firebase",
    HELMET: "helmet",
    REDUX_SAGA: "redux-saga",
    REACT_ROUTER_REDUX: "react-router-redux",
    BOOTSTRAP: "bootstrap",
    MATERIAL_UI: "material-ui",
    ECHARTS: "echarts",
    PROTOBUFJS: "protobufjs",
    GITHUB_OCTOKIT: "@octokit/rest",
    THREE_JS: "three",
}

const FORMATTERS_LINTERS = {
    ESLINT: 'eslint',
    TSLINT: 'tslint',
    PRETTIER: "prettier",
    BEAUTIFY: "beautify",
    EDITOR_CONFIG: "editorconfig",
}

const FE_DEPENDENCIES = Object.values(FRONT_END_FRAMEWORKS)
const BE_DEPENDENCIES = Object.values(BACK_END_FRAMEWORKS)
const TEST_DEPENDENCIES = Object.values(TEST_FRAMEWORKS)
const DOMINANT_DEPENDENCIES = Object.values(DOMINANT_LIBRARIES)
const FORMATTER_LINTER_DEPENDENCIES = Object.values(FORMATTERS_LINTERS)

const detectors = {
    frameWorkDetector: (dependencies) => {
        const allDependencyKeys = Object.keys(dependencies)
        const frontEndFrameworks = allDependencyKeys.filter(dependency => FE_DEPENDENCIES.includes(dependency))
        const backEndFrameworks = allDependencyKeys.filter(dependency => BE_DEPENDENCIES.includes(dependency))
        const testFrameworks = allDependencyKeys.filter(dependency => TEST_DEPENDENCIES.includes(dependency))
        const dominantLibs = allDependencyKeys.filter(dependency => DOMINANT_DEPENDENCIES.includes(dependency))
        const formatterLinterLibs = allDependencyKeys.filter(dependency => FORMATTER_LINTER_DEPENDENCIES.includes(dependency))
        return {
            frontEndFrameworks,
            backEndFrameworks,
            testFrameworks,
            dominantLibs,
            formatterLinterLibs,
        }
    },
    languageDetector: (dependencies) => {
        const allDependencyKeys = Object.keys(dependencies)
        return allDependencyKeys.filter(dependency => dependency.includes('@typescript')) ? 'typescript' : 'javascript'
    }
}

export default detectors