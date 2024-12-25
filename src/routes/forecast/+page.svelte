<script>
    let page = 'c2x'
    let filename = 'weather'
</script>

<svelte:head>
  <title>CSV -> Weather.xml</title>
  <meta property="description" content="Spreadsheet to Forecast channel configuration file." />
</svelte:head>

<div class="container mt-3 d-flex justify-content-center">

<div class="main-container">
<!--
<ul class="nav nav-tabs d-flex justify-content-center nav-bar-m">
    <li class="nav-item">
        <button class="nav-link" class:active={page == 'b2c'} on:click={() => page="b2c"}>to CSV</button>
    </li>
    <li class="nav-item">
        <button class="nav-link" class:active={page == 'c2b'} on:click={() => page="c2b"}>to TXT (BMG)</button>
    </li>
</ul>
<div class="border border-top-0 rounded bg-dark-subtle p-4">
^ If tabs enabled leave this
v If not use this div -->
<div class="border rounded bg-dark-subtle p-4">
{#if page == 'c2x'}
<h1 class="text-center mb-3">weather.xml patcher</h1>

<div>
    <form enctype="multipart/form-data" method="POST" action="/forecast/toXML">
      <div class="input-group">
        <input type="file" class="form-control" name="countryfile" accept=".csv" >
        <span class="input-group-text text-warning"> &lt;- Country.csv</span>
      </div>
      <div class="input-group mt-2">
        <input type="file" class="form-control" name="globalfile" accept=".csv" >
        <span class="input-group-text text-info"> &lt;- Global.csv</span>
      </div>
      <div class="input-group mt-2">
        <input type="file" class="form-control" name="weatherfile" required accept=".xml" >
        <span class="input-group-text text-danger"> &lt;- Weather.xml</span>
      </div>
      <div class="input-group mt-2">
        <span class="input-group-text">Delimiter</span>
        <select class="form-select" name="delimiter">
          <option value="," selected>,</option>
          <option value=";">;</option>
          <option value="\t">TAB</option>
        </select>
        <button class="btn btn-outline-success" type="submit">
            <i class="bi bi-send-fill d-block" style="transform: rotate(45deg) translateX(-1px) translateY(2px);"></i>
          </button>
      </div>
      
      <div class="input-group mt-2">
        <span class="input-group-text">Result filename:</span>
        <input type="text" class="form-control" name="resultname" bind:value={filename} required>
        <span class="input-group-text text-secondary">.xml</span>
        
      </div>
    </form>
</div>
{/if}
</div>
</div>
</div>

<style>
    .main-container {
        max-width: 60rem;
    }
    /*
    .nav-bar-m{
        margin-right: 0.375rem;
        margin-left: 0.375rem;
    }
    .nav-link.active {
        background-color: var(--bs-dark-bg-subtle)!important;
    }
    p {
        margin-bottom: 0;
        font-size: 1.1rem;
        max-width: 50rem;
    }
    h1, h3, h4 {
        margin: 0;
        max-width: 50rem;
    }*/
</style>