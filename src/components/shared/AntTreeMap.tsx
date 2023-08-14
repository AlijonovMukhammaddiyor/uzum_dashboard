// import { Treemap } from '@ant-design/plots';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';

const Treemap = dynamic(
  () => import('@ant-design/plots').then((mod) => mod.Treemap),
  {
    ssr: false,
  }
);

interface Props {
  data: {
    name: string;
    children: {
      name: string;
      value: number;
    }[];
  };
  style?: React.CSSProperties;
}

const AntTreemap = ({ data, style }: Props) => {
  const { i18n } = useTranslation('common');

  const config = {
    data,
    legend: {
      visible: false,
    },
    colorField: 'name',
    padding: [0, 0, 0, 0],
    margin: [0, 0, 0, 0],
    tooltip: {
      showTitle: false,
      formatter: (datum: any) => {
        const moneyAmount = datum.value;

        if (moneyAmount > 1000000000) {
          return {
            name: datum.name,
            value: `${(moneyAmount / 1000000000).toFixed(2)} ${
              i18n.language === 'uz' ? 'mlrd' : 'млрд'
            }`,
          };
        } else if (moneyAmount > 1000000) {
          return {
            name: datum.name,
            value: `${(moneyAmount / 1000000).toFixed(2)} ${
              i18n.language === 'uz' ? 'mln' : 'млн'
            }`,
          };
        } else if (moneyAmount > 1000) {
          return {
            name: datum.name,
            value: `${(moneyAmount / 1000).toFixed(2)} ${
              i18n.language === 'uz' ? 'ming' : 'тыс'
            }`,
          };
        } else {
          return {
            name: datum.name,
            value: `${moneyAmount.toFixed(2)} ${
              i18n.language === 'uz' ? "so'm" : 'сум'
            }`,
          };
        }
      },
    },
  };
  return <Treemap {...config} style={style} />;
};

export default AntTreemap;
