import React from 'react';
import classnames from 'classnames';
import * as PropTypes from 'prop-types';

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

const {
  shape,
  arrayOf,
} = PropTypes;

const FriendsTableBody = ({ friends }) => (
  <TableBody>
    {
      friends.map(({ id, name, sex, isStared }) => (
        <TableRow key={id}>
          <TableCell className="text-secondary"> { id } </TableCell>
          <TableCell className="text-secondary"> { name } </TableCell>
          <TableCell>
            <i className={classnames(`fa`, 'text-primary', {
              'fa-female': sex === 'female',
              'fa-male': sex === 'male'
            })} />
          </TableCell>
          <TableCell> {
            <button type="button" className="btn btn-light text-primary">
              <i className={classnames('fa', {
                'fa-star': isStared,
                'fa-star-o': !isStared
              })} />
            </button>
          } </TableCell>
        </TableRow>
      ))
    }
  </TableBody>
);

FriendsTableBody.propTypes = {
  friends: arrayOf(shape({})),
};

FriendsTableBody.defaultProps = {
  friends: [],
};

export default FriendsTableBody;
