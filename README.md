# Expense Tracker (NET)

Expense Tracker (NET) is a responsive web application for tracking, sorting, and managing your personal expenses. Built with React and Vite, it uses Firebase Firestore for persistent data storage and features a modern, user-friendly interface.

## Live Demo

-   [![Netlify Deployment](https://img.shields.io/badge/Deploy-on%20Netlify-brightgreen)](https://nomech-expenses.netlify.app/)
-   https://nomech-expenses.netlify.app/

## GitHub Repository

-   [![GitHub Repository](https://img.shields.io/badge/GitHub-Repo-blue)](https://github.com/nomech/S2_NET_Expense_tracker)
-   https://github.com/nomech/S2_NET_Expense_tracker

## Description

Expense Tracker (NET) allows users to:

-   Add, edit, and delete expenses
-   Sort and filter expenses by amount, date, and category
-   View statistics for total and largest expenses
-   Store data securely in Firebase Firestore (persists on refresh)

## Technologies

-   **React** Assignment requirement
-   **Vite** Chosen as the build tool and development server for its fast hot module replacement and minimal configuration.
-   **Netlify** Due to its simple integration with static sites, continuous deployment from GitHub, and free hosting tier.
-   **Firebase Firestore** Easy to use and covers the requirements for this app
-   **CSS Modules**

## Resources

-   **[Firebase Docs](https://firebase.google.com/docs/)**
-   **[React Docs](https://react.dev/)**
-   **[Vite Docs](https://vitejs.dev/)**
-   **[ISO string](https://www.w3schools.com/jsref/jsref_toisostring.asp)**

## Environment Variables

To run this project locally, you need to create a `.env` file in the root directory and add the following environment variables:

```
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

## License

This project is for educational purposes only.
