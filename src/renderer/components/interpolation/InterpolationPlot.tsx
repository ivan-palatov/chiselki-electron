import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../stores/RootContext';
import Plot from '../Plot';

interface IProps {}

const InrerpolationPlot = observer<IProps>(
  function InrerpolationPlotComponent() {
    const { interpStore } = useStore();

    return (
      <>
        <Plot
          data={[
            interpStore.f!.getPlotData(
              interpStore.data!.a,
              interpStore.data!.b
            ),
            interpStore.plotData!,
          ]}
          title="Сравнение функций"
        />
        <Plot data={[...interpStore.rnData!]} title="График погрешностей" />
      </>
    );
  }
);

export default InrerpolationPlot;
