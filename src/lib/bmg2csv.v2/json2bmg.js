import { copyright, version } from "./info.js";

export const JSONtoBMG = (object) => {
    let result = `#BMG\n\n`
    
    for (let code of object['@codes']) result += code + '\n'

    result += `\n# ${version}\n# ${copyright}\n\n`

    for (let loca in object.locations) {
        let data = object.locations[loca]
        if (data.attrib) result += `${loca} ${data.attrib} = ${data.content.replaceAll('\n', '\\n')}\n`
        else result += `${loca} = ${data.content.replaceAll('\n', '\\n')}`
    }

    return result
}