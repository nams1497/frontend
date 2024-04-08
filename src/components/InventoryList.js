import React, { useState } from 'react';

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

  const handleSave = (id) => {
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
          <th>Spent</th>
          <th>Expiry Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map((item) => (
          <tr key={item.id}>
            <td>{editingItem === item.id ? <input type="text" value={updatedValues.name} onChange={(e) => handleInputChange(e, 'name')} /> : item.name}</td>
            <td>{editingItem === item.id ? <input type="number" value={updatedValues.amount} onChange={(e) => handleInputChange(e, 'amount')} /> : item.amount}</td>
            <td>{editingItem === item.id ? <input type="text" value={updatedValues.spent} onChange={(e) => handleInputChange(e, 'spent')} /> : item.spent}</td>
            <td>{editingItem === item.id ? <input type="text" value={updatedValues.expiryDate} onChange={(e) => handleInputChange(e, 'expiryDate')} /> : item.expiryDate}</td>
            <td>{editingItem === item.id ? <input type="text" value={updatedValues.status} onChange={(e) => handleInputChange(e, 'status')} /> : item.status}</td>
            <td>
              {editingItem === item.id ? (
                <button onClick={() => handleSave(item.id)}>Save</button>
              ) : (
                <React.Fragment>
                  <button onClick={() => handleEdit(item.id, item)} style={{ cursor: 'pointer', marginLeft: '7px', marginRight: '12px', color: 'green' }}>Edit</button>
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
