<script>
    let files = [];
    let fileLanguages = [];
    let delimiter = ';'
    let filename = "result"
    let submit = false

    const predefinedLanguages = ["English", "French", "Castilian", "Italian", "German", "Dutch", "Korean", "Chinese (Traditional)", "Chinese (Simplified)", "Portuguese (Portugal)", "Portuguese (Brazil)", "Galician", "Russian", "Ukrainian", "Hungarian", "Catalan", "Japanese", "Spanish"].sort()
  
    function getCommonPrefix(strings) {
    return strings.reduce((commonPrefix, str) => {
        let i = 0;
        while (i < commonPrefix.length && i < str.length && commonPrefix[i] === str[i]) {
            i++;
        }
        return commonPrefix.substring(0, i) || 'result';
    }, strings[0] || "");
    }

    function handleFileChange(event) {
      files = Array.from(event.target.files);
      fileLanguages = files.map(() => ({
        selected: "",
        custom: ""
      })); // Initialize language chooses.
      filename = getCommonPrefix(files.map(file => file.name))
    }
  
    function handleLanguageChange(index, value) {
      fileLanguages.forEach((lang, idx) => {
      if (idx !== index && (lang.selected === value || lang.custom === value)) {
          lang.selected = "";
          lang.custom = "";   
        }
      });

      fileLanguages[index].selected = value;
      fileLanguages[index].custom = ""; // If language is selected - remove custom input
      submit = isFormValid()
    }
  
    function handleCustomLanguageChange(index, value) {
      fileLanguages.forEach((lang, idx) => {
      if (idx !== index && (lang.selected === value || lang.custom === value)) {
        lang.selected = ""; 
        lang.custom = ""; 
      }
      });


      fileLanguages[index].custom = value;
      fileLanguages[index].selected = ""; // If custom language is being input - remove selected one.
      submit = isFormValid()
    }
  
    function isLanguageDisabled(language, currentIndex) {
    return fileLanguages.some(
      (lang, index) =>
        index !== currentIndex && lang.selected === language && lang.custom === ""
    );
    }

    function isFormValid() {
    return fileLanguages.every(
      (language) => language.selected || language.custom
    );
    }

    async function handleSubmit() {
      const formData = new FormData();
  
      files.forEach((file, index) => {
        const language =
          fileLanguages[index].custom || fileLanguages[index].selected || "Unknown";
        formData.append(`file_${index}`, file);
        formData.append(`language_${index}`, language);
      });

      formData.append('delimiter', delimiter);
      formData.append('resultname', filename)
      const response = await fetch('/bmgcsv/tocsv', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        console.error('Ошибка при загрузке файла');
        return;
      }

      // Get file from response
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Temp element to download a file
      const a = document.createElement('a');
      a.href = url;
      a.download = filename + '.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // revoke url
      URL.revokeObjectURL(url);
      console.log(result);
      }
</script>
  
<div>
<input type="file" class="form-control" multiple accept=".txt" on:change="{handleFileChange}" />
{#if files.length > 0}
    <div>
    <table class="table bg-dark-subtle">
        <thead>
            <tr>
            <th scope="col">№</th>
            <th scope="col">Filename</th>
            <th scope="col">Language</th>
            <th scope="col">Custom language</th>
            </tr>
        </thead>
    {#each files as file, index}
        <tbody>
            <tr>
                <th scope="row p-1">{index + 1}</th>
                <td><code>{file.name}</code></td>
                <td><select class="form-select"
                bind:value="{fileLanguages[index].selected}"
                on:change="{(e) => handleLanguageChange(index, e.target.value)}"
                >
                <option value="" disabled selected>Choose language</option>
                {#each predefinedLanguages as language}
                    <option value="{language}" disabled="{isLanguageDisabled(language, index)}">{language}</option>
                {/each}
                </select></td>
                <td><input class="form-control" 
                type="text"
                placeholder="Or input your own"
                bind:value="{fileLanguages[index].custom}"
                on:input="{(e) => handleCustomLanguageChange(index, e.target.value)}"
                /></td>
            </tr>
        </tbody>
    {/each}
    </table>

  <div class="input-group mb-2">
    <span class="input-group-text">Delimiter</span>
      <select class="form-select" name="delimiter" bind:value={delimiter}>
        <option value=",">,</option>
        <option value=";">;</option>
        <option value="\t">TAB</option>
      </select>
  </div>

  <div class="input-group mb-3">
    <span class="input-group-text">Result filename:</span>
    <input type="text" class="form-control" name="filename" bind:value={filename} required>
    <span class="input-group-text text-secondary">.csv</span>
  </div>


  <button class="btn btn-outline-secondary" on:click="{handleSubmit}" disabled={!submit}>Send</button>
  </div>
{/if}
</div>
  

<style>
  :global(.table) {
    --bs-table-bg: var(--bs-dark-bg-subtle);
  }
  th {
    vertical-align: middle;
  }
  td {
    vertical-align: middle;
  }
</style>
