import convert from 'xml-js'
import { csv2json } from 'json-2-csv';

export const toXML = (weather_xml, country_csv, global_csv, delimiter) => {
    if (!weather_xml) return 'error'
    
    const InputJSON = JSON.parse(convert.xml2json(weather_xml, { compact: true, spaces: 4 }))

    if (country_csv) {
        const country = makeCountry(csv2json(country_csv.replaceAll('\r', ''), {delimiter: {field: delimiter}}))
        InputJSON.root.country = country
    }

    if (global_csv) {
        const global =  makeGlobal( csv2json(global_csv.replaceAll('\r', ''), {delimiter: {field: delimiter}}))
        InputJSON.root.international = global
    }
    
    
    let result_xml = convert.json2xml(InputJSON, { compact: true, spaces: 4 })
    return result_xml
}


const makeCountry = (csv) => {
    let country = []
    let temp = {}
    for (let i in csv) {
        let line = csv[i]
        let next_line = csv[Number(i) + 1]

        if (line.label_type == 'country') temp = { name: { _attributes: makeAttrib(line) }, city: [] }
        if (line.label_type == 'city' && next_line.label_type == 'province') {
            temp.city.push( {
                _attributes: makeAttrib(line),
                province: { _attributes: makeAttrib(next_line) },
                longitude: { _text: line.longitude },
                latitude: { _text: line.latitude },
                zoom1: { _text: line.zoom },
                zoom2: { _text: 3 }
            })

        } 

        if (!next_line) break;
        if (next_line.label_type == 'country') country.push(temp)
    }
    return country
}

const makeGlobal = (csv) => {
    let global = []
    let temp = {}
    for (let i in csv) {
        i = Number(i)
        let line = csv[i]
        if (line.label_type == 'country') {
            temp = {
                province: {},
                longitude: { _text: line.longitude },
                latitude: { _text: line.latitude },
                zoom1: { _text: line.zoom },
                zoom2: { _text: 3 },
                country: { _attributes: makeAttrib(line)},
                name: {}
            }
        }
        if (line.label_type == 'province') temp.province._attributes = makeAttrib(line)
        if (line.label_type == 'city') {
            temp.name._attributes = makeAttrib(line)
            global.push(temp)
        }
    }
}

function makeAttrib(obj) {
    const targetKey = 'jpn';
    const newObj = {};
    let copy = false;
    for (const [key, value] of Object.entries(obj)) {
      if (key === targetKey) copy = true;
      if (copy) newObj[key] = value;
    }
    return newObj;
}
  