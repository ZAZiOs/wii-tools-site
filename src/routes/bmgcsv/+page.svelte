<script>
let page = 'b2c'

</script>

<div class="container mt-3 text-center d-flex justify-content-center">

<div class="main-container">
<ul class="nav nav-tabs d-flex justify-content-center">
    <li class="nav-item">
        <button class="nav-link" class:active={page == 'b2c'} on:click={() => page="b2c"}>to CSV</button>
    </li>
    <li class="nav-item">
        <button class="nav-link" class:active={page == 'c2b'} on:click={() => page="c2b"}>to TXT (WBMGT)</button>
    </li>
</ul>
<div class="border border-top-0 rounded rounded-top-0 bg-dark-subtle p-4">
{#if page == 'b2c'}
<h1>WBGMT TO CSV</h1>

<form method="POST" action="bmgcsv/tocsv" enctype="multipart/form-data">
<div class="input-group">
    <input type="file" class="form-control" aria-label="Upload" name="file" required accept=".txt">
    <button class="btn btn-outline-success" type="submit"><i class="bi bi-send-fill d-block" style="transform: rotate(45deg) translateX(-1px) translateY(2px);"></i></button>
</div>
<div class="input-group mt-2">
    <span class="input-group-text">Delimeter</span>
    <select class="form-select" name="delimeter">
      <option value=",">,</option>
      <option value=";">;</option>
      <option value="\t">TAB</option>
    </select>
</div>

<div class="input-group mt-2">
    <span class="input-group-text">Result filename:</span>
    <input type="text" class="form-control" name="filename" value="result" required>
    <span class="input-group-text text-secondary">.csv</span>
</div>

</form>
{:else if page=="c2b"}
<h1>CSV TO WBMGT</h1>

<form method="POST" action="bmgcsv/totxt" enctype="multipart/form-data">
    <div class="input-group">
        <input type="file" class="form-control" aria-label="Upload" name="file" required accept=".csv">
        <button class="btn btn-outline-success" type="submit"><i class="bi bi-send-fill d-block" style="transform: rotate(45deg) translateX(-1px) translateY(2px);"></i></button>
    </div>
    <div class="input-group mt-2">
        <span class="input-group-text">Delimeter</span>
        <select class="form-select" name="delimeter">
          <option value=",">,</option>
          <option value=";">;</option>
          <option value="\t">TAB</option>
        </select>
    </div>
    
    <div class="input-group mt-2">
        <span class="input-group-text">Result filename:</span>
        <input type="text" class="form-control" name="filename" value="result" required>
        <span class="input-group-text text-secondary">.txt</span>
    </div>
    
    </form>
{/if}
</div>
</div>
</div>

<style>
    .main-container {
        max-width: 60rem;
    }
    .nav-link.active {
        background-color: var(--bs-dark-bg-subtle)!important;
    }
</style>