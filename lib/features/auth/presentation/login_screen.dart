import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/firebase_providers.dart';
import '../data/auth_service.dart';

class LoginScreen extends ConsumerWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final auth = ref.watch(authServiceProvider);
    return Scaffold(
      body: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 400),
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(Icons.favorite, size: 72, color: Color(0xFF0B6E4F)),
                const SizedBox(height: 16),
                Text('Med100', style: Theme.of(context).textTheme.displaySmall),
                const SizedBox(height: 8),
                Text('Master medicine in 100 days', style: Theme.of(context).textTheme.bodyLarge),
                const SizedBox(height: 40),
                FilledButton.icon(
                  icon: const Icon(Icons.login, size: 24),
                  label: const Text('Continue with Google'),
                  onPressed: () async {
                    final user = await auth.signInWithGoogle();
                    if (user != null && context.mounted) context.go('/challenge');
                  },
                ),
                const SizedBox(height: 12),
                OutlinedButton.icon(
                  icon: const Icon(Icons.person_outline),
                  label: const Text('Continue as Guest'),
                  onPressed: () async {
                    final cred = await ref.read(firebaseAuthProvider).signInAnonymously();
                    if (cred.user != null && context.mounted) {
                      context.go('/challenge');
                    }
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
