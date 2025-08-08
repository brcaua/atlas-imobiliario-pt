# Atlas Imobiliário PT

Atlas Imobiliário PT é uma plataforma completa de análise do mercado imobiliário português, inspirada no Reventure App. Oferece dados históricos, previsões de preços e análises detalhadas para todo o território nacional.

## Demo (App)
<img width="2880" height="1738" alt="atlas+imobiliario" src="https://github.com/user-attachments/assets/71fd5765-c6cf-4c71-aa50-36d210776494" />

## Demo (Map)
<img width="2880" height="2226" alt="atlas+imo+mapa" src="https://github.com/user-attachments/assets/f136c03d-6452-4c03-a5b3-5a65bf69def0" />


## 🚀 Funcionalidades

- **Mapas Interativos**: Visualização interativa usando OpenStreetMap e Leaflet
- **Dados INE**: Integração com dados do Instituto Nacional de Estatística
- **Análises Históricas**: 20+ anos de dados do mercado imobiliário
- **Previsões**: Modelos preditivos para evolução de preços
- **Filtros Avançados**: Ferramentas de pesquisa e filtragem granular
- **Dashboards**: Visualizações e gráficos detalhados

## 🛠 Stack Tecnológico

### Frontend

- **Next.js 14** com App Router
- **TypeScript** para type safety
- **Tailwind CSS** para styling
- **Framer Motion** para animações
- **React Leaflet** para mapas interativos
- **Recharts** para visualização de dados
- **Zustand** para gestão de estado

### Backend & Dados

- **API do INE** para dados estatísticos oficiais
- **OpenStreetMap** para dados geográficos
- **Data Services** para agregação de dados em tempo real
- **Mock Data** para demonstração e desenvolvimento

### Deployment

- **Vercel** para hosting
- **CloudFlare** para CDN
- **AWS S3** para armazenamento de ficheiros

## 📊 Fontes de Dados

- **INE (Instituto Nacional de Estatística)**: Dados demográficos e habitacionais oficiais
- **OpenStreetMap**: Dados geográficos e mapas interativos
- **Mock Data**: Dados de demonstração para desenvolvimento e testes
- **Fontes Futuras**: Portais imobiliários e outras APIs (em desenvolvimento)

## 🚦 Como Começar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

1. **Clone o repositório**

   ```bash
   git clone <repository-url>
   cd atlas-imobiliario-pt
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   ```bash
   cp env.example .env.local
   # Edite .env.local com as suas configurações
   ```

4. **Execute em modo de desenvolvimento**

   ```bash
   npm run dev
   ```

5. **Aceda à aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu browser

## 🗺 Estrutura do Projeto

```
src/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Dashboard principal
│   ├── analytics/         # Página de análises
│   └── api/              # API routes
├── components/            # Componentes React
│   ├── ui/               # Componentes UI básicos
│   ├── maps/             # Componentes de mapas
│   ├── charts/           # Componentes de gráficos
│   └── layout/           # Layout components
├── lib/                  # Utilities e configurações
├── hooks/                # Custom React hooks
├── stores/               # Zustand stores
├── types/                # TypeScript types
└── utils/                # Utility functions
```

## 🔧 Arquitetura de Dados

O sistema utiliza uma arquitetura orientada para visualização de dados em tempo real, sem necessidade de base de dados local:

- **Dados em Tempo Real**: Integração direta com APIs externas
- **Cache Inteligente**: React Query para otimização de performance
- **Dados de Demonstração**: Mock data para desenvolvimento e testes
- **APIs Externas**: INE, Banco de Portugal, e outras fontes oficiais

## 📈 Integração com APIs do INE

O sistema integra com as **3 APIs oficiais do INE**:

### 1. API de Base de Dados

- **Endpoint**: `/ngt_server/attachfileu.jsp`
- **Função**: Acesso direto aos dados estatísticos

### 2. API de Catálogo

- **Endpoint**: `/ine/json_indicador`
- **Função**: Informações sobre conjuntos de dados disponíveis

### 3. API de Metadados

- **Endpoint**: `/ine/json_metadata`
- **Função**: Estrutura dos dados e definições de variáveis

### Exemplo de Uso

```typescript
import { INEApiClient } from "@/lib/ine-api";

const ineClient = new INEApiClient(process.env.INE_API_KEY);

// Pesquisar indicadores por tópico
const indicators = await ineClient.searchIndicators("habitacao");

// Obter metadados de um indicador
const metadata = await ineClient.getMetadata("0008873");

// Obter dados de população para um município
const populationData = await ineClient.getPopulationData("1106");

// Obter dados completos de um município
const municipalityData = await ineClient.getMunicipalityData("1106");

// Validar se um indicador existe
const isValid = await ineClient.isIndicatorValid("0008873");
```

### OpenStreetMap

Utilizamos React Leaflet para integração com OpenStreetMap:

```tsx
import { MapContainer, TileLayer, Marker } from "react-leaflet";

<MapContainer center={[39.5, -8.0]} zoom={7}>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&copy; OpenStreetMap contributors"
  />
</MapContainer>;
```

## 🎨 Design e UX

O design segue princípios de acessibilidade e usabilidade:

- **Fontes**: Inter e Gilroy para melhor legibilidade
- **Tamanhos**: Fontes pequenas para melhor densidade de informação
- **Animações**: Transições suaves usando Framer Motion
- **Responsive**: Design adaptável para desktop e mobile
- **Acessibilidade**: Suporte para leitores de ecrã e navegação por teclado

## 🧪 Testes

```bash
# Executar testes
npm run test

# Executar testes com coverage
npm run test:coverage

# Executar testes E2E
npm run test:e2e
```

## 📦 Deployment

### Vercel (Recomendado)

```bash
# Deploy automático conectando o repositório ao Vercel
# ou usando Vercel CLI
npx vercel
```

### Docker

```bash
# Build da imagem
docker build -t atlas-imobiliario-pt .

# Executar container
docker run -p 3000:3000 atlas-imobiliario-pt
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para a sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit as suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o ficheiro [LICENSE](LICENSE) para detalhes.

## 🗺 Roadmap

- [ ] **Fase 1**: MVP com funcionalidades básicas
  - [x] Setup do projeto e arquitetura
  - [x] Interface principal e mapas
  - [ ] Integração com dados INE
  - [ ] Sistema de autenticação básico
- [ ] **Fase 2**: Funcionalidades avançadas
  - [ ] Previsões de preços com ML
  - [ ] Sistema de alertas
  - [ ] Relatórios detalhados
  - [ ] API pública
- [ ] **Fase 3**: Escalabilidade
  - [ ] Cache distribuído
  - [ ] Microserviços
  - [ ] Mobile app
  - [ ] Integração com mais fontes de dados

---
