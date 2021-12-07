import detectors from "./framework-sensor.mjs"
import fileSystem from "fs"
import fs from "fs-extra"
import arg from "arg"
import {
    createGeneratedDirPath,
    createGeneratedJsFilePath, pathToReducer,
    createPathToPackageJson,
    pathToGeneratedFolder, sanitize
} from "./path-utils.mjs"
import {mapToGroups} from "./node-dependency-tools.mjs"

const args = arg({
    // Types
    '--useDateStamp':        Boolean,
    '--pathToRepository':    String,

    // Aliases
    '-d':        '--useDateStamp',
    '-p':        '--pathToRepository',
})
const useDateStamp = args['--useDateStamp'] || false
const pathToRepository = args['--pathToRepository'] || false
if (!pathToRepository) throw new Error('missing required argument: --pathToRepository or short: -p. Example usage: yarn run node-sensor -p ./')

const mapToDependencieGroups = (dependencies = {}) => {
    const dependencyGroups = {}
    Object.keys(dependencies).forEach(dependency => {
        const [groupName, subName] = mapToGroups(dependencies, dependency, dependencyGroups)
        if (!dependencyGroups[groupName]) dependencyGroups[groupName] = []
        dependencyGroups[groupName].push(`${subName && subName + ': '}${dependencies[dependency]}`)
    })

    return dependencyGroups
}

async function generateDependencyJsonAsJs({name, dependencyGroups, devDependencyGroups, peerDependencyGroups}) {
    const cleanName = sanitize(name)
    console.log(`START ${name} dependency creation under ${cleanName}/dependencies.js`)
    try {
        await fs.mkdirp(createGeneratedDirPath(cleanName))
        const allDependencies = {...dependencyGroups, ...devDependencyGroups, ...peerDependencyGroups}
        const frameworks = detectors.frameWorkDetector(allDependencies)
        const language = detectors.languageDetector(allDependencies)

        const filepath = createGeneratedJsFilePath(cleanName, useDateStamp)
        const contentToWrite = `const dependencies = ${JSON.stringify({name: cleanName, language, frameworks, allDependencies, devDependencyGroups, dependencyGroups, peerDependencyGroups}, null, 4)}\nexport default dependencies`

        try {
            await fileSystem.promises.unlink(filepath)
        } catch (err) {
            // tssss 🤫
        }
        try {
            await fileSystem.promises.appendFile(filepath, contentToWrite)
        } catch (err) {
            console.log(`File could not created`)
            throw err
        }
    } catch (err) {
        console.log(`STOP generating ${name}/dependencies.js with ERROR.`)
        console.error(err)
    }
}

async function generateDependencyReducer() {
    console.log(`START generated/reducer.js upsert`)
    try {
        const filepath = pathToReducer()
        const repositoryNames = fileSystem.readdirSync(pathToGeneratedFolder, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)
        const exportConstantsToDependenciesJsonFiles = repositoryNames.map(name => `import ${sanitize(name)} from './${sanitize(name)}/dependencies'\n`)
        const contentToWrite = `${exportConstantsToDependenciesJsonFiles.join('')}
const repositoryNames = {
${repositoryNames.map(name => sanitize(name))},
}
export default repositoryNames`
        try {
            await fileSystem.promises.unlink(filepath)
        } catch (err) {
            // tssss 🤫
        }
        try {
            await fileSystem.promises.appendFile(filepath, contentToWrite)
        } catch (err) {
            console.log(`File could not created`)
            throw err
        }
    } catch (err) {
        console.log(`STOP generating dependencies.json with ERROR.`)
        console.error(err)
    }
}

async function processPackageJson() {
    console.log(`START package.json reading`)
    try {
        const packageJson = await fs.readJson(createPathToPackageJson(pathToRepository))
        const {name, dependencies, devDependencies, peerDependencies} = packageJson
        const dependencyGroups = mapToDependencieGroups(dependencies)
        const devDependencyGroups = mapToDependencieGroups(devDependencies)
        const peerDependencyGroups = mapToDependencieGroups(peerDependencies)

        console.log(`${name} - package.json reading finished with SUCCESS.`)
        return {
            name, devDependencyGroups, dependencyGroups, peerDependencyGroups
        }
    } catch (err) {
        console.log(`STOP package.json reading with ERROR.`)
        console.error(err)
    }
}

processPackageJson().then(async data => {
    await generateDependencyJsonAsJs(data)
    await generateDependencyReducer()
})
