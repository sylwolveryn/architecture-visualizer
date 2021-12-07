import fs from "fs"
import path from "path"
import {pathToGeneratedFolder, pathToRepoRoutingJsFile, pathToDependencyJson} from "./path-utils.mjs"
import fileSystem from "fs"

async function generateRoutersFileForReact(repositoryNames) {
    const contentToWrite = `export const routes = [${repositoryNames.map(name => `'${pathToDependencyJson(name)}'`)}]
export const names = ${JSON.stringify(repositoryNames.filter(Boolean), null, 4)}`
    try {
        await fileSystem.promises.unlink(pathToRepoRoutingJsFile)
    } catch (err) {
        // tssss 🤫
    }
    try {
        await fileSystem.promises.appendFile(pathToRepoRoutingJsFile, contentToWrite)
    } catch (err) {
        console.log(`${pathToRepoRoutingJsFile} File could not created`)
        throw err
    }
}

async function readRepoNames() {
    console.log(`START reading generated repository names`)
    try {
        const repositoryNames = fileSystem.readdirSync(pathToGeneratedFolder, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)
        console.log(repositoryNames)
        const pathsToDependenciesJsonFiles = repositoryNames.map(name => `${pathToGeneratedFolder}${name}${path.sep}dependencies.js`)
        let index = 0
        pathsToDependenciesJsonFiles.forEach(path => {
            const fileNotExists = !fs.existsSync(path)
            if (fileNotExists) {
                console.warn(`WARN: ${path} does not exists. Run node-sensor for this repo before spinning up the React application`)
                delete repositoryNames[index++]
            }
            index++
        })
        if (repositoryNames.length === 0) throw `WARN: ${path} does not exists. Run node-sensor for this repo before spinning up the React application`

        await generateRoutersFileForReact(repositoryNames)
    } catch (err) {
        console.log(`STOP reading generated repository names with ERROR.`)
        console.error(err)
    }
}

readRepoNames().then(data => {
    console.log('Finished generating routers for react')
})