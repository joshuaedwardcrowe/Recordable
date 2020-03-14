const brand = {
    brandColor: "#9746B7",
    grey: "#B2B6C2",
    green: "#B1D234",
    orange: "#FF913D",
    pink: "#ED0F67",
    darkBlue: "#333953",
    blue: "#00C6F8",
    teal: "#009688",

    // Surface, background, and error colors
    error: "#D9534F",
    subHeading: "rgba(51, 58, 68, 0.4)", // grey

    // Other
    blueHalfOpacity: "rgba(0, 198, 248, 0.5)",
};

const gnattaTeal = {
    main: brand.teal,
};

const gnattaPurple = {
    main: brand.brandColor,
};

const trueLayerTheme = {
    palette: {
        primaryColor: brand.brandColor,
        secondaryColor: brand.blue,
        accentColor: brand.blue, // This is for the button secondary text color
        textColor: brand.darkBlue,
        pickerHeaderColor: brand.darkBlue,
        panelBackgroundColor: brand.panelBackgroundColor,
        // overriding MUI secondary prop
        primary: gnattaPurple,
        secondary: gnattaTeal,
    },
};

export default trueLayerTheme;