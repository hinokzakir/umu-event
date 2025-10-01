'use client'

import { createClient } from '@/utils/supabase/client'
import { useState, useEffect } from 'react'
import EventPopup from '@/components/EventPopup'
import HamburgerMenu from '@/components/HamburgerMenu'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Navbar from '@/components/navbar'


export default function Home() {
  const [events, setEvents] = useState<any[]>([])
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [union, setUnion] = useState('all');
  const [hamburgerMenu, setHamburgerMenu] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      const supabase = createClient()

      const { data: events, error } = await supabase
        .from('Event')
        .select('*')

      if (error) {
        console.error('Error fetching events:', error)
      } else {
        setEvents(events || [])
      }
    }
    fetchEvents()
  }, [])

  // Get unique months from events
  const months = [...new Set(events?.map(event =>
    new Date(event.startDate).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long' })
  ))]

  return (
    <>
      <Navbar onMenuClick={() => setHamburgerMenu(true)} />
      <div className='filter-bar'>
        <div className='sub-title'>Filter by: </div>
        <FormControl className='filter-menu' >
          <InputLabel id="filter-select">Union</InputLabel>
          <Select
            labelId="filter-select"
            id="filter-select"
            value={union}
            label="Union"
            onChange={(e) => setUnion(e.target.value)}
          >
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={"ntk"}>NTK</MenuItem>
            <MenuItem value={"ums"}>Umeå Medicinarkår</MenuItem>
            <MenuItem value={"us"}>UmeåStudentkår</MenuItem>
          </Select>
        </FormControl>
      </div>
      {months.map(month => (
        <div key={month}>
          <div className='month-title'>{month}:</div>
          <div className="event-container">
            {events?.filter(event =>
              new Date(event.startDate).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long' }) === month
            ).filter(event => 
              union === 'all' || event.union === union
            ).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
              .map((event) => (
                <div key={event.id} className="event-card" onClick={() => setSelectedEvent(event)}>
                  <img src={event.image} width={"500px"} height={"200px"}></img>
                  <h3>{event.title}</h3>
                  <p>{event.organizer}</p>
                </div>
              ))}
          </div>
        </div>
      ))}

      <EventPopup
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
      <HamburgerMenu
        state={hamburgerMenu}
        onClose={() => setHamburgerMenu(false)}
      />
    </>

  );
}