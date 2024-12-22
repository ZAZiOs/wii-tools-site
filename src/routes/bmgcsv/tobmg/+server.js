import { json } from '@sveltejs/kit';
import { toBMG } from '$lib/bmg2csv.v2/tobmg.js';
import archiver from 'archiver';


export async function POST({ request }) {
    const formData = await request.formData();
    const file = formData.get('file');
    let delimiter = formData.get('delimiter');
    let filename = formData.get('resultname');

    if (!file || file.type !== 'text/csv') {
        return json({ error: 'Invalid file type, only CSV is allowed.' }, { status: 400 });
    }

    if (!delimiter) { delimiter = ';' }
    if (!filename) { filename = 'result' }

    const fileContent = await file.text();
    let bmgList = toBMG(fileContent, { delimiter: { field: delimiter } });

    let archive = await createArchive(bmgList)
    
    console.log(archive)

    return new Response(
        archive,
        {
            status: 200,
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition':
                `attachment; filename*=UTF-8''${encodeURIComponent(filename + '.zip')}`,
            },
        }
    );
}

async function createArchive(data) {
    return new Promise((resolve, reject) => {
        const archive = archiver('zip', { zlib: { level: 9 } });
        const buffers = []; 

        archive.on('data', (chunk) => buffers.push(chunk));
        archive.on('error', (err) => reject(err));
        archive.on('end', () => resolve(Buffer.concat(buffers)));

        for (const [key, value] of Object.entries(data)) {
            archive.append(value, { name: `${key}.txt` });
        }

        archive.finalize();
    });
}