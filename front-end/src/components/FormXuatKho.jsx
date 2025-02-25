
import React, { useState } from 'react';
import '../style/FormXuatKho.css';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MyDocument from './PDFDocument'; 
import { PDFDownloadLink } from '@react-pdf/renderer';

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
    { id: 1, code: 'DL-JW35VF', name: 'Máy lạnh Mitsubishi Electric Inverter 1.5 HP MSY-JW 35VF', unit: 'cái', quantity: 10, price: 200, total: "2,000" },
    { id: 2, code: '2', name: 'Máy giặt', unit: 'cái', quantity: 20, price: 400, total: "8,000" },
    { id: 3, code: '3', name: 'Tủ lạnh', unit: 'cái', quantity: 5, price: 300, total: "1,500" },
    { id: 4, code: '4', name: 'Tủ đông', unit: 'cái', quantity: 15, price: 500, total: "7,500" },
  ]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleAddRow = () => { 
    setRows([...rows, { id: rows.length + 1, data: ['', '', '', '', '', ''] }]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDeviceSelect = (e) => {
    const selectedDeviceId = parseInt(e.target.value);
    const device = devices.find(device => device.id === selectedDeviceId);
    if (device) {
      setSelectedDevice(device);
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
    }
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
            <p><strong>Người mua:</strong> <input type="text" name="nguoimua" value={formData.nguoimua} onChange={handleChange} /></p>
            <p><strong>Tên khách hàng:</strong> <input type="text" name="tenkhachhang" value={formData.tenkhachhang} onChange={handleChange} /></p>
            <p><strong>Địa chỉ:</strong> <input type="text" name="diachi" value={formData.diachi} onChange={handleChange} /></p>
            <p><strong>Mã số thuế:</strong> <input type="text" name="mathue" value={formData.mathue} onChange={handleChange} /></p>
            <p><strong>Điện thoại:</strong> <input type="text" name="dienthoai" value={formData.dienthoai} onChange={handleChange} /></p>
            <p><strong>Diễn giải:</strong> <input type="text" name="mota" value={formData.mota} onChange={handleChange} /></p>
            <p><strong>Nhân viên bán hàng:</strong> <input type="text" name="nguoiban" value={formData.nguoiban} onChange={handleChange} /></p>
          </div>
          <div className="right">
            <p><strong>Ngày:</strong> <input type="text" /></p>
            <p><strong>Số:</strong> <input type="text" /></p>
            <p><strong>Loại tiền:</strong> VND</p>
          </div>
        </div>
        
        <div className="device-selection">
          <label htmlFor="deviceSelect">Chọn thiết bị:</label>
          <select id="deviceSelect" onChange={handleDeviceSelect} value={selectedDevice ? selectedDevice.id : ''}>
            <option value="" disabled>Chọn thiết bị</option>
            {devices.map(device => (
              <option key={device.id} value={device.id}>
                {device.name}
              </option>
            ))}
          </select>
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
      {/* <PDFDownloadLink
        document={<MyDocument formData={formData}  rows={rows} />}
        fileName="phieu-xuat-ban-hang.pdf"
      >
        {({ loading }) => (loading ? 'Đang tạo PDF...' : 'Tải xuống PDF')}
      </PDFDownloadLink> */}
       <PDFDownloadLink
    document={<MyDocument formData={formData} rows={rows} />}
    fileName="phieu-xuat-ban-hang.pdf"
  >
    {({ loading }) => (
      loading ? (
        <div className="pdf-download-container">
          Đang tạo PDF...
        </div>
      ) : (
        <div className="pdf-download-container">
          Tải xuống PDF
        </div>
      )
    )}
  </PDFDownloadLink>  
    </div>
  );
};

export default FormXuatKho;
  
