'use client'

import { motion } from 'framer-motion'

const stats = [
  {
    number: '308',
    label: 'Concelhos',
    description: 'Dados completos para todos os concelhos de Portugal',
  },
  {
    number: '3091',
    label: 'Freguesias',
    description: 'Cobertura ao nível da freguesia',
  },
  {
    number: '20+',
    label: 'Anos de Dados',
    description: 'Histórico do mercado imobiliário português',
  },
  {
    number: '40+',
    label: 'Indicadores',
    description: 'Métricas detalhadas do mercado',
  },
]

export function StatsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold text-primary-600 mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
