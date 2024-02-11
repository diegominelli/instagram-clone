import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';

export class Autenticacao {
  public cadastrarUsuario(usuario: Usuario): void {
    console.log('chegamos até o serviço: ', usuario);

    firebase
      .auth()
      .createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then((resposta: any) => {
        usuario.senha;
        firebase
          .database()
          .ref(`usuario_detalhe/${btoa(usuario.email)}`)
          .set(usuario);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }

  public autenticar(email: string, senha: string): void {
    console.log('email: ', email);
    console.log('senha: ', senha);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, senha)
      .then((resposta: any) => console.log(resposta))
      .catch((error: Error) => console.log(error));
  }
}
