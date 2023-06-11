import { WordCloud } from '@ant-design/plots';
import React from 'react';

// const data = [
//   {
//     x: 'China',
//     value: 1383220000,
//     category: 'asia',
//   },
// ]

const WordsCloud = () => {
  const data: {
    x: string;
    value: number;
    category: string;
  }[] = [];

  for (let i = 0; i < 300; i++) {
    data.push({
      //random string
      x:
        Math.random().toString(36).substring(7) +
        ' ' +
        Math.random().toString(36).substring(7),
      value: Math.floor(Math.random() * 100),
      category: 'popular words',
    });
  }

  const config = {
    data,
    wordField: 'x',
    weightField: 'value',
    color: '#122c6a',
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [24, 80],
    },
    // 设置交互类型
    interactions: [
      {
        type: 'element-active',
      },
    ],
    state: {
      active: {
        // 这里可以设置 active 时的样式
        style: {
          lineWidth: 3,
        },
      },
    },
  };

  return (
    <WordCloud
      {...(config as any)}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default WordsCloud;
