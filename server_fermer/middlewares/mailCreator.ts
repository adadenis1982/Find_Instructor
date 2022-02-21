export function createRegEmail(newUser: any) {
  return `
<h2>Поздравляем, вы успешно зарегистрировались!</h2>
<div>Your account details:</div>
<ul>
  <li><strong>Login: </strong>${newUser.email}</li>
  <li><strong>Password: </strong>а это секрет, надо было записать себе</li>
</ul>
  `;
}

export function createSubscriptionEmail() {
  return `
  <h1>Отлично! Ты подписался на обновления Find Instructor!</h1>
  <br>
  <h2>Ты об этом не пожалеешь :)</h2>
  `;
}
