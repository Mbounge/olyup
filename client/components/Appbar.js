import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
  AppBar,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import theme from '../src/ui/theme';
import Link from '../src/ui/Link';
import { useTheme } from '@material-ui/core/styles';
import { SwipeableDrawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer } from '@material-ui/core';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
} from '@material-ui/core';
import Router from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import StarIcon from '@material-ui/icons/Star';
import HomeIcon from '@material-ui/icons/Home';
import BarChartIcon from '@material-ui/icons/BarChart';
import FitnessIcon from '@material-ui/icons/FitnessCenter';
import PeopleIcon from '@material-ui/icons/PeopleAlt';
import PersonIcon from '@material-ui/icons/Person';
import ViewIcon from '@material-ui/icons/ViewList';
import SearchIcon from '@material-ui/icons/Search';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
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
  buttonMobile: {
    textTransform: 'none',
    minWidth: 30,
    marginLeft: '10px',
    marginRight: '5px',
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
  typo: {
    maxWidth: '2rem',
  },
}));

const Header = ({ currentUser, children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [open, setOpen] = useState(false);
  const [permDrawer, setPermDrawer] = useState(false);
  const [aProfileIconPage, setProfileIconPage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const matches = useMediaQuery('(min-width:880px)');

  const handleClick = (event) => {
    console.log('Profile');
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickProfile = () => {
    setAnchorEl(null);
    Router.push('/auth/profilesettings');
  };

  var drawerObjects;

  if (currentUser) {
    if (currentUser.userType === 'Coach') {
      //console.log('coach');
      drawerObjects = [
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
          label: 'Results',
          icon: <StarIcon />,
          href: '/analytics/post',
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
        {
          label: 'Contact',
          icon: <ContactSupportIcon />,
          href: '/about/contact',
        },
      ];
    } else if (currentUser.userType === 'Athlete') {
      drawerObjects = [
        {
          label: 'Dashboard',
          icon: <HomeIcon />,
          href: '/dashboard/dashboard',
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
          label: 'Results',
          icon: <StarIcon />,
          href: '/analytics/post',
        },
        {
          label: 'Search',
          icon: <SearchIcon />,
          href: '/roster/search',
        },
        {
          label: 'Contact',
          icon: <ContactSupportIcon />,
          href: '/about/contact',
        },
      ];
    }
  } else {
    //console.log('User Not Logged In');
    drawerObjects = [];
  }

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
            className={matches ? classes.button : classes.buttonMobile}
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
          {drawerObjects.map(({ label, icon, href }) => (
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

  // set permDrawer off on certain pages of the app
  useEffect(() => {
    //window.location.pathname
    const webPageLinks = [
      '/workout/create',
      '/auth/signin',
      '/auth/signup',
      '/auth/signout',
      '/auth/aprofile',
      '/',
      '/payment/subscription',
      '/about/contact',
    ];

    if (webPageLinks.includes(window.location.pathname)) {
      setPermDrawer(true); // close permDrawer and open simple drawer
      // making sure permDrawer is closed, when simple takes over!
      setOpen(false);
    } else {
      setPermDrawer(false); // open permDrawer and close simple drawer
    }

    const profilePageLinks = ['/auth/aprofile', '/auth/profilesettings'];
    if (profilePageLinks.includes(window.location.pathname)) {
      setProfileIconPage(void 0);
    } else if (currentUser) {
      setProfileIconPage(
        <React.Fragment>
          <IconButton onClick={handleClick}>
            <PersonIcon />
          </IconButton>
        </React.Fragment>
      );
    } else if (!currentUser) {
      setProfileIconPage(void 0);
    }
  }, [children]);

  // setProfileIconPage(
  //   <Link
  //     href={'/auth/profilesettings'}
  //     color="inherit"
  //     style={{ textDecoration: 'none' }}
  //   >
  //     <IconButton>
  //       <PersonIcon />
  //     </IconButton>
  //   </Link>
  // );

  // conditionalDrawer beg
  var conditionalDrawer;
  const restrictedDrawerLinks = ['/auth/aprofile', '/payment/subscription'];
  if (permDrawer && currentUser) {
    if (restrictedDrawerLinks.includes(window.location.pathname)) {
      conditionalDrawer = void 0;
    } else {
      conditionalDrawer = (
        <IconButton
          className={classes.drawerIconContainer}
          onClick={() => setOpenDrawer(!openDrawer)}
          disableRipple
        >
          <MenuIcon />
        </IconButton>
      );
    }
  } else {
    conditionalDrawer = (
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
        <MenuIcon />2
      </IconButton>
    );
  }
  // conditionalDrawer end

  //aprofileIcon beg

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
              {matches ? (
                conditionalDrawer
              ) : currentUser ? (
                conditionalDrawer
              ) : (
                <div></div>
              )}
              <Typography variant={matches ? 'h3' : 'h4'}>OlyUp</Typography>
              {
                <div className={classes.buttonContainer}>
                  {aProfileIconPage}
                </div>
              }
              <div className={classes.buttonContainer}>{links}</div>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        {permDrawer ? (
          simpleDrawer
        ) : matches ? (
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
              {drawerObjects.map(({ label, icon, href }) => (
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
        ) : (
          simpleDrawer
        )}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClickProfile}>Profile</MenuItem>
        </Menu>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </React.Fragment>
  );
};

export default Header;
