<script lang="ts">
    import { updateCss } from "#lib/generate.ts";

    let oldCss = $state("");
    let result = $state("");
    let msg = $state("");
    let copied = $state(false);

    async function update() {
        try {
            const { count, css } = await updateCss(oldCss);
            result = css;
            copied = false;
            msg = count
                ? `Kept ${count} settings from your CSS.`
                : "No known settings found in that CSS, used panel values.";
        } catch {
            msg = "Could not parse that CSS.";
        }
    }

    async function copyResult() {
        await navigator.clipboard.writeText(result);
        copied = true;
        setTimeout(() => (copied = false), 1500);
    }
</script>

<h1>Update existing CSS</h1>

<p class="sub">
    Paste your current QuickCSS. Your settings are kept and the rest is
    replaced with the latest version.
</p>

<label for="oldCss">Your current QuickCSS</label>
<textarea id="oldCss" bind:value={oldCss} rows="12" spellcheck="false"
></textarea>

<button
    class="btn primary section"
    onclick={update}
    disabled={!oldCss.trim()}
>
    Update to latest
</button>
{#if msg}<p class="hint">{msg}</p>{/if}

{#if result}
    <div class="section">
        <label for="resultCssArea">
            Results (copy this and paste into QuickCSS)
        </label>
        <textarea id="resultCssArea" readonly bind:value={result} rows="14"
        ></textarea>
        <button class="btn" onclick={copyResult}>
            {copied ? "Copied!" : "Copy"}
        </button>
    </div>
{/if}
