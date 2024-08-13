import React from 'react';
import { Font, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import robotoFont from '../assets/Roboto/Roboto-Regular.ttf';

Font.register({
  family: 'Roboto',
  src: robotoFont,
});

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  companyInfo: {
    fontFamily: 'Roboto',
    fontSize: 12,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingTop: 15,
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    display: 'table',
    width: 'auto',
    marginTop: 10,
    fontFamily: 'Roboto',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '16.66%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    fontSize: 12,
    textAlign: 'center',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  section1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  left: {
    alignItems: 'center',
    padding: 10,
    width: '30%',
  },
  mid: {
    alignItems: 'center',
    padding: 10,
    width: '30%',
  },
  right: {
    alignItems: 'center',
    padding: 10,
    width: '30%',
  },
  text1: {
    fontFamily: 'Roboto',
    fontSize: 12,
    marginBottom: 10,
  },
  text2: {
    fontFamily: 'Roboto',
    fontSize: 12,
  },
});

const PDFDocument = ({ formData, rows }) => {
  return (
    <Document>
      <Page style={styles.page} size="A4">
        <View style={styles.companyInfo}>
          <Text style={styles.text}>CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ CÔNG NGHỆ NGÔ GIA</Text>
          <Text style={styles.text}>137/12/4A Đường ĐHT 06, Phường Tân Hưng Thuận, Quận 12, Thành phố Hồ Chí Minh, Việt Nam</Text>
          <Text style={styles.text}>Mã số thuế: 0312403318</Text>
          <Text style={styles.text}>Tel: 0906 717 944</Text>
        </View>
        <Text style={styles.title}>PHIẾU XUẤT KHO BÁN HÀNG</Text>

        <View style={styles.section}>
          <Text style={styles.text}>Người mua: {formData.nguoimua}</Text>
          <Text style={styles.text}>Tên khách hàng: {formData.tenkhachhang}</Text>
          <Text style={styles.text}>Địa chỉ: {formData.diachi}</Text>
          <Text style={styles.text}>Mã số thuế: {formData.mathue}</Text>
          <Text style={styles.text}>Số điện thoại: {formData.dienthoai}</Text>
          <Text style={styles.text}>Diễn giải: {formData.mota}</Text>
          <Text style={styles.text}>Nhân viên bán hàng: {formData.nguoiban}</Text>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCol}>Mã hàng</Text>
            <Text style={styles.tableCol}>Tên hàng</Text>
            <Text style={styles.tableCol}>Đơn vị tính</Text>
            <Text style={styles.tableCol}>Số lượng</Text>
            <Text style={styles.tableCol}>Đơn giá</Text>
            <Text style={styles.tableCol}>Thành tiền</Text>
          </View>
          {rows && rows.length > 0 && rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.tableRow}>
              {row.data && row.data.map((cell, cellIndex) => (
                <Text key={cellIndex} style={styles.tableCol}>
                  {cell}
                </Text>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section1}>
          <View style={styles.left}>
            <Text style={styles.text1}>Người mua hàng</Text>
            <Text style={styles.text2}>(Ký, họ tên)</Text>
          </View>
          <View style={styles.mid}>
            <Text style={styles.text1}>Kế toán trưởng</Text>
            <Text style={styles.text2}>(Ký, họ tên)</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.text1}>Giám đốc</Text>
            <Text style={styles.text2}>(Ký, họ tên, đóng dấu)</Text>
          </View>
        </View>
      </Page>
    </Document>
  )


};

export default PDFDocument;
