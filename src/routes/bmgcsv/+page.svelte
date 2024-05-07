<script>
let page = 'b2c'

</script>

<div class="container mt-3 d-flex justify-content-center">

<div class="main-container">
<ul class="nav nav-tabs d-flex justify-content-center nav-bar-m">
    <li class="nav-item">
        <button class="nav-link" class:active={page == 'b2c'} on:click={() => page="b2c"}>to CSV</button>
    </li>
    <li class="nav-item">
        <button class="nav-link" class:active={page == 'c2b'} on:click={() => page="c2b"}>to TXT (WBMGT)</button>
    </li>
    <li class="nav-item">
        <button class="nav-link" class:active={page == 'details'} on:click={() => page="details"}>Details</button>
    </li>
</ul>
<div class="border border-top-0 rounded bg-dark-subtle p-4">
{#if page == 'b2c'}
<h1 class="text-center">WBGMT TO CSV</h1>

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
<h1 class="text-center">CSV TO WBMGT</h1>

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
{:else if page == "details"}
<h1 class="text-center"><i>Additional information</i></h1>
<h3 style="color: #0aab60" class="text-center">Why should I use this script?</h3>
<p>In my opinion translations are easier done in a spreadsheet. It's easier to find what you're looking for, see what you've done or will do and collaborate at ease.</p>
<p><i class="text-secondary fs-6">PROTIP: Uploading this file to Google Sheets or Microsoft 365 can allow two or more people to edit the file at the same time.</i></p>
<br>
<h3 class="text-warning text-center">Spreadsheet tags:</h3>

<h4>If <code>location</code> column has:</h4>
<p><code>@CODES</code> - this string contains BMG file configuration. Change if you know what you're doing.</p>
<p><code>!XXXXXX</code> <i class="text-secondary fs-6">(where X are random letters and numbers)</i> - location of the string in the code. This cannot be changed.</p>
<p><code>[newline]</code> - continuation from the one above, but, as the name suggests, in a new line.</p>
<p><code>[!COMMENT!]</code> - parcer will ignore this string.</p>
<br>
<p>Some strings of the translation column can be marked with <code>[original]</code>, in that case the string will be the same as the one in original column.</p>
<p><code>&ltDONTEDIT&gt</code> strings should be changed if you know what you're doing. Usually it's some unusual string that the parser hasn't figured out how to convert to the table.</p>


{/if}
</div>
</div>
</div>

<style>
    .main-container {
        max-width: 60rem;
    }
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
    }
</style>