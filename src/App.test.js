import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { getAllPathKeys, filterData } from './utils/JsonParserUtils.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// Testing getAllPathKeys in JsonParserUtils
it('Should get no path keys for {}', () => {
    const json = {};
    const emptySet = new Set();
    const allPathKeys = getAllPathKeys(json);
    expect(allPathKeys).toEqual(emptySet);
});

it('Should get no path keys for []', () => {
    const json = [];
    const emptySet = new Set();
    const allPathKeys = getAllPathKeys(json);
    expect(allPathKeys).toEqual(emptySet);
})

it('Should get all path keys for {"a": 1, "b": 1}', () => {
    const json = {"a": 1, "b": 1};
    let expectedSet = new Set();
    expectedSet.add("a")
    expectedSet.add("b");
    const allPathKeys = getAllPathKeys(json);
    expect(allPathKeys).toEqual(expectedSet);
});

it('Should get all path keys for [{"a": 1}, {"b": 1}]', () => {
    const json = [{"a": 1}, {"b": 1}];
    let expectedSet = new Set();
    expectedSet.add("a");
    expectedSet.add("b");
    const allPathKeys = getAllPathKeys(json);
    expect(allPathKeys).toEqual(expectedSet);
});

it('Should get all path keys for complex {"a": {"b": 1}}', () => {
    const json = {"a": {"b": 1}};
    let expectedSet = new Set();
    expectedSet.add("a.b");
    const allPathKeys = getAllPathKeys(json);
    expect(allPathKeys).toEqual(expectedSet);
});

it('Should get all path keys for complex {"a": {"b": 1, "c": 2, "d": 3}}', () => {
    const json = {"a": {"b": 1, "c": 2, "d": 3}};
    let expectedSet = new Set();
    expectedSet.add("a.b");
    expectedSet.add("a.c");
    expectedSet.add("a.d");
    const allPathKeys = getAllPathKeys(json);
    expect(allPathKeys).toEqual(expectedSet);
});

it('Should get all path keys for complex {"a": 1, "b":[{"a": 1}, {"a": 2, "b": 1}]}', () => {
    const json = {"a": 1, "b":[{"a": 1}, {"a": 2, "b": 1}]};
    let expectedSet = new Set();
    expectedSet.add("a");
    expectedSet.add("b.a");
    expectedSet.add("b.b");
    const allPathKeys = getAllPathKeys(json);
    expect(allPathKeys).toEqual(expectedSet);
});

it('Should get all path keys for complex [{"a": {"b": 1}}, {"a": {"c": 2}}]', () => {
    const json = [{"a": {"b": 1}}, {"a": {"c": 2}}];
    let expectedSet = new Set();
    expectedSet.add("a.b");
    expectedSet.add("a.c");
    const allPathKeys = getAllPathKeys(json);
    expect(allPathKeys).toEqual(expectedSet);
});

// Testing filterData in JsonParserUtils
it('Should filter {}', () => {
    const json = {};
    const filters = {"a": {"checked": false, "value": ""}};
    const expectedJson = {};
    expect(filterData(json, filters)).toEqual(expectedJson);
});

it('Should filter []', () => {
    const json = [];
    const filters = {"a": {"checked": false, "value": ""}};
    const expectedJson = [];
    expect(filterData(json, filters)).toEqual(expectedJson);
});

it('Should filter {"a": 1} if filter is not checked', () => {
    const json = {"a": 1};
    const filters = {"a": {"checked": false, "value": ""}};
    const expectedJson = {};
    expect(filterData(json, filters)).toEqual(expectedJson);
});

it('Should filter {"a": 1} if filter is checked', () => {
    const json = {"a": 1};
    const filters = {"a": {"checked": true, "value": ""}};
    const expectedJson = {"a": 1};
    expect(filterData(json, filters)).toEqual(expectedJson);
});

it('Should filter {"a": 1} if filter is checked and value is empty', () => {
    const json = {"a": 1};
    const filters = {"a": {"checked": true, "value": ""}};
    const expectedJson = {"a": 1};
    expect(filterData(json, filters)).toEqual(expectedJson);
});

it('Should filter {"a": 1} if filter is checked and value is < 1', () => {
    const json = {"a": 1};
    const filters = {"a": {"checked": true, "value": "< 1"}};
    const expectedJson = {};
    expect(filterData(json, filters)).toEqual(expectedJson);
});

it('Should filter complex {"a": 1, "b":[{"a": 1}, {"a": 2, "b": 1}]} if filter is checked', () => {
    const json = {"a": 1, "b":[{"a": 1}, {"a": 2, "b": 1}]};
    const filters = {"a": {"checked": true, "value": ""}, "b.a": {"checked": true, "value": ""}, "b.b": {"checked": true, "value": ""}};
    const expectedJson = {"a": 1, "b":[{"a": 1}, {"a": 2, "b": 1}]};
    expect(filterData(json, filters)).toEqual(expectedJson);
});

it('Should filter complex {"a": 1, "b":[{"a": 1}, {"a": 2, "b": 1}]} if filter is checked and value is inputed', () => {
    const json = {"a": 1, "b":[{"a": 1}, {"a": 2, "b": 1}]};
    const filters = {"a": {"checked": true, "value": "< 1"}, "b.a": {"checked": false, "value": ""}, "b.b": {"checked": true, "value": ""}};
    const expectedJson = {"b":[{}, {"b": 1}]};
    expect(filterData(json, filters)).toEqual(expectedJson);
});


