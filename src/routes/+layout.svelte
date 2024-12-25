<script>
let yes = true
import { page } from '$app/stores';
import { inject } from '@vercel/analytics'
inject()
</script>

<div class="bg-dark-subtle pt-4 w-100">
<ul class="nav nav-tabs d-flex justify-content-center">
    <li class="nav-item">
        <a class="nav-link" class:active={$page.url.pathname == '/'} href="/">Home</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" class:active={$page.url.pathname == '/bmgcsv'} href="/bmgcsv">WBMGT - CSV</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" class:active={$page.url.pathname == '/forecast'} href="/forecast">Weather.XML</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" class:active={$page.url.pathname == '/rus_menu'} href="/rus_menu">Wii Menu [RUS]</a>
    </li>
    </ul>
</div>

<slot />