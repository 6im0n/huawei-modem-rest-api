import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseService {
  constructor() {
    // Initialize Firebase Admin if not already initialized
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(
          './src/firebase/config/firebase-service-account.json',
        ),
      });
    }
  }

  async createUser(
    email: string,
    password: string,
    displayName?: string,
  ): Promise<admin.auth.UserRecord> {
    try {
      return await admin.auth().createUser({
        email,
        password,
        displayName,
      });
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    return await admin.auth().verifyIdToken(idToken);
  }
}
