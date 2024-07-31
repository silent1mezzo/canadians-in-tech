const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const dedent = require('dedent')

const root = process.cwd()

const genFrontMatter = (answers) => {
  const personal_site = answers.personal_site ? `person_site: "${answers.personal_site}"` : ''
  const company_site = answers.company_site ? `person_site: "${answers.company_site}"` : ''
  const twitter = answers.twitter ? `person_site: "${answers.twitter}"` : ''
  const linkedin = answers.linkedin ? `person_site: "${answers.linkedin}"` : ''
  const github = answers.github ? `person_site: "${answers.github}"` : ''

  let frontMatter = dedent`---
  name: "${answers.name}"
  description: "${answers.description}"
  company: "${answers.company}"
  ${personal_site}
  ${company_site}
  ${twitter}
  ${linkedin}
  ${github}
  `

  frontMatter = frontMatter + '\n---'

  return frontMatter
}

inquirer
  .prompt([
    {
      name: 'name',
      message: "What's the persons name?",
      type: 'input',
    },
    {
      name: 'description',
      message: 'Enter a short description about the person:',
      type: 'input',
    },
    {
      name: 'personal_site',
      message: "Enter the person's personal website:",
      type: 'input',
    },
    {
      name: 'company',
      message: 'Enter the company the person works for:',
      type: 'input',
    },
    {
      name: 'company_site',
      message: "Enter the person's company website:",
      type: 'input',
    },
    {
      name: 'twitter',
      message: 'Enter the link to the persons Twitter account:',
      type: 'input',
    },
    {
      name: 'linkedin',
      message: 'Enter the link to the persons LinkedIn account:',
      type: 'input',
    },
    {
      name: 'github',
      message: 'Enter the link to the persons Github account:',
      type: 'input',
    },
  ])
  .then((answers) => {
    // Remove special characters and replace space with -
    const fileName = answers.name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/ /g, '-')
      .replace(/-+/g, '-')
    const frontMatter = genFrontMatter(answers)
    if (!fs.existsSync('src/content/people')) fs.mkdirSync('src/content/people', { recursive: true })
    const postPath = `src/content/people/${fileName ? fileName : 'untitled'}.${
      answers.extension ? answers.extension : 'md'
    }`
    fs.writeFile(postPath, frontMatter, { flag: 'wx' }, (err) => {
      if (err) {
        throw err
      } else {
        const imageDir = `public/images/${fileName ? fileName : 'untitled'}`
        if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true })
        console.log(`Person files generated successfully at ${postPath}`)
      }
    })
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment")
    } else {
      console.log('Something went wrong, sorry!', error)
    }
  })