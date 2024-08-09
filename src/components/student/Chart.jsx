// import * as React from 'react';
// import { LineChart } from '@mui/x-charts/LineChart';

// export default function BasicArea() {
//   return (
//     <LineChart
//       xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
//       series={[
//         {
//           data: [2, 5.5, 2, 8.5, 1.5, 5],
//           area: true,
//         },
//       ]}
//       width={500}
//       height={300}
//     />
//   );
// }
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function BasicArea() {
  return (
    <LineChart
      xAxis={[
        {
          data: [0, 1, 2, 3, 5, 7],
          label: 'Months',
          valueFormatter: (value) => ['May', 'June', 'July'][value]
        }
      ]}
      series={[
        {
          data: [2, 5.5, 2, 3, 1, 10],
          area: true,
        },
      ]}
      // width={500}
      height={300}
    />
  );
}
