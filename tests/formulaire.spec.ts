import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import path from 'path';

test('Soumission du formulaire Automation Practice', async ({ page }) => {
  // 1. Aller sur la page
  await page.goto('https://demoqa.com/automation-practice-form');

  // Supprimer pubs si elles gênent (bonus)
  await page.evaluate(() => {
    document.querySelectorAll('#fixedban, .Advertisement').forEach(el => el.remove());
  });

  // 2. Génération de données factices
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email();
  const mobile = faker.string.numeric(10);
  const address = faker.location.streetAddress();

  // 3. Remplir le formulaire
  await page.fill('#firstName', firstName);
  await page.fill('#lastName', lastName);
  await page.fill('#userEmail', email);
  await page.click('label[for="gender-radio-1"]'); // Male
  await page.fill('#userNumber', mobile);

  // Date de naissance
  await page.click('#dateOfBirthInput');
  await page.selectOption('.react-datepicker__month-select', '0'); // Janvier
  await page.selectOption('.react-datepicker__year-select', '1990');
  await page.click('.react-datepicker__day--015'); // 15 janvier

  // Sujet
  await page.fill('#subjectsInput', 'Maths');
  await page.keyboard.press('Enter');

  // Hobby
  await page.click('label[for="hobbies-checkbox-1"]'); // Sports

  // Upload d'image
  const filePath = path.resolve('tests/assets/imagefoot.png');
  await page.setInputFiles('#uploadPicture', filePath);

  // Adresse
  await page.fill('#currentAddress', address);

  // 4. Soumettre
  await page.click('#submit');

  // 5. Validation de la soumission
  await expect(page.locator('#example-modal-sizes-title-lg')).toBeVisible();
  await expect(page.locator('.table-responsive')).toContainText(firstName);
  await expect(page.locator('.table-responsive')).toContainText(lastName);
  await expect(page.locator('.table-responsive')).toContainText(email);

  await page.click('#closeLargeModal');
  await page.waitForSelector('#closeLargeModal', { state: 'detached' });

});
