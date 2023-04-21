import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useAppDispatch, useAppSelector } from 'store';
import { getTransfers, selectTransfer } from 'store/reducers';
import { Transfer as TransferModel } from 'shared/models';
import { ROUTES } from 'shared/constants';
import Skeleton from 'shared/components/Skeleton';
import PageTitle from 'shared/components/PageTitle';
import EmptyState from 'shared/components/EmptyState';
import Transfer from '../components/Transfer';

interface TransferListProps { }

const TransferList: React.FC<TransferListProps> = () => {
  const dispatch = useAppDispatch();
  const { transfers, status } = useAppSelector(selectTransfer);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getTransferData = (data: TransferModel): TransferModel => {
    return {
      ...data,
      fromAccount: {
        ...data.fromAccount,
        name: data.fromAccount.nameKey ? t(data.fromAccount.nameKey) : data.fromAccount.name
      }
    };
  };

  const goBack = (): void => {
    navigate(`${ROUTES.accounts.path}`);
  };

  React.useEffect(() => {
    if (status === 'idle' || status === 'failed') {
      dispatch(getTransfers());
    }
  }, [dispatch, status]);

  const getContent = (): React.ReactElement => {
    if (status === 'loading' || status !== 'succeeded') {
      return <Skeleton />;
    }

    if (!transfers?.length) {
      return <EmptyState text={t('TRANSFERS.EMPTY_TEXT')!} />;
    }

    return (
      <Grid container rowSpacing={2}>
        {
          transfers.map((transfer) => (
            <Grid item key={transfer.id} xs={12}>
              <Transfer data={getTransferData(transfer)} />
            </Grid>
          ))
        }
      </Grid>
    );
  };

  const content = getContent();

  return (
    <Box flexGrow={1}>
      <PageTitle withBackButton text={t('TRANSFERS.PAGE_TITLE')} onBackButtonClick={goBack} />
      {content}
    </Box>
  );
};

export default TransferList;