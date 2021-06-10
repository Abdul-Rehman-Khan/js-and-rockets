import {
  getfilteredDataSet,
  getOrderedDataSet,
  removeUnwantedProperties,
} from './helper-functions';

export const prepareData = (filterParams) => {
  return (rawdataSet) => {
    const filteredDataSet = getfilteredDataSet(rawdataSet, filterParams);
    const orderedDataSet = getOrderedDataSet(filteredDataSet);

    return removeUnwantedProperties(orderedDataSet);
  };
};
export const renderData = (res) => {
  document.body.innerHTML = `<pre id="out"></pre>`;
  document.getElementById('out').innerHTML = JSON.stringify(res, null, 2);
};
