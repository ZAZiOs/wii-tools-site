import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const convert = require('./xml-js-patch/lib/index.js');

import { json2csv } from 'json-2-csv';
import fs from 'fs'

const x = '×'

export const toCSV = (xml) => {
    const InputJSON = JSON.parse(convert.xml2json(xml, { compact: true, spaces: 4 })).root
    // fs.writeFileSync('./files/temp/weather.json', JSON.stringify(InputJSON, null, 4))    
    
    let result_country = makeCountry(InputJSON.country)
    let country_csv = json2csv(result_country, {delimiter: {field: ','}, emptyFieldValue: ''})
    
    let result_global = makeGlobal(InputJSON.international)
    let global_csv = json2csv(result_global, {delimiter: {field: ','}, emptyFieldValue: ''})

    return {country: country_csv, global: global_csv}
}


const makeCountry = (countries) => {
    let result_country = []
    for (let cnt in countries) {
        let country = countries[cnt]
        let temp_cnt = {
            region: country.name._attributes.eng,
            label_type: "country",
            latitude: x,
            longitude: x,
            zoom: x,
            ...country.name._attributes
        }
        result_country.push(temp_cnt)

        if (!country.city[0]) {
            let city = country.city
            result_country.push({
                label_type: 'city',
                latitude: city.latitude._text,
                longitude: city.longitude._text,
                zoom: city.zoom1._text,
                ...city._attributes
            })
            result_country.push({
                label_type: 'province',
                latitude: x,
                longitude: x,
                zoom: x,
                ...city.province._attributes
            })
            continue;
        }

        for (let city of country.city) {
            result_country.push({
                label_type: 'city',
                latitude: city.latitude._text,
                longitude: city.longitude._text,
                zoom: city.zoom1._text,
                ...city._attributes
            })
            result_country.push({
                label_type: 'province',
                latitude: x,
                longitude: x,
                zoom: x,
                ...city.province._attributes
            })
        }
    }
    return result_country
}
const makeGlobal = (global) => {
    let result = []
    for (let city of global.city) {
        result.push({
            label_type: 'country',
            latitude: city.latitude._text,
            longitude: city.longitude._text,
            zoom: city.zoom1._text,
            ...city.country._attributes
        })
        result.push({
            label_type: 'province',
            latitude: x,
            longitude: x,
            zoom: x,
            ...city.province._attributes
        })
        result.push({
            label_type: 'city',
            latitude: x,
            longitude: x,
            zoom: x,
            ...city.name._attributes
        })
    }
    return result
}