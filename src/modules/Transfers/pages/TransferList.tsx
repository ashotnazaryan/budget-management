import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'core/i18n';
import { useAppDispatch, useAppSelector } from 'store';
import { getTransfers, selectTransfer } from 'store/reducers';
import { Transfer as TransferModel } from 'shared/models';
import { ROUTES } from 'shared/constants';
import Skeleton from 'shared/components/Skeleton';
import PageTitle from 'shared/components/PageTitle';
import EmptyState from 'shared/components/EmptyState';
import Transfer from '../components/Transfer';

const TransferList: React.FC<{}> = () => {
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

  const handleTransferItemClick = ({ id }: TransferModel): void => {
    navigate(`${ROUTES.transfers.path}/view/${id}`, { state: { id } });
  };

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(getTransfers());
    }
  }, [dispatch, status]);

  const renderContent = (): React.ReactElement => {
    if (status === 'loading') {
      return (
        <Grid item xs={12}>
          <Skeleton type='list' />
        </Grid>
      );
    }

    if ((status === 'failed' || status === 'succeeded') && !transfers?.length) {
      return (
        <Grid item xs={12}>
          <EmptyState text={t('TRANSFERS.EMPTY_TEXT')} />
        </Grid>
      );
    }

    return (
      <>
        {
          transfers.map((transfer) => (
            <Grid item key={transfer.id} xs={12}>
              <Transfer data={getTransferData(transfer)} onClick={handleTransferItemClick} />
            </Grid>
          ))
        }
      </>
    );
  };

  return (
    <Box flexGrow={1}>
      <PageTitle withBackButton text={t('TRANSFERS.PAGE_TITLE')} onBackButtonClick={goBack} />
      <Grid container rowGap={2}>
        {renderContent()}
      </Grid>
    </Box>
  );
};

export default TransferList;