import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

// turning scypt from the callback implementation to a promise based implementation
const scryptAsync = promisify(scrypt);

// Static methods are methods we can use, without creating an instance of a class
export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(storePassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storePassword.split('.');

    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPassword;
  }
}

// Static methods allow us to use them like this
// Password.toHash, Password.compare
// unlike having a print() {} like this where we will need to
//  make a new instance of Password (new Password() and then access print)
