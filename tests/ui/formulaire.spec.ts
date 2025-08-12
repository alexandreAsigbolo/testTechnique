import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import path from 'path';

test('Soumission du formulaire Automation Practice', async ({ page }) => {
  // Accès à la page du formulaire
  await page.goto('https://demoqa.com/automation-practice-form');

  // Supprimer pubs (bonus)
  await page.evaluate(() => {
    document.querySelectorAll('#fixedban, .Advertisement').forEach(el => el.remove());
  });

  // Génération de fausses données pour remplir le formulaire
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email();
  const mobile = faker.string.numeric(10);
  const address = faker.location.streetAddress();

  // Remplissage des champs principaux du formulaire
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

  // Ajout d'une matière dans le champ "Subjects"
  await page.fill('#subjectsInput', 'Maths');
  await page.keyboard.press('Enter');

  // Hobby
  await page.click('label[for="hobbies-checkbox-1"]'); // Sports

  // Import d'une image
  const filePath = path.resolve('tests/assets/imagefoot.png');
  await page.setInputFiles('#uploadPicture', filePath);

  // Adresse
  await page.fill('#currentAddress', address);

  // Soumission du formulaire
  await page.click('#submit');

  // Vérification que la modale de confirmation s'affiche et contient les bonnes infos
  await expect(page.locator('#example-modal-sizes-title-lg')).toBeVisible();
  await expect(page.locator('.table-responsive')).toContainText(firstName);
  await expect(page.locator('.table-responsive')).toContainText(lastName);
  await expect(page.locator('.table-responsive')).toContainText(email);
  await expect(page.locator('.table-responsive')).toContainText(mobile);
  await expect(page.locator('.table-responsive')).toContainText('Male');
  await expect(page.locator('.table-responsive')).toContainText('15 January,1990');
  await expect(page.locator('.table-responsive')).toContainText('Maths');
  await expect(page.locator('.table-responsive')).toContainText('Sports');
  await expect(page.locator('.table-responsive')).toContainText('imagefoot.png');
  await expect(page.locator('.table-responsive')).toContainText(address);
});
