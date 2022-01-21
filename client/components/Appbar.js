import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { AppBar, Button, Divider, IconButton } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import theme from '../src/ui/theme';
import Link from '../src/ui/Link';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { SwipeableDrawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer } from '@material-ui/core';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import BarChartIcon from '@material-ui/icons/BarChart';
import FitnessIcon from '@material-ui/icons/FitnessCenter';
import PeopleIcon from '@material-ui/icons/PeopleAlt';
import ViewIcon from '@material-ui/icons/ViewList';
import SearchIcon from '@material-ui/icons/Search';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    zIndex: 5000,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    marginLeft: 5,
  },
  hide: {
    display: 'none',
  },
  toolbarMargin: {
    display: 'flex',
    alignItems: 'right',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  toolbar: {
    paddingBottom: '1.5rem',
  },
  buttonContainer: {
    marginLeft: 'auto',
  },
  button: {
    textTransform: 'none',
    minWidth: 30,
    marginLeft: '25px',
    marginRight: '10px',
  },
  type: {
    fontFamily: 'Quicksand',
    fontWeight: 700,
    fontSize: '1.12rem',
  },
  drawerIconContainer: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  drawerIcon: {
    height: '30px',
    width: '30px',
  },
  drawer: {
    zIndex: 5000,
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    backgroundColor: theme.palette.primary.main,
  },
  drawerItem: {
    fontFamily: 'Quicksand',
    fontWeight: 700,
    fontSize: '1.12rem',
  },
  drawerOpen: {
    backgroundColor: theme.palette.primary.main,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: theme.palette.primary.main,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingLeft: '5px',
  },
  listIcon: {
    height: '30px',
    weight: '30px',
  },
}));

const Header = ({ currentUser, children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [openDrawer, setOpenDrawer] = useState(false);
  const [open, setOpen] = useState(false);
  const [permDrawer, setPermDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const links = [
    !currentUser && {
      label: <Typography className={classes.type}>Log In</Typography>,
      href: '/auth/signin',
      color: 'primary',
    },
    !currentUser && {
      label: <Typography className={classes.type}>Sign up</Typography>,
      href: '/auth/signup',
      color: 'primary',
    },

    currentUser && {
      label: <Typography className={classes.type}>Sign out</Typography>,
      href: '/auth/signout',
      color: 'primary',
    },
  ]
    .filter((linkConfig) => linkConfig) // get only true values
    .map(({ label, href, color }) => {
      return (
        <Link
          href={href}
          style={{ textDecoration: 'none' }}
          key={`${label}${href}`}
        >
          <Button
            variant="contained"
            disableElevation
            color={`${color}`}
            size="small"
            key={href}
            className={classes.button}
          >
            {label}
          </Button>
        </Link>
      );
    });

  const simpleDrawer = (
    <React.Fragment key={'simpleDrawer'}>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
        style={{ zIndex: 5000 }}
      >
        <div
          className={
            classes.toolbarMargin /* Push the drawer down, the appbar */
          }
        />
        <List disablePadding>
          {[
            {
              label: 'Dashboard',
              icon: <HomeIcon />,
              href: '/dashboard/dashboard',
            },
            {
              label: 'Create Workout',
              icon: <FitnessIcon />,
              href: '/workout/create',
            },
            {
              label: 'View Workouts',
              icon: <ViewIcon />,
              href: '/workout/view',
            },
            {
              label: 'Analytics',
              icon: <BarChartIcon />,
              href: '/analytics/pre',
            },
            {
              label: 'Roster',
              icon: <PeopleIcon />,
              href: '/roster/teams',
            },
            {
              label: 'Search',
              icon: <SearchIcon />,
              href: '/roster/search',
            },
          ].map(({ label, icon, href }) => (
            <Link
              key={`${label}${href}`}
              href={href}
              color="inherit"
              style={{ textDecoration: 'none' }}
            >
              <ListItem button key={label} onClick={() => setOpenDrawer(false)}>
                <ListItemIcon className={classes.listIcon}>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItem>
            </Link>
          ))}
        </List>
      </SwipeableDrawer>
    </React.Fragment>
  );

  useEffect(() => {
    //window.location.pathname
    if (window.location.pathname === '/workout/create') {
      setPermDrawer(true);
      // making sure permDrawer is closed, when simple takes over!
      setOpen(false);
    } else {
      setPermDrawer(false);
    }
  }, [children]);

  return (
    <React.Fragment key={'root'}>
      <div className={classes.root}>
        <ElevationScroll>
          <AppBar
            position="fixed"
            color="secondary"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar disableGutters>
              {permDrawer ? (
                <IconButton
                  className={classes.drawerIconContainer}
                  onClick={() => setOpenDrawer(!openDrawer)}
                  disableRipple
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <IconButton
                  style={{ visibility: 'hidden' }}
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, {
                    [classes.hide]: open,
                  })}
                >
                  <MenuIcon />
                </IconButton>
              )}

              <Typography variant="h3">OlyUp</Typography>
              <div className={classes.buttonContainer}>{links}</div>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        {permDrawer ? (
          simpleDrawer
        ) : (
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
          >
            <div className={classes.toolbarMargin}>
              <IconButton onClick={handleDrawerToggle}>
                {open === false ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              {[
                {
                  label: 'Dashboard',
                  icon: <HomeIcon />,
                  href: '/dashboard/dashboard',
                },
                {
                  label: 'Create Workout',
                  icon: <FitnessIcon />,
                  href: '/workout/create',
                },
                {
                  label: 'View Workouts',
                  icon: <ViewIcon />,
                  href: '/workout/view',
                },
                {
                  label: 'Analytics',
                  icon: <BarChartIcon />,
                  href: '/analytics/pre',
                },
                {
                  label: 'Roster',
                  icon: <PeopleIcon />,
                  href: '/roster/teams',
                },
                {
                  label: 'Search',
                  icon: <SearchIcon />,
                  href: '/roster/search',
                },
              ].map(({ label, icon, href }) => (
                <Link
                  key={`${label}${href}`}
                  href={href}
                  color="inherit"
                  style={{ textDecoration: 'none' }}
                >
                  <ListItem button key={label}>
                    <ListItemIcon className={classes.listIcon}>
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={label} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Drawer>
        )}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </React.Fragment>
  );
};

export default Header;
