import { useEffect, useMemo, useState } from 'react'
import './App.css'

type MenuItem = {
  name: string
  detail: string
  price?: string
  category: string
  badge?: string
}

type Restaurant = {
  slug: string
  name: string
  shortName: string
  cuisine: string
  tagline: string
  headline: string
  intro: string
  address: string
  phone?: string
  whatsapp?: string
  mapUrl: string
  hours: string
  logo?: string
  logoKind?: 'light' | 'dark'
  heroImage?: string
  heroAlt: string
  theme: string
  layout: 'terrace' | 'fast' | 'bistro' | 'atelier' | 'lounge'
  primaryAction: string
  secondaryAction: string
  bookingHeadline: string
  bookingBody: string
  takeoutHeadline: string
  takeoutBody: string
  times: string[]
  takeoutModes: string[]
  menu: MenuItem[]
  sections: { label: string; title: string; body: string }[]
  seo: { title: string; description: string }
}

const restaurants: Restaurant[] = [
  {
    slug: 'kalytero',
    name: 'Kalytero',
    shortName: 'Kalytero',
    cuisine: 'Tapas · Música · Frente al mar',
    tagline: 'Paseo Marítimo 14 y 15',
    headline: 'Tapas, música y buen ambiente frente al mar.',
    intro: 'Un sitio rápido y vivo para decidir qué comer, reservar con amigos y pedir combos sin dar vueltas.',
    address: 'Paseo Marítimo 14 y 15, Malabo',
    phone: '+240 555 911 787',
    whatsapp: '240555911787',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Kalytero+Paseo+Maritimo+Malabo',
    hours: 'Almuerzo, tarde y noche',
    logo: '/restaurants/kalytero/logo.svg',
    logoKind: 'dark',
    heroAlt: 'Tapas y mesa casual junto al mar',
    theme: 'theme-kalytero',
    layout: 'fast',
    primaryAction: 'Pedir por WhatsApp',
    secondaryAction: 'Reservar grupo',
    bookingHeadline: 'Mesa casual para amigos o trabajo.',
    bookingBody: 'Indica hora, personas y si quieres zona de música o mesa tranquila.',
    takeoutHeadline: 'Combos listos para recoger.',
    takeoutBody: 'Pide tapas, hamburguesas o bowls para oficina, playa o grupo pequeño.',
    times: ['12:30', '14:00', '19:30', 'Grupo'],
    takeoutModes: ['Recoger en 30 min', 'Pedido oficina', 'Combo familiar'],
    sections: [
      { label: 'Ritmo', title: 'Primero decisión, luego comida.', body: 'Carta, precios y WhatsApp están cerca para pedir desde el móvil sin perder tiempo.' },
      { label: 'Mar', title: 'Color, energía y Paseo Marítimo.', body: 'Tapas, música y mesas casuales con una presencia viva, rápida y fácil de compartir.' },
    ],
    menu: [
      { name: 'Burger Kalytero', detail: 'Carne a la parrilla, salsa de casa, queso y papas.', price: '6.500 XAF', category: 'Combos', badge: 'Popular' },
      { name: 'Pollo citrus grill', detail: 'Pollo marinado, arroz, ensalada y salsa suave.', price: '7.500 XAF', category: 'Combos', badge: 'Lunch' },
      { name: 'Tapas de costa', detail: 'Bocados para compartir con bebida y música.', price: '8.000 XAF', category: 'Tapas', badge: 'Mesa' },
      { name: 'Jarra tropical', detail: 'Zumo fresco para compartir.', price: '3.000 XAF', category: 'Bebidas', badge: 'Fresh' },
    ],
    seo: { title: 'Kalytero Malabo · Tapas Música y Buen Ambiente', description: 'Kalytero Malabo en Paseo Marítimo: tapas, música, reservas y pedidos por WhatsApp.' },
  },
]
const englishRestaurants: Record<string, Partial<Restaurant>> = {
  kalytero: {
    cuisine: 'Tapas · Music · Seafront',
    tagline: 'Paseo Marítimo 14 and 15',
    headline: 'Tapas, music and easy seafront energy.',
    intro: 'A fast, lively place to choose food, book with friends and request combos without friction.',
    hours: 'Lunch, afternoon and night',
    primaryAction: 'Order on WhatsApp',
    secondaryAction: 'Book a group',
    bookingHeadline: 'Casual table for friends or work.',
    bookingBody: 'Share the time, party size and whether you want music or a quieter table.',
    takeoutHeadline: 'Combos ready for pickup.',
    takeoutBody: 'Ask for tapas, burgers or bowls for the office, beach or a small group.',
    times: ['12:30', '14:00', '19:30', 'Group'],
    takeoutModes: ['Pickup in 30 min', 'Office order', 'Family combo'],
    sections: [
      { label: 'Pace', title: 'Choose first, eat next.', body: 'Menu, prices and WhatsApp stay close so phone visitors can order quickly.' },
      { label: 'Sea', title: 'Color, energy and Paseo Marítimo.', body: 'Tapas, music and casual tables with a lively presence that is easy to share.' },
    ],
    menu: [
      { name: 'Kalytero burger', detail: 'Grilled beef, house sauce, cheese and fries.', price: '6,500 XAF', category: 'Combos', badge: 'Popular' },
      { name: 'Citrus grilled chicken', detail: 'Marinated chicken, rice, salad and a soft sauce.', price: '7,500 XAF', category: 'Combos', badge: 'Lunch' },
      { name: 'Coast tapas', detail: 'Sharing bites with drinks and music.', price: '8,000 XAF', category: 'Tapas', badge: 'Table' },
      { name: 'Tropical jug', detail: 'Fresh juice to share.', price: '3,000 XAF', category: 'Drinks', badge: 'Fresh' },
    ],
    seo: { title: 'Kalytero Malabo · Tapas Music and Seafront Energy', description: 'Kalytero Malabo on Paseo Marítimo: tapas, music, group bookings and WhatsApp pickup requests.' },
  },
}
function localizeRestaurant(restaurant: Restaurant, language: 'es' | 'en') {
  if (language === 'es') return restaurant
  return { ...restaurant, ...englishRestaurants[restaurant.slug] }
}

const SITE_SLUG = 'kalytero'

function getRestaurant() {
  return restaurants.find((item) => item.slug === SITE_SLUG) ?? restaurants[0]
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

function waLink(restaurant: Restaurant, message: string) {
  const number = restaurant.whatsapp ?? restaurant.phone?.replace(/\D/g, '')
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : `https://wa.me/?text=${encodeURIComponent(message)}`
}

function upsertMeta(selector: string, attributes: Record<string, string>, content: string) {
  let meta = document.head.querySelector<HTMLMetaElement>(selector)
  if (!meta) {
    meta = document.createElement('meta')
    Object.entries(attributes).forEach(([key, value]) => meta?.setAttribute(key, value))
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content)
}

function fallbackMark(restaurant: Restaurant) {
  if (restaurant.layout === 'atelier') return <span className="fallback-mark atelier-mark">A</span>
  if (restaurant.layout === 'lounge') return <span className="fallback-mark wanda-mark">W</span>
  return <span className="fallback-mark">{restaurant.shortName.slice(0, 1)}</span>
}

function App() {
  const baseRestaurant = getRestaurant()
  const [language, setLanguage] = useState<'es' | 'en'>('es')
  const restaurant = useMemo(() => localizeRestaurant(baseRestaurant, language), [baseRestaurant, language])
  const copy = {
    es: { skip: 'Saltar a la carta', home: 'inicio', navLabel: 'Navegación principal', conversionLabel: 'Reservas y pedidos', menu: 'Carta', bookings: 'Reservas', orders: 'Pedidos', visit: 'Visita', all: 'Todos', menuTitle: 'Platos destacados para decidir rápido.', menuBody: 'Filtra por categoría y abre una consulta directa si quieres reservar o pedir.', filter: 'Filtrar categorías de carta', booking: 'Reservas', order: 'Pedidos', name: 'Nombre', contact: 'Teléfono o WhatsApp', date: 'Fecha', time: 'Hora', guests: 'Personas', mode: 'Modalidad', details: 'Detalles', bookingCta: 'Abrir mensaje de reserva', orderCta: 'Abrir mensaje de pedido', map: 'Abrir mapa', whatsapp: 'WhatsApp', call: 'Llamar', switcher: 'English', langLabel: 'Cambiar idioma a inglés' },
    en: { skip: 'Skip to menu', home: 'home', navLabel: 'Main navigation', conversionLabel: 'Bookings and orders', menu: 'Menu', bookings: 'Bookings', orders: 'Orders', visit: 'Visit', all: 'All', menuTitle: 'Featured plates for a quick decision.', menuBody: 'Filter by category, then open a direct request for a table or pickup order.', filter: 'Filter menu categories', booking: 'Bookings', order: 'Orders', name: 'Name', contact: 'Phone or WhatsApp', date: 'Date', time: 'Time', guests: 'Guests', mode: 'Mode', details: 'Details', bookingCta: 'Open booking message', orderCta: 'Open order message', map: 'Open map', whatsapp: 'WhatsApp', call: 'Call', switcher: 'Español', langLabel: 'Switch language to Spanish' },
  }[language]
  const [category, setCategory] = useState(copy.all)
  const [booking, setBooking] = useState({ name: '', contact: '', date: '', time: restaurant.times[0], guests: '2 personas' })
  const [takeout, setTakeout] = useState({ name: '', contact: '', mode: restaurant.takeoutModes[0], notes: '' })


  useEffect(() => {
    document.title = restaurant.seo.title
    document.documentElement.lang = language
    const pageUrl = window.location.href
    const imageUrl = restaurant.heroImage ? `${window.location.origin}${restaurant.heroImage}` : undefined
    upsertMeta('meta[name="description"]', { name: 'description' }, restaurant.seo.description)
    upsertMeta('meta[property="og:title"]', { property: 'og:title' }, restaurant.seo.title)
    upsertMeta('meta[property="og:description"]', { property: 'og:description' }, restaurant.seo.description)
    upsertMeta('meta[property="og:type"]', { property: 'og:type' }, 'restaurant')
    upsertMeta('meta[property="og:url"]', { property: 'og:url' }, pageUrl)
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, imageUrl ? 'summary_large_image' : 'summary')
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, restaurant.seo.title)
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, restaurant.seo.description)
    if (imageUrl) {
      upsertMeta('meta[property="og:image"]', { property: 'og:image' }, imageUrl)
      upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, imageUrl)
    }

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: restaurant.name,
      description: restaurant.seo.description,
      servesCuisine: restaurant.cuisine,
      address: restaurant.address,
      telephone: restaurant.phone,
      url: window.location.origin,
      inLanguage: language,
      hasMap: restaurant.mapUrl,
      image: restaurant.heroImage ? `${window.location.origin}${restaurant.heroImage}` : undefined,
      acceptsReservations: true,
    }
    const existingSchema = document.getElementById('restaurant-structured-data')
    existingSchema?.remove()
    const script = document.createElement('script')
    script.id = 'restaurant-structured-data'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(schema, (_key, value) => value === undefined ? undefined : value)
    document.head.appendChild(script)
  }, [restaurant, language])

  const categories = useMemo(() => [copy.all, ...Array.from(new Set(restaurant.menu.map((item) => item.category)))], [restaurant.menu, copy.all])
  const activeCategory = categories.includes(category) ? category : copy.all
  const visibleMenu = activeCategory === copy.all ? restaurant.menu : restaurant.menu.filter((item) => item.category === activeCategory)
  const guestOptions = language === 'es' ? ['2 personas', '4 personas', '6 personas', 'Grupo privado'] : ['2 guests', '4 guests', '6 guests', 'Private group']
  const selectedTime = restaurant.times.includes(booking.time) ? booking.time : restaurant.times[0]
  const selectedGuests = guestOptions.includes(booking.guests) ? booking.guests : guestOptions[0]
  const selectedTakeoutMode = restaurant.takeoutModes.includes(takeout.mode) ? takeout.mode : restaurant.takeoutModes[0]
  const bookingReady = booking.name.trim() && booking.contact.trim() && booking.date && selectedTime && selectedGuests
  const takeoutReady = takeout.name.trim() && takeout.contact.trim() && selectedTakeoutMode
  const bookingMessage = language === 'es'
    ? `Hola ${restaurant.name}, quiero reservar. Nombre: ${booking.name || '[nombre]'}. Contacto: ${booking.contact || '[teléfono]'}. Fecha: ${booking.date || '[fecha]'}. Hora: ${selectedTime}. Personas: ${selectedGuests}.`
    : `Hello ${restaurant.name}, I would like to book. Name: ${booking.name || '[name]'}. Contact: ${booking.contact || '[phone]'}. Date: ${booking.date || '[date]'}. Time: ${selectedTime}. Guests: ${selectedGuests}.`
  const takeoutMessage = language === 'es'
    ? `Hola ${restaurant.name}, quiero consultar un pedido para llevar. Nombre: ${takeout.name || '[nombre]'}. Contacto: ${takeout.contact || '[teléfono]'}. Modalidad: ${selectedTakeoutMode}. Detalles: ${takeout.notes || '[pedido]'}.`
    : `Hello ${restaurant.name}, I would like to ask about a pickup order. Name: ${takeout.name || '[name]'}. Contact: ${takeout.contact || '[phone]'}. Mode: ${selectedTakeoutMode}. Details: ${takeout.notes || '[order]'}.`

  return (
    <main className={`site ${restaurant.theme} layout-${restaurant.layout}`}>
      <a className="skip-link" href="#menu">{copy.skip}</a>
      <nav className="topbar shell" aria-label={`${restaurant.name} ${copy.navLabel}`}>
        <a className={`brand ${restaurant.logoKind === 'light' ? 'brand-light' : ''}`} href="/" aria-label={`${restaurant.name} ${copy.home}`}>
          {restaurant.logo ? <img src={restaurant.logo} alt={`${restaurant.name} logo`} /> : fallbackMark(restaurant)}
          <span>{restaurant.name}</span>
        </a>
        <div className="nav-links">
          <a href="#menu">{copy.menu}</a>
          <a href="#reservas">{copy.bookings}</a>
          <a href="#pedidos">{copy.orders}</a>
          <a href="#visita">{copy.visit}</a>
          <button className="lang-toggle" type="button" aria-label={copy.langLabel} onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}>{copy.switcher}</button>
        </div>
      </nav>

      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">{restaurant.cuisine}</p>
          <h1>{restaurant.headline}</h1>
          <p>{restaurant.intro}</p>
          <div className="hero-actions">
            <a className="button primary" href="#reservas">{restaurant.primaryAction}</a>
            <a className="button ghost" href="#menu">{restaurant.secondaryAction}</a>
          </div>
        </div>
        <div className="hero-panel" aria-label={restaurant.heroAlt}>
          {restaurant.heroImage ? <img src={restaurant.heroImage} alt={restaurant.heroAlt} /> : <div className="venue-hero" aria-hidden="true"><span>{restaurant.shortName}</span></div>}
          <div className="hero-card">
            <span>{restaurant.tagline}</span>
            <strong>{restaurant.hours}</strong>
            <a href={restaurant.mapUrl} target="_blank" rel="noreferrer">{copy.map}</a>
          </div>
        </div>
      </section>

      <section className="story-grid shell" aria-label={`${restaurant.name} detalles`}>
        {restaurant.sections.map((section) => (
          <article key={section.label}>
            <span>{section.label}</span>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </section>

      <section id="menu" className="menu-section shell">
        <div className="section-head">
          <p className="eyebrow">{copy.menu}</p>
          <h2>{copy.menuTitle}</h2>
          <p>{copy.menuBody}</p>
        </div>
        <div className="chips" aria-label={copy.filter}>
          {categories.map((item) => (
            <button key={item} className={item === activeCategory ? 'chip active' : 'chip'} aria-pressed={item === activeCategory} onClick={() => setCategory(item)} type="button">{item}</button>
          ))}
        </div>
        <div className="menu-list">
          {visibleMenu.map((item) => (
            <article className="menu-item" key={item.name}>
              <div>
                {item.badge ? <span>{item.badge}</span> : null}
                <h3>{item.name}</h3>
                <p>{item.detail}</p>
              </div>
              {item.price ? <strong>{item.price}</strong> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="conversion shell" aria-label={copy.conversionLabel}>
        <form id="reservas" className="form-card booking" onSubmit={(event) => event.preventDefault()}>
          <p className="eyebrow">{copy.booking}</p>
          <h2>{restaurant.bookingHeadline}</h2>
          <p>{restaurant.bookingBody}</p>
          <label>{copy.name}<input autoComplete="name" value={booking.name} onChange={(event) => setBooking({ ...booking, name: event.target.value })} required /></label>
          <label>{copy.contact}<input autoComplete="tel" inputMode="tel" value={booking.contact} onChange={(event) => setBooking({ ...booking, contact: event.target.value })} required /></label>
          <div className="form-row">
            <label>{copy.date}<input type="date" min={today()} value={booking.date} onChange={(event) => setBooking({ ...booking, date: event.target.value })} required /></label>
            <label>{copy.time}<select value={selectedTime} onChange={(event) => setBooking({ ...booking, time: event.target.value })}>{restaurant.times.map((time) => <option key={time}>{time}</option>)}</select></label>
          </div>
          <label>{copy.guests}<select value={selectedGuests} onChange={(event) => setBooking({ ...booking, guests: event.target.value })}>{guestOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
          <a className={bookingReady ? 'button primary wide' : 'button primary wide disabled'} href={bookingReady ? waLink(restaurant, bookingMessage) : '#reservas'} aria-disabled={!bookingReady} aria-describedby="booking-status" tabIndex={bookingReady ? undefined : -1} onClick={(event) => { if (!bookingReady) event.preventDefault() }}>{copy.bookingCta}</a>
          <p id="booking-status" className="form-status" aria-live="polite">{bookingReady ? (language === 'es' ? 'Listo para enviar por WhatsApp.' : 'Ready to send by WhatsApp.') : (language === 'es' ? 'Completa nombre, contacto, fecha y hora para activar la solicitud.' : 'Complete name, contact, date and time to activate the request.')}</p>
        </form>

        <form id="pedidos" className="form-card takeout" onSubmit={(event) => event.preventDefault()}>
          <p className="eyebrow">{copy.order}</p>
          <h2>{restaurant.takeoutHeadline}</h2>
          <p>{restaurant.takeoutBody}</p>
          <label>{copy.name}<input autoComplete="name" value={takeout.name} onChange={(event) => setTakeout({ ...takeout, name: event.target.value })} required /></label>
          <label>{copy.contact}<input autoComplete="tel" inputMode="tel" value={takeout.contact} onChange={(event) => setTakeout({ ...takeout, contact: event.target.value })} required /></label>
          <label>{copy.mode}<select value={selectedTakeoutMode} onChange={(event) => setTakeout({ ...takeout, mode: event.target.value })}>{restaurant.takeoutModes.map((mode) => <option key={mode}>{mode}</option>)}</select></label>
          <label>{copy.details}<textarea value={takeout.notes} onChange={(event) => setTakeout({ ...takeout, notes: event.target.value })} /></label>
          <a className={takeoutReady ? 'button ghost wide strong' : 'button ghost wide disabled'} href={takeoutReady ? waLink(restaurant, takeoutMessage) : '#pedidos'} aria-disabled={!takeoutReady} aria-describedby="takeout-status" tabIndex={takeoutReady ? undefined : -1} onClick={(event) => { if (!takeoutReady) event.preventDefault() }}>{copy.orderCta}</a>
          <p id="takeout-status" className="form-status" aria-live="polite">{takeoutReady ? (language === 'es' ? 'Listo para consultar el pedido por WhatsApp.' : 'Ready to ask about the order by WhatsApp.') : (language === 'es' ? 'Completa nombre, contacto y modalidad para activar la consulta.' : 'Complete name, contact and mode to activate the request.')}</p>
        </form>
      </section>

      <section id="visita" className="visit shell">
        <div>
          <p className="eyebrow">{copy.visit}</p>
          <h2>{restaurant.address}</h2>
          <p>{restaurant.hours}{restaurant.phone ? ` · ${restaurant.phone}` : ''}</p>
        </div>
        <div className="visit-actions">
          <a className="button primary" href={restaurant.mapUrl} target="_blank" rel="noreferrer">{copy.map}</a>
          <a className="button ghost strong" href={waLink(restaurant, language === 'es' ? `Hola ${restaurant.name}, quiero información.` : `Hello ${restaurant.name}, I would like information.`)} target="_blank" rel="noreferrer">{copy.whatsapp}</a>
          {restaurant.phone ? <a className="button ghost strong" href={`tel:${restaurant.phone.replace(/\D/g, '')}`}>{copy.call}</a> : null}
        </div>
      </section>
    </main>
  )
}

export default App
