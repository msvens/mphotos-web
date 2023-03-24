import {
  BrowserRouter,
  Link as RouterLink,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import { Profile } from "./Profile";
import { UxConfig } from "./UxConfig";
import { useContext } from "react";
import { MPContext } from "../../MPContext";
import { Login } from "./Login";
import { GoogleDrive } from "./GoogleDrive";
import { LocalDrive } from "./LocalDrive";
import { Logout } from "./Logout";
import { FullWidthLayout } from "../../layouts/FullWidthLayout";
import { MenuItem, MI, MPMenuList } from "../../components/MPMenuList";
import { MenuListLayout } from "../../layouts/MenuListLayout";

const PROFILE = "profile";
const DRIVE = "drive";
const LOCAL = "local";
const LOGOUT = "logout";
const UXCONFIG = "uxconfig";

const MenuItems = new Map<string, MenuItem>([
  [PROFILE, MI("Profile", "/account/" + PROFILE)],
  [DRIVE, MI("Google Drive", "/account/" + DRIVE)],
  [LOCAL, MI("Local Drive", "/account/" + LOCAL)],
  [UXCONFIG, MI("UX Config", "/account/" + UXCONFIG)],
  [LOGOUT, MI("Logout", "/account/" + LOGOUT)],
]);

export function AccountRoute() {
  const { setting } = useParams();
  const context = useContext(MPContext);
  const theme = useTheme();

  function AccountSection() {
    if (!context.isUser) {
      return <Login />;
    }
    switch (setting) {
      case DRIVE:
        return <GoogleDrive />;
      case LOCAL:
        return <LocalDrive />;
      case LOGOUT:
        return <Logout />;
      case PROFILE:
        return <Profile />;
      case UXCONFIG:
        return <UxConfig />;
      default:
        return <Profile />;
    }
  }

  function selectedItem(item: string): boolean {
    if (item === setting) {
      return true;
    } else if (item === PROFILE && !setting) {
      return true;
    }
    return false;
  }

  return (
    <MenuListLayout items={MenuItems} isSelected={selectedItem}>
      <AccountSection />
    </MenuListLayout>
  );
}
