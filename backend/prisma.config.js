// prisma.config.js
require('dotenv').config();
const { defineConfig } = require('prisma/config');

module.exports = defineConfig({
  schema: 'prisma/schema.prisma',
  migrate: {
    datasourceUrl: process.env.DATABASE_URL,
  },
});
