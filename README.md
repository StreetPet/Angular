Aplicações em Angular
=====================

Este repositório contém todos os projetos (**aplicações, bibliotecas, recursos, etc**) que foram escritos para o Angular, alguns estão segmentados como SubTree, possuindo assim seus próprios repositórios.

A estrutura de pasta é simples:

- `./js` - Scripts úteis a todos os projetos
- `./sass` - Arquivos SASS, SCSS e CSS para reutilização nos projetos
- `./projetos` - Pasta onde estão as Libraries, Módulos e Aplicações
- `./images` - Imagens para uso geral em todos os projetos Angular, veja detalhes abaixo.

A pasta `dist` não deve em hipotese alguma ser enviada ao repositório, como também a pasta `node_modules` deve ser ignorada.

A pasta `images` será um subtree com base no repositório `BaseImages` que terá um branch para cada projeto, permitindo que as imagens sejam reaproveitadas entre repositórios em especial para WEB, evitando redundância de aquivos e facilitando a atualização de todas de uma vez só. Portanto esta pasta é um subtree e tem o conteúdo gerido pelo Repositório de nome [https://github.com/StreetPet/BaseImages] no branch **Angular**. veja detalhes no próprio Repositório.