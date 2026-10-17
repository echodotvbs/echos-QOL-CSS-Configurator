import postcss from "postcss";
import { appState } from "./appState.svelte";

export async function generate() {
    const root = postcss.parse(await (await fetch('public/base.css')).text());

    root.walkRules(':root', rule => {
        rule.walkDecls('--user-banner', decl => {
            decl.value = appState.userBanner ? 'on' : 'off';
        });
        rule.walkDecls('--tint-profiles', decl => {
            decl.value = appState.tintProfiles ? 'on' : 'off';
        });
        rule.walkDecls('--account-hider', decl => {
            decl.value = appState.dotsHiding ? 'on' : 'off';
        });
        rule.walkDecls('--accent', decl => {
            decl.value = appState.accentColr;
        });
        rule.walkDecls('--menu-max-height', decl => {
            decl.value = appState.menuHei;
        });
        rule.walkDecls('--menu-max-width', decl => {
            decl.value = appState.menuWid;
        });
        rule.walkDecls('--menu-border-radius', decl => {
            decl.value = appState.menuBor;
        });
        rule.walkDecls('--spoiler-blur-hover', decl => {
            decl.value = appState.miscSpoilBlur;
        });
        rule.walkDecls('--message-hover-shift', decl => {
            decl.value = appState.miscMesShift;
        });
        rule.walkDecls('--hover-highlight-strength', decl => {
            decl.value = appState.mischighLight;
        });
        rule.walkDecls('--glass-blur', decl => {
            decl.value = appState.miscglassBlur;
        });
        rule.walkDecls('--userbar-autohide', decl => {
            decl.value = appState.autoHideUsr ? '1' : '0';
        });
        rule.walkDecls('--dm-btn-idle', decl => {
            decl.value = appState.dmButtonColr;
        });
        rule.walkDecls('--dm-btn-hover', decl => {
            decl.value = appState.dmButtonHoverColr;
        });
        rule.walkDecls('--pop-up-color', decl => {
            decl.value = appState.acrylicPopUpColr;
        });
        rule.walkDecls('--tint-profiles', decl => {
            decl.value = appState.autoHideUsr ? 'on' : 'off';
        });
        rule.walkDecls('--blur-popup', decl => {
            decl.value = appState.acrylicBlurPopup;
        });

        rule.walkDecls('--image-viewer-blur', decl => {
            decl.value = appState.imageViewerBlur;
        });
        rule.walkDecls('--image-overlay-color', decl => {
            decl.value = appState.imageOverlayColr;
        });
        rule.walkDecls('--image-overlay-radius', decl => {
            decl.value = appState.imageOverlayRadius;
        });
        rule.walkDecls('--server-highlight-fade-in', decl => {
            decl.value = appState.serverFadeIn;
        });
        rule.walkDecls('--server-highlight-fade-out', decl => {
            decl.value = appState.serverFadeOut;
        });
        rule.walkDecls('--server-highlight-dim', decl => {
            decl.value = appState.serverDim;
        });
        rule.walkDecls('--message-highlight-fade-in', decl => {
            decl.value = appState.msgFadeIn;
        });
        rule.walkDecls('--message-highlight-fade-out', decl => {
            decl.value = appState.msgFadeOut;
        });
    })

    return root.toString()
}