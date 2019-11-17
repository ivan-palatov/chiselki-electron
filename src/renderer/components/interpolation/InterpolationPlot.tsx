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
            interpStore.method.getPlotData(),
          ]}
          title="Сравнение функций"
        />
        <Plot
          data={
            interpStore.method.name === 'lagr'
              ? [
                  interpStore.method.getPracticalRnData(),
                  interpStore.method.getTheoreticalRnData(),
                ]
              : [interpStore.method.getPracticalRnData()]
          }
          title="График погрешностей"
        />
      </>
    );
  }
);

export default InrerpolationPlot;
