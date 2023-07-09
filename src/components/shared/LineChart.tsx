import dynamic from 'next/dynamic';

const Line = dynamic(
  () => import('@ant-design/charts').then((mod) => mod.Line),
  {
    ssr: false,
  }
);

interface DataEntry {
  y: number;
  x: number | string;
  label: string;
}

interface LineChartProps {
  data: DataEntry[];
  yAxisTitle?: string;
  xAxisTitle?: string;
  style?: React.CSSProperties;
  isStep?: boolean;
}

const LineChart = ({
  data,
  yAxisTitle,
  xAxisTitle,
  style,
  isStep,
}: LineChartProps) => {
  const config = {
    data: data,
    xField: 'x',
    color: [
      '#d62728',
      '#9467bd',
      '#8c564b',
      '#e377c2',
      '#7f7f7f',
      '#bcbd22',
      '#17becf',
      '#aec7e8',
      '#2ca02c',
      '#1f77b4',
      '#ff7f0e',
    ],
    yField: 'y',
    seriesField: 'label',
    stepType: isStep ? 'hvh' : undefined,
    xAxis: {
      nice: true,
      // tickCount: 8,
      label: {
        autoRotate: true,
        // rotate: -Math.PI / 6,
        // offset: 20,
        // move the label to the left after rotating
        style: {
          fill: '#aaa',
          fontSize: 12,
        },
        formatter: (name: string) => name,
      },
      title: {
        text: xAxisTitle,
        style: {
          fontSize: 13,
          fontWeight: 600,
        },
      },
      line: {
        style: {
          stroke: '#aaa',
        },
      },
      tickLine: {
        style: {
          lineWidth: 2,
          stroke: '#aaa',
        },
        length: 5,
      },
      grid: {
        line: {
          style: {
            stroke: '#ddd',
            lineDash: [4, 2],
          },
        },
        alternateColor: 'rgba(0,0,0,0.05)',
      },
    },
    yAxis: {
      // max: 3000,
      // min: 0,
      nice: true,
      label: {
        autoRotate: false,
        style: {
          fill: '#aaa',
          fontSize: 12,
        },
        formatter: (v: any) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
      title: {
        text: yAxisTitle,
        style: {
          fontSize: 13,
          fontWeight: 600,
        },
      },
      line: {
        style: {
          stroke: '#aaa',
        },
      },
      tickLine: {
        style: {
          lineWidth: 2,
          stroke: '#aaa',
        },
        length: 5,
      },
      grid: {
        line: {
          style: {
            stroke: '#ddd',
            lineDash: [4, 2],
          },
        },
        alternateColor: 'rgba(0,0,0,0.05)',
      },
    },
    label: {
      layout: [
        {
          type: 'hide-overlap',
        },
        {
          type: 'adjust-color',
        },
        {
          type: 'limit-in-shape',
        },
      ],
      style: {
        textAlign: 'right',
      },
      formatter: (item: any) => item.value,
    },
    // point
    point: {
      size: 5,
      style: {
        lineWidth: 1,
        fillOpacity: 1,
      },
      // shape: (item: any) => {
      //   if (item.category === 'Cement production') {
      //     return 'circle';
      //   }

      //   return 'diamond';
      // },
    },
    // annotations: [
    //   // 辅助线
    //   {
    //     type: 'line',
    //     start: ['0%', '10%'],
    //     end: ['100%', '10%'],
    //     top: true,
    //     style: {
    //       stroke: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
    //       lineWidth: 2,
    //     },
    //   }, // 辅助区域
    //   {
    //     type: 'region',
    //     start: ['0%', '0%'],
    //     end: ['20%', '10%'],
    //     top: true,
    //     style: {
    //       fill: '#1890ff',
    //       fillOpacity: 1,
    //       opacity: 1,
    //     },
    //   }, // 辅助文本
    //   {
    //     type: 'text',
    //     position: ['10%', '5%'],
    //     content: '二氧化碳排放量来源',
    //     style: {
    //       fill: '#fff',
    //       fontSize: 12,
    //       textAlign: 'center',
    //       textBaseline: 'middle',
    //       shadowColor: '#fff',
    //       shadowOffsetX: 12,
    //       shadowOffsetY: 12,
    //       shadowBlur: 2,
    //     },
    //   }, // 辅助线
    //   {
    //     type: 'line',
    //     start: ['min', 'median'],
    //     end: ['max', 'median'],
    //     style: {
    //       stroke: 'Turquoise',
    //       lineDash: [4, 2],
    //     },
    //   },
    // ],
    legend: {
      position: 'top',
      itemName: {
        style: {
          fill: '#000',
        },
        formatter: (name: any) => name,
      },
      // itemValue: {
      //   formatter: (value: any) => {
      //     return `${value}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`);
      //   },
      // },
      marker: {
        // controls the legend symbol (color box)
        symbol: 'square', // shape of the symbol
        size: 20, // size of the symbol (width and height)
        style: {
          r: 5, // radius for rounded corners
        },
      },
    },
    meta: {
      // year 对应 xField || yField
      year: {
        range: [0, 1],
      },
    },
  };

  return <Line {...(config as any)} style={style} />;
};

export default LineChart;
