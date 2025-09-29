# umu-event
Web App made for displaying student events around campus.

## Tech stack

This project uses Next.JS for the frontend and backend server and is implemented to be hosted on Vercel and querys database for the events from Supabase. The images is stored in Bucket hosted on an AWS S3 server.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database
As mentioned this web app is configured to work with Supabase relation database. 
For this you have to set up env keys:
'''bash
NEXT_PUBLIC_SUPABASE_URL="ADD DATABASE URL HERE"
NEXT_PUBLIC_SUPABASE_ANON_KEY="ADD DATABASE KEY HERE"
'''

As of this moment it only has one table which is "Event" and it has:

PRIMARY KEY id;
STRING title;
STRING description;
STRING image;
DATE startDate;
DATE endDate;
STRING organizer;
STRING union;
STRING location;