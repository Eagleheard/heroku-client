import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, Routes } from 'react-router-dom';

import {
  Discount,
  InfoTable,
  Loader,
  NewAuthor,
  NewGame,
  Orders,
  SignUp,
  Users,
  ToastComponent,
  DiscountsTable,
} from 'components';
import { OrdersReducerState } from 'toolkitStore/types';
import { fetchAllOrders } from 'toolkitStore/thunk';
import { IOrderParams } from 'types/interfaces';
import { useAuth } from 'hooks/useAuth';
import { userOptions, ToastOptions } from 'types/enumerators';
import { useToast } from 'hooks';

import MuiDrawer from '@mui/material/Drawer';
import {
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Container,
  IconButton,
  Divider,
  Toolbar,
  Box,
  CssBaseline,
} from '@mui/material';

import { People, PersonAddAlt, ChevronLeft, ChevronRight, ListAlt } from '@mui/icons-material';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

enum orderOptions {
  NEWEST_ORDERS = 'Newest orders',
  OLDEST_ORDERS = 'Oldest orders',
}

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: '240px',
      height: '103vh',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

export const AdminPanel = () => {
  const [open, setOpen] = useState(true);
  const [params, setParams] = useState<IOrderParams>({ order: 'Newest' });
  const [orderParams, setOrderParams] = useState('');
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { orders, isLoading, ordersError } = useSelector(
    (state: OrdersReducerState) => state.ordersReducer || [],
  );
  const { openToast } = useToast();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSelect = (event: SelectChangeEvent) => {
    setOrderParams(event.target.value as string);
    switch (orderParams) {
      case orderOptions.NEWEST_ORDERS:
        setParams({ order: 'Newest' });
        break;
      case orderOptions.OLDEST_ORDERS:
        setParams({ order: 'Oldest' });
        break;
      default:
        setParams({});
    }
  };

  useEffect(() => {
    dispatch(fetchAllOrders({ params }));
    if (ordersError && !isLoading) {
      openToast(ordersError, ToastOptions.error);
    }
  }, [params]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex', height: '125vh' }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              {open ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            <NavLink to="orders" className="admin__link">
              <ListItem button key="Orders">
                <ListItemIcon>
                  <ListAlt />
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItem>
            </NavLink>
            {user?.role === userOptions.ADMIN && (
              <NavLink to="users" className="admin__link">
                <ListItem button key="Users">
                  <ListItemIcon>
                    <People />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItem>
              </NavLink>
            )}
            <NavLink to="games" className="admin__link">
              <ListItem button key="Games">
                <ListItemIcon>
                  <ListAlt />
                </ListItemIcon>
                <ListItemText primary="Games" />
              </ListItem>
            </NavLink>
            <NavLink to="authors" className="admin__link">
              <ListItem button key="Authors">
                <ListItemIcon>
                  <ListAlt />
                </ListItemIcon>
                <ListItemText primary="Authors" />
              </ListItem>
            </NavLink>
            <NavLink to="discounts" className="admin__link">
              <ListItem button key="Discounts">
                <ListItemIcon>
                  <ListAlt />
                </ListItemIcon>
                <ListItemText primary="Discounts" />
              </ListItem>
            </NavLink>
            {user?.role === userOptions.ADMIN && (
              <NavLink to="manager" className="admin__link">
                <ListItem button key="Create manager">
                  <ListItemIcon>
                    <PersonAddAlt />
                  </ListItemIcon>
                  <ListItemText primary="Create manager" />
                </ListItem>
              </NavLink>
            )}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: '125vh',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'auto',
                    maxHeight: '100vh',
                  }}
                >
                  <Routes>
                    <Route
                      path="orders"
                      element={
                        <>
                          <FormControl
                            sx={{
                              mb: '20px',
                              width: '100%',
                              alignSelf: 'center',
                            }}
                          >
                            <InputLabel id="demo-simple-select-label">Orders</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={orderParams}
                              label="Orders"
                              onChange={handleSelect}
                            >
                              <MenuItem value={orderOptions.NEWEST_ORDERS}>Newest</MenuItem>
                              <MenuItem value={orderOptions.OLDEST_ORDERS}>Oldest</MenuItem>
                            </Select>
                          </FormControl>
                          {orders && !isLoading ? (
                            <TableContainer component={Paper}>
                              <Table aria-label="collapsible table">
                                <TableHead>
                                  <TableRow>
                                    <TableCell />
                                    <TableCell>Game</TableCell>
                                    <TableCell align="right">Image</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Author</TableCell>
                                    <TableCell align="right">Genre</TableCell>
                                    <TableCell align="right">Type</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {orders.map((order) => (
                                    <Orders key={order.id} {...order} />
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          ) : (
                            <Loader />
                          )}
                        </>
                      }
                    />
                    <Route path="new-game" element={<NewGame createMode="New game" />} />
                    <Route path="new-author" element={<NewAuthor />} />
                    <Route
                      path="update-game"
                      element={<NewGame createMode="Update game" isEditMode />}
                    />
                    <Route path="update-author" element={<NewAuthor isEditMode />} />
                    <Route path="games" element={<InfoTable />} />
                    <Route path="authors" element={<InfoTable authorMode />} />
                    <Route path="users" element={<Users />} />
                    <Route path="discount" element={<Discount />} />
                    <Route path="discounts" element={<DiscountsTable />} />
                    {user?.role === userOptions.ADMIN && (
                      <Route
                        path="manager"
                        element={
                          <SignUp
                            style="admin"
                            handleSwitch={() =>
                              openToast('Successfully registered', ToastOptions.success)
                            }
                          />
                        }
                      />
                    )}
                  </Routes>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      <ToastComponent />
    </ThemeProvider>
  );
};
