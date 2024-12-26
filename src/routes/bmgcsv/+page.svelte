<script>
    import Form2csv from "$lib/bmg2csv.v2.el/form2csv.svelte";
    import Form2bmg from "$lib/bmg2csv.v2.el/form2bmg.svelte";
    let page = 'b2c'
</script>

<svelte:head>
  <title>WBMGT - CSV Tool v2</title>
  <meta property="description" content="On this page you can find wbmgt.txt file to csv converter." />
</svelte:head>

<div class="container mt-3 d-flex justify-content-center">

<div class="main-container">
<ul class="nav nav-tabs d-flex justify-content-center nav-bar-m">
    <li class="nav-item">
        <button class="nav-link" class:active={page == 'b2c'} on:click={() => page="b2c"}>to CSV</button>
    </li>
    <li class="nav-item">
        <button class="nav-link" class:active={page == 'c2b'} on:click={() => page="c2b"}>to TXT (BMG)</button>
    </li>
    <!--<li class="nav-item">
        <button class="nav-link" class:active={page == 'details'} on:click={() => page="details"}>Details</button>
    </li>-->
</ul>
<div class="border border-top-0 rounded bg-dark-subtle p-4">
{#if page == 'b2c'}
<h1 class="text-center mb-3">Multiple BMGs to CSV</h1>

<Form2csv></Form2csv>

{:else if page=="c2b"}
<h1 class="text-center mb-3">CSV to Multiple BMGs</h1>

<Form2bmg></Form2bmg>

{:else if page == "details"}
<h1 class="text-center"><i>Additional information</i></h1>
too lazy to do it rn.
{/if}
</div>
</div>
</div>

<div class="text-center mt-2">
<a href="/bmgcsv/v1" class="text-secondary">old version here</a>
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
