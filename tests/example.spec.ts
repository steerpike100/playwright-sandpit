import { test, expect } from '@playwright/test'

import { loadHomepage, assertTitle } from '../helpers'

test('Simple basic test', async ({ page }) => {
  await page.goto('https://example.com/')
  const pageTitle = await page.locator('h1')
  await expect(pageTitle).toContainText('Example Domain')
})

test.describe('Hooks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com/')
  })

  test('screenshots', async ({ page }) => {
    await page.screenshot({ path: 'screenshot.png', fullPage: true })
  })

  test('single element screenshot', async ({ page }) => {
    const element = await page.$('h1')
    await element.screenshot({ path: 'single_element_screenshot.png' })
  })
})

test.only('Custom helpers', async ({ page }) => {
  await loadHomepage(page)
  await assertTitle(page)
})

// test('Clicking on Elements', async ({ page }) => {
//   await page.goto('http://zero.webappsecurity.com/index.html')
//   await page.click('#signin_button')
//   await page.click('text=Sign in')

//   const errorMessage = await page.locator('.alert-error')
//   await expect(errorMessage).toContainText('Login and/or password are wrong.')
// })

// test('Selectors', async ({ page }) => {
//   //text
//   await page.click('text=some text')
//   //css selectors
//   await page.click('button')
//   //IDs
//   await page.click('#id')
//   //class
//   await page.click('.class')
//   //only visible css selector
//   await page.click('.submit-button:visible')
//   //Combinations -- by id with class of...
//   await page.click('#username .first')
//   //XPath
//   await page.click('//button')
// })

test.describe('My First test suite', () => {
  test('Working with inputs ', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')

    await page.type('#user_login', 'some username')
    await page.type('#user_password', 'some password')

    await page.click('text=Sign in')

    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
  })

  test('Assertions @myTag', async ({ page }) => {
    await page.goto('https://example.com/')

    await expect(page).toHaveURL('https://example.com/')
    await expect(page).toHaveTitle('Example Domain')

    const element = await page.locator('h1')
    await expect(element).toBeVisible()
    await expect(element).toHaveText('Example Domain')
    await expect(element).toHaveCount(1)

    const nonExistingElement = await page.locator('h5')
    await expect(nonExistingElement).not.toBeVisible()
  })
})
