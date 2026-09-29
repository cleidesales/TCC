# ImobiConect — Front-end

Protótipo funcional do front-end do TCC, feito em HTML, CSS e JavaScript puro.

## Estrutura
- `index.html` — interface principal
- `css/style.css` — estilos e responsividade
- `js/app.js` — dados demonstrativos, filtros, modais e cadastro temporário

## Como executar
1. Extraia a pasta.
2. Abra no VS Code.
3. Você pode abrir `index.html` diretamente no navegador.
4. Para uma experiência mais próxima do desenvolvimento real, use uma extensão/servidor local, como Live Server.

## O que já funciona no front-end
- Listagem de imóveis
- Busca por texto
- Filtro por aluguel/venda
- Filtro por quartos
- Filtro por preço
- Detalhes do imóvel
- Modal de login demonstrativo
- Formulário de anúncio demonstrativo
- Layout responsivo

## Integração futura com Node.js + Express + MySQL
Hoje os imóveis estão no array `properties` dentro de `js/app.js`.
Quando o back-end estiver pronto, substitua os dados locais por chamadas à API, por exemplo:

- `GET /api/imoveis`
- `GET /api/imoveis/:id`
- `POST /api/imoveis`
- `PUT /api/imoveis/:id`
- `DELETE /api/imoveis/:id`
- `POST /api/auth/login`
- `POST /api/auth/cadastro`

O front e o back permanecem separados, como planejado.
