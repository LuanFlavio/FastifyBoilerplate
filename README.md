# Fastify Boilerplate

Um boilerplate moderno para APIs REST com Fastify, TypeScript e arquitetura limpa.

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/)
- [Fastify](https://www.fastify.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/) (ORM)
- [Passport.js](http://www.passportjs.org/) (Autenticação)
- [Zod](https://zod.dev/) (Validação)
- [Swagger](https://swagger.io/) (Documentação)

## 📦 Estrutura do Projeto

```
src/
├── application/     # Casos de uso da aplicação
│   ├── user/       # Casos de uso relacionados a usuários
│   └── 2fa/        # Casos de uso de autenticação 2FA
├── domain/         # Entidades e regras de negócio
│   ├── entities/   # Entidades do domínio
│   └── repositories/ # Contratos de repositórios
├── infra/          # Implementações de infraestrutura
│   ├── config/     # Configurações
│   ├── database/   # Configuração do banco de dados
│   └── http/       # Rotas, controllers e middlewares
├── presentation/   # Camada de apresentação
│   └── errors/     # Tratamento de erros
└── shared/         # Código compartilhado
    ├── dtos/       # Data Transfer Objects
    └── schemas/    # Schemas de validação
```

## 🛠️ Instalação

1. Clone o repositório
```bash
git clone https://github.com/LuanFlavio/FastifyBoilerplate.git
cd fastify-boilerplate
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env-example .env
```

4. Configure as variáveis no arquivo `.env`:
```env
PORT=3000
DATABASE_URL=your-database-url
JWT_SECRET=your-jwt-secret
NODE_ENV=development
FASTIFY_SESSION_SECRET=your-fastify-session-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
APP_NAME=fastify-boilerplate
```

5. Execute as migrações do banco de dados
```bash
npx prisma migrate dev
```

6. Inicie o servidor
```bash
npm run dev
```

## 📚 Documentação da API

A documentação da API está disponível em `/docs` quando o servidor estiver rodando.

### Autenticação

O projeto suporta múltiplas estratégias de autenticação:

1. **Local (Email/Senha)**
```bash
POST /auth/login
{
  "email": "user@example.com",
  "password": "password"
}
```

2. **Google OAuth**
```bash
GET /auth/google
```

3. **JWT**
- Todas as rotas protegidas requerem o token JWT no header:
```bash
Authorization: Bearer seu-token-jwt
```

### Autenticação de Dois Fatores (2FA)

O projeto implementa autenticação de dois fatores usando TOTP (Time-based One-Time Password), compatível com aplicativos como Google Authenticator.

#### Configurando 2FA

1. Faça login na sua conta
2. Acesse a rota `POST /auth/2fa/setup` com seu ID de usuário
3. Você receberá um QR Code e uma chave secreta
4. Escaneie o QR Code com o Google Authenticator ou insira a chave manualmente
5. Use o código gerado pelo app para verificar a configuração em `POST /auth/2fa/verify`

#### Usando 2FA

Após configurar o 2FA, você precisará fornecer o código TOTP em todas as requisições autenticadas:

1. Faça login normalmente
2. Se o 2FA estiver habilitado, você receberá um erro 403 com `requires2FA: true`
3. Gere um novo código no Google Authenticator
4. Adicione o código no header `x-2fa-token` da requisição
5. Repita a requisição original

#### Exemplo de Uso

```bash
# Configurar 2FA
curl -X POST http://localhost:3000/auth/2fa/setup \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu-token-jwt" \
  -d '{"userId": "seu-user-id"}'

# Verificar código
curl -X POST http://localhost:3000/auth/2fa/verify \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu-token-jwt" \
  -d '{"userId": "seu-user-id", "token": "123456"}'

# Requisição autenticada com 2FA
curl -X GET http://localhost:3000/auth/protected \
  -H "Authorization: Bearer seu-token-jwt" \
  -H "x-2fa-token: 123456"
```

## 🧪 Testes

```bash
npm test
```

## 📝 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 
