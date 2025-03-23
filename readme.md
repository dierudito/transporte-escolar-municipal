# Sistema de Gestão de Solicitações de Transporte Escolar

## Descrição

Este sistema é uma solução completa para a gestão de solicitações de transporte escolar, desenvolvido para atender às necessidades de Secretarias Municipais de Educação, pais e responsáveis. Ele oferece uma plataforma eficiente para a criação, acompanhamento e gerenciamento de solicitações de transporte, otimizando o processo e facilitando a comunicação entre os envolvidos.

## Tecnologias

*      **Front-end:** React.js
*      **Back-end:** C# .NET 8
*      **Banco de Dados:** PostgreSQL

## Funcionalidades

###   Front-end (React.js)

*      **Página Inicial:**
    *      Informações gerais sobre o sistema.
    *      Botões de login/cadastro.
*      **Área do Usuário (Pais/Responsáveis):**
    *      Dashboard com o status das solicitações de transporte.
    *      Formulário para criação de novas solicitações.
    *      Listagem das solicitações de transporte do usuário.
    *      Detalhes de uma solicitação específica.
    *      Atualização de dados cadastrais do usuário.
*      **Área Administrativa (Secretaria de Educação):**
    *      Dashboard com visão geral das solicitações.
    *      Listagem de todas as solicitações de transporte.
    *      Detalhes de uma solicitação específica.
    *      Filtragem e busca de solicitações.
    *      Atualização do status das solicitações.
    *      Gerenciamento de usuários do sistema.
    *      Geração de relatórios.
*      **Responsividade:**
    *      Interface adaptável a diferentes dispositivos (computadores, tablets e smartphones).

###   Back-end (C# .NET 8)

*      **Gerenciamento de Usuários:**
    *      Cadastro e autenticação de pais/responsáveis.
    *      Cadastro e gerenciamento de usuários administrativos (Secretaria de Educação).
*      **Gerenciamento de Alunos:**
    *      Cadastro de alunos (nome, data de nascimento, escola, endereço, etc.).
*      **Gerenciamento de Solicitações de Transporte:**
    *      Criação de solicitações de transporte (informando aluno, turno, endereço de embarque/desembarque, etc.).
    *      Listagem de solicitações de transporte.
    *      Atualização do status das solicitações (pendente, aprovada, reprovada, em transporte, etc.).
    *      Rastreamento de solicitações.
*      **Relatórios:**
    *      Geração de relatórios sobre as solicitações de transporte (por aluno, por escola, por status, etc.).

##   Configuração do Ambiente

###   Back-end (.NET 8)

1.       Certifique-se de ter o .NET 8 SDK instalado.
2.       Clone o repositório do back-end.
3.       Configure a string de conexão com o banco de dados PostgreSQL no arquivo `appsettings.json`.
4.       **Importante:** As migrations do Entity Framework Core estão configuradas para facilitar a criação do banco de dados e a aplicação das alterações. Utilize os seguintes comandos para criar o banco de dados e aplicar as migrations:

    ```bash
    dotnet ef database update
    ```

5.       Execute a API:

    ```bash
    dotnet run
    ```

###   Front-end (React.js)

1.       Certifique-se de ter o Node.js e o npm (ou yarn) instalados.
2.       Clone o repositório do front-end.
3.       Instale as dependências:

    ```bash
    npm install # ou yarn install
    ```

4.       Configure a URL da API do back-end no arquivo de configuração do projeto (ex: `.env` ou similar).
5.       Execute a aplicação:

    ```bash
    npm start # ou yarn start
    ```

##   Estrutura do Projeto

###   Back-end (.NET 8)

A estrutura do projeto back-end segue os princípios do Clean Architecture:
TransporteEscolar.sln
├── TransporteEscolar.API/       # Projeto da API (ASP.NET Core Web API)
├── TransporteEscolar.Application/ # Projeto com os casos de uso da aplicação
├── TransporteEscolar.Domain/      # Projeto com as entidades e regras de negócio
└── TransporteEscolar.Infrastructure/ # Projeto com as implementações de acesso a dados (Entity Framework Core) e outras dependências

###   Front-end (React.js)

A estrutura do projeto front-end segue as boas práticas de organização de projetos React.

##   Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests para melhorias, correções de bugs e novas funcionalidades.

##   Autor

Diego Ferreira Moreno