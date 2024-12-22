export const BMGtoJSON = (fileContent) => {
    const lines = String(fileContent).split('\n');

    const result = {
        "@codes": [],
        locations: {}
    };

    let currentKey = null;
    let currentAttrib = "";
    let currentContent = "";

    for (const line of lines) {
        const trimmed = line.split('#')[0].trim();

        // Ignore comments and empty lines
        if (!trimmed) {
            continue;
        }

        // Handle @codes
        if (trimmed.startsWith('@')) {
            result["@codes"].push(trimmed);
            continue;
        }

        // Handle key=value or key [,attrib] = value lines
        const match = trimmed.match(/^(\w+)\s*(?:(\[[^\]]*\]))?\s*=\s(.*)$/);
        if (match) {
            if (currentKey) {
                // Process and save the previous content
                currentContent = currentContent.replace(/\+\s*/g, '').replace(/\\n/g, '\n');
                result.locations[currentKey] = {
                    "attrib": currentAttrib,
                    "content": currentContent
                };
            }

            currentKey = match[1];
            currentAttrib = match[2] || "";
            currentContent = match[3];
            continue;
        }

        // Handle continuation lines
        if (currentKey) {
            const continuationMatch = trimmed.match(/^\+\s*(.*)$/);
            if (continuationMatch) {
                currentContent += continuationMatch[1];
                continue;
            }
        }
    }

    // Save the last parsed entry if necessary
    if (currentKey) {
        currentContent = currentContent.replace(/\+\s*/g, '').replace(/\\n/g, '\n');
        result["locations"][currentKey] = {
            "attrib": currentAttrib,
            "content": currentContent
        };
    }

    return result;
}