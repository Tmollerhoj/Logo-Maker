const inquirer = require('inquirer');
const fs = require('fs');
const { createCanvas } = require('canvas');



function generateLogo() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'text',
        message: 'Enter the text for the logo:',
      },
      {
        type: 'list',
        name: 'textColor',
        message: 'Select a color for the text:',
        choices: ['black', 'white', 'gray']
      },
      {
        type: 'list',
        name: 'shape',
        message: 'Select a shape for the logo:',
        choices: ['circle', 'square', 'triangle'],
      },
      {
        type: 'list',
        name: 'shapeColor',
        message: 'Select a color for the logo:',
        choices: ['red', 'blue', 'green', 'yellow'],
      }
    ])
    .then((answers) => {
      const canvas = createCanvas(300, 300);
      const context = canvas.getContext('2d');
     

      context.font = '24px Arial';
      context.fillText(answers.text, 100, 160);
      context.fillStyle = answers.shapeColor;
      
      switch (answers.shape) {
        case 'circle':
          context.beginPath();
          context.arc(150, 150, 100, 0, Math.PI * 2);
          context.fill();
          break;
          case 'square':
            context.fillRect(50, 50, 200, 200);
            break;
            case 'triangle':
              context.beginPath();
              context.moveTo(150, 50);
              context.lineTo(50, 250);
              context.lineTo(250, 250);
              context.closePath();
              context.fill();
              break;
            }
            
      context.fillStyle = answers.textColor; // Text color
      const textWidth = context.measureText(answers.text).width;
      const textX = (canvas.width - textWidth) / 2;
      context.fillText(answers.text, textX, 150);
      

      fs.writeFileSync('logo.svg', canvas.toBuffer());

      console.log('Logo generated successfully!');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

generateLogo();
