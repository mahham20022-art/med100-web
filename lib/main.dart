import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';

import 'app/router.dart';
import 'app/theme.dart';
import 'firebase_options.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // google_fonts fetches font files from Google's CDN at runtime by
  // default; if that's ever blocked or slow (the exact class of bug that
  // caused a blank page in Med100's earlier Flutter web build), text would
  // render invisible instead of just falling back to the system font.
  // Disabling runtime fetching trades a custom font for guaranteed-visible
  // text.
  GoogleFonts.config.allowRuntimeFetching = false;

  // Never let a Firebase init failure (flaky network, a blocked CDN)
  // leave main() mid-await forever — that's a permanently blank page with
  // no recovery, the exact bug the native app's web build hit today.
  // Auth/Firestore calls will simply fail later and the UI can handle
  // that per-screen, same as any other network error.
  try {
    await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  } catch (error, stackTrace) {
    debugPrint('Firebase initialization failed: $error');
    debugPrintStack(stackTrace: stackTrace);
  }

  runApp(const ProviderScope(child: Med100App()));
}

class Med100App extends ConsumerWidget {
  const Med100App({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(routerProvider);
    return MaterialApp.router(
      title: 'Med100',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light,
      darkTheme: AppTheme.dark,
      themeMode: ThemeMode.system,
      routerConfig: router,
    );
  }
}
