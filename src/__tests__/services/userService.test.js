const request = require('supertest');
const app = require('../../../app');
const { v4: uuidv4 } = require('uuid');

describe('Test the root path', () => {
  test('It should response the GET method', done => {
    request(app)
      .get('/welcome')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe('POST /register', () => {
  test('should register a new user', async () => {
    const newUser = {
      nome: 'John Doe',
      email: 'john@example.com',
      senha: 'password',
      telefones: [{ ddd: 61, numero: 123456789 }],
    };

    const response = await request(app)
      .post('/register')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('mensagem', 'Usuário criado com sucesso!');
    expect(response.body).toHaveProperty('resultado');
    expect(response.body.resultado).toHaveProperty('id');
    expect(response.body.resultado).toHaveProperty('email', 'john@example.com');
    expect(response.body.resultado).toHaveProperty('nome', 'John Doe');
    expect(response.body.resultado).toHaveProperty('telefones');
    expect(response.body.resultado).toHaveProperty('data_criacao');
    expect(response.body.resultado).toHaveProperty('data_atualizacao');
    expect(response.body.resultado).toHaveProperty('ultimo_login');
    expect(response.body.resultado).toHaveProperty('token');
  });

  test('should fail to register user with existing email', async () => {
    const newUserWithExistingEmail = {
      nome: 'John Doe',
      email: 'john@example.com',
      senha: 'password',
      telefones: [{ ddd: 61, numero: 123456789 }],
    };

    const response = await request(app)
      .post('/register')
      .send(newUserWithExistingEmail);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'E-mail já existente');
  });
});

describe('POST /login', () => {
  test('should authenticate a user and return a JWT token', async () => {

    const userToAuthenticate = {
      nome: 'John Doe',
      email: 'john_test@example.com',
      senha: 'password',
      telefones: [{ ddd: 61, numero: 123456789 }],
    };

    await request(app)
      .post('/register')
      .send(userToAuthenticate);


    const credentials = {
      email: 'john_test@example.com',
      senha: 'password',
    };

    const response = await request(app)
      .post('/login')
      .send(credentials);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('data_criacao');
    expect(response.body).toHaveProperty('data_atualizacao');
    expect(response.body).toHaveProperty('ultimo_login');
    expect(response.body).toHaveProperty('token');
  });

  test('should fail to authenticate with invalid credentials', async () => {
    const invalidCredentials = {
      email: 'john_test@example.com',
      senha: 'invalidpassword',
    };

    const response = await request(app)
      .post('/login')
      .send(invalidCredentials);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('mensagem', 'Usuário e/ou senha inválidos');
  });
});

describe('GET /user/:id', () => {
  let userId;
  let userTokenJWT;

  test('should retrieve user information by ID', async () => {
    const newUser = {
      nome: 'John Doe',
      email: 'john2@example.com',
      senha: 'password',
      telefones: [{ ddd: 61, numero: 123456789 }],
    };

    const res = await request(app)
      .post('/register')
      .send(newUser);

    userId = res.body.resultado.id;
    userTokenJWT = res.body.resultado.token;

    const response = await request(app)
      .get(`/user/${userId}`)
      .set('Authorization', `Bearer ${userTokenJWT}`);

    expect(response.body).toHaveProperty('id', userId);
    expect(response.body).toHaveProperty('nome', 'John Doe');
    expect(response.body).toHaveProperty('email', 'john2@example.com');
  });

  test('should fail to retrieve user information with invalid ID', async () => {
    const invalidUserId = uuidv4();

    const response = await request(app)
      .get(`/user/${invalidUserId}`)
      .set('Authorization', `Bearer ${userTokenJWT}`);

    expect(response.body).toHaveProperty('mensagem', 'Usuário não encontrado');
  });
});
