import React from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class InputBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  };

  handleOnChange = (event) => {
    this.setState({
      text: event.target.value
    });
  };

  render() {
    const { handleOnParse } = this.props;
    const { text } = this.state;
    return (
      <Form>
        <Form.Group>
          <Form.Label>Input</Form.Label>
          <Form.Control as="textarea" rows="20" value={text} onChange={this.handleOnChange}/> 
        </Form.Group>
        <Button className="float-right" onClick={() => {handleOnParse(text)}}>Parse JSON</Button>
      </Form>
    );
  };
};

InputBox.propTypes = {
  handleOnParse: PropTypes.func.isRequired
};

export default InputBox;