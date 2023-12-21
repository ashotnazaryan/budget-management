import * as React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { useTranslation } from 'core/i18n';
import { Invoice } from 'shared/models';
import {
  getCurrentDate,
  getDayOfCurrentMonth,
  getFirstDateOfPreviousMonth,
  getLastDateOfPreviousMonth,
  getPreviousMonthLongName
} from 'shared/helpers';
import { styles } from './InvoiceDocument.styles';

interface InvoiceDocumentProps {
  data: Invoice;
}

export const chunkSubstring = (str: string, size: number) => {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array<string>(numChunks);

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substring(o, o + size);
  }

  return chunks;
};

const chunkTextComponent = (text: string, size: number): React.ReactElement => {
  return (
    <Text style={styles.tableCell} hyphenationCallback={(event) => chunkSubstring(event, size)}>{text}</Text>
  );
};

const InvoiceDocument: React.FC<InvoiceDocumentProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View>
          <Text style={styles.title}>{data.title}</Text>
        </View>
        <View style={styles.heading}>
          <Text style={styles.label}>{t('INVOICES.DOCUMENT.INVOICE_NO')}.</Text>
          <Text style={styles.value}>{getFirstDateOfPreviousMonth()}</Text>
        </View>
        <View style={styles.heading}>
          <Text style={styles.label}>{t('INVOICES.DOCUMENT.ISSUE_DATE')}:</Text>
          <Text style={styles.value}>{getCurrentDate()}</Text>
        </View>
        <View style={styles.heading}>
          <Text style={styles.label}>{t('INVOICES.DOCUMENT.SALE_DATE')}:</Text>
          <Text style={styles.value}>{getLastDateOfPreviousMonth()}</Text>
        </View>
        <View style={styles.heading}>
          <Text style={styles.label}>{t('INVOICES.DOCUMENT.DUE_DATE')}:</Text>
          <Text style={styles.value}>{getDayOfCurrentMonth(14)}</Text>
        </View>
        <View style={styles.heading}>
          <Text style={styles.label}>{t('INVOICES.DOCUMENT.PAYMENT_TYPE')}:</Text>
          <Text style={styles.value}>{t('INVOICES.DOCUMENT.TRANSFER')}</Text>
        </View>
        <View style={styles.sellerBuyer}>
          <View style={styles.seller}>
            <Text style={styles.label}>{t('INVOICES.DOCUMENT.SELLER')}:</Text>
            <View>
              <Text style={styles.value}>{data.sellerName}</Text>
              <Text style={styles.value}>{data.sellerAddress}</Text>
              <Text style={styles.value}>{data.sellerLocation}</Text>
              <Text style={styles.value}>{data.sellerVatID}</Text>
              <Text style={styles.account}>{data.sellerAccount}</Text>
            </View>
          </View>
          <View style={styles.buyer}>
            <Text style={styles.label}>{t('INVOICES.DOCUMENT.BUYER')}:</Text>
            <View>
              <Text style={styles.value}>{data.buyerName}</Text>
              <Text style={styles.value}>{data.buyerAddress}</Text>
              <Text style={styles.value}>{data.buyerLocation}</Text>
              <Text style={styles.value}>{data.buyerVatID}</Text>
            </View>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <View style={{ ...styles.tableCol, ...styles.noCol }}>
              <Text style={styles.tableCell}>{t('INVOICES.DOCUMENT.TABLE.NO')}</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.nameCol }}>
              <Text style={styles.tableCell}>{t('INVOICES.DOCUMENT.TABLE.NAME')}</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.unitCol }}>
              {chunkTextComponent(t('INVOICES.DOCUMENT.TABLE.UNIT'), 3)}
            </View>
            <View style={{ ...styles.tableCol, ...styles.quantityCol }}>
              {chunkTextComponent(t('INVOICES.DOCUMENT.TABLE.QUANTITY'), 3)}
            </View>
            <View style={{ ...styles.tableCol, ...styles.unitNetPriceCol }}>
              <Text style={styles.tableCell}>{t('INVOICES.DOCUMENT.TABLE.UNIT_NET_PRICE')}</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.netValueCol }}>
              <Text style={styles.tableCell}>{t('INVOICES.DOCUMENT.TABLE.NET_VALUE')}</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.vatRateCol }}>
              {chunkTextComponent(t('INVOICES.DOCUMENT.TABLE.VAT_RATE'), 3)}
            </View>
            <View style={{ ...styles.tableCol, ...styles.vatAmountCol }}>
              <Text style={styles.tableCell}>{t('INVOICES.DOCUMENT.TABLE.VAT_AMOUNT')}</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.grossValueCol }}>
              <Text style={styles.tableCell}>{t('INVOICES.DOCUMENT.TABLE.GROSS_VALUE')}</Text>
            </View>
            <View style={{ ...styles.currencyCol }}>
              <Text style={styles.tableCell}>{t('INVOICES.DOCUMENT.TABLE.CURRENCY')}</Text>
            </View>
          </View>
          <View style={styles.bodyRow}>
            <View style={{ ...styles.tableCol, ...styles.noCol }}>
              <Text style={styles.tableCell}>1</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.nameCol }}>
              {chunkTextComponent(`${t('INVOICES.DOCUMENT.TABLE.PROGRAMMING_SERVICES')} ${getPreviousMonthLongName()}`, 20)}
            </View>
            <View style={{ ...styles.tableCol, ...styles.unitCol }}>
              <Text style={styles.tableCell}>—</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.quantityCol }}>
              <Text style={styles.tableCell}>1</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.unitNetPriceCol }}>
              <Text style={styles.tableCell}>{data.amount?.net}</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.netValueCol }}>
              <Text style={styles.tableCell}>{data.amount?.net}</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.vatRateCol }}>
              <Text style={styles.tableCell}>{data.vatIncluded ? data.amount?.vatRate : '—'}</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.vatAmountCol }}>
              <Text style={styles.tableCell}>{data.vatIncluded ? data.amount?.vatAmount : '—'}</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.grossValueCol }}>
              <Text style={styles.tableCell}>{data.amount?.gross}</Text>
            </View>
            <View style={{ ...styles.currencyCol }}>
              <Text style={styles.tableCell}>PLN</Text>
            </View>
          </View>
        </View>
        <View style={styles.total}>
          <Text>{t('INVOICES.DOCUMENT.TABLE.TOTAL')}: {data.amount?.gross} PLN</Text>
        </View>
        {!data.vatIncluded && (
          <View style={styles.vatExemption}>
            <Text>{t('INVOICES.DOCUMENT.TABLE.VAT_EXEMPTION')}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
