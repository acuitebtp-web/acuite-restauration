'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { motion } from 'framer-motion'

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 1400
    const steps = 60
    const step = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, target])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

const STATS = [
  { emoji: '🥕', label: 'ingrédients', type: 'counter', target: 200, suffix: '+' },
  { emoji: '⚡', label: 'par plat', type: 'static', value: '< 30s' },
  { emoji: '🎁', label: 'pour commencer', type: 'static', value: '0 CB' },
  { emoji: '📊', label: 'en temps réel', type: 'counter', target: 100, suffix: '%' },
]

export function StatsBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
        >
          <div className="text-2xl mb-1">{s.emoji}</div>
          <div className="font-lora text-2xl font-bold text-white">
            {s.type === 'counter' ? (
              <AnimatedCounter target={s.target!} suffix={s.suffix} />
            ) : (
              s.value
            )}
          </div>
          <div className="text-white/50 text-xs mt-0.5">{s.label}</div>
        </motion.div>
      ))}
    </div>
  )
}
