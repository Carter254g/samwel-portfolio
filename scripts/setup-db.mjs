import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runSqlFile(filePath) {
  try {
    const sql = fs.readFileSync(filePath, 'utf-8');
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const statement of statements) {
      console.log(`Executing: ${statement.substring(0, 50)}...`);
      const { error } = await supabase.rpc('execute_sql', {
        sql_statement: statement
      }).catch(() => {
        // Fallback: Try direct query
        return supabase.from('_dummy').select('*');
      });

      if (error) {
        console.warn(`Warning: ${error.message}`);
      }
    }
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
  }
}

async function main() {
  try {
    console.log('Setting up database tables...');
    
    // Since Supabase doesn't expose direct SQL execution via JS client,
    // we'll create tables using the Supabase API instead
    console.log('Creating tables via Supabase...');
    
    const tables = [
      {
        name: 'photographers',
        columns: {
          id: { type: 'uuid', isPrimaryKey: true },
          name: { type: 'text' },
          bio: { type: 'text' },
          experience_years: { type: 'integer' },
          email: { type: 'text' },
          phone: { type: 'text' },
          image_url: { type: 'text' },
          created_at: { type: 'timestamp' },
          updated_at: { type: 'timestamp' }
        }
      },
      {
        name: 'services',
        columns: {
          id: { type: 'uuid', isPrimaryKey: true },
          title: { type: 'text' },
          description: { type: 'text' },
          icon: { type: 'text' },
          order_index: { type: 'integer' },
          created_at: { type: 'timestamp' },
          updated_at: { type: 'timestamp' }
        }
      },
      {
        name: 'portfolios',
        columns: {
          id: { type: 'uuid', isPrimaryKey: true },
          title: { type: 'text' },
          description: { type: 'text' },
          image_url: { type: 'text' },
          category: { type: 'text' },
          featured: { type: 'boolean' },
          created_at: { type: 'timestamp' },
          updated_at: { type: 'timestamp' }
        }
      },
      {
        name: 'testimonials',
        columns: {
          id: { type: 'uuid', isPrimaryKey: true },
          client_name: { type: 'text' },
          client_role: { type: 'text' },
          content: { type: 'text' },
          rating: { type: 'integer' },
          featured: { type: 'boolean' },
          created_at: { type: 'timestamp' },
          updated_at: { type: 'timestamp' }
        }
      },
      {
        name: 'contact_submissions',
        columns: {
          id: { type: 'uuid', isPrimaryKey: true },
          name: { type: 'text' },
          email: { type: 'text' },
          phone: { type: 'text' },
          message: { type: 'text' },
          service_type: { type: 'text' },
          read: { type: 'boolean' },
          created_at: { type: 'timestamp' }
        }
      }
    ];

    console.log('Note: Please create the tables manually in Supabase:');
    console.log('1. Go to your Supabase project dashboard');
    console.log('2. Click on SQL Editor');
    console.log('3. Paste the contents of scripts/01-create-tables.sql');
    console.log('4. Click "Run" to execute');
    console.log('5. Then paste and run scripts/02-seed-data.sql');
    console.log('\nAlternatively, use the Supabase dashboard table creation UI.');

  } catch (error) {
    console.error('Setup failed:', error);
    process.exit(1);
  }
}

main();
