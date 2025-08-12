# Test Technique - QA Engineer - Heal.dev

## Description
Ce projet contient l'automatisation de tests fonctionnels UI et API avec Playwright pour le poste de stagiaire QA test chez Heal.dev.

## Prérequis
- Node.js
- npm

## Installation

1. Installez les dépendances :
```bash
npm install
```

2. Installez les navigateurs Playwright :
```bash
npx playwright install
```

## Structure du projet

```
├── tests/
│   ├── ui/
│   │   └── form-automation.spec.ts    # Tâche 1 : Tests UI du formulaire
│   └── api/
│       └── users-api.spec.ts          # Tâche 2 : Tests API ReqRes
├── playwright.config.ts               # Configuration Playwright
├── package.json
└── README.md
```

## Exécution des tests

### Exécuter tous les tests
```bash
npx playwright test
```

### Exécuter uniquement les tests UI
```bash
npx playwright test tests/ui/
```

### Exécuter uniquement les tests API
```bash
npx playwright test tests/api/
```


## Tests implémentés

### Tâche 1 : Automatisation UI
- **Page testée** : https://demoqa.com/automation-practice-form
- **Fonctionnalités** :
    - Génération de données factices avec @faker-js/faker
    - Remplissage automatique de tous les champs du formulaire
    - Gestion des éléments complexes (sélecteurs de date, dropdowns, upload de fichier)
    - Validation de la soumission via la fenêtre modale

### Tâche 2 : Tests API 
- **API testée** : https://reqres.in/api/users
- **Tests implémentés** :
    - GET `/api/users?page=2` - Récupération de la liste des utilisateurs
    - POST `/api/users` - Création d'un nouvel utilisateur
    - Validation complète des réponses (statuts, structure, données)
    - Utilisation de la clé API Reqres gratuite

## Configuration API
Les tests API utilisent une clé API gratuite Reqres. Aucune configuration supplémentaire n'est nécessaire.

## Rapport de tests
Après l'exécution, Playwright génère automatiquement un rapport HTML :
```bash
npx playwright show-report
```

## Technologies utilisées
- **Playwright** - Framework de test automatisé
- **TypeScript** - Langage de programmation
- **@faker-js/faker** - Générateur de données factices
- **Reqres API** - API de test publique

## Auteur
**ASIGBOLO Alexandre**

---
*Test technique réalisé dans le cadre du processus de recrutement chez Heal.dev*