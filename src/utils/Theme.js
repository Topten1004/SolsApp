import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import * as locale from '@mui/material/locale';

import { DefaultLocale } from '../static/constants';

// colors
const primary = "#283646";
const secondary = "#C72127";
const warningLight = "rgba(255, 246, 32, .3)";
const warningMain = "rgba(255, 246, 32, .5)";
const warningDark = "rgba(255, 246, 32, .7)";
const background = '#F5F5F5';
// border
const borderWidth = 1;
const borderColor = "#2e6da4";

// spacing
const spacing = 8;

const theme = createTheme({
    layout: {
        headerHeight : 100 ,
        contentWidth: 1140,
        footerWidth: 1400
    },
    palette: {
        primary: { main: primary, footer: '#055da6' },
        secondary: { main: secondary },
        common: {
        },
        warning: {
            light: warningLight,
            main: warningMain,
            dark: warningDark
        },
        tonalOffset: 0.2,
        background: {
            default: background,
            gray: '#f1f1f170'
        },
        spacing
    },
    border: {
        borderColor: borderColor,
        borderWidth: borderWidth
    },
    overrides: {

    },
    typography: {
        useNextVariants: true
    }
}, locale[DefaultLocale]);

export default responsiveFontSizes(theme);
