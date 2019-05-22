import {Post} from "./models/post.model";
import {Injectable} from "@angular/core";
import {UsersService} from "./users.service";
import {User} from "./models/user.model";

@Injectable()
export class ConfessionsService{

  constructor(private usersService: UsersService){}

  private posts: Post[] = [
    new Post(this.usersService.getUser(0),
  'First post',
  'Lorem ipsum dolor sit amet, hinc omnium in has, vim in nisl constituto reformidans. Eos saepe adolescens consetetur ut, mutat saepe praesent eos ei, nibh mundi impetus an duo. Eos an graeco delectus, no inani similique adversarium nec. An usu melius reformidans, ei tota liberavisse nec, ea eius necessitatibus his. Cu his possim aliquam lucilius, eam legendos laboramus ea, mei mazim oblique nominavi te.\n' +
      '\n' +
      'Nulla alterum vel ad, duo dicta oporteat ut. Sea ut malorum expetenda. Semper theophrastus ea mea, enim mandamus moderatius mel an, at per solet explicari. Mea ut oratio accommodare. His probo oporteat definiebas te, labitur maluisset nec te, at pro justo iusto vocent.\n' +
      '\n' +
      'Unum atqui erant id quo, ne nisl vide eum. Cu pro prima causae. Eam id magna adhuc dissentias, ad sea eros justo audiam, minim sanctus quo ad. Pri in timeam intellegat dissentiet, nam te soleat mnesarchum. Ei sed illud impedit explicari.\n' +
      '\n' +
      'Eum reque falli invidunt ad. Ne est meis admodum deserunt, nisl dicat recusabo an vel. No mea commodo voluptaria persequeris, autem patrioque ea mea, an per debet doming tractatos. Iusto exerci bonorum sea in. Ne vidit nullam verear eos, sonet principes argumentum an usu, at elitr regione fabellas quo. In luptatum definitiones mel.\n' +
      '\n' +
      'No praesent disputando his, possit essent ius et. Quot albucius te mei, mea nostro facilisi indoctum at. Duo diceret maiestatis eu, bonorum ceteros ad nec, mea prompta eruditi no. Stet ipsum nam te. Autem iisque dolores eu cum, id sed vulputate disputationi, ea modus phaedrum vim.'),
    new Post(this.usersService.getUser(1),
      'Rounding',
      'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.')
  ];

  addLike(id: number, user: User){
    this.getPost(id).likes.push(user);
  }

  removeLike(id: number, user: User){
   const index = this.getPost(id).likes.indexOf(user);
   this.getPost(id).likes.splice(index, 1);
  }

  getPosts(){
  return this.posts.slice();
}

getPost(id: number){
    return this.posts[id];
}

}
