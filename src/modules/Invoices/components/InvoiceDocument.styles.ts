import { Font, StyleSheet } from '@react-pdf/renderer';

Font.register({
  family: 'SourceSansPro',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/sourcesanspro/v14/6xK3dSBYKcSV-LCoeQqfX1RYOo3aPw.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3i54rAkA.ttf', fontWeight: 700 }
  ]
});

export const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E4E4E4',
    fontFamily: 'SourceSansPro',
    padding: 20,
    borderWidth: 0
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 10
  },
  value: {
    fontSize: 12
  },
  account: {
    fontSize: 12,
    marginTop: 30
  },
  sellerBuyer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 40
  },
  seller: {
    flex: 50
  },
  buyer: {
    flex: 50
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 40
  },
  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#959ba1'
  },
  bodyRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: '#959ba1',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1
  },
  tableCol: {},
  noCol: {
    width: '5%'
  },
  nameCol: {
    width: '22%'
  },
  unitCol: {
    width: '5%'
  },
  quantityCol: {
    width: '5%'
  },
  unitNetPriceCol: {
    width: '12%'
  },
  netValueCol: {
    width: '12%'
  },
  vatRateCol: {
    width: '6%'
  },
  vatAmountCol: {
    width: '12%'
  },
  grossValueCol: {
    width: '12%'
  },
  currencyCol: {
    width: '9%'
  },
  tableCell: {
    fontSize: 11,
    margin: 4
  },
  total: {
    marginTop: 20,
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'right'
  },
  vatExemption: {
    marginTop: 20,
    fontSize: 11
  }
});
