import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  OperatorFunction,
} from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private searchWord = new BehaviorSubject<string>('');
  private orgId = (sessionStorage.getItem('orgid') as string) || null;
  private userCollection: AngularFirestoreCollection<User> =
    this.angularFirestore.collection('Users', (ref) => ref);
  public user$: Observable<User[]> = this.angularFirestore
    .collection('Users', (ref) => ref.where('organization', '==', this.orgId))
    .snapshotChanges()
    .pipe(
      map((changes) =>
        changes.map((change: any) => {
          const task = new User({
            ...change.payload.doc.data(),
            id: change.payload.doc.id,
          });
          return task;
        })
      )
    );
  public users$ = combineLatest([this.user$, this.searchWord]).pipe(
    map(([usersArray, searchWord]) => {
      return usersArray.filter((user) => {
        return (
          user.firstName
            .toLocaleLowerCase()
            .includes(searchWord.toLocaleLowerCase()) ||
          user.lastName
            .toLocaleLowerCase()
            .includes(searchWord.toLocaleLowerCase()) ||
          (user.firstName + ' ' + user.lastName)
            .toLocaleLowerCase()
            .includes(searchWord.toLocaleLowerCase())
        );
      });
    })
  );

  constructor(public angularFirestore: AngularFirestore) {}

  async addUser(user: User) {
    let userID: string;
    await this.userCollection.add(user).then((res) => (userID = res.id));
    return userID!;
  }
  setSearchWord(word: string) {
    this.searchWord.next(word);
  }
  editUser(editUser: User) {
    this.angularFirestore.collection('Users').doc(editUser.id).update(editUser);
  }

  deleteTask(id: string) {
    this.angularFirestore.collection('Users').doc(id).delete();
  }

  updateScore(id: string, newScore: number) {
    this.angularFirestore
      .collection('Users')
      .doc(id)
      .update({ score: newScore });
  }
  setOrganization(id: string, organization: string) {
    this.angularFirestore
      .collection('Users')
      .doc(id)
      .update({ organization: organization });
  }

  getUser(id: string) {
    return this.angularFirestore.collection('Users').doc(id).valueChanges();
  }
  getUserRole(id: string): Observable<string> {
    return this.angularFirestore
      .collection('Users')
      .doc(id)
      .valueChanges()
      .pipe(
        map((user: User) => user.position) as OperatorFunction<unknown, string>
      );
  }
  findUserByEmail(email: string) {
    return this.angularFirestore
      .collection('Users', (ref) => ref.where('emailAddress', '==', email))
      .valueChanges();
  }
  createUser(userCredential: any) {
    this.userCollection.doc(userCredential.user.uid).set({
      emailAddress: userCredential.user.email,
      id: '',
      firstName: '',
      lastName: '',
      phoneNumber: 0,
      position: '',
      departament: '',
      manager: '',
      score: 0,
      organization: '',
    });
  }
}
