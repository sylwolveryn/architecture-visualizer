const regexpGroupsByDash = /(?<groupName>[@a-z]+)-(?<subName>.*)/i
const regexpGroupsBySlash = /(?<groupName_02>[@a-z]+)\/(?<subName_02>.*)/i

export const mapToGroups = (dependencies, dependency, dependencyGroups) => {
    const groupsByDash = regexpGroupsByDash.exec(dependency)
    if (!groupsByDash) {
        if (!dependencyGroups[dependency])
        return [dependency, '']
        return [dependency, `: ${dependencies[dependency]}`]
    }
    let {groups: {groupName, subName}} = groupsByDash

    // where group does not make sense
    if (    groupName === 'uds'         && subName === 'sass-compiler'
        ||  groupName === 'eg'          && subName === 'clickstream-sdk-js'
        ||  groupName === 'experience'  && subName === 'template-renderer-react'
        ||  groupName === 'tokens'      && subName === 'web'
        ||  groupName === 'global'      && subName === 'components'
        ||  groupName === 'global'      && subName === 'controls-store'
        ||  groupName === 'export'      && subName === 'web'
        ||  groupName === 'pino'        && subName === 'rotating-file'
        ||  groupName === 'prop'        && subName === 'types'
        ||  groupName === 'cross'       && subName === 'env'
        ||  groupName === 'size'        && subName === 'limit'
        ||  groupName === 'statsd'      && subName === 'client'
        ||  groupName === '@size'       && subName === 'limit/preset-small-lib'
    ) return [`${groupName}-${subName}`, '']

    // where group makes sense just not the usual way
    if (groupName === '@shared' && subName.substr(0,2) === 'ui') return ['@shared-ui', subName.substring(3)]
    if (groupName === '@testing' && subName.substr(0,7) === 'library') ['@testing-library', subName.substring(8)]
    if (groupName === '@size-limit' && subName.substr(0,2) === 'limit') ['@size-limit', subName.substring(6)]

    const groupsBySlash = regexpGroupsBySlash.exec(dependency)
    if (!groupsBySlash) {
        return [groupName, subName]
    }
    const {groups: {groupName_02, subName_02}} = groupsBySlash
    // where group does not make sense
/*    if (    groupName === 'uds'         && subName === 'sass-compiler'
        ||  groupName === '@size'       && subName === 'limit/preset-small-lib'
    ) return [`${groupName}-${subName}`, '']
*/

    return [groupName_02, subName_02]

}
