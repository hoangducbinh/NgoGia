import React, { useState } from 'react';
import '../style/FormXuatKho.css';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const FormXuatKho = () => {
  const [rows, setRows] = useState([{ id: 1, data: ['', '', '', '', '', ''] }]);
  const [sum,setSum] = useState("");
  const handleAddRow = () => {
    setRows([...rows, { id: rows.length + 1, data: ['', '', '', '', '', ''] }]);
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
    const number = Number(value.replace(/,/g, '')); // Remove existing commas
    return isNaN(number) ? '' : number.toLocaleString(); // Format number with commas
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter(row => row.id !== id).map((row, index) => ({
      ...row,
      id: index + 1 // Đặt lại STT
    })));
  };

  return (
    <div className="invoice-container">
      <h1>PHIẾU XUẤT KHO BÁN HÀNG</h1>
      <div className="header1">
        <div className="left">
          <p><strong>Người mua:</strong> <input type="text" /></p>
          <p><strong>Tên khách hàng:</strong> <input type="text" /></p>
          <p><strong>Địa chỉ:</strong> <input type="text" /></p>
          <p><strong>Mã số thuế:</strong> <input type="text" /></p>
          <p><strong>Điện thoại:</strong> <input type="text" /></p>
          <p><strong>Diễn giải:</strong> <input type="text" /></p>
          <p><strong>Nhân viên bán hàng:</strong> <input type="text" /></p>
        </div>
        <div className="right">
          <p><strong>Ngày:</strong> <textarea type="text" /></p>
          <p><strong>Số:</strong> <textarea type="text" /></p>
          <p><strong>Loại tiền:</strong> VND</p>
        </div>
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
            <th>Xóa</th> 
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
              <td>
                <IconButton
                  color="inherit"
                  onClick={() => handleDeleteRow(row.id)}
                >
                  <DeleteIcon className='btn-delete' />
                </IconButton>
              </td>
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
    </div>
  );
};

export default FormXuatKho;
