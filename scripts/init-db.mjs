import postgres from 'postgres';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const databaseUrl = process.env.POSTGRES_URL;

if (!databaseUrl) {
  console.error('Missing POSTGRES_URL environment variable');
  process.exit(1);
}

async function main() {
  const sql = postgres(databaseUrl);

  try {
    console.log('[v0] Connecting to database...');
    
    // Read and execute the schema creation SQL
    const schemaPath = path.join(__dirname, '01-create-tables.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf-8');
    
    // Split by semicolon and execute each statement
    const statements = schemaSql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`[v0] Executing ${statements.length} schema statements...`);
    
    for (const statement of statements) {
      try {
        await sql.unsafe(statement);
        console.log(`[v0] ✓ Executed: ${statement.substring(0, 60)}...`);
      } catch (error) {
        // Some statements might fail if they already exist, that's ok
        if (error.message.includes('already exists')) {
          console.log(`[v0] ℹ Table/index already exists (skipping)`);
        } else {
          console.warn(`[v0] Warning: ${error.message}`);
        }
      }
    }

    // Read and execute the seed data SQL
    console.log('[v0] Seeding database with sample data...');
    const seedPath = path.join(__dirname, '02-seed-data.sql');
    const seedSql = fs.readFileSync(seedPath, 'utf-8');
    
    const seedStatements = seedSql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (const statement of seedStatements) {
      try {
        await sql.unsafe(statement);
        console.log(`[v0] ✓ Seeded: ${statement.substring(0, 60)}...`);
      } catch (error) {
        console.warn(`[v0] Warning during seed: ${error.message}`);
      }
    }

    console.log('[v0] Database setup complete!');
    process.exit(0);
  } catch (error) {
    console.error('[v0] Database setup failed:', error);
    process.exit(1);
  }
}

main();
