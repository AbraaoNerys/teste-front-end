# Econverse – Vitrine de produtos (Teste Front-end)

Página **Home** da Econverse construída em **React + TypeScript** a partir do layout do Figma, com **Sass**, consumindo o JSON de produtos disponibilizado no desafio. Ao clicar em um produto, abre um **modal** com as informações dele.

O layout de referência é o **desktop de 1440px** (única versão existente no Figma).

## O que foi implementado

- **Header:** barra de benefícios, logo, busca, ícones de ação e menu de navegação.
- **Hero:** banner principal com chamada e botão.
- **Categorias:** 7 categorias selecionáveis. "Tecnologia" é a categoria que tem produtos; nas demais aparece o aviso de que ainda não há produtos cadastrados.
- **Vitrines de produtos (3):** cards, título, carrossel com setas e, na primeira, abas com filtro por categoria.
- **Modal do produto:** foto, nome, preço, descrição e seletor de quantidade.
- **Banners de parceiros (4), marcas, newsletter e rodapé.**
- Estados de **carregamento**, **erro** e **lista vazia**.

**Não foi implementado:** layout para mobile/tablet, carrinho (os botões "Comprar" não têm ação), busca real, destino dos links e envio real da newsletter. Esses elementos existem no layout apenas como visual.

## Tecnologias

React 19, TypeScript, Vite, Sass (SCSS Modules) e oxlint. Fontes do Google Fonts: Poppins, Work Sans e Outfit. **Nenhuma biblioteca de UI** foi utilizada.

## Pré-requisitos e instalação

- **Node.js** `^20.19.0` ou `>=22.12.0` (exigência do Vite instalado) e npm.

```bash
git clone https://github.com/AbraaoNerys/teste-front-end.git
cd teste-front-end
npm install
```

## Como rodar, compilar e testar

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento em `http://localhost:5173` (**recomendado para avaliar**) |
| `npm run build` | Verifica os tipos (`tsc -b`) e gera o build em `dist/` |
| `npm run preview` | Serve o build em `http://localhost:4173` |
| `npm run lint` | Executa o oxlint |

### Como testar

Não há suíte de testes automatizados. A verificação é feita com `npm run lint`, `npm run build` (que também checa os tipos) e a checklist manual abaixo (rode `npm run dev` e abra a página em uma janela com **1440px ou mais** de largura):

- [ ] A primeira vitrine carrega 10 produtos, com foto, nome, preço e parcelamento.
- [ ] Abas: "Celular" e "Ver todos" mostram os produtos; "Acessórios", "Tablets", "Notebooks" e "TVs" mostram "Ainda não há produtos cadastrados em …".
- [ ] Setas do carrossel: avançam um card por clique; a da esquerda começa desabilitada e a da direita desabilita no fim.
- [ ] Clicar na imagem ou no nome de um produto abre o modal com os dados daquele produto.
- [ ] O modal fecha pelo X, pela tecla ESC e clicando fora; o foco volta ao card.
- [ ] A quantidade do modal vai de 1 a 99 e reinicia em 1 a cada abertura.
- [ ] "Comprar" e "Veja mais detalhes do produto" não fazem nada.
- [ ] Categorias: clicar em "Moda" (ou outra diferente de Tecnologia) destaca o tile e mostra o aviso no lugar das vitrines; clicar em "Tecnologia" restaura a página.
- [ ] Newsletter: campos vazios, e-mail inválido e termos não marcados mostram erro; com tudo válido aparece a mensagem de sucesso e os campos são limpos.
- [ ] Teclado: com Tab, todos os controles recebem foco visível.

## Como os dados chegam

O **JSON oficial** é a fonte dos produtos. O servidor da Econverse não libera CORS para o navegador, então a chamada direta é bloqueada. Por isso o `npm run dev` e o `npm run preview` usam um **proxy do Vite** (configurado em `vite.config.ts`) no caminho `/api-produtos`, que consulta a URL oficial pelo servidor.

A variável de ambiente `VITE_PRODUCTS_URL` (veja `.env.example`) permite apontar para outro endpoint.

> **Limitação:** em uma hospedagem estática **sem proxy**, o build não consegue carregar o JSON oficial por causa do CORS. Nesse caso é preciso configurar um proxy/rewrite no servidor ou definir `VITE_PRODUCTS_URL` com um endpoint que libere CORS. Esse cenário **não foi testado**.

Fluxo:

```text
JSON oficial → proxy do Vite → productService (valida e converte)
  → useProducts (loading, erro, produtos) → App
  → ProductShowcase (filtro por aba) → ProductCarousel → ProductCard
  → clique → ProductModal
```

## Estrutura do projeto

```text
src/
├── assets/        imagens, ícones, categorias e logo exportados do Figma
├── components/    um componente por pasta (.tsx + .module.scss)
│                  Header, Hero, CategoryList, ProductShowcase, SectionTitle,
│                  CategoryTabs, ProductCarousel, ProductCard, ProductModal,
│                  PromoBanners, BrandList, Newsletter, Footer
├── data/          categorias dos produtos, abas da vitrine e categorias da home
├── hooks/         useProducts (estado de carregamento, erro e dados)
├── services/      productService (busca, validação e conversão do JSON)
├── styles/        _variables.scss (cores e fontes do Figma) e global.scss
├── types/         tipos dos dados (ApiProduct e Product)
├── utils/         formatação de preço e parcelamento
├── App.tsx        composição da página e estado do produto e da categoria selecionados
└── main.tsx       ponto de entrada
```

## Decisões técnicas

- **Dois tipos de produto:** `ApiProduct` (o que a API devolve) e `Product` (o que o app usa). A conversão acontece em um só lugar, no serviço.
- **Validação em tempo de execução:** cada produto recebido é validado; itens inválidos (preço não numérico ou negativo, nome vazio etc.) são descartados antes de aparecer na tela.
- **Modal com `<dialog>` nativo:** o navegador cuida do foco preso, do ESC e do retorno de foco. Todos os modos de fechar passam por `dialog.close()`.
- **Carrossel sem biblioteca:** uma janela com `overflow: hidden` e uma faixa que se desloca com `translateX`, controlada por variáveis CSS; cards fora da janela recebem `inert`. Respeita `prefers-reduced-motion`.
- **Estado derivado:** a lista filtrada pela aba é calculada, não armazenada.
- **SCSS Modules** por componente e tokens de cor e fonte em `_variables.scss`.
- **HTML semântico:** `header`, `nav`, `main`, `section`, `article`, `footer`, um único `h1`, `alt` nas imagens e foco visível.

## Dados que o JSON não fornece

O JSON oficial traz apenas nome, descrição curta, foto e preço (em centavos). Por isso:

- O **preço antigo riscado** que aparece no layout foi **removido**.
- O texto **"ou 2x de R$ …"** é **calculado** (preço dividido por 2); não é dado da API.
- **"Frete grátis"** é um texto fixo do layout.
- O **`id`** é gerado a partir do nome do produto.
- A **categoria** vem de uma tabela local (`src/data/productCategories.ts`); todos os 10 produtos (iPhones) são "Celular".
- A **descrição** do JSON é igual ao nome, então o modal mostra o mesmo texto duas vezes.
- Como o JSON é do endereço `…/tecnologia/…`, só a categoria **Tecnologia** tem produtos.

## Fidelidade ao Figma e aproximações

O resultado foi comparado numericamente com a exportação da Home do Figma (1440px), região por região, com deslocamentos de até 2px. Pontos em que o Figma não define o comportamento ou onde houve aproximação:

- **Hover e foco:** o Figma não traz esses estados; foram definidos por padrão (escurecimento dos botões e contorno de foco).
- **Estados criados por nós:** categoria selecionada diferente de Tecnologia, aviso de categoria sem produtos e estado desabilitado das setas do carrossel.
- **X de fechar e ícones "−" e "+" do modal:** desenhados em SVG por aproximação.
- **Rótulo "Pedidos"** do primeiro ícone do header: inferência (o Figma não define o texto).
- A **foto do produto** usa `object-fit: contain` (o Figma usa `cover`) para não cortar imagens de outras proporções.
- **Newsletter:** a validação é local e nada é enviado.

## Limitações conhecidas

- **Só desktop.** Não há layout para mobile ou tablet. Não há rolagem horizontal a partir de cerca de 1311px de largura útil; a 1280px sobram aproximadamente 22px.
- **Sem testes automatizados** (apenas lint, checagem de tipos no build e a checklist manual).
- **Contraste:** o cinza `#9F9F9F` do Figma sobre fundo branco tem contraste abaixo de 4,5:1 (na última auditoria automática com axe-core, foi a única violação encontrada). Foi mantido por fidelidade ao layout.
- **Dependências externas:** Google Fonts e o endpoint do JSON.
- Durante o carregamento, apenas a primeira área de produtos aparece; as vitrines 2 e 3 surgem depois da resposta, o que muda a altura da página.
- Abas e categorias diferentes de "Celular"/"Tecnologia" ficam sem produtos porque o JSON só contém celulares.
- Banners e textos do rodapé usam conteúdo de exemplo do layout.
- Hospedagem estática sem proxy não foi testada.

## Possíveis melhorias

Layout responsivo, testes automatizados (Vitest e Testing Library), esqueleto de carregamento com a altura final, carrinho e busca reais.