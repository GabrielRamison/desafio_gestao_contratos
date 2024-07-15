const { Model } = require('objection');

class Contract extends Model {
  static get tableName() {
    return 'contracts';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'signed_date', 'valid_until', 'parties_involved', 'summary', 'file_path'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        signed_date: { type: 'string', format: 'date' },
        valid_until: { type: 'string', format: 'date' },
        parties_involved: { type: 'string' },
        summary: { type: 'string' },
        file_path: { type: 'string' },
        preview: { type: 'string' }, // Adiciona o campo de prévia
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' }
      }
    };
  }
}

module.exports = Contract;
