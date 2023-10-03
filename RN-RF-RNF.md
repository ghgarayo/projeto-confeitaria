## Requisitos Funcionais

### Clientes

- [ x ] Deve ser possível efetuar o cadastro de clientes
- [ ] Deve ser possivel o cliente se autenticar
- [ ] Deve ser posssivel obter o perfil do usuário autenticado
- [ ] Deve ser possível obter o histório de pedidos de um cliente
- [ ] Deve ser possivel o usuário pesquisar por produtos
- [ ] Deve ser possível inativar um usuário e/ou cliente


### Funcionários

// TODO

### Fornecedores

// TODO

### Produtos

// TODO

### Pedidos

// TODO

### Formas de Pagamento

// TODO

### Permissões

// TODO

### Relatórios	

// TODO

## Regras de Negócio

- [ x ] O usuário não pode se cadastrar com um e-mail e CPF já existente
- [ ] O usuário poderá cadastrar mais de um endereço para entrega
- [ ] O usuário não poderá efetuar um pedido para entrega em um endereço fora de Curitiba e Região Metropolitana
- [ ] Funcionários só poderão ser cadastrados por usuários com permissão de administrador
- [ ] Produtos só poderão ser cadastrados por usuários com permissão de administrador
- [ ] Fornecedores só poderão ser cadastrados por usuários com permissão de administrador
- [ ] Pedidos só poderão ser cadastrados por usuários com permissão de administrador e atendente
- [ ] Pedidos só poderão ser cancelados por usuários com permissão de administrador e atendente
- [ ] Pedidos só poderão ser finalizados por usuários com permissão de administrador e atendente

## Requisitos Não Funcionais

- [ x ] A senha do usuário precisa estar criptografada
- [ ] O usuário precisa estar autenticado para acessar as funcionalidades do sistema
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token)