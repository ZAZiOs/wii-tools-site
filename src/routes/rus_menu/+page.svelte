<script>
let page = 'Wii'
    
</script>

<svelte:head>
  <title>Wii Menu [RUS]</title>
  <meta property="description" content="Инструкция по установке русского меню Wii от CaXaP и Aerdemost" />
</svelte:head>

<div class="container mt-3 d-flex justify-content-center">

<div class="main-container">
<ul class="nav nav-tabs d-flex justify-content-center nav-bar-m">
    <li class="nav-item">
        <button class="nav-link" class:active={page == 'Wii'} on:click={() => page="Wii"}>Wii</button>
    </li>
    <li class="nav-item">
        <button class="nav-link" class:active={page == 'vWii'} on:click={() => page="vWii"}>vWii (Wii U)</button>
    </li>
</ul>
<div class="border border-top-0 rounded bg-dark-subtle p-4">
{#if page == 'Wii'}
<h1 class="text-center">Установка для Wii</h1>
<h5 class="text-center text-danger"><button class="nav-link text-decoration-underline w-100" on:click={() => page="vWii"}><i>[ ВНИМАНИЕ! Для Wii U отдельно ]</i></button></h5>
<div class="rounded p-3 border border-danger my-2 danger-content">
<p class="text-secondary"><i>Авторы релиза и владелец сайта не несут ответственности за кирпич вместо консоли после кривой установки.</i></p>
<p>Во избежание закирпичивания консоли перед установкой меню у вас должен быть установлен BootMii как boot2 (делается при установке Homebrew Channel), а также у вас должна быть <a href="https://wii.hacks.guide/bootmii">резервная&nbsp;копия</a></p>
</div>

<ol>
<li>Загрузите и отправьте в папку apps на SD-карте <a href="https://hbb1.oscwii.org/api/contents/WiiModLite/WiiModLite.zip">WiiModLite</a></li>
<li>В архиве с переводом найдите папку с ВАШЕЙ ВЕРСИЕЙ ПРОШИВКИ Wii <small class="text-secondary">(Можно найти в разделе Wii Options → Wii Settings, там будет что-то типо Ver. <b>4.3E</b>)</small></li>
<li>Загрузите нужный WAD и отправьте на SD-карту в папку WAD</li>
<li>На консоли запустите Homebrew Channel и WiiModLite, в нём выберите WAD Manager → SD Card</li>
<li>После завершения установки выходите из WiiModLite кнопкой HOME</li>
<li>Перезагружаете консоль и вуаля! Русский перевод установлен.</li>
</ol>

<h2 class="text-center mt-3">Восстановление оригинального меню:</h2>
<ol>
    <li>Загрузите и установите <a href="https://hbb1.oscwii.org/api/contents/WiiModLite/WiiModLite.zip">NUS Downloader</a> на ПК.</li>
    <li>В NUS Downloader переходим в Database → System → System Menu и выбираем ВАШУ версию меню Wii.</li>
    <li>Снизу ставим галочку напротив Pack WAD и нажимаем Start NUS Download.</li>
    <li>После завершения скачивания переходим в папку titles → 0000000100000002 → <i>папка&nbsp;с&nbsp;вашей&nbsp;версией</i><br> <small class="text-secondary">(4.1U - 449; 4.1E - 450; 4.2U - 481; 4.2E - 482; 4.3U - 513; 4.3E - 514)</small></li>
    <li>Загруженный WAD отправьте на SD-карту в папку WAD</li>
    <li>Далее следуем инструкции по установке меню ↑, начиная с пункта 4.</li>
</ol>

<div class="mt-3 footer">
<b>Авторы переводы и релиза:</b><br>
<a href="https://vk.com/sasha.bazdyrev2013" class="text-decoration-none">[ВК] Александр "CaXaP" Баздырев</a><br>
<a href="https://vk.com/rararsv" class="text-decoration-none">[ВК] Андрей "Aerdemost" Подгородецкий</a><br>
Статья портирована <a href="https://vk.com/topic-43869021_40452253" class="text-decoration-none">с поста в группе ВК Nintendo Wii</a>
</div>

{:else if page=="vWii"}
<h1 class="text-center">Установка для vWii</h1>
<h5 class="text-center text-warning">[ ВНИМАНИЕ! Только для Wii U европейского (PAL) региона! ]</h5>
<div class="rounded p-3 border border-danger my-2 danger-content">
    <p class="text-secondary"><i>Авторы релиза и владелец сайта не несут ответственности за кирпич вместо консоли после кривой установки.</i></p>
    <p>Во избежание закирпичивания консоли перед установкой меню желательно наличие <a href="https://wiiu.hacks.guide/#/vwii/nand-backup">резервной&nbsp;копии</a></p>
</div>

<ol>
    <li>Распаковываем архив <a href="https://static.wiidatabase.de/ftpiiu-everywhere.zip">FTPiiU Everywhere</a> в корень SD-карты.</li>
    <li>На Wii U в Homebrew Launcher запускаем Mocha, после чего запускаем FTPiiU Everywhere.</li>
    <li>Устанавливаем и запускаем <a href="https://filezilla.ru/get/">FileZilla*</a> на компьютере.<br><small class="text-secondary"><b>*</b> — или любой другой предпочтительный FTP-клиент.</small> </li>
    <li>На Wii U будут отображены IP-адрес и порт. Их нужно вписать сверху в FileZilla: в окошки «хост» и «порт» соответственно. Затем нажимаем «Быстрое соединение».<br><small class="text-secondary">(Нужно чтобы компьютер и Wii U были подключены к одной сети.)</small></li>
    <li>Снизу появится файловая система Wii U. Нужно перейти в slccmpt01 → title → 00000001 → 00000002 → content. Там будет файл 00000022.app. На всякий случай копируем его куда-нибудь на компьютер, а файл из приложенного архива с таким же названием заменяем на консоли через FileZilla. <br><small class="text-secondary">(Передача файла может занять некоторое время.)</small></li>
    <li>Переходим в slccmpt01 → shared1. Там будут файлы 0000000d.app и 0000000f.app. Их тоже копируем на компьютер и заменяем файлами из архива.</li>
    <li>После того как все файлы перекинулись на консоль, нажимаем HOME на GamePad и заходим в меню Wii. Там должен появиться русский язык!</li>
</ol>

<h2 class="text-center mt-3">Если что-то пошло не так, можно всё вернуть:</h2>
<ol>
    <li>Повторяем шаги 1—4 ↑</li>
    <li>Заменяем те же файлы теми, которые вы заранее скопировали на компьютер.</li>
    <li>Выходим кнопкой HOME на GamePad.</li>
</ol>

<div class="mt-3 footer">
    <b>Авторы переводы и релиза:</b><br>
    <a href="https://vk.com/sasha.bazdyrev2013" class="text-decoration-none">[ВК] Александр "CaXaP" Баздырев</a><br>
    <a href="https://vk.com/rararsv" class="text-decoration-none">[ВК] Андрей "Aerdemost" Подгородецкий</a><br>
    Статья портирована <a href="https://vk.com/topic-43869021_40452253" class="text-decoration-none">с поста в группе ВК Nintendo Wii</a>
</div>

{/if}
</div>
</div>
</div>

<style>
    .main-container {
        max-width: 60rem;
        margin-bottom: 2rem;
    }
    .nav-bar-m{
        margin-right: 0.375rem;
        margin-left: 0.375rem;
    }
    .nav-link.active {
        background-color: var(--bs-dark-bg-subtle)!important;
    }
    p, ol, .danger-content, .footer {
        margin-bottom: 0;
        font-size: 1.1rem;
        max-width: 50rem;
    }
    .footer {
        font-size: 0.9rem;
    }
    h1, h2, h5{
        margin: 0;
        max-width: 50rem;
    }
</style>