import * as React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { styles } from './PDFDocument.styles';

const PDFDocument: React.FC<{}> = () => {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.section}>
          <Text>Test</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
