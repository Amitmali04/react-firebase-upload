
import React, { useState } from 'react';
import { Button, Input } from '@mui/material';
import * as XLSX from 'xlsx';
import { firestore } from '../firebase';
import {collection, addDoc} from 'firebase/firestore'

interface UploadDataProps {
  onUpload: (data: any[]) => void;
}

const UploadData: React.FC<UploadDataProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      try {
        // Read Excel file
        const fileReader = new FileReader();
        fileReader.onload = async (e) => {
          const data = e.target?.result;
          if (data) {
            // Parse Excel data using xlsx library
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

            // Upload parsed data to Firestore
            // This assumes your Firestore collection is named 'users'
            const usersCollection = collection(firestore,"users");
            for (const item of excelData) {
              await addDoc(usersCollection, item);
            }

            // Notify the parent component about the upload
            onUpload(excelData);
          }
        };
        fileReader.readAsBinaryString(file);
        alert("Data Send Firebase !")
        setFile(null);
      } catch (error) {
        console.error('Error parsing Excel file:', error);
      }
    }
  };

  return (
    <div>
      <Input type="file" onChange={handleFileChange} />
      <Button variant="outlined" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
};

export default UploadData;
