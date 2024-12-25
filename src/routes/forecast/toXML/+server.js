import { error, redirect } from "@sveltejs/kit";
import { toXML } from "$lib/weatherXML/toXML.js";

export const POST = async ({ request }) => {
try {
    const formData = await request.formData();
    const filename = formData.get('resultname')
    const delimiter = formData.get('delimiter')
    
    const weather = await formData.get('weatherfile').text()
    if (!weather) return error(400, "Weather.xml isn't present")
    
    const country = await formData.get('countryfile').text()
    const global = await formData.get('globalfile').text()
    

    let result_xml = toXML(weather, country, global, delimiter)
    
    return new Response(
        result_xml,
        {
            status: 200,
            headers: {
                'Content-Type': 'application/xml',
                'Content-Disposition':
                `attachment; filename*=UTF-8''${encodeURIComponent(filename + '.xml')}`,
            },
        }
    );
} catch (err){
    return error(500, err)
}
};
