import { Font, StyleSheet } from '@react-pdf/renderer';

Font.register({
  family: 'SourceSansPro', fonts: [
    { src: 'https://fonts.gstatic.com/s/sourcesanspro/v14/6xK3dSBYKcSV-LCoeQqfX1RYOo3aPw.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3i54rAkA.ttf', fontWeight: 700 }
  ]
});

export const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E4E4E4',
    fontFamily: 'SourceSansPro'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    fontWeight: 'bold'
  }
});
