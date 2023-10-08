import { TreemapChart } from 'echarts/charts';
// import components, all suffixed with Component
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import { SVGRenderer } from 'echarts/renderers';
import { EChartsInstance, EChartsOption } from 'echarts-for-react';
// import the core library.
import EChartsReactCore from 'echarts-for-react/esm/core.js';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';

type RawNode = {
  analytics: number;
  title: string;
  title_ru: string;
  children: RawNode[];
};

interface TreeNode {
  name: string;
  value: number;
  children?: TreeNode[];
  visibleMin: number;
  childrenVisibleMin: number;
  visualMin: number;
  visualMax: number;
}

// Register the required components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TreemapChart,
  // CanvasRenderer,
  SVGRenderer,
]);

interface TreeMapEchartsProps {
  data: RawNode;
  loading?: boolean;
  depth?: number;
  isMoney?: boolean;
}

function TreeMapEcharts({
  data,
  loading,
  depth,
  isMoney,
}: TreeMapEchartsProps) {
  const [formattedData, setFormattedData] = React.useState<TreeNode[]>([]);
  const { i18n } = useTranslation('common');

  useEffect(() => {
    function convertToTreeNode(rawNode: RawNode): TreeNode {
      // Map title to name and $count/analytics to value
      const treeNode: TreeNode = {
        name: i18n.language === 'uz' ? rawNode.title : rawNode.title_ru,
        value: !isMoney
          ? rawNode.analytics
          : Math.round(Math.round(rawNode.analytics * 1000) / 1000) * 1000,
        visibleMin: -1_000_000,
        childrenVisibleMin: -1_000_000,
        visualMin: -1_000_000,
        visualMax: 1_000_000,
      };

      // Recursively handle children
      if (rawNode.children && rawNode.children.length) {
        treeNode.children = rawNode.children.map((child) =>
          convertToTreeNode(child)
        );
      }

      return treeNode;
    }

    const treenode = convertToTreeNode(data);

    setFormattedData(treenode.children ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, i18n.language]);

  const EventsDict = {
    click: (e: any) => {
      console.log(e);
    },
  };

  const onChartReady = (echarts: EChartsInstance) => {
    // console.log('Chart is ready', echarts);
  };

  const loadingOption = {
    text: i18n.language === 'ru' ? 'Загрузка...' : 'Yuklanmoqda...',
    color: '#4413c2',
    textColor: '#270240',
    maskColor: 'rgba(194, 88, 86, 0.3)',
    zlevel: 0,
  };

  const option: EChartsOption = {
    title: {
      text:
        i18n.language === 'uz'
          ? 'Barcha Kategoriyalar Segmentatsiyasi'
          : 'Сегментация всех категорий',
      subtext: '',
      left: 'leafDepth',
    },
    visualMap: {
      type: 'continuous',
      min: -1_000_000_000, // Adjust based on your expected data range or find programmatically
      max: 1_000_000_000, // Adjust based on your expected data range or find programmatically
      inRange: {
        color: ['#ff0000', '#ffffff', '#0000ff'], // from red to white to blue
      },
      show: false, // hide the visualMap component
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        const name = params.data.name;
        const value = params.data.value;
        if (!isMoney) return `${name}: ${value.toLocaleString()}`;

        if (value > 1000000000)
          return `${name}: ${(value / 1000000000).toFixed(2)} млрд. сум`;
        if (value > 1000000)
          return `${name}: ${(value / 1000000).toFixed(2)} млн. сум`;
        if (value > 1000)
          return `${name}: ${(value / 1000).toFixed(2)} тыс. сум`;
        return `${name}: ${value} сум`;
      },
    },
    series: [
      {
        name: i18n.language === 'uz' ? 'Barcha Kategoriyalar' : 'Все категории',
        type: 'treemap',
        visibleMin: -1_000_000,
        childrenVisibleMin: -1_000_000,
        visualMin: -1_000_000,
        visualMax: 1_000_000,
        data: formattedData,
        leafDepth: depth ?? 1,
        levels: [
          {
            itemStyle: {
              borderColor: '#555',
              borderWidth: 4,
              gapWidth: 4,
            },
            visibleMin: -1_000_000,
            childrenVisibleMin: -1_000_000,
            visualMin: -1_000_000,
            visualMax: 1_000_000,
          },
          {
            colorSaturation: [0.3, 0.6],
            itemStyle: {
              borderColorSaturation: 0.7,
              gapWidth: 2,
              borderWidth: 2,
            },
            visibleMin: -1_000_000,
            childrenVisibleMin: -1_000_000,
            visualMin: -1_000_000,
            visualMax: 1_000_000,
          },
          {
            colorSaturation: [0.3, 0.5],
            itemStyle: {
              borderColorSaturation: 0.6,
              gapWidth: 1,
            },
            visibleMin: -1_000_000,
            childrenVisibleMin: -1_000_000,
            visualMin: -1_000_000,
            visualMax: 1_000_000,
          },
          {
            colorSaturation: [0.3, 0.5],
            visibleMin: -1_000_000,
            childrenVisibleMin: -1_000_000,
            visualMin: -1_000_000,
            visualMax: 1_000_000,
          },
        ],
        // disable zoom
        roam: false,
        width: '100%',
        height: '90%',
        breadcrumb: {
          top: 'top',
        },
      },
    ],
  };

  return (
    <div>
      <EChartsReactCore
        echarts={echarts}
        option={option}
        style={{
          height: '100vh',
          width: '100%',
        }}
        notMerge={true}
        lazyUpdate={true}
        theme='theme_name'
        showLoading={loading}
        // loadingOption={loadingOption}
        onChartReady={onChartReady}
        onEvents={EventsDict}
      />
    </div>
  );
}

export default TreeMapEcharts;
