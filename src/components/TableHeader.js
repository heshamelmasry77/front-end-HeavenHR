import React from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

export default () => (
  <TableHead>
    <TableRow>
      <TableCell className="text-uppercase">
        id
      </TableCell>
      <TableCell className="text-uppercase">
        name
      </TableCell>
      <TableCell className="text-uppercase">
        gender
      </TableCell>

      <TableCell/>
      <TableCell/>
    </TableRow>
  </TableHead>
);
