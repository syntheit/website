import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Daniel Miller - Software Engineer and Photographer'
export const size = {
  width: 1200,
  height: 600,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          backgroundImage: 'linear-gradient(135deg, #65c3ac 0%, #4a9b8a 50%, #2a5b46 100%)',
        }}
      >
        {/* Left side - Profile image */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40%',
            height: '100%',
            padding: '40px',
          }}
        >
          <div
            style={{
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              border: '8px solid rgba(255, 255, 255, 0.2)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <img
              src="https://matv.io/profile.webp"
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
            width: '60%',
            height: '100%',
            padding: '40px',
            color: 'white',
          }}
        >
          <h1
            style={{
              fontSize: '56px',
              fontWeight: 'bold',
              margin: '0 0 16px 0',
              lineHeight: '1.1',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            Daniel Miller
          </h1>
          <p
            style={{
              fontSize: '28px',
              margin: '0 0 24px 0',
              opacity: 0.9,
              lineHeight: '1.3',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
            }}
          >
            Software Engineer & Photographer
          </p>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginTop: '16px',
            }}
          >
            <div
              style={{
                padding: '10px 20px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '6px',
                fontSize: '18px',
                fontWeight: '500',
                backdropFilter: 'blur(10px)',
              }}
            >
              Projects
            </div>
            <div
              style={{
                padding: '10px 20px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '6px',
                fontSize: '18px',
                fontWeight: '500',
                backdropFilter: 'blur(10px)',
              }}
            >
              Photography
            </div>
            <div
              style={{
                padding: '10px 20px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '6px',
                fontSize: '18px',
                fontWeight: '500',
                backdropFilter: 'blur(10px)',
              }}
            >
              Resources
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
} 