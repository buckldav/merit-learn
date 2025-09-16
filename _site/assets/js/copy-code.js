/**
 * @author David Buckley
 * @date   2025 Sep 16
 */

document.querySelectorAll('pre').forEach((pre) => {
  const button = document.createElement('button');
  button.className = 'copy-code-button';
  button.innerText = 'Copy Code';

  // Append the button to the pre element
  pre.appendChild(button);

  // Add click event to copy code
  button.addEventListener('click', () => {
    const code = pre.querySelector('code').innerText;
    navigator.clipboard.writeText(code).then(() => {
      button.innerText = 'Copied!';
      setTimeout(() => {
        button.innerText = 'Copy Code';
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  });
});

