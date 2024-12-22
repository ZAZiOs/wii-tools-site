<script>

let filename = 'result'

function handleFileChange(e) {
  const file = e.target.files[0]; 
  if (file) {
    filename = file.name.replace('.csv', '');
  }
}


</script>

<div>
    <form enctype="multipart/form-data" method="POST" action="/bmgcsv/tobmg">
      <div class="input-group">
        <input type="file" class="form-control" name="file" required accept=".csv" on:change={handleFileChange}>
        <button class="btn btn-outline-success" type="submit">
          <i class="bi bi-send-fill d-block" style="transform: rotate(45deg) translateX(-1px) translateY(2px);"></i>
        </button>
      </div>
      <div class="input-group mt-2">
        <span class="input-group-text">Delimiter</span>
        <select class="form-select" name="delimiter">
          <option value=",">,</option>
          <option value=";" selected>;</option>
          <option value="\t">TAB</option>
        </select>
      </div>
      
      <div class="input-group mt-2">
        <span class="input-group-text">Result filename:</span>
        <input type="text" class="form-control" name="resultname" bind:value={filename} required>
        <span class="input-group-text text-secondary">.zip</span>
      </div>
    </form>
</div>
  