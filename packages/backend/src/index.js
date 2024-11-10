require('dotenv').config();
const express = require('express');
const { ethers } = require('ethers');
const app = express();

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = require('./path/to/ABI.json');  // ABI 파일 경로 설정
const contract = new ethers.Contract(contractAddress, contractABI, provider);

app.get('/verify/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
    const result = await contract.verifyCertificate(cid);
    res.json({ verified: result });
  } catch (error) {
    res.status(500).send('Error verifying certificate');
  }
});

app.listen(3000, () => console.log('Server running on port 3000')); 