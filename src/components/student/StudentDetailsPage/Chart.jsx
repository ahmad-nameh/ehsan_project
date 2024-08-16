import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function BasicArea(props) {
  return (
    <LineChart
      xAxis={[
        {
          data: [0, 1, 2],
          valueFormatter: (value) => ['شفهي', 'مذاكرات', 'امتحان'][value]
        }
      ]}
      series={[
        {
          data: [props.data.average_oral,props.data.average_test,props.data.average_exam],
          area: true,
        },
      ]}
      width={500}
      height={300}
    />
  );
}
