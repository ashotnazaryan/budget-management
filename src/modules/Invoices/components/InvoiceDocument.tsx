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
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
