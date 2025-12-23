import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// Переменные окружения для Create React App должны начинаться с REACT_APP_
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://uqfywgterkhltfmrjivy.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxZnl3Z3RlcmtobHRmbXJqaXZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNDIyNjYsImV4cCI6MjA2MjcxODI2Nn0.HEDt6OEu26MYQv9hMdFJhZzq_7vAUsL3Y_j8y_QZgDw';

// Создаём клиент Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for common operations

/**
 * Fetch data from a table
 * @param {string} table - Table name
 * @param {object} options - Query options (select, filter, order, limit)
 */
export async function fetchData(table, options = {}) {
  let query = supabase.from(table).select(options.select || '*');
  
  if (options.filter) {
    Object.entries(options.filter).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
  }
  
  if (options.order) {
    query = query.order(options.order.column, { ascending: options.order.ascending ?? true });
  }
  
  if (options.limit) {
    query = query.limit(options.limit);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error(`Error fetching from ${table}:`, error);
    throw error;
  }
  
  return data;
}

/**
 * Insert data into a table
 * @param {string} table - Table name
 * @param {object|array} data - Data to insert
 */
export async function insertData(table, data) {
  const { data: result, error } = await supabase
    .from(table)
    .insert(data)
    .select();
  
  if (error) {
    console.error(`Error inserting into ${table}:`, error);
    throw error;
  }
  
  return result;
}

/**
 * Update data in a table
 * @param {string} table - Table name
 * @param {object} data - Data to update
 * @param {object} match - Match conditions (e.g., { id: 1 })
 */
export async function updateData(table, data, match) {
  let query = supabase.from(table).update(data);
  
  Object.entries(match).forEach(([key, value]) => {
    query = query.eq(key, value);
  });
  
  const { data: result, error } = await query.select();
  
  if (error) {
    console.error(`Error updating ${table}:`, error);
    throw error;
  }
  
  return result;
}

/**
 * Delete data from a table
 * @param {string} table - Table name
 * @param {object} match - Match conditions (e.g., { id: 1 })
 */
export async function deleteData(table, match) {
  let query = supabase.from(table).delete();
  
  Object.entries(match).forEach(([key, value]) => {
    query = query.eq(key, value);
  });
  
  const { error } = await query;
  
  if (error) {
    console.error(`Error deleting from ${table}:`, error);
    throw error;
  }
  
  return true;
}

export default supabase;

