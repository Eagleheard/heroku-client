import React, { useState } from 'react';

import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
} from '@mui/material';

import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

interface IOrders {
  game: {
    name: string;
    price: string;
    image: string;
    disk: boolean;
    author: {
      name: string;
    };
    genre: {
      name: string;
    };
  };
  name: string;
  address: string;
  zipCode: string;
  comment: string;
  email: string;
  quantity: number;
}

export const Orders: React.FC<IOrders> = ({
  game,
  name,
  address,
  zipCode,
  comment,
  email,
  quantity,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {game.name}
        </TableCell>
        <TableCell align="right">
          <img width={50} src={game.image} />
        </TableCell>
        <TableCell align="right">{game.price}$</TableCell>
        <TableCell align="right">{game.author?.name}</TableCell>
        <TableCell align="right">{game.genre?.name}</TableCell>
        <TableCell align="right">{game.disk ? 'Disk' : 'Digital'}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Customer information
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell align="right">Address</TableCell>
                    <TableCell align="right">Zip-code</TableCell>
                    <TableCell align="right">Comment</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={name}>
                    <TableCell component="th" scope="row">
                      {name}
                    </TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell align="right">{address}</TableCell>
                    <TableCell align="right">{zipCode}</TableCell>
                    <TableCell align="right">{comment}</TableCell>
                    <TableCell align="right">{quantity}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
