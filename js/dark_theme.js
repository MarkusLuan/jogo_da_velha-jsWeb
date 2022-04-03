if(dark_theme) {
    let css_dark = document.createElement("link");
    css_dark.rel = "stylesheet";
    css_dark.href = "css/dark_theme.css";
    css_dark.media = "screen";

    document.head.append(css_dark);
}