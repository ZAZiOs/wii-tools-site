import { error, redirect } from "@sveltejs/kit";
import { toCSV } from "$lib/dmbg2csv.js";

export async function POST({ request }) {
    try {
    const formData = Object.fromEntries(await request.formData())
    let {file, filename, delimeter} = formData
    if (!file.name || file.name === 'undefined') {
        error(400, 'You must provide a file to upload');
    }
    if (!delimeter) {delimeter = ','}
    if (!filename) {filename = 'result'}
    let buffer = Buffer.from(await file.arrayBuffer())
    
    let result = toCSV(buffer, {delimeter})
    return new Response(
        result,
        {
            status: 200,
            headers: {
                'Content-Type': 'application/octet-stream',
                'Content-Disposition':
                `attachment; filename*=UTF-8''${encodeURIComponent(filename + '.csv')}`,
            },
        }
    );}
    catch (err) {
        console.log(err)
        error(500, err)
    }
};