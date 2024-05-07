import { json2csv, csv2json } from 'json-2-csv';

/* 

Я, блять, не знаю сколько багов ещё найду с этим скриптом.
Было бы просто замечательно если бы этот скрипт работал идеально,
но у него судьба быть говнокодом, а значит и поделать ничего нельзя...

*/


export function toCSV (buffer, toCSVoptions) {
    let splitted = String(buffer).replaceAll('\r', '').split('\n')
    let at_codes = ""
    let result = []
    for (let line of splitted) {
        let temp = {}
        let subline = line
        if (line.includes('#')) {
            subline = line.split('#')[0]
        }
        if (subline) {
            if (subline[0] == "@") {
                at_codes += subline + "|"
            } else {
                //newline match
                if (subline.match(/^(?!=)\s\+/)) {
                    subline = subline.replace(/\s\+\s/, '').replace('\\n', '')
                    temp = {
                        location: "[newline]",
                        attrib: "-->",
                        original: subline,
                        translation: ""
                    }
                    
                } else if (subline.match(/[0-9a-f]+\s\[(.+)\]\s=/)) { //match with attrib
                    let match = subline.match(/([0-9a-f]+)\s(\[.+\])\s=/)
                    let orig_str = subline.replace(/([0-9a-f]+)\s(\[.+\])\s=\s/, "").replace('\\n', '')
                    temp = {
                        location: "!" + match[1],
                        attrib: match[2],
                        original: orig_str,
                        translation: ""
                    }
                } else if (subline.match(/[0-9a-f]+\s=/)) { //match without attrib
                    let match = subline.match(/([0-9a-f]+)\s=/)
                    let orig_str = subline.replace(/\s*[0-9a-f]+\s=\s/, "").replace('\\n', '')
                    temp = {
                        location: "!" + match[1],
                        attrib: "",
                        original: orig_str,
                        translation: ""
                    }
                } else {
                    let match = subline.match(/([0-9a-f]+)\s/)
                    console.log(subline)
                    temp = {
                        location: "!" + match[1],
                        attrib: "",
                        original: "<DONTEDIT> " + subline,
                        translation: "<DONTEDIT> " + subline
                    }
                }
                result.push(temp)
            }
        }
    }
    result.unshift({
            location: "@CODES",
            attrib: "",
            original: "<-- IGNORE THAT LINE -->",
            translation: at_codes
    })
    let csv = json2csv(result, toCSVoptions)
    return csv
}

export function toTXT (buffer, toCSVoptions) {
    let input = csv2json(String(buffer).replaceAll('\r', ""), toCSVoptions);
    let result = "#BMG\n"
    for (let line of input) {
        if (line.location == "@CODES") {
            let codes = line.translation.split('|')
            for (let i in codes) {
                result += codes[i] + '\n'
                if (i == (codes.length - 1)) {
                    result += "#-- Script done with love by ZAZiOs @ wii.zazios.ru --\n"
                }
            }
        } else if (String(line.translation).includes('<DONTEDIT> ')) {
            result += '\n' + String(line.translation).replace('<DONTEDIT> ', '')
        } else if (line.location != "[!COMMENT!]"){
            if (!line.translation || line.translation == "[original]") line.translation = line.original
            if (line.location == "[newline]") {
                result += `\\n\n	+ ${line.translation}` }
            else if (line.attrib) {
                result += `\n${line.location.replace('!', '')} ${line.attrib} = ${line.translation}`
            } else {
                result += `\n${line.location.replace('!', '')} = ${line.translation}`
            }
            
        }
    }
    return result
}

