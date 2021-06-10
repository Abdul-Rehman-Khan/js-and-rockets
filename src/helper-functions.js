import { filter, orderBy } from 'lodash';

export const getfilteredDataSet = (rawDataSet, filterParams) => {
  const { year, customerName } = filterParams;
  return filter(rawDataSet, (item) => {
    const {
      launch_year,
      rocket: {
        second_stage: { payloads },
      },
    } = item;
    const isCustomerAvailable = payloads.some((_data) =>
      _data.customers.toString().includes(customerName)
    );
    return launch_year == year && isCustomerAvailable;
  });
};

export const getOrderedDataSet = (filteredDataSet) => {
  const orderByPayloadsLength = (o) => {
    return o.rocket.second_stage.payloads.length;
  };
  const orderedDataSet = orderBy(
    filteredDataSet,
    [orderByPayloadsLength, 'launch_date_utc'],
    ['desc', 'desc']
  );

  return orderedDataSet;
};

export const removeUnwantedProperties = (orderedDataSet) =>
  orderedDataSet.reduce((accum, _item) => {
    const {
      flight_number,
      mission_name,
      rocket: {
        second_stage: { payloads },
      },
    } = _item;

    accum.push({
      flight_number,
      mission_name,
      payloads_count: payloads.length,
    });
    return accum;
  }, []);
