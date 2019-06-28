/**
 * Traverse through JSON object and get all path keys.
 * @param  {Object} object  Can accept any valid JSON object
 * @return {[Set]}            A Set of all path keys in the form ["key1", "key1.sub1", "key2"]
 */
export function getAllPathKeys(object) {
  let keys = new Set([]);
  traverse(object, keys, "");
  return keys;
};

/**
 * A helper function that will recursively call itself to traverse through the JSON object to populate keys
 * @param  {Object} object  Can accept any valid JSON object
 * @param  {[Set]} keys     A Set to store populated path keys in the form ["key1", "key1.sub1", "key2"]
 * @param  {String} k       A string containing the parent key relative to the current object. k is "" represents the root object.
 */
function traverse(object, keys, k = "") {
  for (let key in object) {
    const path = k.length ? k + '.' : k;
    if (typeof object[key] === 'object' && object[key] !== null) {
      if (Array.isArray(object)) {
        traverse(object[key], keys, k);
      } else {
        traverse(object[key], keys, path + key);
      };
    } else {
      keys.add(path + key);
    };
  };
};

/**
 * Filter JSON data by traversing it to meet the criteria in filters
 * @param  {Object} data      Can accept any valid JSON data
 * @param  {[Object]} filters An array of object that contains the filter options in the form [{"path1": {"checked": {Boolean}, "value": {String}}}]
 *                            Assumes that all path names is in filters, if any of them are not present it will fail.
 * @return {Object}           A JSON object that has been filtered to meet the criteria in filters
 */
export function filterData(data, filters) {
  let filteredData = JSON.parse(JSON.stringify(data)); // Create a deep-cloned of data so that I don't mutate the original
  traverseAndFilter(filteredData, filters, "");
  return filteredData;
}

/**
 * A helper function that will recursively call itself to traverse through the JSON object and filter the data
 * @param  {Object} data    Can accept any valid JSON data
 * @param  {[Object]} filters  An array of object that contains the filter options in the form [{"path1": {"checked": {Boolean}, "value": {String}}}]
 * @param  {String} k       A string containing the parent key relative to the current object. k is "" represents the root object.
 */
function traverseAndFilter(data, filters, k = "") {
  for (let key in data) {
    const path = k.length ? k + '.' : k;
    if (typeof data[key] === "object" && data[key] !== null) {
      if (Array.isArray(data)) {
        traverseAndFilter(data[key], filters, k);
      } else {
        traverseAndFilter(data[key], filters, path + key);
      };
    } else {
      // value in filters object {"path":{"checked":{Boolean}, "value": {String}}}
      const v = filters[path + key];
      if (v.checked) {
        if (v.value === "") {
          continue;
        } else {
          const criteria = v.value.split(" ");
          const op = criteria[0];
          const val = criteria[1];
          switch (op) {
            case "==":
              if (val != data[key]) {
                delete data[key];
              };
              break;
            case "!=":
              if (val == data[key]) {
                delete data[key];
              };
              break;
            case ">":
              if (Number.isNaN(Number(val)) || data[key] <= Number(val)) {
                delete data[key];
              };
              break;
            case ">=":
              if (Number.isNaN(Number(val)) || data[key] < Number(val)) {
                delete data[key];
              };
              break;
            case "<":
              if (Number.isNaN(Number(val)) || data[key] >= Number(val)) {
                delete data[key];
              };
              break;
            case "<=":
              if (Number.isNaN(Number(val)) || data[key] > Number(val)) {
                delete data[key];
              };
              break;
            default:
              delete data[key];
          };
        };
      } else {
        // Filter option not checked
        delete data[key];
      };
    };
  };
};