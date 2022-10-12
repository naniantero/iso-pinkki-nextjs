# Iso Pinkki site project

Music collective Iso Pinkki's site. Powered by Next.js, Contentful, Redis and Spotify Rest API.
### Relies on

- SSR
- React Query (state management)
- Theme UI (styling)
- Dayjs (dates)
- Next-intl (i18n)
- Redis/Upstash (caching)
- Axiom (log management and analytics)

## Getting Started

Project needs all kinds of like.. top secret API keys and whatnot, so you probably won't get this thing running locally. However, there's a demo running at [https://iso-pinkki-nextjs.vercel.app/](https://iso-pinkki-nextjs.vercel.app/). 


## TODO

Things are pretty much in progress. At least following things should be considered:

* Admin
* Make the Redis implementation more robust and try to minimize the memory use, i.e. get rid of the current JSON.stringify/parse mess