import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InventoryList = ({ inventory, onEdit, onDelete }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [updatedValues, setUpdatedValues] = useState({});

  const handleEdit = (id, item) => {
    setEditingItem(id);
    setUpdatedValues({ ...item });
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setUpdatedValues(prevValues => ({
      ...prevValues,
      [field]: value
    }));
  };

  const handleDateChange = (date, field) => {
    // Format the date as a string in "dd/MM/yyyy" format
    const formattedDate = date.toLocaleDateString('en-GB');
    setUpdatedValues(prevValues => ({
      ...prevValues,
      [field]: formattedDate
    }));
  };

  const handleSave = (id) => {
    // Input validation
    if (!updatedValues.name || !updatedValues.amount || !updatedValues.spent || !updatedValues.expiryDate) {
      alert('Please fill in all the fields');
      return;
    }

    // Check if any field contains special characters
    const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (specialCharsRegex.test(updatedValues.name) || specialCharsRegex.test(updatedValues.status)) {
      alert('Please do not use special characters in the name or status field');
      return;
    }

    // Check if the amount is a valid number
    const amount = parseFloat(updatedValues.amount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    // Check if the spent is a valid number
    const spent = parseFloat(updatedValues.spent);
    if (isNaN(spent) || spent <= 0) {
      alert('Please enter a valid spent amount');
      return;
    }

    // Call the onEdit function to save the updated item
    onEdit(id, updatedValues);
    setEditingItem(null);
    setUpdatedValues({});
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Spent($)</th>
          <th>Expiry Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map((item) => (
          <tr key={item.id}>
            <td>
              {editingItem === item.id ? (
                <input type="text" value={updatedValues.name} onChange={(e) => handleInputChange(e, 'name')} />
              ) : (
                item.name
              )}
            </td>
            <td>
              {editingItem === item.id ? (
                <input type="text" value={updatedValues.amount} onChange={(e) => handleInputChange(e, 'amount')} />
              ) : (
                item.amount
              )}
            </td>
            <td>
              {editingItem === item.id ? (
                <input type="text" value={updatedValues.spent} onChange={(e) => handleInputChange(e, 'spent')} />
              ) : (
                item.spent
              )}
            </td>
            <td>
              {editingItem === item.id ? (
                <DatePicker
                  selected={new Date(updatedValues.expiryDate)}
                  onChange={(date) => handleDateChange(date, 'expiryDate')}
                  dateFormat="dd/MM/yyyy"
                />
              ) : (
                item.expiryDate
              )}
            </td>
            <td>{item.status}</td>
            <td>
              {editingItem === item.id ? (
                <button onClick={() => handleSave(item.id)}>Save</button>
              ) : (
                <React.Fragment>
                  <button onClick={() => handleEdit(item.id, item)} style={{ cursor: 'pointer', marginLeft: '-7px', marginRight: '10px', color: 'green' }}>Edit</button>
                  <button onClick={() => onDelete(item.id)} style={{ cursor: 'pointer', color: 'green' }}>Delete</button>
                </React.Fragment>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryList;
