import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Daniel Miller — Software engineer, photographer, and entrepreneur in Buenos Aires'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Matches the site's design system (src/styles/globals.css): warm beige
// background, dark brown text, burnt orange accent, stripe divider.
const STRIPE_COLORS = ['#3B2314', '#D4581A', '#E8941A', '#E8C95A', '#F5EBD9']

export default async function Image() {
  // Embedded local asset — Satori can't decode webp, and fetching our own
  // prod URL at render time is brittle. profile-og.png is a PNG copy of
  // public/profile.webp.
  const profile = await fetch(
    new URL('../../public/profile-og.png', import.meta.url),
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#E8D5B7',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Left side - Profile image */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38%',
              height: '100%',
              padding: '40px',
            }}
          >
            <div
              style={{
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                border: '6px solid rgba(59, 35, 20, 0.15)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F5EBD9',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                // Satori accepts ArrayBuffer image sources; the string cast
                // just satisfies the DOM typing.
                src={profile as unknown as string}
                alt="Daniel Miller"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>

          {/* Right side - Text content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '62%',
              height: '100%',
              padding: '40px 60px 40px 20px',
            }}
          >
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 800,
                margin: '0 0 16px 0',
                lineHeight: 1.1,
                color: '#3B2314',
                letterSpacing: '-2px',
              }}
            >
              Daniel Miller
            </h1>
            <p
              style={{
                fontSize: '28px',
                margin: '0 0 32px 0',
                lineHeight: 1.4,
                color: '#7A5C42',
              }}
            >
              Software engineer, photographer, and entrepreneur living in
              Buenos Aires
            </p>
            <div
              style={{
                display: 'flex',
                gap: '14px',
              }}
            >
              {['World', 'Resources', 'Photography'].map((label) => (
                <div
                  key={label}
                  style={{
                    padding: '10px 24px',
                    border: '2px solid #D4581A',
                    borderRadius: '999px',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#D4581A',
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom stripe divider */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: '28px',
            width: '100%',
          }}
        >
          {STRIPE_COLORS.map((color) => (
            <div key={color} style={{ flex: 1, backgroundColor: color }} />
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
