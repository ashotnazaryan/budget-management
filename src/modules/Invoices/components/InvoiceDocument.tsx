import * as React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
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
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View>
          <Text style={styles.title}>{data.title}</Text>
        </View>
        <View style={styles.heading}>
          <Text style={styles.label}>Invoice No.</Text>
          <Text style={styles.value}>{getFirstDateOfPreviousMonth()}</Text>
        </View>
        <View style={styles.heading}>
          <Text style={styles.label}>Issue date:</Text>
          <Text style={styles.value}>{getCurrentDate()}</Text>
        </View>
        <View style={styles.heading}>
          <Text style={styles.label}>Sale date:</Text>
          <Text style={styles.value}>{getLastDateOfPreviousMonth()}</Text>
        </View>
        <View style={styles.heading}>
          <Text style={styles.label}>Due date:</Text>
          <Text style={styles.value}>{getDayOfCurrentMonth(14)}</Text>
        </View>
        <View style={styles.heading}>
          <Text style={styles.label}>Payment type:</Text>
          <Text style={styles.value}>Transfer</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
