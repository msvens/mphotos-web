import React from "react";
import useUser from "./hooks/useUser";
import { useGuest } from "./hooks/useGuest";
import { useUXConfig } from "./hooks/useUXConfig";
import { IMPContext, MPContext } from "./MPContext";
import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import ProTip from "./ProTip";
import { MPhotos } from "./MPhotos";

export default function App() {
  const [isGuest, guest, checkGuest] = useGuest();
  const [isUser, user, checkUser] = useUser();
  const [uxConfig, checkUXConfig] = useUXConfig();

  const defaultContext: IMPContext = {
    isGuest: isGuest,
    guest: guest,
    isGuestLoading: false,
    checkGuest: checkGuest,
    isUser: isUser,
    user: user,
    checkUser: checkUser,
    uxConfig: uxConfig,
    checkUXConfig: checkUXConfig,
  };

  let theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: uxConfig.colorTheme === "dark" ? "dark" : "light",
        },
        typography: {
          body1: {
            lineHeight: "1.5em",
          },
          body2: {
            lineHeight: "1.3em",
          },
          h4: {
            marginTop: "2em",
            textTransform: "uppercase",
          },
          h5: {
            marginTop: "2em",
            textTransform: "uppercase",
          },
          subtitle1: {
            fontSize: "1.2rem",
          },
          h6: {
            fontWeight: "normal",
          },
        },
      }),
    [uxConfig.colorTheme]
  );

  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MPContext.Provider value={defaultContext}>
        <MPhotos />
      </MPContext.Provider>
    </ThemeProvider>
  );
}
