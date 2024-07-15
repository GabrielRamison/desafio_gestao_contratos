// const express = require('express');
// const bodyParser = require('body-parser');
// const { Model } = require('objection');
// const Knex = require('knex');
// const knexConfig = require('./knexfile.js');
// const multer = require('multer');
// const cors = require('cors');  // Importa o módulo CORS
// const contractRoutes = require('./routes/contractRoutes');
// require('dotenv').config();
// const path = require('path');
// const fs = require('fs');
// const pdfParse = require('pdf-parse');

// // Inicializa o Express app
// const app = express();

// // Configura o CORS
// app.use(cors());  // Habilita o CORS para todas as rotas

// // Configura o bodyParser e o express.json
// app.use(bodyParser.json());
// app.use(express.json());

// // Servir arquivos estáticos da pasta 'uploads'
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Middleware para log do corpo da solicitação
// app.use((req, res, next) => {
//   console.log('Request body:', req.body);
//   next();
// });

// // Configuração do Knex e Objection.js
// const knex = Knex(knexConfig.development);
// Model.knex(knex);

// // Configuração do Multer para upload de arquivos
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   }
// });

// const upload = multer({ storage });

// // Modelo de contrato
// const Contract = require('./models/Contract');

// // Rota para criar um novo contrato com upload de arquivo
// app.post('/contracts', upload.single('contract'), async (req, res) => {
//   try {
//     console.log('Request file:', req.file); // Adiciona logging do arquivo
//     console.log('Request body:', req.body); // Adiciona logging do corpo da requisição

//     const { name, signed_date, valid_until, parties_involved, summary } = req.body;
//     const filePath = req.file.path;

//     const newContract = await Contract.query().insert({
//       name,
//       signed_date,
//       valid_until,
//       parties_involved,
//       summary,
//       file_path: filePath
//     });

//     res.status(201).json({ message: 'Contract created successfully', contract: newContract });
//   } catch (error) {
//     console.error('Error creating contract:', error); // Adicionado logging detalhado
//     res.status(500).json({ message: 'Error creating contract', error: error.message });
//   }
// });

// // Usando as rotas
// app.use('/contracts', contractRoutes);

// // Inicia o servidor
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const bodyParser = require('body-parser');
const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('./knexfile.js');
const multer = require('multer');
const cors = require('cors');
const contractRoutes = require('./routes/contractRoutes');
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');

// Inicializa o Express app
const app = express();

// Configura o CORS
app.use(cors());

// Configura o bodyParser e o express.json
app.use(bodyParser.json());
app.use(express.json());

// Servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware para log do corpo da solicitação
app.use((req, res, next) => {
  console.log('Request body:', req.body);
  next();
});

// Configuração do Knex e Objection.js
const knex = Knex(knexConfig.development);
Model.knex(knex);

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

// Modelo de contrato
const Contract = require('./models/Contract');

// Função para extrair prévia do PDF
async function extractPdfPreview(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text.substring(0, 200) + '...'; // Mostra os primeiros 200 caracteres como prévia
  } catch (error) {
    console.error('Error extracting PDF preview:', error);
    return 'Error loading preview';
  }
}

// Rota para criar um novo contrato com upload de arquivo
app.post('/contracts', upload.single('contract'), async (req, res) => {
  try {
    const { name, signed_date, valid_until, parties_involved, summary } = req.body;
    const filePath = req.file.path;

    const preview = await extractPdfPreview(filePath);

    const newContract = await Contract.query().insert({
      name,
      signed_date,
      valid_until,
      parties_involved,
      summary,
      file_path: filePath,
      preview
    });

    res.status(201).json({ message: 'Contract created successfully', contract: newContract });
  } catch (error) {
    console.error('Error creating contract:', error);
    res.status(500).json({ message: 'Error creating contract', error: error.message });
  }
});

// Rota para atualizar um contrato existente
app.put('/contracts/:id', upload.single('contract'), async (req, res) => {
  try {
    const { name, signed_date, valid_until, parties_involved, summary } = req.body;
    const contractId = req.params.id;
    const filePath = req.file ? req.file.path : null;

    let preview;
    if (filePath) {
      preview = await extractPdfPreview(filePath);
    }

    const updatedContract = await Contract.query().patchAndFetchById(contractId, {
      name,
      signed_date,
      valid_until,
      parties_involved,
      summary,
      file_path: filePath,
      preview
    });

    res.status(200).json({ message: 'Contract updated successfully', contract: updatedContract });
  } catch (error) {
    console.error('Error updating contract:', error);
    res.status(500).json({ message: 'Error updating contract', error: error.message });
  }
});

// Usando as rotas
app.use('/contracts', contractRoutes);

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
