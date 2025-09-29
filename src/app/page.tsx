import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Home() {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // Fetch events from Supabase
  const { data: events, error } = await supabase
    .from('Event')
    .select('*')

  if (error) {
    console.error('Error fetching events:', error)
  }

  return (
    <>
      <div className="navbar">
        <div className="title">UMU EVENT</div>
      </div>
      <div className="sub-title">In progress..</div>
      <div className="event-container">
        {events?.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>Starts: {event.startDate}</p>
            <p>Ends: {event.endDate}</p>
          </div>
        ))}
      </div>
    </>

  );
}
