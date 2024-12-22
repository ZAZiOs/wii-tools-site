import { csv2json } from "json-2-csv"
import { copyright, version } from "./info.js";


export const toBMG = (buffer, options) => {
    let input = csv2json(String(buffer).replaceAll('\r', ""), options);
    let langs = Object.keys(input[0]).slice(2)
    let result = {}

    for (let line of input) {
        for (let lang of langs) {
            
            if (!result[lang]) result[lang] = `#BMG\n\n`

            if (line.location == '@CODES') {
                let codes = line.attrib.split('|')
                for (let i in codes) {
                    result[lang] += codes[i] + '\n'
                }
                result[lang] += `# ${version}\n# ${lang}\n# ${copyright}\n\n`
                continue;
            }
    
            if (line.location == "[IGNORE]") continue

            if (line[lang]) {
                if (line[lang] == "[NOT-FOUND]") continue;
                let content = String(line[lang]).replaceAll('\n', '\\n') + '\n'
                if (line.attrib) result[lang] += `${line.location.slice(1)} ${line.attrib} = ${content}`
                else result[lang] += `${line.location.slice(1)} = ${content}`

            }
        }
    }
    return result
}