import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const colors = {
  global: {
    body: {
      bg: {
        light: "#f8f9fa", // Light mode background
        dark: "black",  // Netflix-like dark background
      },
      default: {
        light: "#333333", // Light mode text
        dark: "#e5e5e5",  // Netflix-like light text
      },
      border: {
        light: "#1f1d2e",
        dark: "#e50914",  // Netflix-like red accent
      },
    },
  },
  components: {
    Drawer: {
      dialog: {
        light: "white",
        dark: "#141414",
      },
    },
    Button: {
      bg: {
        light: "#e50914", // Netflix-like red button
        dark: "#e50914",  // Netflix-like red button
      },
      color: {
        light: "#ffffff", // Light button text
        dark: "#ffffff",  // Dark button text
      },
    },
  },
};

const styles = {
  global: (props: any) => ({
    body: {
      color: mode(
        colors.global.body.default.light,
        colors.global.body.default.dark
      )(props),
      bg: mode(colors.global.body.bg.light, colors.global.body.bg.dark)(props),
      border: mode(
        colors.global.body.border.light,
        colors.global.body.border.dark
      )(props),
    },
  }),
};

const components = {
  Drawer: {
    baseStyle: (props: any) => ({
      dialog: {
        bg: mode(
          colors.components.Drawer.dialog.light,
          colors.components.Drawer.dialog.dark
        )(props),
      },
    }),
  },
  Button: {
    baseStyle: (props: any) => ({
      bg: mode(
        colors.components.Button.bg.light,
        colors.components.Button.bg.dark
      )(props),
      color: mode(
        colors.components.Button.color.light,
        colors.components.Button.color.dark
      )(props),
    }),
  },
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const theme = extendTheme({
  colors,
  components,
  styles,
  config,
});

export default theme;
