
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xpwoxmxqznvbyygsnlvz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhwd294bXhxem52Ynl5Z3NubHZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MDIxNDIsImV4cCI6MjA4NTM3ODE0Mn0.nZyPPLmThBPZg8atxix0NXs10hFqWM4_8uDkumI4zQg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
