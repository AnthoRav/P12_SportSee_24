export class User {
  constructor(getUserData) {
  if (getUserData && getUserData.data) {
  this.id = getUserData.data.userId || null;
  this .firstName = getUserData.data.userInfos.firstName || '';
  ....
  } else
  this.id = null
  this.firstName = "'
  ...
  }

  //on importe le fichier dans dashboard 
  import { User } from '../../models/user.js'
const [user, setUser] = useState({
    user: null,
..})
useEffect(() => {
async function getDatas() {
      try {
const userDatas = await getUser(id, isMock)
const userModel = new User(userDatas)
setUser({
          user: userModel,
...
})} catch (error) {
        console.error("Error:", error);
}}getDatas()
}, [id, navigate])
et dans le jsx
<UserBanner name={user && user.user && user.user.firstName} />
...
----

//la fonction getUser dans le fichier api
export function getUser(id, mock) {
    const url = getUrl(mock, id, mock ? 'user' : '')
    return fetch(url)
        .then(res => res.json())
}