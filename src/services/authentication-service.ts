export default class AuthenticationService {
  //Permet de savoir si l'utilisateur est connecté par defaut non donc false
  static isAuthenticated: boolean = false;

  //Simule une connexion en retournant un Promise si l'utilisateur a rentrer les bonnes informations
  static login(username: string, password: string): Promise<boolean> {
    //Récupére l'username et le password a partir de l'api
    return fetch(
      "http://localhost:3001/users?username=" +
        username +
        "&password=" +
        password
    )
      .then((response) => response.json())
      .then((users) => {
        // Si la réponse contient un users alors il existe bien et retourne true si le tableau est vide retourne false
        const isAuthenticated = users.length === 1;
        this.isAuthenticated = isAuthenticated;
        return isAuthenticated;
      });
  }
}
