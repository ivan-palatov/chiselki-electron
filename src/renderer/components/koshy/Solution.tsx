import { createStyles, makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../stores/RootContext';

interface IProps {}

const useStyles = makeStyles(theme => createStyles({}));

const Solution = observer<IProps>(function SolutionComponent() {
  const classes = useStyles();
  const { koshyStore } = useStore();

  return (
    <Table aria-label="Таблица результатов">
      <TableHead>
        <TableRow>
          <TableCell>
            Значения <b>X</b>
          </TableCell>
          <TableCell>Метод Эйлера</TableCell>
          <TableCell>Метод Рунге-Кутта</TableCell>
          <TableCell>Метод Адамса</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {koshyStore.result!.map(({ x, adams, euler, runge }) => (
          <TableRow key={x}>
            <TableCell>{x}</TableCell>
            <TableCell>{euler}</TableCell>
            <TableCell>{runge}</TableCell>
            <TableCell>{adams}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});

export default Solution;
