'use client'

import React, { useState, useRef } from 'react';
import {Wallet} from "@coinbase/onchainkit/wallet";

export default function Home() {
  const [fundMessage, setFundMessage] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const [fileUploadMessage, setFileUploadMessage] = useState('');
  const [evolveMessage, setEvolveMessage] = useState('');
  const [isLoading, setIsLoading] = useState({ fund: false, upload: false, fileUpload: false });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const evolveFileInputRef = useRef<HTMLInputElement>(null);
  const [rootTxId, setRootTxId] = useState('');

  const fundAccount = async () => {
    try {
      setIsLoading(prev => ({ ...prev, fund: true }));
      setFundMessage('Funding...');
      const res = await fetch('/api/irys/fund', { method: 'POST' });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Funding failed');
      }

      const data = await res.json();
      setFundMessage(data.message || 'Account funded successfully');
    } catch (error: any) {
      console.error('Fund error:', error);
      setFundMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(prev => ({ ...prev, fund: false }));
    }
  };

  const uploadData = async () => {
    try {
      setIsLoading(prev => ({ ...prev, upload: true }));
      setUploadMessage('Uploading...');
      const res = await fetch('/api/irys/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataToUpload: 'Irys world.' }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await res.json();
      setUploadMessage(data.url ? `Uploaded: ${data.url}` : 'Upload successful but no URL returned');
    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(prev => ({ ...prev, upload: false }));
    }
  };

  const uploadFile = async () => {
    try {
      if (!fileInputRef.current?.files?.length) {
        setFileUploadMessage('Please select a file first');
        return;
      }

      const file = fileInputRef.current.files[0];
      setIsLoading(prev => ({ ...prev, fileUpload: true }));
      setFileUploadMessage(`Uploading file: ${file.name}...`);

      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/irys/upload-file', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'File upload failed');

      setFileUploadMessage(data.url ? `File uploaded: ${data.url}` : 'Upload successful but no URL returned');

      fileInputRef.current.value = '';
    } catch (error: any) {
      console.error('File upload error:', error);
      setFileUploadMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(prev => ({ ...prev, fileUpload: false }));
    }
  };

  const evolveFile = async () => {
    try {
      if (!evolveFileInputRef.current?.files?.length || !rootTxId) {
        setEvolveMessage('Provide both file and rootTxId');
        return;
      }

      const file = evolveFileInputRef.current.files[0];
      setIsLoading(prev => ({ ...prev, fileUpload: true }));
      setEvolveMessage(`Evolving file: ${file.name}...`);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('rootTxId', rootTxId);

      const res = await fetch('/api/irys/evolve-file', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Evolve failed");

      setEvolveMessage(`Evolved: ${data.url}`);
      evolveFileInputRef.current.value = '';
    } catch (error: any) {
      console.error('Evolve error:', error);
      setEvolveMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(prev => ({ ...prev, fileUpload: false }));
    }
  };

  return (
    <div className="p-5 max-w-xl mx-auto">
      <Wallet/>
      <h1 className="text-2xl font-bold mb-6">Irys Uploader & Evolver</h1>

      {/* Fund */}
      <div className="mb-6">
        <button
          onClick={fundAccount}
          disabled={isLoading.fund}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {isLoading.fund ? 'Funding...' : 'Fund Account'}
        </button>
        <div className="mt-2 text-sm text-gray-700">{fundMessage}</div>
      </div>

      {/* Upload Data */}
      <div className="mb-6">
        <button
          onClick={uploadData}
          disabled={isLoading.upload}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {isLoading.upload ? 'Uploading...' : 'Upload Data'}
        </button>
        <div className="mt-2 text-sm text-gray-700">{uploadMessage}</div>
      </div>

      {/* Upload File */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Upload File (mutable)</h2>
        <input
          type="file"
          ref={fileInputRef}
          className="mb-3 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        <button
          onClick={uploadFile}
          disabled={isLoading.fileUpload}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {isLoading.fileUpload ? 'Uploading File...' : 'Upload File'}
        </button>
        <div className="mt-2 text-sm text-gray-700">{fileUploadMessage}</div>
      </div>

      {/* Evolve File */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Evolve Existing File</h2>
        <input
          type="text"
          value={rootTxId}
          onChange={e => setRootTxId(e.target.value)}
          placeholder="Enter Root TX ID"
          className="mb-2 p-2 border w-full text-sm"
        />
        <input
          type="file"
          ref={evolveFileInputRef}
          className="mb-3 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded file:border-0
            file:text-sm file:font-semibold
            file:bg-red-50 file:text-red-700
            hover:file:bg-red-100"
        />
        <button
          onClick={evolveFile}
          disabled={isLoading.fileUpload}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {isLoading.fileUpload ? 'Evolving...' : 'Evolve File'}
        </button>
        <div className="mt-2 text-sm text-gray-700">{evolveMessage}</div>
      </div>
    </div>
  );
}
