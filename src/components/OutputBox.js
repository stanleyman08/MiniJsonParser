import React from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';

const OutputBox = (props) => (
  <Form>
    <Form.Group>
      <Form.Label>Output</Form.Label>
      <Form.Control as="textarea" rows="20" readOnly value={props.filteredData}/> 
    </Form.Group>
  </Form>
);

OutputBox.propTypes = {
  filteredData: PropTypes.string.isRequired
};

export default OutputBox;