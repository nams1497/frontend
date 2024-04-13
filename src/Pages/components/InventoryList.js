import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InventoryList = ({ inventory, onEdit, onDelete }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [updatedValues, setUpdatedValues] = useState({});

  // save original data of each item
  const [originalValues, setOriginalValues] = useState({});

  // const handleEdit = (id, item) => {
  //   // Parse the expiry date to ensure it's in Date format
  //   const parts = item.expiryDate.split('/');
  //   const formattedExpiryDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);

  //   // Format the date in the "15 Apr 2024" format
  //   const options = { day: '2-digit', month: 'short', year: 'numeric' };
  //   const formattedDateString = formattedExpiryDate.toLocaleDateString('en-US', options);

  //   setEditingItem(id);
  //   setUpdatedValues({ ...item, expiryDate: formattedDateString });
  // };

  const handleEdit = (id, item) => {
    const parts = item.expiryDate.split('/');
    const formattedExpiryDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);

    setOriginalValues(item);
  
    setEditingItem(id);
    setUpdatedValues({ 
      ...item, 
      expiryDate: formattedExpiryDate, 
    });


    
  };


  const handleCancel = () => {
    setUpdatedValues(originalValues); 
    setEditingItem(null); 
  };
  

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setUpdatedValues(prevValues => ({
      ...prevValues,
      [field]: value
    }));
  };

  const handleDateChange = (date) => {
    setUpdatedValues(prevValues => ({
      ...prevValues,
      expiryDate: date
    }));
  };

  const handleSave = (id) => {
    if (!updatedValues.name || !updatedValues.amount || !updatedValues.spent || !updatedValues.expiryDate) {
      alert('Please fill in all the fields');
      return;
    }

    const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (specialCharsRegex.test(updatedValues.name) || specialCharsRegex.test(updatedValues.status)) {
      alert('Please do not use special characters in the name or status field');
      return;
    }

    const amount = parseFloat(updatedValues.amount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const spent = parseFloat(updatedValues.spent);
    if (isNaN(spent) || spent <= 0) {
      alert('Please enter a valid spent amount');
      return;
    }

    // Convert the expiryDate to the desired format "dd/MM/yyyy"
    const formattedExpiryDate = `${updatedValues.expiryDate.getDate()} ${getMonthName(updatedValues.expiryDate.getMonth())} ${updatedValues.expiryDate.getFullYear()}`;

    // Here we update the state with the new expiryDate as a string
    onEdit(id, { ...updatedValues, expiryDate: formattedExpiryDate });
    setEditingItem(null);
    setUpdatedValues({});
  };


  

  // Function to get the name of the month from its numeric representation
  const getMonthName = (month) => {
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return monthNames[month];
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
                  selected={updatedValues.expiryDate}
                  onChange={(date) => handleDateChange(date)}
                  dateFormat="dd MMM yyyy"
                />
              ) : (
                item.expiryDate
              )}
            </td>
            <td>{item.status}</td>
            <td>
              {editingItem === item.id ? (
                <React.Fragment>
                  <button onClick={() => handleSave(item.id)}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </React.Fragment>
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
