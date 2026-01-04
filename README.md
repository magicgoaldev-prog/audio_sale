## audio_sale

Development of an information system for the sale of audio sessions (React Native).

## Run on Android (Android Studio / CLI)

The React Native app lives in `source/`. Commands below assume you start from the repo root.

### Prerequisites

- Node.js (project requirement: `>=20`)
- Android Studio + Android SDK
- React Native environment setup completed (Windows + Android):
  - See: [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment)

### 1) Install dependencies

```sh
cd source
npm install
```

### 2) Start Metro (JavaScript bundler)

In a terminal:

```sh
cd source
npx react-native start
```

### 3) (Optional but common) Forward Metro port to a device

If you are using a physical Android device, run:

```sh
adb reverse tcp:8081 tcp:8081
```

### 4) Run the app

#### Option A: Android Studio

- Open Android Studio
- **Open** the project at `source/android`
- Let Gradle sync finish
- Select a device/emulator and press **Run**

#### Option B: CLI

In a new terminal:

```sh
cd source
npx react-native run-android
```

### Troubleshooting

- If no device is detected: start an emulator, or enable USB debugging and confirm `adb devices` lists your device
- If you see Gradle/JDK errors: verify Android Studio SDK/JDK configuration and your `JAVA_HOME`
