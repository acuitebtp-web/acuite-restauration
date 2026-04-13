import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Costyfood — Calculez votre food cost en 30 secondes'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#FDF5EB',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          fontFamily: 'Georgia, serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Cercles déco fond */}
        <div style={{
          position: 'absolute', top: -120, right: -120,
          width: 400, height: 400, borderRadius: '50%',
          background: '#F2854A', opacity: 0.08,
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: -80, left: -80,
          width: 300, height: 300, borderRadius: '50%',
          background: '#7A9E7E', opacity: 0.1,
          display: 'flex',
        }} />

        {/* Header : logo + badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo texte */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Icône assiette simplifiée */}
            <div style={{
              width: 48, height: 48,
              borderRadius: '50%',
              border: '3px solid #F2854A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: 26, height: 26,
                borderRadius: '50%',
                border: '2px solid #F2854A',
                display: 'flex',
              }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
              <span style={{ fontSize: 36, fontWeight: 700, color: '#2C1A0E', fontStyle: 'italic' }}>Costy</span>
              <span style={{ fontSize: 36, fontWeight: 700, color: '#F2854A', fontStyle: 'italic' }}>food</span>
            </div>
          </div>
          {/* Badge FranceAgriMer */}
          <div style={{
            background: '#EFF6EF',
            border: '1.5px solid #B8D4BA',
            borderRadius: 40,
            padding: '8px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <span style={{ fontSize: 18 }}>🥬</span>
            <span style={{ fontSize: 15, color: '#5A8A5E', fontWeight: 600, fontFamily: 'sans-serif' }}>
              Basé sur FranceAgriMer
            </span>
          </div>
        </div>

        {/* Corps central */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 56, fontWeight: 700, color: '#2C1A0E', lineHeight: 1.15, display: 'flex', flexDirection: 'column' }}>
            <span>Calculez votre</span>
            <span style={{ color: '#F2854A', fontStyle: 'italic' }}>food cost</span>
            <span>en 30 secondes</span>
          </div>
          <p style={{ fontSize: 22, color: '#A0745A', margin: 0, fontFamily: 'sans-serif', fontWeight: 400, lineHeight: 1.5 }}>
            L'IA génère vos ingrédients · Analyse de carte · Export PDF
          </p>
        </div>

        {/* Footer : 3 KPIs */}
        <div style={{ display: 'flex', gap: 16 }}>
          {[
            { label: 'Food cost', value: '28,5 %', color: '#7A9E7E', bg: '#EFF6EF', border: '#B8D4BA' },
            { label: 'Prix conseillé', value: '17,00 €', color: '#F2854A', bg: '#FEF0E7', border: '#F8C9A8' },
            { label: 'Marge brute', value: '71,5 %', color: '#2C1A0E', bg: '#F3EDE6', border: '#E8D5C4' },
          ].map(k => (
            <div
              key={k.label}
              style={{
                flex: 1,
                background: k.bg,
                border: `1.5px solid ${k.border}`,
                borderRadius: 16,
                padding: '18px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <span style={{ fontSize: 13, color: '#A0745A', fontFamily: 'sans-serif', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                {k.label}
              </span>
              <span style={{ fontSize: 30, fontWeight: 700, color: k.color }}>
                {k.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
