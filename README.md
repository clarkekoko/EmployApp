# Employ App

A modern mobile application that connects students with local job opportunities. Built with React Native, Expo, and Firebase.

![Employ App Screenshot](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Employ+App)

## Features

- **Job Discovery**: Browse and search for job opportunities nearby
- **Map View**: See job locations on an interactive map
- **User Profiles**: Create and manage your student profile
- **Beautiful UI**: Modern glassmorphism design with smooth transitions

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or newer)
- [npm](https://www.npmjs.com/) (v6 or newer) or [Yarn](https://yarnpkg.com/) (v1.22 or newer)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

## 🚀 Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/employ-app.git
cd employ-app
```

2. **Install dependencies**

Using npm:
```bash
npm install
```

Or using Yarn:
```bash
yarn install
```

3. **Install Expo Go on your mobile device**

To run the app on your physical device:

- **iOS**: Download [Expo Go](https://apps.apple.com/app/expo-go/id982107779) from the App Store
- **Android**: Download [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) from the Google Play Store

After installing, you can scan the QR code from the terminal when running the app.

4. **Firebase Setup**

The app uses Firebase for authentication and data storage. You need to create a Firebase project and update the configuration:

- Create a [Firebase project](https://console.firebase.google.com/)
- Enable Authentication (Email/Password)
- Create a Firestore database
- Update the Firebase configuration in `firebaseConfig.js` with your project details

```javascript
// firebaseConfig.js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

5. **Firestore Security Rules**

Upload the following security rules to your Firebase project:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /users/{userId} {
      allow create, read, update, delete: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow any authenticated user to read all jobs
    match /jobs/{jobId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null; // In production, you'd restrict this to admin users
    }
  }
}
```

## 🏃‍♀️ Running the App

1. **Start the development server**

```bash
npx expo start
```

2. **Run on a device or emulator**

- **For iOS:** Press `i` in the terminal or scan the QR code with the Camera app
- **For Android:** Press `a` in the terminal or scan the QR code with the Expo Go app
- **For Web:** Press `w` in the terminal

## 📁 Project Structure

```
employ-app/
├── app/                  # Main application screens
│   ├── (auth)/           # Authentication screens
│   ├── (tabs)/           # Tab navigator screens
│   └── job/              # Job detail screens
├── assets/               # Images, fonts, etc.
├── components/           # Reusable components
├── context/              # Context API providers
├── services/             # API and service functions
├── firebaseConfig.js     # Firebase configuration
├── app.json              # Expo configuration
└── package.json          # Dependencies
```

## 🛠️ Development Workflow

### Branching Strategy

We follow the Git Flow workflow:

- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/feature-name`: New features
- `fix/bug-name`: Bug fixes

### Creating a New Feature

1. Create a new branch from `develop`:

```bash
git checkout develop
git pull
git checkout -b feature/your-feature-name
```

2. Make your changes and commit them:

```bash
git add .
git commit -m "Description of changes"
```

3. Push your branch to GitHub:

```bash
git push -u origin feature/your-feature-name
```

4. Create a Pull Request to merge your changes into `develop`.

### Code Style

We use ESLint and Prettier for code formatting. Before committing, please run:

```bash
npm run lint
```

## 📱 Testing

To run tests:

```bash
npm test
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- King Clarke T. Serrano
- Xyris Zamoranos
- Van Daniel Santos
- Ken Sarmiento
- Sean Young

## 🙏 Acknowledgments

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Firebase](https://firebase.google.com/)
