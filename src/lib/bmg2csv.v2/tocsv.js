import { json2csv } from 'json-2-csv';
import { BMGtoJSON } from './bmg2json.js';

export const toCSV = (input, options) => {
    let obj = {
        langs: Object.keys(input),
        keys: []
    }
    for (let lang in input) {
        obj[lang] = BMGtoJSON(input[lang])
        obj.keys = [...obj.keys, ...Object.keys(obj[lang].locations)]
    }

    obj.keys = [...new Set(obj.keys)] // Only unique values

    let result = []

    for (let key of obj.keys) {
        let temp = { location: '!' + key }
        for (let lang of obj.langs) {
            let msg = obj[lang].locations[key]
            if (!msg) {temp[lang] = "[NOT-FOUND]"; continue;}
            temp.attrib = msg.attrib
            temp[lang] = msg.content
        }
        result.push(temp)
    }

    let at_codes = ``
    for (let code of obj[obj.langs[0]]["@codes"]) at_codes += `${code}|`
    result.unshift({
        location: "@CODES",
        attrib: at_codes
    })

    let csv = json2csv(result, options)
    return csv
}
