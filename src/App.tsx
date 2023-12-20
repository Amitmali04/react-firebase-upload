import React, { useState, useEffect } from 'react';
import { firestore } from './firebase';
import { getDocs, collection, addDoc} from 'firebase/firestore';
// import PaginatedDataTable from './PaginatedDataTable';
import {Box, Container} from '@mui/material';
import UploadData from './Components/UploadData';
import DataTable from './Components/DataTable';
import SearchBar from './Components/SearchBar';
import Navbar from './Components/Navbar';

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  useEffect(() => {
    // Replace with actual Firestore fetch logic
      const fetchData = async () => {
        try {
          const snapshot = await getDocs(collection(firestore, 'users'));
          const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setData(data);
        } catch (error) {
          console.error('Error fetching data from Firestore:', error);
        }
      };

    fetchData();
  }, []);

  const handleUpload = async (uploadedData: any[]) => {
    
    const usersCollection = collection(firestore, 'users');
    uploadedData.forEach(async (item) => {
      await addDoc(usersCollection, item);
    });
  };

  const handleSearch = (query: string) => {
    const filteredData = data.filter((item) => {
    
      const firstNameMatches = item?.first_name?.toLowerCase().includes(query.toLowerCase()) || false;
      const emailMatches = item?.email?.toLowerCase().includes(query.toLowerCase()) || false;
      const lastNameMatches = item?.last_name?.toLowerCase().includes(query.toLowerCase()) || false;
      const addressMatches = item?.address?.toLowerCase().includes(query.toLowerCase()) || false;
      const mobileMatches = item?.mobile?.toLowerCase().includes(query.toLowerCase()) || false;
      const genderMatches = item?.gender?.toLowerCase().includes(query.toLowerCase()) || false;
  
  
      return firstNameMatches || emailMatches || addressMatches || lastNameMatches || genderMatches || mobileMatches;
    });
  
    setFilteredData(filteredData);
  };

  // Add Pagination 
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <Navbar />
      <Box m={2} pt={4}>
      <UploadData onUpload={handleUpload} />
      </Box> 
      <Container>
      <SearchBar onSearch={handleSearch} />
      </Container>
      <DataTable data={filteredData.length > 0 ? filteredData : data}
       currentPage={currentPage}
       itemsPerPage={itemsPerPage}
       onPageChange={handlePageChange}
        />
      
     
    </div>
  );
};

export default App;
