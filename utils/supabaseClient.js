import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from "@supabase/supabase-js"

// retrieving environment variables

const supabaseUrl = "https://yrjpyxxskaprgyqwygdq.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyanB5eHhza2Fwcmd5cXd5Z2RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDgzNTM1MTUsImV4cCI6MTk2MzkyOTUxNX0.Bv5wx9dtxbQek8_eQnXfLPvs0OnPVsSTdgttViPAg8c"

export const supabase = createClient(supabaseUrl, supabaseKey,
	{
    	localStorage: AsyncStorage,
    	autoRefreshToken: true,
    	persistSession: true
  	}
);