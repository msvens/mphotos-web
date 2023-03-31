import { DocLayout } from "../../layouts/DocLayout";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Link from "@mui/material/Link";
import { useContext, useEffect, useState } from "react";
import { MPContext } from "../../MPContext";
import { Button, Typography } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { MPDialog } from "../../components/MPDialog";
import { AddGuestDialog } from "./AddGuestDialog";
import { usePhotoService } from "../../service/mphotoservice";

const buttonLayout = {
  marginTop: 4,
  marginRight: 2,
} as const;

export function GuestRoute() {
  const ps = usePhotoService();
  const location = useLocation();

  const [verified, setVerified] = useState<boolean>(false);
  const [showAddGuest, setShowAddGuest] = useState<boolean>(false);
  const [showLogoutGuest, setShowLogoutGuest] = useState<boolean>(false);
  const context = useContext(MPContext);

  useEffect(() => {
    if (location.search) {
      ps.verifyGuest(location.search)
        .then((res) => {
          setVerified(res);
          if (res) {
            context.checkGuest();
          }
        })
        .catch((err) => alert("Error verifying guest " + err.toString()));
    }
  }, [location.search, context, ps]);

  const handleLogout = () => {
    const logout = async () => {
      try {
        await ps.logoutGuest();
        context.checkGuest();
        setShowLogoutGuest(false);
      } catch (error) {
        alert(error);
      }
    };
    void logout();
  };
  return (
    <DocLayout>
      {location.search && verified && context.isGuest && (
        <>
          <Typography variant="h6">Thank you for verifying!</Typography>
          <Typography variant="body2" gutterBottom={true}>
            As a guest at mellowtech you can comment and like photos!
            <br />
            To change your guest name or email go to your{" "}
            <Link component={RouterLink} to={"/guest"}>
              guest page
            </Link>
            . You are registered as
            <ul>
              <li>
                <b>Name</b>: {context.guest.name}
              </li>
              <li>
                <b>Email</b>: {context.guest.email}
              </li>
            </ul>
          </Typography>
          <Typography variant={"subtitle1"}>
            Continue to{" "}
            <Link component={RouterLink} to={"/photo"}>
              individual Photos
            </Link>
            <br />
            Continue to{" "}
            <Link component={RouterLink} to={"/"}>
              photo grid
            </Link>
          </Typography>
        </>
      )}
      {!location.search && context.isGuest && (
        <>
          <Typography variant="h6">
            Welcome back {context.guest.name}!
          </Typography>
          <Typography variant={"body1"} gutterBottom>
            If you want to update your name or register a new Guest you can do
            so from here by clicking the update button below.
          </Typography>
          <Typography variant={"body1"} gutterBottom>
            Your guest account is tied to your email address and as long as you
            register with the same email you can change your name.
          </Typography>
          <Typography variant={"body1"} gutterBottom>
            If you want to register/sign in with a different user make sure to
            use a different name and email
          </Typography>
          <Button
            variant="outlined"
            size={"small"}
            sx={buttonLayout}
            startIcon={<PersonAdd />}
            onClick={() => setShowAddGuest(true)}
          >
            Update Guest
          </Button>
          <Button
            variant="outlined"
            size={"small"}
            sx={buttonLayout}
            onClick={() => setShowLogoutGuest(true)}
          >
            Logout Guest
          </Button>
          <MPDialog
            open={showLogoutGuest}
            onClose={() => setShowLogoutGuest(false)}
            onOk={handleLogout}
            closeOnOk={false}
            title={"Logout GuestPage"}
            text={
              "Logout guest. In order to login again you need to register with your email."
            }
          />
        </>
      )}
      {!location.search && !context.isGuest && (
        <>
          <Typography variant={"h6"}>Register Guest</Typography>
          <Typography variant={"body1"}>
            In order to be able to comment and like photos you need to register
            as a guest by providing a nickname and your email address. You will
            get at a verification email sent to your provided email.
          </Typography>
          <Button
            variant="outlined"
            size={"small"}
            sx={buttonLayout}
            startIcon={<PersonAdd />}
            onClick={() => setShowAddGuest(true)}
          >
            Register Guest
          </Button>
        </>
      )}
      <AddGuestDialog
        update={context.isGuest}
        name={context.guest.name}
        email={context.guest.email}
        open={showAddGuest}
        onClose={() => {
          setShowAddGuest(false);
        }}
      />
    </DocLayout>
  );
}
