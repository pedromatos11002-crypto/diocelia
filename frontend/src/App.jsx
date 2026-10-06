import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import AdminLayout from './admin/AdminLayout.jsx'
import {
  Categorias,
  Clientes,
  Configuracoes,
  Dashboard,
  Estoque,
  NovoProduto,
  Pedidos,
  Produtos,
} from './admin/AdminPages.jsx'
import './App.css'
import './admin/admin.css'

function PaginaInicial() {
  return (
    <main className="pagina-inicial">
      <header className="cabecalho">
        <a className="marca" href="/" aria-label="DIocelia, página inicial">
          DIocelia<span>.</span>
        </a>
        <p className="assinatura">Moda feminina</p>
      </header>

      <section className="apresentacao" aria-labelledby="titulo-principal">
        <p className="sobretitulo">Vista-se de você</p>
        <h1 id="titulo-principal">
          Seu estilo,
          <br />
          <em>seu momento.</em>
        </h1>
        <p className="descricao">
          Um novo jeito de descobrir a moda que acompanha quem você é.
        </p>
        <span className="aviso">Novidades em breve</span>
      </section>

      <footer className="rodape">
        <span>DIocelia</span>
        <span>Moda feita para você</span>
      </footer>
    </main>
  )
}

function RedirecionarAdminAntigo() {
  const localizacao = useLocation()
  const destino = localizacao.pathname.replace(/^\/admin/, '') || '/'
  return <Navigate to={`${destino}${localizacao.search}`} replace />
}

function App() {
  return (
    <Routes>
      <Route path="/loja" element={<PaginaInicial />} />
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="produtos" element={<Produtos />} />
        <Route path="produtos/novo" element={<NovoProduto />} />
        <Route path="categorias" element={<Categorias />} />
        <Route path="estoque" element={<Estoque />} />
        <Route path="pedidos" element={<Pedidos />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="configuracoes" element={<Configuracoes />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
      <Route path="/admin/*" element={<RedirecionarAdminAntigo />} />
    </Routes>
  )
}

export default App
