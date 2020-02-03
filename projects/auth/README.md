Auth
====

Biblioteca Geral para Autenticação dos usuários do Sistema StreetPet.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.14.

Esta biblioteca terá todos componentes e serviços necessários para autenticação dos usuários, ela não irá distinguir qual sistema está sendo usado, sua função é abstrarir ao máximo o processo de Autenteticação e Autorização.

O Repositório AngularEntities está diretamente ligado a ela para fornecer as entidades Visitante e Avatar. Veja que neste nível a Entidade Voluntário é apenas Visitante, sendo sendo usado nela.

Os Serviços definidos no Repositório AngularEntities usará esta biblitoeca para autenticar e autorizar ações sobre as entidades. Esta referência cruzada me preocupa, sugestões são bem vindas

