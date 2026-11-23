import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_sign_in/google_sign_in.dart';

final authServiceProvider = Provider<AuthService>((ref) => AuthService());

class AuthService {
  final _auth = FirebaseAuth.instance;
  final _google = GoogleSignIn();

  Future<User?> signInWithGoogle() async {
    final g = await _google.signIn();
    if (g == null) return null; // user cancelled
    final authData = await g.authentication;
    final cred = GoogleAuthProvider.credential(
      accessToken: authData.accessToken,
      idToken: authData.idToken,
    );
    return (await _auth.signInWithCredential(cred)).user;
  }

  Future<void> signOut() => _auth.signOut();
}
