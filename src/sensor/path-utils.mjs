import path from "path"

const getDate = () => new Date().toISOString().split('T')[0]

export const createGeneratedDirPath = name => `src${path.sep}generated${path.sep}${name}`
export const createGeneratedJsFilePath = (name, useDateStamp) => `.${path.sep}src${path.sep}generated${path.sep}${name}${path.sep}dependencies${useDateStamp ? '__' + getDate() : ''}.js`
export const createPathToPackageJson = pathToRepository => `${pathToRepository}${path.sep}package.json`
export const pathToGeneratedFolder = `.${path.sep}src${path.sep}generated${path.sep}`
export const pathToRepoRoutingJsFile = `.${path.sep}src${path.sep}routers${path.sep}repo-routing.js`
export const pathToDependencyJson = name => `../generated/${name}/dependencies.json`
export const pathToReducer = () => `.${path.sep}src${path.sep}generated${path.sep}repositories-dependency-reducer.js`
export const sanitize = string => string.replaceAll('-', '').replaceAll('@', '').replaceAll('\\', '').replaceAll('/', '')