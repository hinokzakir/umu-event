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

  // Get unique months from events
  const months = [...new Set(events?.map(event => 
    new Date(event.startDate).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long' })
  ))]

  return (
    <>
      <div className="navbar">
        <div className="title">umu event</div>
      </div>
      {months.map(month => (
        <div key={month}>
          <div className='month-title'>{month}:</div>
          <div className="event-container">
            {events?.filter(event => 
              new Date(event.startDate).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long' }) === month
            ).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
            .map((event) => (
              <div key={event.id} className="event-card">
                <img src={event.image} width={"500px"} height={"200px"}></img>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p>Starts: {event.startDate}</p>
                <p>Ends: {event.endDate}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>

  );
}