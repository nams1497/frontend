import React, { useState, useEffect, useRef } from 'react';
import InventoryList from './components/InventoryList';
import './App.css';
import DatePicker from 'react-datepicker';

export function Maininventory() {
  const [inventory, setInventory] = useState(() => {
    const storedInventory = localStorage.getItem('inventory');
    return storedInventory ? JSON.parse(storedInventory) : [];
  });
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showScanReceiptPopup, setShowScanReceiptPopup] = useState(false);
  const [showScanProducePopup, setShowScanProducePopup] = useState(false);
  const [showScanPackagePopup, setShowScanPackagePopup] = useState(false);
  const [expiryPlaceholder, setExpiryPlaceholder] = useState(new Date());
  const [newItem, setNewItem] = useState({
    name: '',
    amount: '',
    spent: '',
    expiryDate: '',
    status: ''
  });
  const [msg, setMsg] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [msg1, setMsg1] = useState('');
  const [file1, setFile1] = useState(null);
  const [imgSrc1, setImgSrc1] = useState('');
  const [extractedText1, setExtractedText1] = useState('');
  const [msg2, setMsg2] = useState('');
  const [file2, setFile2] = useState(null);
  const [imgSrc2, setImgSrc2] = useState('');
  const [extractedText2, setExtractedText2] = useState('');
  // const webcamRef = useRef(null);

  // Define handleEditItem function
  const handleEditItem = (id, updatedItem) => {
    // Find the item in the inventory array and update it
    const updatedInventory = inventory.map(item => {
      if (item.id === id) {
        return updatedItem;
      }
      return item;
    });
    setInventory(updatedInventory);
  };

  // Define handleDeleteItem function
  const handleDeleteItem = (id) => {
    // Filter out the item with the specified id from the inventory array
    const updatedInventory = inventory.filter(item => item.id !== id);
    setInventory(updatedInventory);
  };



useEffect(() => {
  const storedInventory = localStorage.getItem('inventory');
  if (storedInventory) {
    setInventory(JSON.parse(storedInventory));
  }
}, []);

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
    console.log("Inventory saved to local storage:", inventory);
  }, [inventory]);


  useEffect(() => {
    // Check expiry dates against current date
    const updatedInventory = inventory.map(item => {
      const expiryDate = new Date(item.expiryDate);
      const currentDate = new Date();
      if (expiryDate < currentDate) {
        return { ...item, status: 'Expired' };
      } else {
        return { ...item, status: 'Not Expired' };
      }
    });
    setInventory(updatedInventory);
  }, []);






//change this to close all
  const togglePopup = (popupType) => {
  setShowAddPopup(false);
  setShowScanReceiptPopup(false);
  setShowScanProducePopup(false);
  setShowScanPackagePopup(false);

    switch (popupType) {
      case 'add':
        setShowAddPopup(!showAddPopup);
        break;
      case 'receipt':
        setShowScanReceiptPopup(!showScanReceiptPopup);
        break;
      case 'produce':
        setShowScanProducePopup(!showScanProducePopup);
        break;
      case 'package':
        setShowScanPackagePopup(!showScanPackagePopup);
        break;
      default:
        break;
    }
  };


const handleInputChange = (event) => {
  const { name, value } = event.target;

if (name === 'status') {
    setNewItem((prevItem) => ({
      ...prevItem,
      status: value
    }));
  } else {
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value
    }));
  }
};


const handleAddItem = () => {
  // Regular expression to check for special characters
  const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;

  // Check if any of the required fields are empty
  if (!newItem.name || !newItem.amount || !newItem.spent || !newItem.expiryDate) {
    // Display an error message or perform any other action
    alert('Please fill in all the fields');
    return; // Exit the function early if validation fails
  }

  // Check if any field contains special characters
  if (specialCharsRegex.test(newItem.name) || specialCharsRegex.test(newItem.status)) {
    alert('Please do not use special characters in the name or status field');
    return;
  }

  // Check if the amount is a valid number
  const amount = parseFloat(newItem.amount);
  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid amount');
    return;
  }

  // Check if the spent is a valid number
  const spent = parseFloat(newItem.spent);
  if (isNaN(spent) || spent <= 0) {
    alert('Please enter a valid spent amount');
    return;
  }

  // Create a new item object
  const newInventoryItem = {
    id: inventory.length + 1,
    name: newItem.name,
    amount: parseFloat(newItem.amount),
    spent: parseFloat(newItem.spent),
    expiryDate: newItem.expiryDate,
  };

  // Add the new item to the inventory
  const updatedInventory = [...inventory, newInventoryItem];
  setInventory(updatedInventory);


  // Update local storage
  localStorage.setItem('inventory', JSON.stringify(updatedInventory));

  // Reset the form fields and hide the add popup
  setNewItem({
    name: '',
    amount: '',
    spent: '',
    expiryDate: '',
    status: ''
  });
  setShowAddPopup(false);
};

  const populateItems = (name, amount, spent, expiryDate, status) => {
    const newInventoryItem = {
      id: inventory.length + 1,
      name: name,
      amount: amount,
      spent: spent,
      expiryDate: expiryDate,
      status: status
    };
    setInventory([...inventory, newInventoryItem]);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://rohan2121.pythonanywhere.com/', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log(data);
      setName(data.name);
      setImgSrc(data.imgSrc);
      setExtractedText(data.extracted_text);
      setMsg(data.msg);
      setNewItem(prevItem => ({
        ...prevItem,
        name: data.name,
        amount: data.extracted_text,
        spent: data.msg,
        expiryDate: '',
        status: ''
      }));
      if (extractedText !== '' || msg !== '') {
        populateItems(data.name, data.extracted_text,  data.msg,'', '');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setMsg('Failed to upload image');
    }
  };

  const handleFileChange1 = (e) => {
    setFile1(e.target.files[0]);
  };

    const handleUpload2 = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file1', file1);
    setShowScanReceiptPopup(false); // Close the popup
    try {
      const response = await fetch('https://new12222-18275757747f.herokuapp.com/pred', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log(data);
      setImgSrc1(data.imgSrc1);
      setExtractedText1(data.extracted_text1);
      setMsg1(data.msg1);
      const daysToAdd = parseInt(data.msg1, 10);
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + daysToAdd);
      const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
      if (extractedText1 !== '' || msg1 !== '') {
        populateItems(data.extracted_text1, '', '', formattedDate, '');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setMsg1('Failed to upload image');
    }
  };

  const handleFileChange2 = (e) => {
    setFile2(e.target.files[0]);
  };

  const handleUpload3 = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file2', file2);

    try {
      const response = await fetch('https://rohan2121.pythonanywhere.com/recpt', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log(data);
      setImgSrc2(data.imgSrc2);
      setExtractedText2(data.extracted_text2);
      setMsg2('Image uploaded successfully!');
      setNewItem(prevItem => ({
        ...prevItem,
        name: '',
        amount: '',
        spent: '',
        expiryDate: data.extracted_text2,
        status: ''
      }));
      if (extractedText2 !== '' || msg2 !== '') {
        populateItems('', '',  '',data.extracted_text2, '');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setMsg('Failed to upload image');
    }
  };

  return (
  <div>
<div className="toolbar">
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img src="applogo.png" alt="App Logo" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
    <span style={{ color: 'green', fontWeight: 'bold' }}>EcoEats</span>
  </div>
  <div className="toolbardiv">
  <button onClick={() => console.log("Recipes clicked")}>Recipes</button>
  <button onClick={() => console.log("Information clicked")}>Information</button>
  <button onClick={() => console.log("Recycling Agencies Clicked")}>Recycling Agencies</button>
  <button onClick={() => console.log("Check My Knowledge Clicked")}>Check My Knowledge</button>
  </div>
  <div></div>
</div>
    <div className="App">

      <header>YOUR INVENTORY</header>
      <InventoryList
        inventory={inventory}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
      />
      <div className="actions">
        <button className="add-button" onClick={() => togglePopup('add')}>Add Manually</button>
        <div className="scan-buttons">
          <button onClick={() => togglePopup('receipt')}>Scan Receipt</button>
          <button onClick={() => togglePopup('package')}>Scan Package</button>
          <button onClick={() => togglePopup('produce')}>Scan Fresh Produce</button>
        </div>

        {/* Add Popup */}
        {showAddPopup && (
          <div className="popup large-popup">
            <h2>Add New Item</h2>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" name="name" value={newItem.name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Amount:</label>
              <input type="text" name="amount" value={newItem.amount} onChange={handleInputChange} />
            </div>
            <div className="form-group">
            <div className="form-group">
              <label>Spent:</label>
              <input type="text" name="spent" value={newItem.spent} onChange={handleInputChange} />
            </div>
            </div>
<DatePicker
  selected={expiryPlaceholder}
  onChange={(date) => {
    // Format the selected date
    const formattedDate = date.toLocaleDateString('en-GB').toString();
    // Set the formatted date to the expiryPlaceholder
    setExpiryPlaceholder(date);
    // Update the expiry date in newItem
    setNewItem(prevItem => ({ ...prevItem, expiryDate: formattedDate }));
  }}
  dateFormat="dd/MM/yyyy"
  className="date-picker"
/>


            <div className="form-actions">
              <button onClick={handleAddItem}>Save</button>
              <button onClick={() => togglePopup('add')}>Cancel</button>
            </div>
          </div>
        )}

        {/* Scan Receipt Popup */}
        {showScanReceiptPopup && (
          <div className="popup">
            <h2>Scan Receipt</h2>
            <div className="scan-options">
              <form onSubmit={handleUpload} encType="multipart/form-data">
                <input type="file" name="file" onChange={handleFileChange} />
                <input type="submit" value="Upload" />
              </form>
              {imgSrc && <img src={imgSrc} alt="Uploaded" />}
            </div>
            <button onClick={() => togglePopup('receipt')}>Cancel</button>
          </div>
        )}

        {/* Scan Package Popup */}
        {showScanPackagePopup && (
          <div className="popup">
            <h2>Scan Package</h2>
            <div className="scan-options">
              <form onSubmit={handleUpload3} encType="multipart/form-data">
                <input type="file" name="file2" onChange={handleFileChange2} />
                <input type="submit" value="Upload" />
              </form>
              {imgSrc2 && <img src={imgSrc2} alt="Uploaded" />}
            </div>
            <button onClick={() => togglePopup('package')}>Cancel</button>
          </div>
        )}

        {/* Scan Fresh Produce Popup */}
        {showScanProducePopup && (
          <div className="popup">
            <h2>Scan Produce</h2>

            <div className="scan-options">
              <form id="uploadForm" onSubmit={handleUpload2} encType="multipart/form-data">
              <input type="file" name="file1" onChange={handleFileChange1} />
              <input type="submit" value="Upload" />
              </form>
              {imgSrc1 && <img src={imgSrc1} alt="Uploaded" />}
              {/* populateItems(extractedText1, '', '', msg1, ''); */}
             </div>
            {/* <button onClick={() => {
              document.getElementById("uploadForm").submit();
              populateItems(extractedText1, '', '', msg1, '');
              }}>Upload</button> */}
            <button onClick={() => togglePopup('produce')}>Cancel</button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default Maininventory;
