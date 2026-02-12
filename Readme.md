# 📚 BookShare - Peer-to-Peer Book Rental App

A React Native mobile application that connects book owners with readers in their local area. Rent books instead of buying them, or list your own books to earn money!

## ✨ Features

### For Readers
- 📖 Browse books from local owners
- 🔍 Search and filter by category
- 💰 Rent books at affordable rates
- 📍 Find books near you
- ⏰ Track rental due dates
- ⭐ Rate and review book owners

### For Book Owners
- 📚 List your books for rent
- 💵 Earn money from your collection
- 📊 Track earnings and rentals
- 📈 View book performance analytics
- 👥 Manage active rentals

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Expo Go app** on your phone:
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/bookshare.git
   cd bookshare
```

2. **Install dependencies**
```bash
   npm install
```
   
   Or if you use yarn:
```bash
   yarn install
```

3. **Start the development server**
```bash
   npx expo start
```
   
   Or:
```bash
   npm start
```

4. **Run on your device**
   
   After running the start command, you'll see a QR code in your terminal.
   
   **On iOS:**
   - Open the Camera app
   - Point it at the QR code
   - Tap the notification to open in Expo Go
   
   **On Android:**
   - Open the Expo Go app
   - Tap "Scan QR Code"
   - Point your camera at the QR code

## 📱 Running on Simulator/Emulator

### iOS Simulator (Mac only)

1. Install Xcode from the Mac App Store
2. Install Xcode Command Line Tools:
```bash
   xcode-select --install
```
3. Run:
```bash
   npx expo start --ios
```

### Android Emulator

1. Install [Android Studio](https://developer.android.com/studio)
2. Set up an Android Virtual Device (AVD) through Android Studio
3. Run:
```bash
   npx expo start --android
```

## 🗂️ Project Structure
```
bookshare/
├── src/
│   ├── components/
│   │   ├── AddBookModal.js      # Modal for adding new books
│   │   ├── BookCard.js          # Book card component
│   │   ├── BottomTabBar.js      # Bottom navigation tabs
│   │   └── RentModal.js         # Rental confirmation modal
│   ├── navigation/
│   │   └── Navigation.js        # Main navigation logic
│   └── screens/
│       ├── BookDetails.js       # Book details screen
│       ├── HomeScreen.js        # Browse books screen
│       ├── MyRentals.js         # User's rentals screen
│       ├── Onboarding.js        # Onboarding/role selection
│       ├── OwnerDashboard.js    # Book owner dashboard
│       └── Profile.js           # User profile screen
├── App.js                       # App entry point
├── package.json                 # Project dependencies
└── README.md                    # You are here!
```

## 🛠️ Tech Stack

- **React Native** - Mobile app framework
- **Expo** - Development platform and tools
- **React Navigation** - Navigation library
- **Expo Vector Icons** - Icon library

## 🐛 Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
npx expo start -c
```

### Metro bundler cache issues
```bash
npx expo start -c
```

### Can't connect to development server

1. Make sure your phone and computer are on the same WiFi network
2. Try running:
```bash
   npx expo start --tunnel
```

### iOS: "Unable to boot simulator"
```bash
sudo xcode-select --switch /Applications/Xcode.app
```

## 📦 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator (Mac only)
- `npm run web` - Run in web browser

## 🎨 Customization

### Changing Colors

Edit the color values in the component StyleSheet sections:
- Primary color: `#2563eb`
- Background: `#f8fafc`
- Card background: `#fff`
- Border: `#e5e7eb`

### Adding Features

1. Create new screen in `src/screens/`
2. Add navigation route in `src/navigation/Navigation.js`
3. Update bottom tab bar in `src/components/BottomTabBar.js` if needed

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - [@yourhandle](https://github.com/yourhandle)

## 🙏 Acknowledgments

- Book cover images from [Unsplash](https://unsplash.com)
- Icons from [Expo Vector Icons](https://icons.expo.fyi/)

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

Made with ❤️ using React Native and Expo