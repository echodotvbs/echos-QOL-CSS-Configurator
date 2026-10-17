// typesafe guys

export const appState: AppStateType = $state({ // appstate exactly like glimmer's code for goonformance (trust me)
    userBanner: false,
    tintProfiles: true,
    dotsHiding: true,
    autoHideUsr: true,

    // colrs
    accentColr: "#815364",
    folderColr: "#815364",
    dmButtonColr: "#36101D",
    dmButtonHoverColr: "#754454",

    // menu
    menuHei: "400px",
    menuWid: "450px",
    menuBor: "6px",

    // acrylic
    acrylicBlurPopup: "12px",
    acrylicBlurBar: "8px",
    acrylicUserBanner: false,
    acrylicPopUpColr: "#000000",
    
    // image viewer
    imageViewerBlur: "4px",
    imageOverlayColr: "#000000",
    imageOverlayRadius: "6.5px",

    // highlight fades
    serverFadeIn: "0.25s",
    serverFadeOut: "0.25s",
    serverDim: "brightness(40%) saturate(65%)",
    msgFadeIn: "0.17s",
    msgFadeOut: "0.17s",

    // misc
    miscSpoilBlur: "8px",
    miscMesShift: "5px",
    mischighLight: "23%",
    miscglassBlur: "20px"
})

type AppStateType = {
    // checks
    userBanner: boolean;
    tintProfiles: boolean;
    dotsHiding: boolean
    autoHideUsr: boolean,

    // colrs
    accentColr: string;
    folderColr: string;
    dmButtonColr: string;
    dmButtonHoverColr: string;

    // menu
    menuHei: string; // px
    menuWid: string;
    menuBor: string;

    // acrylic
    acrylicBlurPopup: string,
    acrylicBlurBar: string,
    acrylicUserBanner: boolean,
    acrylicPopUpColr: string,

    // image viewer
    imageViewerBlur: string;
    imageOverlayColr: string;
    imageOverlayRadius: string;

    // highlight fades
    serverFadeIn: string;
    serverFadeOut: string;
    serverDim: string;
    msgFadeIn: string;
    msgFadeOut: string;

    //misc
    miscSpoilBlur: string;
    miscMesShift: string;
    mischighLight: string;
    miscglassBlur: string
}

$effect.root(() => {
    $effect(() => {
        localStorage.setItem("config", JSON.stringify(appState))
    })
})
