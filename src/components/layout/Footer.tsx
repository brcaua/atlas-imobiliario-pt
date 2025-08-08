import Link from 'next/link'
import { BarChart3, Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Atlas Imobiliário PT</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4 max-w-md">
              Plataforma completa de análise do mercado imobiliário português. 
              Dados históricos, previsões e tendências para decisões informadas.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Mail className="w-4 h-4" />
                <span>info@atlasimobiliario.pt</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Lisboa, Portugal</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                  Mapa
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                  Análises
                </Link>
              </li>
              <li>
                <Link href="/trends" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                  Tendências
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                  Termos de Serviço
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                  Sobre Nós
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {currentYear} Atlas Imobiliário PT. Todos os direitos reservados.
            </p>
            <p className="text-sm text-gray-400 mt-2 md:mt-0">
              Dados fonte: INE, Banco de Portugal, OpenStreetMap
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
