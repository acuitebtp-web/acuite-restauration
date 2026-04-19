import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' })

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll: () => cookieStore.getAll() } }
    )
    const { data: { session: authSession } } = await supabaseAuth.auth.getSession()
    if (!authSession) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { priceId } = await req.json()
    const userId = authSession.user.id

    if (!priceId) {
      return NextResponse.json({ error: 'priceId requis' }, { status: 400 })
    }

    // Whitelist : seuls les price IDs configurés en env sont acceptés
    const VALID_PRICE_IDS = [
      process.env.STRIPE_PRICE_PRO,
      process.env.STRIPE_PRICE_PRO_ANNUAL,
      process.env.STRIPE_PRICE_MULTI,
      process.env.STRIPE_PRICE_MULTI_ANNUAL,
    ].filter((id): id is string => Boolean(id))
    if (VALID_PRICE_IDS.length > 0 && !VALID_PRICE_IDS.includes(priceId)) {
      return NextResponse.json({ error: 'Plan invalide' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single()

    let customerId = profile?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: profile?.email,
        metadata: { supabase_user_id: userId },
      })
      customerId = customer.id
      await supabase.from('profiles').update({ stripe_customer_id: customerId }).eq('id', userId)
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/compte?upgraded=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/tarifs`,
      locale: 'fr',
      billing_address_collection: 'auto',
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: 'Erreur lors de la création du paiement' }, { status: 500 })
  }
}
