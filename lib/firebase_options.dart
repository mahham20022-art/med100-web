// Real config for the "med100 (web)" app already registered under the
// med100-production Firebase project (Project settings → Your apps → web).
// Reused directly here rather than running `flutterfire configure` again —
// it's the same web app, so the same config applies.
//
// ignore_for_file: type=lint
import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;

abstract final class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform => web;

  static const web = FirebaseOptions(
    apiKey: 'AIzaSyCAUIrheK1hRTrgpbhCHZlkNuKFr118N60',
    appId: '1:136449767934:web:91ea2965e1288074d428af',
    messagingSenderId: '136449767934',
    projectId: 'med100-production',
    authDomain: 'med100-production.firebaseapp.com',
    storageBucket: 'med100-production.firebasestorage.app',
    measurementId: 'G-CBME9BL5E8',
  );
}
