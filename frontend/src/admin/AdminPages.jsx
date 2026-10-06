import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowDown,
  ArrowDownLeft,
  ArrowUpRight,
  Boxes,
  Check,
  ChevronDown,
  CirclePlus,
  Download,
  Ellipsis,
  Eye,
  Filter,
  ImagePlus,
  Package,
  Pencil,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Tag,
  Trash2,
  TrendingUp,
  X,
} from 'lucide-react'
import {
  categoriasIniciais,
  clientes,
  historicoEstoqueInicial,
  pedidos,
  produtos,
  vendasSemana,
} from './dadosMock.js'

const moeda = (valor) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function CabecalhoPagina({ titulo, descricao, acao }) {
  return (
    <div className="admin-pagina-cabecalho">
      <div>
        <h1>{titulo}</h1>
        {descricao && <p>{descricao}</p>}
      </div>
      {acao}
    </div>
  )
}

function BotaoPrimario({ children, to, onClick, icone: Icone, tipo = 'button' }) {
  const conteudo = <>{Icone && <Icone size={17} strokeWidth={1.9} />}{children}</>
  if (to) return <Link className="admin-botao primario" to={to}>{conteudo}</Link>
  return <button className="admin-botao primario" type={tipo} onClick={onClick}>{conteudo}</button>
}

function Status({ children }) {
  const classes = {
    'Disponível': 'verde',
    'Estoque baixo': 'ambar',
    'Sem estoque': 'vermelho',
    'Pendente': 'ambar',
    'Preparando': 'azul',
    'Enviado': 'lilas',
    'Entregue': 'verde',
    'Cancelado': 'vermelho',
    'Entrada': 'verde',
    'Saída': 'ambar',
    'Ajuste': 'azul',
  }
  return <span className={`admin-status ${classes[children] ?? 'neutro'}`}><i />{children}</span>
}

function Busca({ valor, aoAlterar, placeholder = 'Pesquisar...' }) {
  return (
    <label className="admin-campo-busca">
      <Search size={17} aria-hidden="true" />
      <input type="search" placeholder={placeholder} value={valor} onChange={(evento) => aoAlterar(evento.target.value)} />
    </label>
  )
}

function AvatarIniciais({ nome, cor = '' }) {
  const iniciais = nome.split(' ').slice(0, 2).map((parte) => parte[0]).join('')
  return <span className={`admin-avatar ${cor}`}>{iniciais}</span>
}

function CartaoPainel({ children, titulo, complemento, classe = '', id }) {
  return (
    <section id={id} className={`admin-cartao ${classe}`}>
      {(titulo || complemento) && (
        <div className="admin-cartao-cabecalho">
          {titulo && <h2>{titulo}</h2>}
          {complemento}
        </div>
      )}
      {children}
    </section>
  )
}

function TabelaVazia({ colunas, mensagem = 'Nenhum registro encontrado.' }) {
  return <tr><td className="admin-tabela-vazia" colSpan={colunas}>{mensagem}</td></tr>
}

export function Dashboard() {
  const maximo = Math.max(...vendasSemana.map((dia) => dia.valor))
  const resumo = [
    { titulo: 'Vendas hoje', valor: moeda(2480), variacao: '+12,8%', texto: 'vs. ontem', icone: ShoppingBag, tom: 'rosa' },
    { titulo: 'Faturamento', valor: moeda(28450), variacao: '+8,2%', texto: 'vs. mês passado', icone: TrendingUp, tom: 'verde' },
    { titulo: 'Produtos cadastrados', valor: '70', variacao: '5 categorias', texto: 'no catálogo', icone: Package, tom: 'lilas' },
    { titulo: 'Estoque baixo', valor: '3', variacao: 'Atenção', texto: 'itens para repor', icone: Boxes, tom: 'ambar' },
  ]
  const estoqueBaixo = produtos.filter((produto) => produto.estoque <= produto.minimo)
  const maisVendidos = [
    { nome: 'Vestido midi Aurora', vendidos: 34, faturamento: 9866, imagem: produtos[0].imagem },
    { nome: 'Blusa canelada Serena', vendidos: 28, faturamento: 4477.2, imagem: produtos[1].imagem },
    { nome: 'Saia envelope Flora', vendidos: 21, faturamento: 4197.9, imagem: produtos[3].imagem },
  ]

  return (
    <>
      <div className="admin-boas-vindas">
        <div>
          <p className="admin-data-hoje">SEGUNDA-FEIRA, 5 DE OUTUBRO DE 2026</p>
          <h1>Olá, Diocelia!</h1>
          <p>Veja o resumo da sua loja.</p>
        </div>
        <button className="admin-botao contorno" type="button" onClick={() => window.print()}><Download size={16} /> Exportar resumo</button>
      </div>

      <div className="admin-resumo-grid">
        {resumo.map(({ titulo, valor, variacao, texto, icone: Icone, tom }) => (
          <article className="admin-resumo-card" key={titulo}>
            <div className={`admin-resumo-icone ${tom}`}><Icone size={19} strokeWidth={1.8} /></div>
            <span className="admin-resumo-titulo">{titulo}</span>
            <strong className="admin-resumo-valor">{valor}</strong>
            <span className="admin-resumo-rodape"><b className={tom}>{variacao}</b> {texto}</span>
          </article>
        ))}
      </div>

      <div className="admin-grade-dashboard topo">
        <CartaoPainel titulo="Vendas dos últimos 7 dias" complemento={<button className="admin-periodo" type="button">Esta semana <ChevronDown size={15} /></button>} classe="admin-grafico-card">
          <div className="admin-grafico-resumo"><strong>{moeda(18140)}</strong><span className="admin-tendencia"><ArrowUpRight size={15} /> 9,4%</span><small>em relação à semana anterior</small></div>
          <div className="admin-grafico" role="img" aria-label="Gráfico de vendas dos últimos sete dias">
            <div className="admin-grafico-escala"><span>R$ 4 mil</span><span>R$ 3 mil</span><span>R$ 2 mil</span><span>R$ 1 mil</span><span>R$ 0</span></div>
            <div className="admin-grafico-colunas">
              {vendasSemana.map((dia, indice) => (
                <div className="admin-grafico-coluna" key={dia.dia}>
                  <div className={`admin-barra${indice === 5 ? ' destaque' : ''}`} style={{ height: `${(dia.valor / maximo) * 100}%` }} title={`${dia.dia}: ${moeda(dia.valor)}`} />
                  <span>{dia.dia}</span>
                </div>
              ))}
            </div>
          </div>
        </CartaoPainel>

        <CartaoPainel titulo="Ações rápidas" classe="admin-atalhos-card">
          <div className="admin-atalhos-grid">
            <Link to="/produtos/novo"><span><CirclePlus size={19} /></span>Cadastrar produto</Link>
            <Link to="/categorias"><span><Tag size={19} /></span>Nova categoria</Link>
            <Link to="/estoque"><span><ArrowDownLeft size={19} /></span>Registrar entrada</Link>
            <Link to="/estoque"><span><ArrowUpRight size={19} /></span>Registrar saída</Link>
            <Link to="/pedidos"><span><ShoppingBag size={19} /></span>Ver pedidos</Link>
            <Link to="/estoque"><span><Boxes size={19} /></span>Ver estoque</Link>
          </div>
        </CartaoPainel>
      </div>

      <div className="admin-grade-dashboard">
        <CartaoPainel titulo="Pedidos recentes" complemento={<Link className="admin-link-texto" to="/pedidos">Ver todos <ArrowUpRight size={15} /></Link>}>
          <div className="admin-tabela-envoltoria">
            <table className="admin-tabela">
              <thead><tr><th>Número</th><th>Cliente</th><th>Data</th><th>Status</th><th className="alinha-direita">Valor</th></tr></thead>
              <tbody>{pedidos.slice(0, 4).map((pedido) => (
                <tr key={pedido.numero}><td className="texto-forte">{pedido.numero}</td><td>{pedido.cliente}</td><td>{pedido.data}</td><td><Status>{pedido.status}</Status></td><td className="alinha-direita texto-forte">{moeda(pedido.total)}</td></tr>
              ))}</tbody>
            </table>
          </div>
        </CartaoPainel>

        <CartaoPainel titulo="Produtos com estoque baixo" complemento={<Link className="admin-link-texto" to="/estoque">Ver estoque <ArrowUpRight size={15} /></Link>}>
          <div className="admin-lista-estoque">
            {estoqueBaixo.slice(0, 3).map((produto) => (
              <div className="admin-item-estoque" key={produto.id}>
                <img src={produto.imagem} alt="" />
                <div className="admin-item-estoque-nome"><strong>{produto.nome}</strong><span>mínimo {produto.minimo} un.</span></div>
                <div className="admin-item-estoque-qtd"><strong>{produto.estoque}</strong><Status>{produto.estoque ? 'Estoque baixo' : 'Sem estoque'}</Status></div>
              </div>
            ))}
          </div>
        </CartaoPainel>
      </div>

      <CartaoPainel titulo="Produtos mais vendidos" complemento={<span className="admin-periodo-estatico">Este mês <ChevronDown size={15} /></span>}>
        <div className="admin-mais-vendidos">
          {maisVendidos.map((produto, indice) => (
            <div className="admin-mais-vendido" key={produto.nome}>
              <span className="admin-ranking">0{indice + 1}</span>
              <img src={produto.imagem} alt="" />
              <strong>{produto.nome}</strong>
              <span className="admin-vendidos-qtd">{produto.vendidos} un. vendidas</span>
              <strong className="admin-vendidos-valor">{moeda(produto.faturamento)}</strong>
            </div>
          ))}
        </div>
      </CartaoPainel>
    </>
  )
}

export function Produtos() {
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState('Todos os status')
  const [listaProdutos, setListaProdutos] = useState(produtos)
  const [editando, setEditando] = useState(null)
  const lista = useMemo(() => listaProdutos.filter((produto) => {
    const termo = busca.toLocaleLowerCase('pt-BR')
    return (produto.nome.toLocaleLowerCase('pt-BR').includes(termo) || produto.categoria.toLocaleLowerCase('pt-BR').includes(termo)) && (filtro === 'Todos os status' || produto.status === filtro)
  }), [busca, filtro, listaProdutos])

  const salvarEdicao = (evento) => {
    evento.preventDefault()
    setListaProdutos((atuais) => atuais.map((produto) => produto.id === editando.id ? {
      ...editando,
      preco: Number(editando.preco),
      estoque: Number(editando.estoque),
      status: Number(editando.estoque) === 0 ? 'Sem estoque' : Number(editando.estoque) <= editando.minimo ? 'Estoque baixo' : 'Disponível',
    } : produto))
    setEditando(null)
  }

  return (
    <>
      <CabecalhoPagina titulo="Produtos" descricao="Gerencie o catálogo e acompanhe a disponibilidade das peças." acao={<BotaoPrimario to="/produtos/novo" icone={Plus}>Cadastrar produto</BotaoPrimario>} />
      <CartaoPainel classe="admin-tabela-card">
        <div className="admin-filtros-linha">
          <Busca valor={busca} aoAlterar={setBusca} placeholder="Buscar por nome ou categoria..." />
          <label className="admin-select-filtro"><Filter size={16} /><select aria-label="Filtrar produtos por status" value={filtro} onChange={(evento) => setFiltro(evento.target.value)}><option>Todos os status</option><option>Disponível</option><option>Estoque baixo</option><option>Sem estoque</option></select><ChevronDown size={15} /></label>
          <button className="admin-botao contorno" type="button"><SlidersHorizontal size={16} /> Filtros</button>
        </div>
        <div className="admin-tabela-envoltoria">
          <table className="admin-tabela admin-tabela-produtos">
            <thead><tr><th>Produto</th><th>Categoria</th><th>Preço</th><th>Estoque</th><th>Status</th><th><span className="visualmente-oculto">Ações</span></th></tr></thead>
            <tbody>{lista.length ? lista.map((produto) => (
              <tr key={produto.id}>
                <td><div className="admin-produto-celula"><img src={produto.imagem} alt={`Foto de ${produto.nome}`} /><span><strong>{produto.nome}</strong><small>{produto.id}</small></span></div></td>
                <td>{produto.categoria}</td><td className="texto-forte">{moeda(produto.preco)}</td><td>{produto.estoque} un.</td><td><Status>{produto.status}</Status></td>
                <td><div className="admin-acoes-tabela"><button className="admin-acao-icono" type="button" aria-label={`Editar ${produto.nome}`} title="Editar" onClick={() => setEditando({ ...produto })}><Pencil size={16} /></button><button className="admin-acao-icono perigo" type="button" aria-label={`Excluir ${produto.nome}`} title="Excluir" onClick={() => setListaProdutos((atuais) => atuais.filter((item) => item.id !== produto.id))}><Trash2 size={16} /></button></div></td>
              </tr>
            )) : <TabelaVazia colunas={6} mensagem="Nenhum produto corresponde à pesquisa." />}</tbody>
          </table>
        </div>
        <div className="admin-paginacao"><span>Mostrando <strong>{lista.length}</strong> de <strong>{listaProdutos.length}</strong> produtos de demonstração</span><div><button type="button" disabled>Anterior</button><button type="button" className="pagina-ativa">1</button><button type="button">2</button><button type="button">3</button><button type="button">Próxima</button></div></div>
      </CartaoPainel>
      {editando && <div className="admin-modal-fundo" role="presentation" onMouseDown={(evento) => { if (evento.target === evento.currentTarget) setEditando(null) }}><form className="admin-modal" onSubmit={salvarEdicao}><div className="admin-modal-cabecalho"><div><span className="admin-modal-icone"><Pencil size={18} /></span><h2>Editar produto</h2></div><button className="admin-acao-icono" type="button" aria-label="Fechar" onClick={() => setEditando(null)}><X size={18} /></button></div><CampoFormulario rotulo="Nome do produto" obrigatorio><input required value={editando.nome} onChange={(evento) => setEditando({ ...editando, nome: evento.target.value })} /></CampoFormulario><CampoFormulario rotulo="Categoria" obrigatorio><select required value={editando.categoria} onChange={(evento) => setEditando({ ...editando, categoria: evento.target.value })}>{categoriasIniciais.map((categoria) => <option key={categoria.id}>{categoria.nome}</option>)}</select></CampoFormulario><CampoFormulario rotulo="Preço (R$)" obrigatorio><input required type="number" min="0" step="0.01" value={editando.preco} onChange={(evento) => setEditando({ ...editando, preco: evento.target.value })} /></CampoFormulario><CampoFormulario rotulo="Estoque atual" obrigatorio><input required type="number" min="0" value={editando.estoque} onChange={(evento) => setEditando({ ...editando, estoque: evento.target.value })} /></CampoFormulario><div className="admin-modal-acoes"><button className="admin-botao contorno" type="button" onClick={() => setEditando(null)}>Cancelar</button><BotaoPrimario tipo="submit" icone={Check}>Salvar alterações</BotaoPrimario></div></form></div>}
    </>
  )
}

function CampoFormulario({ rotulo, obrigatorio, dica, children, classe = '' }) {
  return <label className={`admin-campo-formulario ${classe}`}><span>{rotulo}{obrigatorio && <b> *</b>}</span>{children}{dica && <small>{dica}</small>}</label>
}

export function NovoProduto() {
  const [cores, setCores] = useState(['Rosa antigo', 'Preto'])
  const [aviso, setAviso] = useState(false)
  const alternarCor = (cor) => setCores((atuais) => atuais.includes(cor) ? atuais.filter((item) => item !== cor) : [...atuais, cor])

  return (
    <>
      <CabecalhoPagina titulo="Cadastrar produto" descricao="Preencha as informações para adicionar uma peça ao catálogo." />
      {aviso && <div className="admin-aviso-formulario"><Check size={17} /> Produto salvo apenas nesta demonstração visual.<button type="button" aria-label="Fechar aviso" onClick={() => setAviso(false)}><X size={16} /></button></div>}
      <form className="admin-formulario-produto" onSubmit={(evento) => { evento.preventDefault(); setAviso(true) }}>
        <CartaoPainel titulo="Informações do produto" classe="admin-form-cartao">
          <div className="admin-form-grade">
            <CampoFormulario rotulo="Nome do produto" obrigatorio><input required placeholder="Ex.: Vestido midi Aurora" /></CampoFormulario>
            <CampoFormulario rotulo="Categoria" obrigatorio><select required defaultValue=""><option value="" disabled>Selecione uma categoria</option>{categoriasIniciais.map((categoria) => <option key={categoria.id}>{categoria.nome}</option>)}</select></CampoFormulario>
            <CampoFormulario rotulo="Descrição" classe="coluna-inteira"><textarea rows="4" placeholder="Descreva o caimento, o tecido e os detalhes da peça..." /></CampoFormulario>
            <CampoFormulario rotulo="Preço de venda (R$)" obrigatorio><input required type="number" min="0" step="0.01" placeholder="0,00" /></CampoFormulario>
            <CampoFormulario rotulo="Preço promocional (R$)"><input type="number" min="0" step="0.01" placeholder="Opcional" /></CampoFormulario>
          </div>
        </CartaoPainel>

        <CartaoPainel titulo="Variações" complemento={<span className="admin-opcional">Opcional</span>} classe="admin-form-cartao">
          <div className="admin-form-grade">
            <CampoFormulario rotulo="Tamanhos" classe="coluna-inteira"><div className="admin-opcoes-selecao">{['PP', 'P', 'M', 'G', 'GG', 'XG'].map((tamanho) => <label key={tamanho}><input type="checkbox" defaultChecked={['P', 'M', 'G'].includes(tamanho)} /><span>{tamanho}</span></label>)}</div></CampoFormulario>
            <CampoFormulario rotulo="Cores" classe="coluna-inteira"><div className="admin-opcoes-selecao">{['Rosa antigo', 'Preto', 'Off-white', 'Verde oliva'].map((cor) => <label key={cor}><input type="checkbox" checked={cores.includes(cor)} onChange={() => alternarCor(cor)} /><span>{cor}</span></label>)}</div></CampoFormulario>
          </div>
        </CartaoPainel>

        <CartaoPainel titulo="Controle de estoque" classe="admin-form-cartao">
          <div className="admin-form-grade duas-colunas">
            <CampoFormulario rotulo="Quantidade em estoque" obrigatorio><input required type="number" min="0" defaultValue="0" /></CampoFormulario>
            <CampoFormulario rotulo="Estoque mínimo" obrigatorio dica="Você será avisada quando atingir esta quantidade."><input required type="number" min="0" defaultValue="5" /></CampoFormulario>
          </div>
        </CartaoPainel>

        <CartaoPainel titulo="Fotos do produto" complemento={<span className="admin-opcional">Até 5 imagens</span>} classe="admin-form-cartao">
          <label className="admin-upload-imagem"><input type="file" accept="image/*" multiple /><span><ImagePlus size={23} /><strong>Adicionar imagens</strong><small>PNG ou JPG, até 5 MB cada</small></span></label>
        </CartaoPainel>
        <div className="admin-form-acoes"><Link className="admin-botao contorno" to="/produtos">Cancelar</Link><BotaoPrimario tipo="submit" icone={Check}>Salvar produto</BotaoPrimario></div>
      </form>
    </>
  )
}

export function Categorias() {
  const [lista, setLista] = useState(categoriasIniciais)
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [editando, setEditando] = useState(null)
  const [modalAberto, setModalAberto] = useState(false)
  const abrirEdicao = (categoria) => { setEditando(categoria); setNome(categoria.nome); setDescricao(categoria.descricao); setModalAberto(true) }
  const fecharModal = () => { setModalAberto(false); setEditando(null); setNome(''); setDescricao('') }
  const salvar = (evento) => {
    evento.preventDefault()
    if (editando) setLista((atuais) => atuais.map((categoria) => categoria.id === editando.id ? { ...categoria, nome, descricao } : categoria))
    else setLista((atuais) => [...atuais, { id: Date.now(), nome, descricao, produtos: 0 }])
    fecharModal()
  }

  return (
    <>
      <CabecalhoPagina titulo="Categorias" descricao="Organize seus produtos em categorias fáceis de encontrar." acao={<BotaoPrimario onClick={() => setModalAberto(true)} icone={Plus}>Adicionar categoria</BotaoPrimario>} />
      <div className="admin-categorias-grade">
        {lista.map((categoria, indice) => (
          <article className="admin-categoria-card" key={categoria.id}>
            <div className={`admin-categoria-icone tom-${indice % 4}`}><Tag size={20} /></div>
            <button className="admin-acao-icono admin-categoria-menu" type="button" aria-label={`Mais ações para ${categoria.nome}`} onClick={() => abrirEdicao(categoria)}><Ellipsis size={19} /></button>
            <h2>{categoria.nome}</h2><p>{categoria.descricao}</p>
            <div className="admin-categoria-rodape"><span><Package size={15} /> {categoria.produtos} produtos</span><div><button className="admin-acao-icono" type="button" aria-label={`Editar ${categoria.nome}`} onClick={() => abrirEdicao(categoria)}><Pencil size={15} /></button><button className="admin-acao-icono perigo" type="button" aria-label={`Excluir ${categoria.nome}`} onClick={() => setLista((atuais) => atuais.filter((item) => item.id !== categoria.id))}><Trash2 size={15} /></button></div></div>
          </article>
        ))}
        <button className="admin-categoria-adicionar" type="button" onClick={() => setModalAberto(true)}><span><Plus size={20} /></span><strong>Nova categoria</strong><small>Adicione uma categoria ao catálogo</small></button>
      </div>
      {modalAberto && <div className="admin-modal-fundo" role="presentation" onMouseDown={(evento) => { if (evento.target === evento.currentTarget) fecharModal() }}><form className="admin-modal" onSubmit={salvar}><div className="admin-modal-cabecalho"><div><span className="admin-modal-icone"><Tag size={19} /></span><h2>{editando ? 'Editar categoria' : 'Nova categoria'}</h2></div><button type="button" className="admin-acao-icono" aria-label="Fechar" onClick={fecharModal}><X size={18} /></button></div><CampoFormulario rotulo="Nome da categoria" obrigatorio><input required autoFocus value={nome} onChange={(evento) => setNome(evento.target.value)} placeholder="Ex.: Acessórios" /></CampoFormulario><CampoFormulario rotulo="Descrição"><textarea rows="3" value={descricao} onChange={(evento) => setDescricao(evento.target.value)} placeholder="Uma breve descrição" /></CampoFormulario><div className="admin-modal-acoes"><button className="admin-botao contorno" type="button" onClick={fecharModal}>Cancelar</button><BotaoPrimario tipo="submit">{editando ? 'Salvar alterações' : 'Adicionar categoria'}</BotaoPrimario></div></form></div>}
    </>
  )
}

export function Estoque() {
  const [busca, setBusca] = useState('')
  const [tipoMovimento, setTipoMovimento] = useState('')
  const [historico, setHistorico] = useState(historicoEstoqueInicial)
  const [movimento, setMovimento] = useState({ produto: '', quantidade: '' })
  const lista = produtos.filter((produto) => produto.nome.toLocaleLowerCase('pt-BR').includes(busca.toLocaleLowerCase('pt-BR')))
  const registrar = (evento) => {
    evento.preventDefault()
    const registro = produtos.find((produto) => produto.id === movimento.produto)
    if (!registro) return
    const sinal = tipoMovimento === 'Saída' ? '-' : '+'
    setHistorico((atuais) => [{ data: 'Agora', produto: registro.nome, tipo: tipoMovimento, quantidade: `${sinal}${movimento.quantidade} un.`, responsavel: 'Diocelia' }, ...atuais])
    setTipoMovimento('')
    setMovimento({ produto: '', quantidade: '' })
  }
  const botaoMovimento = (tipo, Icone) => <button className="admin-botao contorno" type="button" onClick={() => setTipoMovimento(tipo)}><Icone size={16} /> Registrar {tipo.toLocaleLowerCase('pt-BR')}</button>

  return (
    <>
      <CabecalhoPagina titulo="Estoque" descricao="Acompanhe os níveis e registre as movimentações das peças." acao={<div className="admin-grupo-acoes">{botaoMovimento('Entrada', ArrowDownLeft)}{botaoMovimento('Saída', ArrowUpRight)}<BotaoPrimario onClick={() => setTipoMovimento('Ajuste')} icone={SlidersHorizontal}>Ajustar estoque</BotaoPrimario></div>} />
      <div className="admin-mini-resumos"><div><span className="admin-resumo-icone rosa"><Package size={18} /></span><span>Itens cadastrados<strong>70</strong></span></div><div><span className="admin-resumo-icone ambar"><ArrowDown size={18} /></span><span>Estoque baixo<strong>3 produtos</strong></span></div><div><span className="admin-resumo-icone vermelho"><X size={18} /></span><span>Sem estoque<strong>1 produto</strong></span></div></div>
      <CartaoPainel titulo="Posição de estoque" classe="admin-tabela-card">
        <div className="admin-filtros-linha"><Busca valor={busca} aoAlterar={setBusca} placeholder="Buscar produto..." /><button className="admin-botao contorno" type="button"><Filter size={16} /> Filtrar</button></div>
        <div className="admin-tabela-envoltoria"><table className="admin-tabela"><thead><tr><th>Produto</th><th>Estoque atual</th><th>Estoque mínimo</th><th>Status</th><th>Última movimentação</th><th><span className="visualmente-oculto">Ações</span></th></tr></thead><tbody>{lista.length ? lista.map((produto, indice) => <tr key={produto.id}><td><div className="admin-produto-celula"><img src={produto.imagem} alt="" /><span><strong>{produto.nome}</strong><small>{produto.id}</small></span></div></td><td className="texto-forte">{produto.estoque} un.</td><td>{produto.minimo} un.</td><td><Status>{produto.status}</Status></td><td>{['Hoje, 14:20', 'Hoje, 12:08', 'Hoje, 10:45', 'Ontem, 16:30', 'Ontem, 11:12'][indice]}</td><td><button className="admin-acao-icono" type="button" aria-label={`Registrar movimentação de ${produto.nome}`} onClick={() => { setMovimento({ produto: produto.id, quantidade: '' }); setTipoMovimento('Ajuste') }}><Ellipsis size={18} /></button></td></tr>) : <TabelaVazia colunas={6} />}</tbody></table></div>
      </CartaoPainel>
      <CartaoPainel titulo="Histórico de movimentações" complemento={<button className="admin-link-texto" type="button">Ver histórico completo <ArrowUpRight size={15} /></button>}>
        <div className="admin-tabela-envoltoria"><table className="admin-tabela"><thead><tr><th>Data</th><th>Produto</th><th>Tipo</th><th>Quantidade</th><th>Responsável</th></tr></thead><tbody>{historico.slice(0, 5).map((item, indice) => <tr key={`${item.data}-${item.produto}-${indice}`}><td>{item.data}</td><td className="texto-forte">{item.produto}</td><td><Status>{item.tipo}</Status></td><td className="texto-forte">{item.quantidade}</td><td><span className="admin-responsavel"><AvatarIniciais nome={item.responsavel} />{item.responsavel}</span></td></tr>)}</tbody></table></div>
      </CartaoPainel>
      {tipoMovimento && <div className="admin-modal-fundo" role="presentation" onMouseDown={(evento) => { if (evento.target === evento.currentTarget) setTipoMovimento('') }}><form className="admin-modal" onSubmit={registrar}><div className="admin-modal-cabecalho"><div><span className="admin-modal-icone"><Boxes size={19} /></span><h2>Registrar {tipoMovimento.toLocaleLowerCase('pt-BR')}</h2></div><button className="admin-acao-icono" type="button" aria-label="Fechar" onClick={() => setTipoMovimento('')}><X size={18} /></button></div><CampoFormulario rotulo="Produto" obrigatorio><select required value={movimento.produto} onChange={(evento) => setMovimento({ ...movimento, produto: evento.target.value })}><option value="">Selecione um produto</option>{produtos.map((produto) => <option key={produto.id} value={produto.id}>{produto.nome}</option>)}</select></CampoFormulario><CampoFormulario rotulo={tipoMovimento === 'Ajuste' ? 'Nova quantidade em estoque' : 'Quantidade'} obrigatorio><input required min="1" type="number" value={movimento.quantidade} onChange={(evento) => setMovimento({ ...movimento, quantidade: evento.target.value })} placeholder="Informe a quantidade" /></CampoFormulario><div className="admin-modal-acoes"><button className="admin-botao contorno" type="button" onClick={() => setTipoMovimento('')}>Cancelar</button><BotaoPrimario tipo="submit">Confirmar movimentação</BotaoPrimario></div></form></div>}
    </>
  )
}

export function Pedidos() {
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState('Todos os status')
  const lista = pedidos.filter((pedido) => (pedido.numero.toLocaleLowerCase('pt-BR').includes(busca.toLocaleLowerCase('pt-BR')) || pedido.cliente.toLocaleLowerCase('pt-BR').includes(busca.toLocaleLowerCase('pt-BR'))) && (filtro === 'Todos os status' || pedido.status === filtro))
  return <><CabecalhoPagina titulo="Pedidos" descricao="Acompanhe os pedidos e atualize o andamento de cada compra." acao={<button className="admin-botao contorno" type="button"><Download size={16} /> Exportar pedidos</button>} /><div className="admin-mini-resumos pedidos"><div><span>Todos os pedidos<strong>248</strong></span></div><div><span>Pendentes<strong>4</strong></span></div><div><span>Em andamento<strong>12</strong></span></div><div><span>Entregues este mês<strong>86</strong></span></div></div><CartaoPainel classe="admin-tabela-card"><div className="admin-filtros-linha"><Busca valor={busca} aoAlterar={setBusca} placeholder="Buscar por pedido ou cliente..." /><label className="admin-select-filtro"><Filter size={16} /><select aria-label="Filtrar pedidos por status" value={filtro} onChange={(evento) => setFiltro(evento.target.value)}><option>Todos os status</option>{['Pendente', 'Preparando', 'Enviado', 'Entregue', 'Cancelado'].map((status) => <option key={status}>{status}</option>)}</select><ChevronDown size={15} /></label></div><div className="admin-tabela-envoltoria"><table className="admin-tabela"><thead><tr><th>Número</th><th>Cliente</th><th>Data</th><th>Produtos</th><th>Status</th><th className="alinha-direita">Total</th><th><span className="visualmente-oculto">Ações</span></th></tr></thead><tbody>{lista.length ? lista.map((pedido) => <tr key={pedido.numero}><td className="texto-forte">{pedido.numero}</td><td><span className="admin-cliente-celula"><AvatarIniciais nome={pedido.cliente} />{pedido.cliente}</span></td><td>{pedido.data}</td><td>{pedido.produtos}</td><td><Status>{pedido.status}</Status></td><td className="alinha-direita texto-forte">{moeda(pedido.total)}</td><td><button className="admin-acao-icono" type="button" aria-label={`Ver pedido ${pedido.numero}`}><Eye size={16} /></button></td></tr>) : <TabelaVazia colunas={7} />}</tbody></table></div><div className="admin-paginacao"><span>Mostrando <strong>{lista.length}</strong> de <strong>248</strong> pedidos</span><div><button type="button" disabled>Anterior</button><button type="button" className="pagina-ativa">1</button><button type="button">2</button><button type="button">Próxima</button></div></div></CartaoPainel></>
}

export function Clientes() {
  const [busca, setBusca] = useState('')
  const lista = clientes.filter((cliente) => cliente.nome.toLocaleLowerCase('pt-BR').includes(busca.toLocaleLowerCase('pt-BR')) || cliente.email.toLocaleLowerCase('pt-BR').includes(busca.toLocaleLowerCase('pt-BR')))
  return <><CabecalhoPagina titulo="Clientes" descricao="Conheça quem compra na Diocelia e acompanhe o relacionamento." acao={<button className="admin-botao contorno" type="button"><Download size={16} /> Exportar clientes</button>} /><div className="admin-mini-resumos clientes"><div><span>Clientes cadastradas<strong>186</strong></span></div><div><span>Novas este mês<strong>24</strong></span></div><div><span>Compras recorrentes<strong>68%</strong></span></div></div><CartaoPainel titulo="Todas as clientes" complemento={<span className="admin-periodo-estatico">186 clientes</span>} classe="admin-tabela-card"><div className="admin-filtros-linha"><Busca valor={busca} aoAlterar={setBusca} placeholder="Buscar por nome ou e-mail..." /><button className="admin-botao contorno" type="button"><Filter size={16} /> Filtrar</button></div><div className="admin-tabela-envoltoria"><table className="admin-tabela"><thead><tr><th>Cliente</th><th>Telefone</th><th>E-mail</th><th>Total de compras</th><th>Última compra</th><th><span className="visualmente-oculto">Ações</span></th></tr></thead><tbody>{lista.length ? lista.map((cliente) => <tr key={cliente.email}><td><span className="admin-cliente-celula"><AvatarIniciais nome={cliente.nome} /> <strong>{cliente.nome}</strong></span></td><td>{cliente.telefone}</td><td>{cliente.email}</td><td>{cliente.compras} pedidos</td><td>{cliente.ultimaCompra}</td><td><button className="admin-acao-icono" type="button" aria-label={`Mais ações para ${cliente.nome}`}><Ellipsis size={18} /></button></td></tr>) : <TabelaVazia colunas={6} />}</tbody></table></div><div className="admin-paginacao"><span>Mostrando <strong>{lista.length}</strong> de <strong>186</strong> clientes</span><div><button type="button" disabled>Anterior</button><button type="button" className="pagina-ativa">1</button><button type="button">2</button><button type="button">Próxima</button></div></div></CartaoPainel></>
}

export function Configuracoes() {
  const [salvo, setSalvo] = useState(false)
  return <><CabecalhoPagina titulo="Configurações" descricao="Mantenha as informações básicas da sua loja atualizadas." /><div className="admin-config-grade"><aside className="admin-config-nav"><a href="#dados-loja" className="selecionado">Dados da loja</a><a href="#contato-loja">Contato</a><a href="#endereco-loja">Endereço</a></aside><form className="admin-config-form" onSubmit={(evento) => { evento.preventDefault(); setSalvo(true) }}><CartaoPainel titulo="Identidade da loja" classe="admin-form-cartao"><div className="admin-logo-config"><span className="admin-logo-amostra">D</span><div><strong>Logo da Diocelia</strong><small>PNG ou JPG, tamanho máximo de 2 MB</small></div><label className="admin-botao contorno admin-upload-botao"><ImagePlus size={16} /> Alterar logo<input type="file" accept="image/*" /></label></div><div className="admin-form-grade duas-colunas" id="dados-loja"><CampoFormulario rotulo="Nome da loja" obrigatorio><input required defaultValue="Diocelia" /></CampoFormulario><CampoFormulario rotulo="E-mail da loja" obrigatorio><input required type="email" defaultValue="contato@diocelia.com.br" /></CampoFormulario></div></CartaoPainel><CartaoPainel titulo="Contato" classe="admin-form-cartao" id="contato-loja"><div className="admin-form-grade duas-colunas"><CampoFormulario rotulo="Telefone"><input type="tel" defaultValue="(11) 3456-7890" /></CampoFormulario><CampoFormulario rotulo="WhatsApp"><input type="tel" defaultValue="(11) 99999-1234" /></CampoFormulario></div></CartaoPainel><CartaoPainel titulo="Endereço" classe="admin-form-cartao" id="endereco-loja"><div className="admin-form-grade"><CampoFormulario rotulo="Endereço"><input defaultValue="Rua das Flores, 125" /></CampoFormulario><CampoFormulario rotulo="Complemento"><input placeholder="Sala, conjunto ou referência" /></CampoFormulario><CampoFormulario rotulo="Cidade"><input defaultValue="São Paulo" /></CampoFormulario><CampoFormulario rotulo="Estado"><select defaultValue="SP"><option value="SP">São Paulo</option><option value="RJ">Rio de Janeiro</option><option value="MG">Minas Gerais</option></select></CampoFormulario><CampoFormulario rotulo="CEP"><input defaultValue="01010-000" /></CampoFormulario></div></CartaoPainel><div className="admin-form-acoes">{salvo && <span className="admin-salvo"><Check size={16} /> Alterações salvas nesta demonstração</span>}<BotaoPrimario tipo="submit" icone={Check}>Salvar alterações</BotaoPrimario></div></form></div></>
}