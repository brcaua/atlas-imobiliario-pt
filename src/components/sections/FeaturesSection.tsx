'use client'

import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Map, 
  TrendingUp, 
  Database, 
  Filter, 
  Clock 
} from 'lucide-react'

const features = [
  {
    icon: Database,
    title: 'Dados Históricos',
    description: 'Dados do mercado imobiliário dos últimos 20 anos para todos os distritos, concelhos e freguesias de Portugal.',
  },
  {
    icon: TrendingUp,
    title: 'Previsões de Preços',
    description: 'Previsões para milhares de códigos postais em Portugal, permitindo decisões mais informadas sobre o futuro dos preços.',
  },
  {
    icon: Map,
    title: 'Mapas Interativos',
    description: 'Explore desde o distrito até ao código postal para descobrir tendências do mercado local.',
  },
  {
    icon: Filter,
    title: 'Filtros Avançados',
    description: 'Use ferramentas de filtro e relatórios para encontrar as cidades e códigos postais com maior potencial de crescimento.',
  },
  {
    icon: Clock,
    title: 'Dados em Tempo Real',
    description: 'Acesso a dados atualizados do mercado imobiliário português.',
  },
  {
    icon: BarChart3,
    title: 'Análises Detalhadas',
    description: 'Relatórios aprofundados sobre tendências do mercado imobiliário para qualquer região.',
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            Explore as Funcionalidades do Atlas Imobiliário PT
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Ferramentas completas para análise do mercado imobiliário português
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
