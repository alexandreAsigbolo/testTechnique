import { test, expect, request } from '@playwright/test';

const baseURL = 'https://reqres.in'; // URL l'API Reqres
const API_KEY = 'reqres-free-v1'; // clé API gratuite

test('GET /api/users?page=2', async ({ request }) => {
  const response = await request.get(`${baseURL}/api/users?page=2`, {
    headers: {
      'x-api-key': API_KEY
    }
  });

  // Vérifie que le statut de la réponse est bien 200 (OK)
  expect(response.status()).toBe(200);

  const body = await response.json();

  // Vérifie que la propriété "data" est bien un tableau
  expect(Array.isArray(body.data)).toBeTruthy();

  console.log(`Nombre d'utilisateurs : ${body.data.length}`);
  console.log(`Email du premier utilisateur : ${body.data[0].email}`);
});

test('POST /api/users', async ({ request }) => {
  const payload = {
    name: 'John Doe',
    job: 'Engineer'
  };

  // Envoi de la requête POST avec les en-têtes et le payload
  const response = await request.post(`${baseURL}/api/users`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    },
    data: payload
  });

  console.log('Status reçu :', response.status());
  console.log('Body reçu :', await response.text());

  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body).toHaveProperty('id');
  expect(body).toHaveProperty('createdAt');
  expect(body.name).toBe(payload.name);
  expect(body.job).toBe(payload.job);
});