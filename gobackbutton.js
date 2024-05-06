// // goBackButton.js
// export function createGoBackButton() {
//   // Create the button
//   const button = document.createElement('button');
//   button.id = 'goBackButton';

//   // Add the event listener
//   button.addEventListener('click', function () {
//     history.back();
//   });

//   // Add the styles
//   button.style.position = 'fixed';
//   button.style.top = '30px';
//   button.style.left = '10px';
//   button.style.width = '50px';
//   button.style.height = '50px';
//   button.style.backgroundColor = '#28a745';
//   button.style.borderRadius = '50%';
//   button.style.display = 'flex';
//   button.style.alignItems = 'center';
//   button.style.justifyContent = 'center';
//   button.style.cursor = 'pointer';

//   // Append the button to the body
//   document.body.appendChild(button);
// }

export function createGoBackButton() {
  // Create the img element
  const img = document.createElement('img');
  img.id = 'goBackButton';
  img.src = 'gobackbutton.png'; // replace with your image path

  // Add the event listener
  img.addEventListener('click', function () {
    history.back();
  });

  // Add the styles
  img.style.position = 'fixed';
  img.style.top = '30px';
  img.style.left = '10px';
  img.style.width = '50px';
  img.style.height = '50px';
  img.style.cursor = 'pointer';

  // Append the img to the body
  document.body.appendChild(img);
}