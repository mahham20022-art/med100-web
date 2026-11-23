import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/firebase_providers.dart';

/// Firestore layout (web edition):
///   users/{uid}/challenge/progress  → { currentDay: int, doneDays: [...], streak: int }
final _progressRef = Provider<DocumentReference<Map<String, dynamic>>>((ref) {
  final uid = ref.watch(firebaseAuthProvider).currentUser!.uid;
  return ref.watch(firestoreProvider).collection('users').doc(uid).collection('challenge').doc(
    'progress',
  );
});

final progressProvider = StreamProvider<Map<String, dynamic>>((ref) {
  return ref.watch(_progressRef).snapshots().map((s) => s.data() ?? {});
});

class ChallengeScreen extends ConsumerWidget {
  const ChallengeScreen({super.key});
  static const totalDays = 100;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final progress = ref.watch(progressProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('My 100-Day Challenge')),
      body: Center(
        child: progress.when(
          loading: () => const CircularProgressIndicator(),
          error: (e, _) => Text('Error: $e'),
          data: (data) {
            final done = (data['doneDays'] as List?)?.length ?? 0;
            return Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SizedBox(
                  width: 220,
                  height: 220,
                  child: Stack(
                    fit: StackFit.expand,
                    children: [
                      CircularProgressIndicator(value: done / totalDays, strokeWidth: 14),
                      Center(
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text('$done/$totalDays', style: Theme.of(context).textTheme.headlineLarge),
                            const Text('days completed'),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 32),
                FilledButton(
                  onPressed: () async {
                    final doc = ref.read(_progressRef);
                    await doc.set({
                      'doneDays': FieldValue.arrayUnion([done + 1]),
                      'lastCompletedAt': FieldValue.serverTimestamp(),
                    }, SetOptions(merge: true));
                  },
                  child: const Text('Mark Today as Done'),
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}
