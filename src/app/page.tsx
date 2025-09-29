import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Home() {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  return (
    <div className="navbar">
      <div className="title">
        UMU EVENT
      </div>
    </div>

  );
}
