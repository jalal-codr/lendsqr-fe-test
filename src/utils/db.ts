import Dexie from 'dexie';
import type{ Table } from 'dexie';
import type{ UserDetails } from '../features/users/users.types';

export class MyDatabase extends Dexie {
  users!: Table<UserDetails>; 

  constructor() {
    super('LendsqrDB');
    this.version(1).stores({
      users: 'id, organization, status'
    });
  }
}

export const db = new MyDatabase();