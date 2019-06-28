import React from 'react';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import InputBox from './components/InputBox.js';
import OutputBox from './components/OutputBox.js';
import FilterBox from './components/FilterBox.js';

import { getAllPathKeys, filterData } from './utils/JsonParserUtils.js';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      data: "",
      filteredData: "",
      options: new Set([])
    };
  };

  handleOnParse = (data) => {
    try {
      const parsedData = JSON.parse(data);
      const options = getAllPathKeys(parsedData);
      this.setState({
        data: parsedData,
        options: options
      });
    } catch (event) {
      alert("Invalid JSON Format");
    };
  };

  handleOnFilter = (filters) => {
    const { data } = this.state;
    const filteredData = filterData(data, filters);
    this.setState({
      filteredData: JSON.stringify(filteredData)
    })
  };

  render() {
    const { options, filteredData } = this.state
    return (
      <div>
        <Card>
          <Card.Header>Mini JSON Parser</Card.Header>
          <Card.Body>
            <Container fluid="true">
              <Row>
                <Col>
                  <InputBox handleOnParse={this.handleOnParse}/>
                </Col>
                <Col>
                  <FilterBox handleOnFilter={this.handleOnFilter} options={options}/>
                </Col>
                <Col>
                  <OutputBox filteredData={filteredData}/>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default App;
