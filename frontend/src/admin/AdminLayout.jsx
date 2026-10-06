import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  Bell,
  Boxes,
  ChevronDown,
  CircleHelp,
  LayoutDashboard,
  Menu,
  Package,
  Search,
  Settings,
  ShoppingBag,
  UsersRound,
  X,
  Tags,
} from 'lucide-react'

const navegacao = [
  { nome: 'Dashboard', caminho: '/', icone: LayoutDashboard, exato: true },
  { nome: 'Produtos', caminho: '/produtos', icone: Package },
  { nome: 'Categorias', caminho: '/categorias', icone: Tags },
  { nome: 'Estoque', caminho: '/estoque', icone: Boxes },
  { nome: 'Pedidos', caminho: '/pedidos', icone: ShoppingBag },
  { nome: 'Clientes', caminho: '/clientes', icone: UsersRound },
  { nome: 'Configurações', caminho: '/configuracoes', icone: Settings },
]

const titulos = {
  '/': 'Dashboard',
  '/produtos': 'Produtos',
  '/produtos/novo': 'Novo produto',
  '/categorias': 'Categorias',
  '/estoque': 'Estoque',
  '/pedidos': 'Pedidos',
  '/clientes': 'Clientes',
  '/configuracoes': 'Configurações',
}

function UsuarioMenu() {
  return (
    <details className="menu-usuario">
      <summary aria-label="Abrir menu da administradora">
        <span className="avatar-administradora">D</span>
        <span className="dados-administradora">
          <strong>Diocelia</strong>
          <small>Administradora</small>
        </span>
        <ChevronDown size={15} aria-hidden="true" />
      </summary>
      <div className="menu-usuario-conteudo">
        <span>Conta da loja</span>
        <span className="menu-usuario-status">Sessão demonstrativa</span>
      </div>
    </details>
  )
}

export default function AdminLayout() {
  const [menuAberto, setMenuAberto] = useState(false)
  const localizacao = useLocation()
  const titulo = titulos[localizacao.pathname] ?? 'Administração'

  return (
    <div className="admin-app">
      {menuAberto && (
        <button
          className="admin-menu-fundo"
          type="button"
          aria-label="Fechar menu de navegação"
          onClick={() => setMenuAberto(false)}
        />
      )}
      <aside className={`admin-sidebar${menuAberto ? ' aberto' : ''}`}>
        <div className="admin-marca-linha">
          <a className="admin-marca" href="/" aria-label="Diocelia, dashboard">
            <span className="admin-marca-simbolo">D</span>
            <span>Diocelia<small>PAINEL DA LOJA</small></span>
          </a>
          <button
            className="admin-icono admin-fechar-menu"
            type="button"
            aria-label="Fechar menu"
            onClick={() => setMenuAberto(false)}
          >
            <X size={19} />
          </button>
        </div>

        <p className="admin-nav-legenda">GERENCIAMENTO</p>
        <nav className="admin-nav" aria-label="Navegação administrativa">
          {navegacao.map(({ nome, caminho, icone: Icone, exato }) => (
            <NavLink
              key={caminho}
              to={caminho}
              end={exato}
              className={({ isActive }) => `admin-nav-link${isActive ? ' ativo' : ''}`}
              onClick={() => setMenuAberto(false)}
            >
              <Icone size={18} strokeWidth={1.8} aria-hidden="true" />
              <span>{nome}</span>
              {nome === 'Pedidos' && <span className="admin-nav-contagem">4</span>}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-ajuda">
          <div className="admin-ajuda-icone"><CircleHelp size={18} /></div>
          <strong>Precisa de ajuda?</strong>
          <span>Estamos aqui para você.</span>
          <button type="button" onClick={() => window.alert('Área de ajuda demonstrativa.')}>Central de ajuda</button>
        </div>
        <div className="admin-sidebar-rodape">Diocelia · 2026</div>
      </aside>

      <div className="admin-principal">
        <header className="admin-topbar">
          <div className="admin-topbar-esquerda">
            <button
              className="admin-icono admin-abrir-menu"
              type="button"
              aria-label="Abrir menu de navegação"
              onClick={() => setMenuAberto(true)}
            >
              <Menu size={21} />
            </button>
            <div className="admin-caminho">
              <span>Loja</span><span aria-hidden="true">/</span><strong>{titulo}</strong>
            </div>
          </div>
          <div className="admin-topbar-acoes">
            <label className="admin-busca-topo">
              <Search size={17} aria-hidden="true" />
              <input type="search" placeholder="Buscar no sistema..." aria-label="Buscar no sistema" />
              <kbd>⌘ K</kbd>
            </label>
            <details className="admin-notificacoes">
              <summary className="admin-icono" aria-label="Notificações">
                <Bell size={19} />
                <span className="admin-ponto-notificacao" />
              </summary>
              <div className="admin-notificacoes-painel">
                <strong>Notificações</strong>
                <p>Você tem 3 produtos com estoque baixo.</p>
                <p>4 pedidos aguardam processamento.</p>
              </div>
            </details>
            <span className="admin-divisor-topo" />
            <UsuarioMenu />
          </div>
        </header>
        <main className="admin-conteudo"><Outlet /></main>
      </div>
    </div>
  )
}