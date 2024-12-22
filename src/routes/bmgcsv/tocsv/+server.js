import { error, redirect } from "@sveltejs/kit";
import { toCSV } from "$lib/bmg2csv.v2/tocsv.js";

import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
  const formData = await request.formData();
  const result = {};
  const filename = formData.get('resultname')
  const delimiter = formData.get('delimiter')
  for (const key of formData.keys()) {
    if (key.startsWith('file')) {
      const file = formData.get(key);
      const languageKey = key.replace('file', 'language');
      const language = formData.get(languageKey);

      const text = await file.text(); // read file content
      result[language] = text
    }
  }

  let csv = toCSV(result, {delimiter: {field: delimiter}, emptyFieldValue: ''})

  return new Response(
    csv,
    {
        status: 200,
        headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition':
            `attachment; filename*=UTF-8''${encodeURIComponent(filename + '.csv')}`,
        },
    }
    );
};
