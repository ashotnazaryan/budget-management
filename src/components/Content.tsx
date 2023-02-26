import * as React from 'react';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import Container from '@mui/system/Container';
import { AppDispatch, RootState } from 'store';
import { addIncome, addExpense } from 'store/reducers/summarySlice';
import Summary from './Summary';
import StyledContent from './Content.styles';

interface ContentProps {
  expenses: number;
  incomes: number;
  balance: number;
  addIncome: (payload: number) => void;
  addExpense: (payload: number) => void;
}

class Content extends React.Component<ContentProps> {
  private addIncome = (): void => {
    const { addIncome } = this.props;

    addIncome(100);
  };

  private addExpense = (): void => {
    const { addExpense } = this.props;

    addExpense(100);
  };

  render() {
    const { incomes, expenses, balance } = this.props;

    return (
      <StyledContent sx={{ paddingY: 1, paddingX: 4, justifyContent: 'center' }}>
        <Summary incomes={incomes} expenses={expenses} balance={balance} />
        <Container sx={{ display: 'flex', justifyContent: 'space-between', paddingY: 1 }}>
          <Button color='primary' variant='contained' sx={{ marginRight: 1 }} onClick={this.addIncome}>Add Income</Button>
          <Button color='secondary' variant='contained' onClick={this.addExpense}>Add Expense</Button>
        </Container>
      </StyledContent>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    expenses: state.summary.expenses,
    incomes: state.summary.incomes,
    balance: state.summary.balance
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    addIncome: (payload: number) => dispatch(addIncome(payload)),
    addExpense: (payload: number) => dispatch(addExpense(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);