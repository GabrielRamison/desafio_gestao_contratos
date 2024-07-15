const express = require('express');
const multer = require('multer');
const contractController = require('../controllers/contractController');

const router = express.Router();

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });

// Rotas
router.post('/create', upload.single('contract'), contractController.createContract);
router.get('/', contractController.getAllContracts);
router.get('/:id', contractController.getContractById);
router.put('/:id', contractController.updateContract);
router.delete('/:id', contractController.deleteContract);


// Rota para obter todos os contratos
router.get('/', async (req, res) => {
  try {
    const contracts = await Contract.query().select();
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contracts', error: error.message });
  }
});

// Rota para obter um contrato específico
router.get('/:id', async (req, res) => {
  try {
    const contract = await Contract.query().findById(req.params.id);
    res.json(contract);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contract', error: error.message });
  }
});

module.exports = router;
