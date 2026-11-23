import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

/// Web-safe Firebase wiring. NO native-only plugins here —
/// that's what crashed the previous web build (firebase_crashlytics has
/// no web implementation at all).
final firebaseAuthProvider = Provider<FirebaseAuth>((_) => FirebaseAuth.instance);

final firestoreProvider = Provider<FirebaseFirestore>((_) {
  final db = FirebaseFirestore.instance;
  db.settings = const Settings(persistenceEnabled: true);
  return db;
});

final authStateProvider = StreamProvider<User?>(
  (ref) => ref.watch(firebaseAuthProvider).authStateChanges(),
);
