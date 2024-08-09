import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { dataset } from './weather';

const chartSetting = {
  yAxis: [
    {
    //   label: 'rainfall (mm)',
    },
  ],
//   width: aut
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
    //   transform: 'translate(-20px, 0)',
    },
  },
};

const valueFormatter = (value) => `${value}mm`;

export default function BarsDataset() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'london', valueFormatter },
        { dataKey: 'paris', valueFormatter },
        { dataKey: 'newYork', valueFormatter },
        // { dataKey: 'seoul', label: 'Seoul', valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}