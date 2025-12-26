import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Lea4n - AI Personal Tutor'
export const size = {
    width: 1200,
    height: 630,
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
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(to bottom right, #1a1a1a, #0f0f12)',
                    color: 'white',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 40,
                        background: 'rgba(139, 92, 246, 0.1)',
                        padding: 20,
                        borderRadius: 30,
                        border: '1px solid rgba(139, 92, 246, 0.2)',
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        width="100"
                        height="100"
                    >
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                </div>

                <div style={{ fontSize: 80, fontWeight: 800, letterSpacing: -2, background: 'linear-gradient(to right, #fff, #a78bfa)', backgroundClip: 'text', color: 'transparent' }}>
                    Lea4n
                </div>

                <div style={{ fontSize: 36, fontWeight: 500, opacity: 0.6, marginTop: 20 }}>
                    Your Personal AI Tutor
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
