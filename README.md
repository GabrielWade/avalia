<h1 align="center" style="font-weight: bold;">Avalia 💻</h1>

<div align="center">
  <img src="https://img.shields.io/badge/docker%20compose-2496ED.svg?style=for-the-badge&logo=docker&logoColor=white" alt="docker compose" />
  <img src="https://img.shields.io/badge/DJANGO-%23FF9900.svg?style=for-the-badge&logo=Django&logoColor=white" alt="django" />
  <img src="https://img.shields.io/badge/REDIS-%D4FAFF.svg?style=for-the-badge&logo=REDIS&logoColor=redis" alt="redis" />
  <img src="https://img.shields.io/badge/celery-37814A.svg?style=for-the-badge&logo=celery&logoColor=white" alt="celery" />
  <img src="https://img.shields.io/badge/postgre-0078D7.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="postgre" />
  <img src="https://img.shields.io/badge/react-0078D7.svg?style=for-the-badge&logo=react&logoColor=0078D7&labelColor=FFFFFF" alt="react" />
  <img src="https://img.shields.io/badge/bootstrap-7952B3.svg?style=for-the-badge&logo=bootstrap&logoColor=white" alt="bootstrap" />
</div>

<p align="center">
  <b>O Avalia é uma plataforma desenvolvida para facilitar o agendamento de provas para os alunos do Centro Universitário de Valença. Além disso, oferece aos colaboradores da instituição a capacidade de gerenciar os polos, incluindo suas disponibilidades e capacidades, garantindo uma administração mais eficiente e organizada.</b>
</p>

<h2 id="started">🚀 Getting started</h2>

<h3>Pré-Requisito</h3>

- [Docker](https://docker.com/)
- [Git](https://github.com)
- [Python](https://python.com)
- [Node](https://node.com)

<h3>Colonar Projeto</h3>

Como clonar o projeto

```bash
git clone https://github.com/GabrielWade/avalia
```

<h3> Variaveis de ambiente </h2>

Use `.env-exemplo` como referência para criar seu arquivo de configuração `.env` com as credencias do banco de dados e do email que enviará as notificações

```yaml
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432

EMAIL_HOST_USER=exemplo@gmail.com
EMAIL_HOST_PASSWORD=chyg tvvk htqo jteo
DEFAULT_FROM_EMAIL=exemplo@gmail.com
```

<h3>Iniciando</h3>

Como iniciar ser projeto
```bash
# Clone o repositório
git clone https://github.com/GabrielWade/avalia.git .

# Criar ambiente virtual
python3 -m venv venv

# Ativar o ambiente virtual
source venv/bin/activate

# Instalar as dependências do Python
pip install -r requirements.txt

# Atualizar as dependências (caso instale novas)
pip freeze > requirements.txt

# Rodar as migrations
python manage.py migrate

# Criar um superusuário para o sistema
python manage.py createsuperuser

# Instalar as dependências do React
npm install

# Construir as imagens Docker
docker compose build

# Subir os containers do projeto
docker compose up

# Entrar no bash do container do backend
docker exec -it <CONTAINER_ID> /bin/sh

# Iniciar o worker do Celery
celery -A backend worker --loglevel=info

# Iniciar o agendador de tarefas do Celery
celery -A backend beat --loglevel=info

# Acesse a aplicação
http://localhost:3000/

``````
