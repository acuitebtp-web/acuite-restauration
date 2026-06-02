import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  // Auth check
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  )
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) {
    console.warn('RESEND_API_KEY non configurée — email de bienvenue ignoré')
    return NextResponse.json({ ok: true, skipped: true })
  }

  const resend = new Resend(resendKey)
  const email = session.user.email
  if (!email) return NextResponse.json({ ok: true, skipped: true })

  const body = await req.json().catch(() => ({}))
  const rawFirstName = typeof body?.firstName === 'string' ? body.firstName : ''
  const firstName = rawFirstName
    .trim()
    .slice(0, 50)
    .replace(/[<>"'&]/g, '')
    || 'chef'
  const name = firstName || email.split('@')[0]

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#FDF5EB;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #E8D5C4;">
    <!-- Header -->
    <div style="background:#FDF5EB;padding:32px 40px 24px;border-bottom:1px solid #E8D5C4;">
      <p style="margin:0;font-size:22px;font-weight:700;color:#2C1A0E;font-style:italic;">
        <span style="color:#2C1A0E;">Costy</span><span style="color:#F2854A;">food</span>
      </p>
    </div>
    <!-- Body -->
    <div style="padding:40px;">
      <h1 style="font-size:24px;color:#2C1A0E;margin:0 0 8px;font-family:Georgia,serif;">
        Bienvenue ${name} 👋
      </h1>
      <p style="color:#A0745A;font-size:15px;margin:0 0 24px;line-height:1.6;">
        Votre compte Costyfood est prêt. Vous pouvez maintenant calculer le food cost de vos plats en 30 secondes.
      </p>
      <!-- CTA principal -->
      <div style="text-align:center;margin:32px 0;">
        <a href="https://costyfood.fr/outil" style="background:#F2854A;color:#ffffff;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:700;font-size:15px;display:inline-block;">
          Calculer mon premier food cost →
        </a>
      </div>
      <!-- 3 étapes -->
      <div style="background:#FDF5EB;border-radius:12px;padding:24px;margin:24px 0;">
        <p style="font-weight:700;color:#2C1A0E;margin:0 0 16px;font-size:14px;text-transform:uppercase;letter-spacing:0.5px;">
          Pour démarrer
        </p>
        ${[
          ['01', 'Décrivez votre plat', "Saisissez son nom, l'IA génère automatiquement les ingrédients"],
          ['02', 'Ajustez les quantités', 'Modifiez selon votre recette réelle, tout se recalcule en direct'],
          ['03', 'Sauvegardez', 'Gardez vos fiches techniques, exportez en PDF'],
        ].map(([n, t, d]) => `
        <div style="display:flex;gap:12px;margin-bottom:12px;">
          <div style="width:28px;height:28px;background:#F2854A;border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:12px;flex-shrink:0;line-height:28px;text-align:center;">${n}</div>
          <div>
            <p style="margin:0;font-weight:600;color:#2C1A0E;font-size:14px;">${t}</p>
            <p style="margin:4px 0 0;color:#A0745A;font-size:13px;">${d}</p>
          </div>
        </div>`).join('')}
      </div>
      <p style="color:#A0745A;font-size:13px;line-height:1.6;margin:24px 0 0;">
        Votre plan Gratuit inclut <strong>3 plats sauvegardés</strong> et <strong>3 calculs IA par mois</strong>.
        Passez au plan Pro (15€/mois) pour un accès illimité.
      </p>
    </div>
    <!-- Footer -->
    <div style="background:#FDF5EB;padding:20px 40px;border-top:1px solid #E8D5C4;text-align:center;">
      <p style="color:#A0745A;font-size:12px;margin:0;">
        Costyfood · <a href="https://costyfood.fr" style="color:#F2854A;">costyfood.fr</a>
        · <a href="https://costyfood.fr/tarifs" style="color:#A0745A;">Voir les tarifs</a>
      </p>
    </div>
  </div>
</body>
</html>`

  try {
    await resend.emails.send({
      from: 'Costyfood <bonjour@costyfood.fr>',
      to: email,
      subject: 'Bienvenue sur Costyfood 🍽️ — votre outil food cost est prêt',
      html,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ ok: true, error: 'email failed silently' })
  }
}
