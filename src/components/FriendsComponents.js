import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';

import TableBody from './TableBody';
import TableHeader from './TableHeader';

const {
  shape,
  arrayOf,
} = PropTypes;

const FriendsComponent = ({ friends }) => (
  <Fragment>
    <p className="font-weight-bold ml-4 mt-4 h3 text-uppercase">Friends</p>
    <Paper className="m-4 mt-0">
      <Table className="p-2">
        <TableHeader />
        <TableBody friends={friends} />
      </Table>
    </Paper>
  </Fragment>
);

FriendsComponent.propTypes = {
  friends: arrayOf(shape({})),
};

FriendsComponent.defaultProps = {
  friends: [],
};

export default FriendsComponent;
