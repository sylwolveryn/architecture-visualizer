export const getCleanedDependencies = dependencies => {
    const cleanedDependencies = { ...dependencies}
    if (!dependencies?.frameworks?.frontEndFrameworks?.length) delete cleanedDependencies.frameworks.frontEndFrameworks
    if (!dependencies?.frameworks?.backEndFrameworks?.length) delete cleanedDependencies.frameworks.backEndFrameworks
    if (!dependencies?.frameworks?.testFrameworks?.length) delete cleanedDependencies.frameworks.testFrameworks
    if (!dependencies?.frameworks?.dominantLibs?.length) delete cleanedDependencies.frameworks.dominantLibs
    if (!dependencies?.frameworks?.formatterLinterLibs?.length) delete cleanedDependencies.frameworks.formatterLinterLibs

    if (!Object.keys(dependencies?.dependencyGroups)?.length) delete cleanedDependencies.dependencyGroups
    if (!Object.keys(dependencies?.devDependencyGroups)?.length) delete cleanedDependencies.devDependencyGroups
    if (!Object.keys(dependencies?.peerDependencyGroups)?.length) delete cleanedDependencies.peerDependencyGroups
    return cleanedDependencies
}
