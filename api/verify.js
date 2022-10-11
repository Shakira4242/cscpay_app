import { supabase } from '../utils/supabaseClient'

export const testSignIn = async () => {
  try{
    const { user, error } = await supabase.auth.signIn({
      phone: '+19999999999',
      password: 'appletest'
    })
    console.log(user, error)
  } catch(error) {
    console.log(error)
  }
}

export const livetestSignIn = async () => {
  try{
    const { user, error } = await supabase.auth.signIn({
      phone: '+19999999998',
      password: 'appletest'
    })
    console.log(user, error)
  } catch(error) {
    console.log(error)
  }
}



export const sendSmsVerification = async (phoneNumber) => {
  try {
    const { user, session, error } = await supabase.auth.signIn({
      phone: phoneNumber,
    })
    return true
  } catch (error) {
    return false;
  }
};

export const checkVerification = async (phoneNumber, code) => {
  try {
    const { user, session, error } = await supabase.auth.verifyOTP({
      phone: phoneNumber,
      token: code,
    })
    return true
  } catch (error) {
    return false;
  }
};

export const updateUser = async(data) => {
  try {
    const { user, session, error } = await supabase.auth.signIn({
      phone: phoneNumber,
    })
    return true
  } catch (error) {
    return false;
  }
}

export const gift = async () => {
  try {
    const { data: users, error } = await supabase
    .from('users')
    .select('gift_state')
    .single()

    
    return users
  } catch(error) {
    return null
  }
}




