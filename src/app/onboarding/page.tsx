'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const TYPES = [
  { value: 'restaurant', label: 'Restaurant', emoji: '🍽️' },
  { value: 'brasserie', label: 'Brasserie / Bistrot', emoji: '🍺' },
  { value: 'gastronomique', label: 'Gastronomique', emoji: '⭐' },
  { value: 'food-truck', label: 'Food truck', emoji: '🚚' },
  { value: 'traiteur', label: 'Traiteur', emoji: '🎂' },
  { value: 'autre', label: 'Autre', emoji: '🍴' },
]

const SIZES = [
  { value: '< 10', label: 'Moins de 10 plats', emoji: '🌱' },
  { value: '10-20', label: '10 à 20 plats', emoji: '🥗' },
  { value: '20-30', label: '20 à 30 plats', emoji: '🍲' },
  { value: '30+', label: 'Plus de 30 plats', emoji: '📋' },
]

const STEP_PROMPTS: Record<string, string> = {
  restaurant: 'Plat du jour',
  brasserie: 'Entrecôte frites maison',
  gastronomique: 'Saint-Jacques poêlées, velouté de céleri',
  'food-truck': 'Burger artisanal maison',
  traiteur: 'Plateau de fromages affinés',
  autre: 'Mon premier plat',
}

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [type, setType] = useState('')
  const [size, setSize] = useState('')

  const handleType = (v: string) => {
    setType(v)
    setStep(1)
  }

  const handleSize = (v: string) => {
    setSize(v)
    setStep(2)
  }

  const handleStart = () => {
    const prompt = encodeURIComponent(STEP_PROMPTS[type] || 'Mon premier plat')
    router.push(`/outil?prompt=${prompt}&onboarding=1`)
  }

  return (
    <div className="min-h-screen bg-creme flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="flex gap-2 mb-10 justify-center">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${i <= step ? 'bg-orange w-10' : 'bg-brun-pale w-6'}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <div className="text-center mb-8">
                <span className="text-5xl block mb-4">👋</span>
                <h1 className="font-lora text-3xl font-bold text-brun mb-2">Bienvenue sur Costyfood !</h1>
                <p className="text-brun-light">2 questions rapides pour personnaliser votre expérience</p>
              </div>
              <h2 className="font-semibold text-brun mb-4 text-center">Quel type d'établissement ?</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {TYPES.map(t => (
                  <button
                    key={t.value}
                    onClick={() => handleType(t.value)}
                    className="flex flex-col items-center gap-2 bg-white border-2 border-brun-pale rounded-2xl p-4 hover:border-orange hover:bg-orange-pale transition-all"
                  >
                    <span className="text-3xl">{t.emoji}</span>
                    <span className="text-sm font-medium text-brun">{t.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <div className="text-center mb-8">
                <span className="text-5xl block mb-4">📋</span>
                <h1 className="font-lora text-3xl font-bold text-brun mb-2">Votre carte</h1>
                <p className="text-brun-light">Combien de plats à la carte environ ?</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {SIZES.map(s => (
                  <button
                    key={s.value}
                    onClick={() => handleSize(s.value)}
                    className="flex flex-col items-center gap-2 bg-white border-2 border-brun-pale rounded-2xl p-5 hover:border-orange hover:bg-orange-pale transition-all"
                  >
                    <span className="text-3xl">{s.emoji}</span>
                    <span className="text-sm font-medium text-brun">{s.label}</span>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(0)} className="mt-4 text-xs text-brun-light hover:text-brun mx-auto block">← Retour</button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="text-center"
            >
              <span className="text-6xl block mb-5">🥳</span>
              <h1 className="font-lora text-3xl font-bold text-brun mb-3">C'est parti !</h1>
              <p className="text-brun-light mb-8">
                On vous a préparé un premier plat à analyser.<br />
                Modifiez-le comme vous voulez.
              </p>
              <div className="bg-white border border-brun-pale rounded-2xl p-5 text-left mb-6">
                <p className="text-xs text-brun-light mb-1">Votre établissement</p>
                <p className="font-semibold text-brun capitalize">{TYPES.find(t => t.value === type)?.emoji} {TYPES.find(t => t.value === type)?.label}</p>
                <p className="text-xs text-brun-light mt-3 mb-1">Taille de carte</p>
                <p className="font-semibold text-brun">{SIZES.find(s => s.value === size)?.label}</p>
              </div>
              <button
                onClick={handleStart}
                className="w-full bg-orange text-white font-semibold text-base py-4 rounded-2xl hover:bg-orange/90 transition-colors shadow-lg shadow-orange/20"
              >
                Analyser mon premier plat →
              </button>
              <button onClick={() => router.push('/compte')} className="mt-3 text-xs text-brun-light hover:text-brun block mx-auto">
                Passer cette étape
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
