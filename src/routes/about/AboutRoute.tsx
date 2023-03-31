import { ReactComponent as LogoWhite } from "../../components/mp_logo_white.svg";
import { Box, Link, Typography } from "@mui/material";
import { DocLayout } from "../../layouts/DocLayout";

export function AboutRoute() {
  return (
    <DocLayout>
      <Box
        width={200}
        marginLeft={"auto"}
        marginRight={"auto"}
        marginBottom={5}
      >
        <LogoWhite />
      </Box>
      <Typography variant="body1">
        Mellowtech Photos is my personal photoblog. It also serves as the
        homepage for mellowtech (<Link href={"#mellowtech"}>see below</Link>)
        There are a lot of photo blogs out there - instagram, flickr,
        photobucket, etc. None, however did what I exactly wanted. Namely to
      </Typography>
      <ul>
        <li>
          Take full advantage of exif information stored typically in your jpegs
        </li>
        <li>All editing (including meta information) done in lightroom</li>
        <li>Offer a tight integration with Google Drive</li>
      </ul>
      <Typography variant="h5">Technical Detail</Typography>
      <Typography variant="body1" gutterBottom>
        This website uses Go for the backend and React as its frontend. You can
        find the code in the following projects
      </Typography>
      <ul>
        <li>
          <Link href="https://www.github.com/msvens/mphotos">mphotos</Link> -
          backend service
        </li>
        <li>
          <Link href="https://www.github.com/msvens/mphotos-app">
            mphotos-app
          </Link>{" "}
          - react frontend
        </li>
        <li>
          <Link href="https://www.github.com/msvens/mdrive">mdrive</Link> -
          simplified google drive access
        </li>
        <li>
          <Link href="https://www.github.com/msvens/mexif">mexif</Link> -
          extract exif information from images
        </li>
      </ul>
      <Typography variant="body1" gutterBottom={true}>
        A big thanks to the following libraries and tools that made this project
        possible:
      </Typography>
      <ul>
        <li>
          <Link href="https://reactjs.org/docs/create-a-new-react-app.html">
            react-app
          </Link>
        </li>
        <li>
          <Link href="https://material-ui.com">material-ui</Link>
        </li>
        <li>
          <Link href="https://exiftool.org">exiftool</Link>
        </li>
        <li>
          <Link href="https://libvips.github.io/libvips/API/current/Using-vipsthumbnail.md.html">
            libvips
          </Link>
        </li>
        <li>
          <Link href="https://github.com/gorilla/mux">gorilla mux</Link>
        </li>
        <li>
          <Link href="https://github.com/gorilla/sessions">
            gorialla sessions
          </Link>
        </li>
      </ul>

      <Typography variant="h4" id={"mellowtech"}>
        Mellowtech
      </Typography>
      <Typography variant="body1">
        mellowtech came into existence back in 2002 when Martin Svensson and
        Rickard Cöster (then 2 phd studends) decided to start a software
        company. A great deal of time was spent on finding a good name, in the
        end we ended up with mellow - we thought it captured what we were about.
        A lot of relaxing and at the same time producing solid (actually another
        name we had in mind) and mature code. As with many other grand ideas
        running a company while doing your phd did not turn out to be the best
        of ideas, especially since we mostly wanted to create cool stuff.
      </Typography>
      <Typography variant="body1">
        In the end one the company died but the idea of mellowtech prevailed. It
        has been a playground for fiddling with things such as, disc based
        search and sort, key-value stores, social graphs, oauth & openid and
        blog sofware. Some of it has lived for a very long time while other
        stuff have been developed recently.
      </Typography>
    </DocLayout>
  );
}
