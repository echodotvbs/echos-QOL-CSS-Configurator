<script lang="ts">
    import { appState } from "#lib/appState.svelte.ts";
    import { generate } from "#lib/generate.ts";
    import { page } from "$app/state";
    import { onMount } from "svelte";

    let result = $state("");
    let copied = $state(false);
    let url = $state("")

    async function generateCallback() {
        const generated = await generate()
        result = generated.css;
        url = page.url + 'build' + generated.url;
        copied = false;
    }

    async function copyResult() {
        await navigator.clipboard.writeText(result);
        copied = true;
        setTimeout(() => (copied = false), 1500);
    }

    const colors = [
        { id: "c-accent", label: "Accent", key: "accentColr", hint: "" },
        {
            id: "c-folder",
            label: "Folder cover color",
            key: "folderCoverClr",
            hint: "",
        },
        {
            id: "c-dm",
            label: "DM button",
            key: "dmButtonColr",
            hint: "The DM button on the friends page.",
        },
        {
            id: "c-dm-hover",
            label: "DM button on hover",
            key: "dmButtonHoverColr",
            hint: "The DM button on the friends page.",
        },
    ] as const;

    onMount(() => {
        const cf = localStorage.getItem("config");
        if (cf) {
            Object.assign(appState, JSON.parse(cf));
        }
    });
</script>

<h1>Echo's customize CSS Panel</h1>

<p class="sub">something</p>

<fieldset>
    <legend>Checks</legend>
    <div class="stack">
        <label class="inline">
            <input type="checkbox" bind:checked={appState.userBanner} />
            User banner
        </label>
        <label class="inline">
            <input type="checkbox" bind:checked={appState.tintProfiles} />
            Tint profiles
        </label>
        <label class="inline">
            <input type="checkbox" bind:checked={appState.dotsHiding} />
            Dots for hiding phones, email etc...
        </label>
        <label class="inline">
            <input type="checkbox" bind:checked={appState.autoHideUsr} />
            Auto hide user bar
        </label>
    </div>
</fieldset>

<fieldset class="section">
    <legend>Colors</legend>
    <div class="row colors">
        {#each colors as { id, label, key, hint } (id)}
            <div>
                <label for={id}>{label}</label>
                <div class="color-field">
                    <input type="color" {id} bind:value={appState[key]} />
                    <input
                        type="text"
                        bind:value={appState[key]}
                        aria-label="{label} hex"
                        spellcheck="false"
                    />
                </div>

                {#if hint}<p class="hint">{hint}</p>{/if}
            </div>
        {/each}
    </div>
</fieldset>

<fieldset class="section">
    <legend>Menu</legend>
    <div class="row">
        <div>
            <label for="menu-height">Height</label>
            <input type="text" id="menu-height" bind:value={appState.menuHei} />
        </div>
        <div>
            <label for="menu-width">Width</label>
            <input type="text" id="menu-width" bind:value={appState.menuWid} />
        </div>
        <div>
            <label for="menu-radius">Border radius</label>
            <input type="text" id="menu-radius" bind:value={appState.menuBor} />
        </div>
    </div>
</fieldset>

<fieldset class="section">
    <legend>Typing</legend>
    <p class="hint">Plain text, no quotes needed. Keep the leading space for the first two so the name does not stick to the text.</p>
    <div class="row">
        <div>
            <label for="typing-one">Single person typing</label>
            <input type="text" id="typing-one" bind:value={appState.singleTyping} />
        </div>
        <div>
            <label for="typing-many">More than 2 people typing</label>
            <input type="text" id="typing-many" bind:value={appState.moreThan2Typing} />
        </div>
        <div>
            <label for="typing-several">Several people typing</label>
            <input type="text" id="typing-several" bind:value={appState.severalTyping} />
        </div>
    </div>
</fieldset>

<fieldset class="section">
    <legend>Acrylic related</legend>
    <div class="row">
        <div>
            <label for="blur-popup">Blur popup</label>
            <input
                type="text"
                id="blur-popup"
                bind:value={appState.acrylicBlurPopup}
            />
        </div>
        <div>
            <label for="blur-bar">Blur bar</label>
            <input
                type="text"
                id="blur-bar"
                bind:value={appState.acrylicBlurBar}
            />
        </div>
        <div>
            <label for="c-popup">Popup color</label>
            <div class="color-field">
                <input
                    type="color"
                    id="c-popup"
                    bind:value={appState.acrylicPopUpColr}
                />
                <input
                    type="text"
                    bind:value={appState.acrylicPopUpColr}
                    aria-label="Popup color hex"
                    spellcheck="false"
                />
            </div>
        </div>
    </div>
    <label class="inline">
        <input type="checkbox" bind:checked={appState.acrylicUserBanner} />
        Disable colored banner for nitro users
    </label>
</fieldset>

<fieldset class="section">
    <legend>Image viewer</legend>

    <div>
        <label for="menu-height">Image viewer blur</label>
        <input
            type="text"
            id="menu-height"
            bind:value={appState.imageViewerBlur}
        />
    </div>

    <div>
        <label for="menu-height">Image viewer radius</label>
        <input
            type="text"
            id="menu-height"
            bind:value={appState.imageOverlayRadius}
        />
    </div>

    <div>
        <label for="c-popup">Image overlay color</label>
        <div class="color-field">
            <input
                type="color"
                id="c-popup"
                bind:value={appState.imageOverlayColr}
            />
            <input
                type="text"
                bind:value={appState.imageOverlayColr}
                aria-label="Popup color hex"
                spellcheck="false"
            />
        </div>
    </div>
</fieldset>

<fieldset class="section">
    <legend>Highlight fades</legend>
    <div class="row">
        <div>
            <label for="server-fade-in">Server fade in</label>
            <input
                type="text"
                id="server-fade-in"
                bind:value={appState.serverFadeIn}
            />
        </div>
        <div>
            <label for="server-fade-out">Server fade out</label>
            <input
                type="text"
                id="server-fade-out"
                bind:value={appState.serverFadeOut}
            />
        </div>
        <div>
            <label for="server-dim">Server dim filter</label>
            <input type="text" id="server-dim" bind:value={appState.serverDim} />
        </div>
        <div>
            <label for="msg-fade-in">Message fade in</label>
            <input type="text" id="msg-fade-in" bind:value={appState.msgFadeIn} />
        </div>
        <div>
            <label for="msg-fade-out">Message fade out</label>
            <input
                type="text"
                id="msg-fade-out"
                bind:value={appState.msgFadeOut}
            />
        </div>
    </div>
</fieldset>

<fieldset class="section">
    <legend>Misc</legend>
    <div class="row">
        <div>
            <label for="spoiler-blur">Spoiler blur on hover</label>
            <input
                type="text"
                id="spoiler-blur"
                bind:value={appState.miscSpoilBlur}
            />
        </div>
        <div>
            <label for="message-shift">Message shift right on hover</label>
            <input
                type="text"
                id="message-shift"
                bind:value={appState.miscMesShift}
                placeholder="5-9px is good"
            />
        </div>
        <div>
            <label for="highlight">Highlight strength on hover</label>
            <input
                type="text"
                id="highlight"
                bind:value={appState.mischighLight}
            />
        </div>
        <div>
            <label for="glass-blur">Glass blur</label>
            <input
                type="text"
                id="glass-blur"
                bind:value={appState.miscglassBlur}
            />
        </div>
    </div>
</fieldset>

<button class="btn primary section" id="generate" onclick={generateCallback}>
    Generate!
</button>

{#if result}
    <div class="section" id="resultSel">
        <label for="resultCssArea">
            Results (copy this and paste into QuickCSS)
        </label>
        <textarea id="resultCssArea" readonly bind:value={result} rows="14"
        ></textarea>
        <button class="btn" onclick={copyResult}>
            {copied ? "Copied!" : "Copy"}
        </button>
        <label for="resultCssArea">
            Or, copy this link below and paste it into your theme page:
        </label>
        <input type="text" readonly bind:value={url}>
    </div>
{/if}
