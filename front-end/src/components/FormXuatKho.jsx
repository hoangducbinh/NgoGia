import React, { useState } from 'react';
import '../style/FormXuatKho.css';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MyDocument from './PDFDocument'; 
import { PDFDownloadLink } from '@react-pdf/renderer';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

const FormXuatKho = () => {
  const [rows, setRows] = useState([]);
    const [formData, setFormData] = useState({
   nguoimua: '',
   tenkhachhang: '',
   diachi: '',
   mathue: '',
  dienthoai: '',
  mota: '',
  nguoiban: '',
  ngay: '',
 
  });
  const [devices] = useState([
    { id: 1, code: '1', name: 'Máy lạnh', unit: 'cái', quantity: 10, price: 200, total: "2,000" },
    { id: 2, code: '2', name: 'Máy giặt', unit: 'cái', quantity: 20, price: 400, total: "8,000 "},
    { id: 3, code: '3', name: 'Tủ lạnh', unit: 'cái', quantity: 5, price: 300, total: "1,500" },
    { id: 4, code: '4', name: 'Tủ đông', unit: 'cái', quantity: 15, price: 500, total: "7,500" },
    // Add more devices as needed
  ]);
  const [selectedDevices, setSelectedDevices] = useState({});

  const handleAddRow = () => {
    setRows([...rows, { id: rows.length + 1, data: ['', '', '', '', '', ''] }]);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleInputChange = (rowId, index, value) => {
    const formattedValue = formatNumber(value);
    setRows(rows.map(row =>
      row.id === rowId
        ? { ...row, data: row.data.map((item, i) => (i === index ? formattedValue : item)) }
        : row
    ));
  };

  const formatNumber = (value) => {
    const number = Number(value.replace(/,/g, ''));
    return isNaN(number) ? '' : number.toLocaleString(); 
  };

  // const handleDeleteRow = (id) => {
  //   setRows(rows.filter(row => row.id !== id).map((row, index) => ({
  //     ...row,
  //     id: index + 1 
  //   })));
  // };

  const handleCheckboxChange = (deviceId) => {
    setSelectedDevices(prevSelectedDevices => {
        const newSelectedDevices = { ...prevSelectedDevices, [deviceId]: !prevSelectedDevices[deviceId] };

        if (newSelectedDevices[deviceId]) {
            const device = devices.find(device => device.id === deviceId);
            const newRow = {
                id: rows.length + 1,
                data: [
                    device.code,
                    device.name,
                    device.unit,
                    device.quantity.toString(),
                    device.price.toString(),
                    device.total.toString()
                ]
            };
            setRows([...rows, newRow]);
        } else {
            const device = devices.find(device => device.id === deviceId);
            const updatedRows = rows.filter(row => row.data[0] !== device.code).map((row, index) => ({
                ...row,
                id: index + 1 // Đặt lại STT
            }));
            setRows(updatedRows);
        }

        return newSelectedDevices;
    });
};


  return (
    <div className="invoice-container">
      <form>
      <div className="company-info">
        <p><strong>CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ CÔNG NGHỆ NGÔ GIA</strong></p>
        <p>137/12/4A Đường ĐHT 06, Phường Tân Hưng Thuận, Quận 12, Thành phố Hồ Chí Minh, Việt Nam</p>
        <p>Mã số thuế: 0312403318</p>
        <p>Tel: 0906 717 944</p>
      </div>
      <h2>PHIẾU XUẤT KHO BÁN HÀNG</h2>
      <div className="header1">
        <div className="left">
          <p><strong>Người mua:</strong> <input type="text" name="nguoimua" value={formData.nguoimua}  onChange={handleChange}/></p>
          <p><strong>Tên khách hàng:</strong> <input type="text" name="tenkhachhang" value={formData.tenkhachhang} onChange={handleChange} /></p>
          <p><strong>Địa chỉ:</strong> <input type="text" name="diachi" value={formData.diachi} onChange={handleChange} /></p>
          <p><strong>Mã số thuế:</strong> <input type="text" name="mathue" value={formData.mathue}  onChange={handleChange}/></p>
          <p><strong>Điện thoại:</strong> <input type="text" name="dienthoai" value={formData.dienthoai}  onChange={handleChange}/></p>
          <p><strong>Diễn giải:</strong> <input type="text" name="mota" value={formData.mota}  onChange={handleChange}/></p>
          <p><strong>Nhân viên bán hàng:</strong> <input type="text" name="nguoiban" value={formData.nguoiban} onChange={handleChange} /></p>
        </div>
        <div className="right">
          <p><strong>Ngày:</strong> <input type="text" /></p>
          <p><strong>Số:</strong> <input type="text" /></p>
          <p><strong>Loại tiền:</strong> VND</p>
        </div>
      </div>
      
      {/* New Table for Devices */}
      <div className="device-table-section">
        <h3>Danh Sách Thiết Bị</h3>
        <table className="device-table1">
          <thead>
            <tr>
              <th>Mã hàng</th>
              <th>Tên hàng</th>
              <th>Đơn vị tính</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
              <th>Chọn</th>
            </tr>
          </thead>
          <tbody>
            {devices.map(device => (
              <tr key={device.id}>
                <td>{device.code}</td>
                <td>{device.name}</td>
                <td>{device.unit}</td>
                <td>{device.quantity}</td>
                <td>{device.price}</td>
                <td>{device.total}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={!!selectedDevices[device.id]}
                    onChange={() => handleCheckboxChange(device.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã hàng</th>
            <th>Tên hàng</th>
            <th>Đơn vị tính</th>
            <th>Số lượng</th>
            <th>Đơn giá</th>
            <th>Thành tiền</th>
            {/* <th>Xóa</th> */}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              {row.data.map((cell, index) => (
                <td key={index}>
                  <textarea
                    type={index >= 4 ? 'number' : 'text'}
                    value={cell}
                    onChange={(e) => handleInputChange(row.id, index, e.target.value)}
                  />
                </td>
              ))}
              {/* <td>
                <IconButton
                  color="inherit"
                  onClick={() => handleDeleteRow(row.id)}
                >
                  <DeleteIcon className='btn-delete' />
                </IconButton>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-row" onClick={handleAddRow}>
        Add Row
      </div>
      <div className="footer">
        <div className="left">
          <p><strong>Người mua hàng</strong></p>
          <p>(Ký, họ tên)</p>
        </div>
        <div className="middle">
          <p><strong>Kế toán trưởng</strong></p>
          <p>(Ký, họ tên)</p>
        </div>
        <div className="right">
          <p><strong>Giám đốc</strong></p>
          <p>(Ký, họ tên, đóng dấu)</p>
        </div>
      </div>
      </form>
             <PDFDownloadLink
        document={<MyDocument formData={formData} />}
       fileName="phieu-xuat-ban-hang.pdf"
      >
        {({ loading }) => (loading ? 'Đang tạo PDF...' : 'Tải xuống PDF')}
       </PDFDownloadLink>
    </div>
  );
};

export default FormXuatKho;


