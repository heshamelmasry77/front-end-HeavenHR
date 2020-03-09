import React, {Component} from 'react';
import classnames from 'classnames';
import * as PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import './Pagination.scss'

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
const {
  shape,
  arrayOf,
} = PropTypes;


class FriendsTableBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      perPage: 5,
      currentPage: 0,
      sliceData: [],
      pageCount: 0
    };
    this.handlePageClick = this
      .handlePageClick
      .bind(this);
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    console.log(selectedPage)
    console.log(offset)
    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      const data = this.props.friends;
      const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
      console.log(slice)
      this.setState({
        sliceData: slice
      })
    });
  };

  componentDidMount() {
    console.log(this.props);
    const data = this.props.friends;
    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      sliceData: slice,
    }, () => {
      console.log(this.state)
    })
  }

  render() {
    console.log(this.state.pageCount)
    return (

      <TableBody>
        {
          this.state.sliceData.map(({id, name, sex, isStared}) => (
            <TableRow key={id}>
              <TableCell className="text-secondary"> {id} </TableCell>
              <TableCell className="text-secondary"> {name} </TableCell>
              <TableCell>
                <i className={classnames(`fa`, 'text-primary', {
                  'fa-female': sex === 'female',
                  'fa-male': sex === 'male'
                })}/>
              </TableCell>
              <TableCell> {
                <button type="button" className="btn btn-light text-primary">
                  <i className={classnames('fa', {
                    'fa-star': isStared,
                    'fa-star-o': !isStared
                  })}/>
                </button>
              } </TableCell>
            </TableRow>
          ))
        }
        <TableRow>
          <TableCell>
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}/>
          </TableCell>
        </TableRow>
      </TableBody>

    )
  }
}

FriendsTableBody.propTypes = {
  friends: arrayOf(shape({})),
};

FriendsTableBody.defaultProps = {
  friends: [],
};

export default FriendsTableBody;
