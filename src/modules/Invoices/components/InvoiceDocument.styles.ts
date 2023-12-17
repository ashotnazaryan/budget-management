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
    padding: 20
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  heading: {
    paddingTop: 10,
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
  }
});
