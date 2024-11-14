

Sistema de comércio eletrônico que está sendo desenvolvida na diciplina de Programação Web 2024-2.

## Instalação do Desenvolvimento

1 - Para executar verifique a versão do node, adonisjs precisa Node.js >= 20.6 :

```
node -v
```

 2 - Após entre na pasta ecommerce:

 ``` 
 cd ecommerce
  ```

3 - Em seguida use NPM para instalar as dependência

 ``` 
 npm install
  ```


4 - É necessário criar arquivo .env no seu ambiente: 

 ``` 
cp .env.example .env
  ```

5 - Gerar a APP_KEY

 ``` 
node ace generate:key
```

6 - Criar a pasta temporária para o banco SQLite

```console
mkdir tmp
```

7 - Rodar as migration
```console
node ace migration:run
```

8 - Para executar o projeto execute :
 
 
 ``` 
 npm run dev
  ```

## Execução

```console
npm run dev
```

Tarefas:

Entrega Parcial - Gabriel
Criar uma conta [OK]
Login [OK]
Editar Profile [Ok]
Criar Produto [Ok] 
Listar Produtos [Ok]
Detalhar Produto [Precisa ser feito] [Victor]


Entrega Final - Victor
Meu Carrinho
Adicionar/Remover Produto do Carrinho
Adicionar Produto no Estoque
Remove Produto no Estoque

Extra 1 [Em andamento][Extra escolhido Paginação] - Gabriel
Extra 2


Obrigatórios:
Estilização
Javascript no cliente
Componentização e organização de layout
Autenticação e autorização
Validação dos dados
ORM
Extras:
I18NT
Teste
Factorys e Seeds
Paginação
Nova Tela/Caso de Uso
Middleware
Mobile
Mailer
