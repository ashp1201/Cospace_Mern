import bcrypt, { compare } from "bcrypt";
let pass="$2b$10$K4DjQ9zOl6wVZTX4ixn2LuRqx1bZyTvSHegkOu/n.GHbWMCP3dy1O"
let userpass="1234@";
bcrypt.compare(userpass, pass)
  .then(passwordCheck => {
    if (passwordCheck) {
      console.log('Password is correct');
    } else {
      console.log('Password is incorrect');
    }
  })
  .catch(err => {
    console.error(err);
  });
let password='123@'
const c=  await bcrypt.hash(password,10);
console.log(c)
