Aplicações em Angular
=====================

Este repositório contém todos os projetos (**aplicações, bibliotecas, recursos, etc**) que foram escritos para o Angular, alguns estão segmentados como SubTree, possuindo assim seus próprios repositórios.

A estrutura de pasta é simples:

- `./js` - Scripts úteis a todos os projetos
- `./sass` - Arquivos SASS, SCSS e CSS para reutilização nos projetos
- `./projetos` - Pasta onde estão as Libraries, Módulos e Aplicações
- `./images` - Imagens para uso geral em todos os projetos Angular, veja detalhes abaixo.
- `./environments` - Configurações e dados sensíveis do ambiente, normalmente não é depositádo no repositório e é importado pels módulos, biblitoecas, e app/projetos

A pasta `dist` não deve em hipotese alguma ser enviada ao repositório, como também a pasta `node_modules` deve ser ignorada.

A pasta `dist` em nosso projeto é exclusivamente para testes, os resultados finais de produção são enviados para outras pastas como por exemplo `../jekyll/jekyll-themplate*/app/<nome-projeto>` onde fica o resultado final que será processado para unir ao site estático do Jekyll.

A pasta `images` será um subtree com base no repositório `BaseImages` que terá um branch para cada projeto, permitindo que as imagens sejam reaproveitadas entre repositórios em especial para WEB, evitando redundância de aquivos e facilitando a atualização de todas de uma vez só. Portanto esta pasta é um subtree e tem o conteúdo gerido pelo Repositório de nome [https://github.com/StreetPet/BaseImages] no branch **Angular**. veja detalhes no próprio Repositório.

A pasta `projects` terá diversos projectos de apoio ao nosso sistema e será também serão subtree do git para que cada um possa ter seu próprio repositório facilitando principalmente o reaproveitamente de código e o desenvolvimento focado, portanto elas deverão ser o mais independentes de todas.

O Projeto `auth` é o mais sensível de todos, já que este possui referencias cruzadas com outros projetos como por exemplo `entities`, os serviços definidos em `entities` irão precisar consular `auth.service` para autorizar ações sobre entidades, e as entidades precisam ser referenciadas por `auth`, talvez no futuro desmembrar serviços de `entities` para um projeto especifico, tipo `entities_services`, seria o formato ideal.
