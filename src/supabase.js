import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://fatzxevtjwmqqevvopfi.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhdHp4ZXZ0andtcXFldnZvcGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzOTYzNDksImV4cCI6MjA2Mzk3MjM0OX0.pmJP-XidWvdEy9FWuvgF4gSY9dioIx0CZUpbtxTaj6Q'; 
export const supabase = createClient(supabaseUrl, supabaseKey);
