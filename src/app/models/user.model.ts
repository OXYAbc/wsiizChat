export class User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  emailAddress: string;
  position: string;
  departament: string;
  manager: string;
  score: number;
  organization: string;

  constructor(user: {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: number;
    emailAddress: string;
    position: string;
    departament: string;
    manager: string;
    score: number;
    organization: string;
  }) {
    this.id = user.id || '';
    this.firstName = user.firstName || '';
    this.lastName = user.lastName || '';
    this.position = user.position || '';
    this.departament = user.departament || '';
    this.phoneNumber = user.phoneNumber || 111111111;
    this.emailAddress = user.emailAddress || '';
    this.manager = user.manager || '';
    this.score = user.score || 0;
    this.organization = user.organization
  }
}
