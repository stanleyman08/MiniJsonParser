import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

class FilterBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {}
    };
  };

  componentDidUpdate(prevProps) {
    const { options } = this.props;
    if (options !== prevProps.options) {
      let newFilters = {};
      options.forEach((option) => {
        newFilters[option] = {
          "checked": false,
          "value": ""
        };
      })
      this.setState({
        filters: newFilters
      })
    }
  }

  handleCheckboxChange = (event) => {
    const { name, checked } = event.target
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: {
          ...prevState.filters[name],
          checked: checked
        }
      }
    }));
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: {
          ...prevState.filters[name],
          value: value
        }
      }
    }));
  };

  render() {
    const { options, handleOnFilter } = this.props;
    const { filters } = this.state;
    let filterOptions = [];
    options.forEach((option) => {
      filterOptions.push(
        <Form.Row key={option}>
          <Form.Group as={Col}>
            <Form.Check name={option} type="checkbox" label={option} onChange={this.handleCheckboxChange}/>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control size="sm" disabled={typeof filters[option] !== 'undefined' ? !filters[option].checked : false} name={option} onChange={this.handleInputChange}/>
          </Form.Group>
        </Form.Row>
      );
    });

    return (
      <Form>
        <Form.Group>
          <Form.Label>Filter Options</Form.Label>
          <Card style={{height:"494px"}}>
            <Card.Body style={{overflow:"scroll"}}>
              <Form.Group>
                { filterOptions }
              </Form.Group>
            </Card.Body>
          </Card>
        </Form.Group>
        <Button onClick={() => handleOnFilter(filters)} className="float-right">Filter JSON</Button>
      </Form>
    );
  };
};

FilterBox.propTypes = {
  options: PropTypes.object.isRequired,
  handleOnFilter: PropTypes.func.isRequired
};

export default FilterBox;