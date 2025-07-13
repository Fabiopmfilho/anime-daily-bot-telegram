# 🤖 Anime Notifier Bot – Documentação

Um bot do Telegram que envia notificações diárias com os animes lançados, usando a API da Jikan (MyAnimeList).

## 📦 Tecnologias

- Telegraf.js – Framework para bots do Telegram
- Axios – Requisições HTTP
- Node-cron – Agendamento de tarefas
- Jikan API – API pública não oficial da MyAnimeList

## 🚀 Instalação

```bash
git clone https://github.com/seu-usuario/anime-bot.git
cd anime-bot
npm install
```

Crie um arquivo .env com:

```env
BOT_TOKEN=seu_token_aqui
```

Inicie o bot:

```bash
npm run dev
```

### 🧠 Comandos disponíveis

| Comando  | Descrição                                     |
| -------- | --------------------------------------------- |
| /start   | Inicia o bot e salva o chat para envio diário |
| /hoje    | Mostra os animes lançados no dia atual        |
| /ajuda   | Exibe todos os comandos disponíveis           |
| /domingo | Animes lançados no domingo                    |
| /segunda | Animes lançados na segunda-feira              |
| /terca   | Animes lançados na terça-feira                |
| /quarta  | Animes lançados na quarta-feira               |
| /quinta  | Animes lançados na quinta-feira               |
| /sexta   | Animes lançados na sexta-feira                |
| /sabado  | Animes lançados no sábado                     |

## 📅 Notificações Automáticas

- Envio automático diário às 10h com os animes do dia (usando node-cron)
- Apenas para o último usuário que usou o comando /start (em breve: multi-usuários)

## 📌 Exemplo de retorno

```typescript
🎉 Animes lançados hoje:

• One Piece - https://myanimelist.net/anime/21/One_Piece
• Jujutsu Kaisen 2nd Season - https://myanimelist.net/anime/51009/
• Frieren - https://myanimelist.net/anime/52991/
...
```

## 📚 API usada

Jikan API:

- Endpoint: https://api.jikan.moe/v4/schedules
- Filtros:
  - filter=monday|tuesday|...
  - kids=false
  - sfw=false

## 📄 Licença

Este projeto é de uso pessoal e educativo. Sinta-se livre para adaptar e compartilhar com os devidos créditos.
