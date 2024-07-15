const Contract = require('../models/Contract');
const fs = require('fs');
const pdfParse = require('pdf-parse');

async function generatePdfSummary(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text.slice(0, 500); // Pega os primeiros 500 caracteres do texto
}

exports.createContract = async (req, res) => {
  try {
    console.log('Request file:', req.file); // Adiciona logging do arquivo
    console.log('Request body:', req.body); // Adiciona logging do corpo da requisição

    const { name, signed_date, valid_until, parties_involved, summary } = req.body;
    const filePath = req.file.path;

    const newContract = await Contract.query().insert({
      name,
      signed_date,
      valid_until,
      parties_involved,
      pdf_summary: pdfSummary,
      file_path: filePath
    });

    res.status(201).json({ message: 'Contract created successfully', contract: newContract });
  } catch (error) {
    console.error('Error creating contract:', error);
    res.status(500).json({ message: 'Error creating contract', error: error.message });
  }
};

exports.getAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.query();
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contracts', error });
  }
};

exports.getContractById = async (req, res) => {
  try {
    const contract = await Contract.query().findById(req.params.id);
    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }
    res.json(contract);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contract', error });
  }
};

  exports.updateContract = async (req, res) => {
    try {
      const { name, signed_date, valid_until, parties_involved, summary } = req.body;
  
      // Encontrar o contrato existente
      const existingContract = await Contract.query().findById(req.params.id);
      if (!existingContract) {
        return res.status(404).json({ message: 'Contract not found' });
      }
  
      // Se um novo arquivo foi enviado, use o novo caminho do arquivo, caso contrário, mantenha o caminho existente
      const filePath = req.file ? req.file.path : existingContract.file_path;
  
      const updatedContract = await Contract.query().patchAndFetchById(req.params.id, {
        name,
        signed_date,
        valid_until,
        parties_involved,
        summary,
        file_path: filePath
      });
  
      res.json({ message: 'Contract updated successfully', contract: updatedContract });
    } catch (error) {
      console.error('Error updating contract:', error);
      res.status(500).json({ message: 'Error updating contract', error });
    }
  };
  
 
//   try {
//     const updatedContract = await Contract.query().patchAndFetchById(req.params.id, req.body);
//     if (!updatedContract) {
//       return res.status(404).json({ message: 'Contract not found' });
//     }
//     res.json({ message: 'Contract updated successfully', contract: updatedContract });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating contract', error });
//   }
// };

exports.deleteContract = async (req, res) => {
  try {
    const rowsDeleted = await Contract.query().deleteById(req.params.id);
    if (rowsDeleted === 0) {
      return res.status(404).json({ message: 'Contract not found' });
    }
    res.json({ message: 'Contract deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contract', error });
  }
};
