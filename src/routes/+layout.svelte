<script>
let yes = true
import { page } from '$app/stores';
</script>

<div class="bg-dark-subtle pt-4 w-100">
<ul class="nav nav-tabs d-flex justify-content-center">
    <li class="nav-item">
        <a class="nav-link" class:active={$page.url.pathname == '/'} href="/">Home</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" class:active={$page.url.pathname == '/bmgcsv'} href="/bmgcsv">WBMGT - CSV</a>
    </li>
    </ul>
</div>

<slot />