import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../core/firebase_providers.dart';
import '../features/auth/presentation/login_screen.dart';
import '../features/challenge/presentation/challenge_screen.dart';

final _public = {'/login'};

final routerProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authStateProvider);
  return GoRouter(
    initialLocation: '/challenge',
    redirect: (context, state) {
      final user = authState.valueOrNull;
      final loc = state.matchedLocation;
      if (user == null && !_public.contains(loc)) return '/login';
      if (user != null && _public.contains(loc)) return '/challenge';
      return null;
    },
    routes: [
      GoRoute(path: '/login', builder: (context, state) => const LoginScreen()),
      GoRoute(path: '/challenge', builder: (context, state) => const ChallengeScreen()),
      // TODO(m1): /topics, /day/:n, /progress, /notes, /profile
    ],
  );
});
