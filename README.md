# Upload.AI - Back-end

O Upload.AI é uma plataforma que criei para facilitar a transcrição de vídeos. Com esta ferramenta, você pode realizar a transcrição de vídeos de forma simples, seja fazendo o upload do arquivo de vídeo diretamente ou fornecendo um link do YouTube. Além disso, oferece várias opções de processamento de transcrição para atender às suas necessidades.

Este projeto foi desenvolvido durante o evento NLW (Next Level Week) da Rocketseat, e eu gostaria de expressar minha gratidão à Rocketseat por fornecer a base para esta incrível plataforma.

Veja o projeto em produção, [clicando aqui](https://upload-ai.ivanfuhr.com/)

![Upload.AI NLW](https://upload-ai.ivanfuhr.com/wallpaper.png)

## Funcionalidades Principais

- Transcrição de vídeos por upload de arquivo ou link do YouTube.
- Prompts prontos
- Prompts personalizados
- Seleção de temperatura

## Como usar?

Siga estas etapas para começar a usar o Upload.AI:

1. Clone este repositório em sua máquina local:

   ```bash
   git clone https://github.com/ivanfuhr/upload-ai-api.git
   ```

2. Vá até a pasta em que você clonou o repositório e instale os pacotes com:

   ```bash
   npm install
   ```

3. Você irá precisar de um banco de dados postgres, você pode iniciar rápidamente usando docker, executando comando:

   ```bash      
   docker run --name postgres -e POSTGRES_PASSWORD=<SUA_SENHA> -e POSTGRES_DB=<SEU_BANCO_DE_DADOS> -d -p 5432:5432 postgres
   ```

4. Configure as variaveis de ambiente que estão no arquivo `.env-example` copiando para um novo arquivo chamado `.env`

5. Agora que você já configurou o banco de dados e as variaveis de ambiente, você precisa  gerar os arquivos do prisma e as migrations, para isso execute os comandos:

   ```bash
   npx prisma generate
   ```

   ```bash
   npx prisma migrate dev
   ```

6. Agora basta iniciar sua aplicação usando o comando:

   ```bash
   npm run dev
   ```

7. O frotend da aplicação está disponivel em outro repositório, você pod acessalo [clicando aqui](https://github.com/ivanfuhr/upload-ai-web)

## Contato
Para qualquer dúvida ou sugestão, sinta-se à vontade para entrar em contato:
Ivan Führ - [LinkedIn](https://linkedin.com/in/ivan-fuhr)

- - -

Agradeço à [Rocketseat](https://www.rocketseat.com.br/) pelo evento NLW, que serviu de inspiração e base para este projeto. 🚀
