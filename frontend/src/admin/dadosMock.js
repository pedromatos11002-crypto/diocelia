export const produtos = [
  {
    id: 'P-1048',
    nome: 'Vestido midi Aurora',
    categoria: 'Vestidos',
    preco: 289.9,
    estoque: 3,
    minimo: 5,
    status: 'Estoque baixo',
    imagem:
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=160&q=80',
  },
  {
    id: 'P-1047',
    nome: 'Blusa canelada Serena',
    categoria: 'Blusas',
    preco: 159.9,
    estoque: 18,
    minimo: 6,
    status: 'Disponível',
    imagem:
      'https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=160&q=80',
  },
  {
    id: 'P-1046',
    nome: 'Calça pantalona Lume',
    categoria: 'Calças',
    preco: 249.9,
    estoque: 2,
    minimo: 4,
    status: 'Estoque baixo',
    imagem:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=160&q=80',
  },
  {
    id: 'P-1045',
    nome: 'Saia envelope Flora',
    categoria: 'Saias',
    preco: 199.9,
    estoque: 12,
    minimo: 5,
    status: 'Disponível',
    imagem:
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=160&q=80',
  },
  {
    id: 'P-1044',
    nome: 'Cardigan tricot Amora',
    categoria: 'Casacos',
    preco: 319.9,
    estoque: 0,
    minimo: 3,
    status: 'Sem estoque',
    imagem:
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=160&q=80',
  },
]

export const pedidos = [
  { numero: '#DC-2481', cliente: 'Mariana Costa', data: '05 out, 14:32', produtos: '2 itens', status: 'Pendente', total: 449.8 },
  { numero: '#DC-2480', cliente: 'Camila Oliveira', data: '05 out, 13:18', produtos: '1 item', status: 'Preparando', total: 289.9 },
  { numero: '#DC-2479', cliente: 'Julia Martins', data: '05 out, 11:46', produtos: '3 itens', status: 'Enviado', total: 609.7 },
  { numero: '#DC-2478', cliente: 'Fernanda Lima', data: '04 out, 17:05', produtos: '1 item', status: 'Entregue', total: 159.9 },
  { numero: '#DC-2477', cliente: 'Beatriz Souza', data: '04 out, 15:21', produtos: '2 itens', status: 'Cancelado', total: 479.8 },
]

export const clientes = [
  { nome: 'Mariana Costa', telefone: '(11) 99842-1031', email: 'mariana.costa@email.com', compras: 12, ultimaCompra: '05 out, 14:32' },
  { nome: 'Camila Oliveira', telefone: '(21) 99176-2240', email: 'camila.oliveira@email.com', compras: 8, ultimaCompra: '05 out, 13:18' },
  { nome: 'Julia Martins', telefone: '(31) 98754-0902', email: 'julia.martins@email.com', compras: 6, ultimaCompra: '05 out, 11:46' },
  { nome: 'Fernanda Lima', telefone: '(41) 99902-6155', email: 'fernanda.lima@email.com', compras: 4, ultimaCompra: '04 out, 17:05' },
  { nome: 'Beatriz Souza', telefone: '(51) 99143-7721', email: 'beatriz.souza@email.com', compras: 3, ultimaCompra: '04 out, 15:21' },
]

export const categoriasIniciais = [
  { id: 1, nome: 'Vestidos', descricao: 'Peças para todas as ocasiões', produtos: 18 },
  { id: 2, nome: 'Blusas', descricao: 'Blusas, camisas e tops', produtos: 24 },
  { id: 3, nome: 'Calças', descricao: 'Modelagens para o dia a dia', produtos: 12 },
  { id: 4, nome: 'Saias', descricao: 'Saias curtas, midi e longas', produtos: 9 },
  { id: 5, nome: 'Casacos', descricao: 'Terceiras peças e sobreposições', produtos: 7 },
]

export const historicoEstoqueInicial = [
  { data: '05 out, 14:20', produto: 'Blusa canelada Serena', tipo: 'Entrada', quantidade: '+12 un.', responsavel: 'Diocelia' },
  { data: '05 out, 10:08', produto: 'Vestido midi Aurora', tipo: 'Saída', quantidade: '-2 un.', responsavel: 'Diocelia' },
  { data: '04 out, 16:45', produto: 'Saia envelope Flora', tipo: 'Ajuste', quantidade: '+1 un.', responsavel: 'Diocelia' },
  { data: '04 out, 11:32', produto: 'Calça pantalona Lume', tipo: 'Saída', quantidade: '-1 un.', responsavel: 'Diocelia' },
]

export const vendasSemana = [
  { dia: 'Seg', valor: 1840 },
  { dia: 'Ter', valor: 2360 },
  { dia: 'Qua', valor: 1720 },
  { dia: 'Qui', valor: 3180 },
  { dia: 'Sex', valor: 2640 },
  { dia: 'Sáb', valor: 3920 },
  { dia: 'Dom', valor: 2480 },
]