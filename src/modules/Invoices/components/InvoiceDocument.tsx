import * as React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { useTranslation } from 'core/i18n';
import { Invoice } from 'shared/models';
import {
  getCurrentDate,
  getDayOfCurrentMonth,
  getFirstDateOfPreviousMonth,
  getLastDateOfPreviousMonth
} from 'shared/helpers';
import { styles } from './InvoiceDocument.styles';

interface InvoiceDocumentProps {
  data: Invoice;
}

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
              <Text style={styles.tableCell}>{t('INVOICES.DOCUMENT.TABLE.UNIT')}</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.quantityCol }}>
              <Text style={styles.tableCell}>{t('INVOICES.DOCUMENT.TABLE.QUANTITY')}</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.unitNetPriceCol }}>
              <Text style={styles.tableCell}>{t('INVOICES.DOCUMENT.TABLE.UNIT_NET_PRICE')}</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.netValueCol }}>
              <Text style={styles.tableCell}>{t('INVOICES.DOCUMENT.TABLE.NET_VALUE')}</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.vatRateCol }}>
              <Text style={styles.tableCell}>{t('INVOICES.DOCUMENT.TABLE.VAT_RATE')}</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.grossValueCol }}>
              <Text style={styles.tableCell}>{t('INVOICES.DOCUMENT.TABLE.GROSS_VALUE')}</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.currencyCol }}>
              <Text style={styles.tableCell}>{t('INVOICES.DOCUMENT.TABLE.CURRENCY')}</Text>
            </View>
          </View>
          <View style={styles.bodyRow}>
            <View style={{ ...styles.tableCol, ...styles.noCol }}>
              <Text style={styles.tableCell}>1</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.nameCol }}>
              <Text style={styles.tableCell}>2 </Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.unitCol }}>
              <Text style={styles.tableCell}>3</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.quantityCol }}>
              <Text style={styles.tableCell}>4</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.unitNetPriceCol }}>
              <Text style={styles.tableCell}>5</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.netValueCol }}>
              <Text style={styles.tableCell}>6</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.vatRateCol }}>
              <Text style={styles.tableCell}>7</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.grossValueCol }}>
              <Text style={styles.tableCell}>8</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.currencyCol }}>
              <Text style={styles.tableCell}>9</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
