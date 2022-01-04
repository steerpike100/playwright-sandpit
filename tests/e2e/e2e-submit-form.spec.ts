import { test, expect } from '@playwright/test'

test.describe('Feedback Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
    await page.click('#feedback')
  })

  //Reset feedback form
  test('Reset feedback form', async ({ page }) => {
    await page.type('#name', 'some name')
    await page.type('#email', 'test@example.com')
    await page.type('#subject', 'this is the subject')
    await page.type('#comment', 'this is the text area')
    await page.click("input[name='clear']")

    const nameInput = await page.locator('#name')
    const commentArea = await page.locator('#comment')
    await expect(nameInput).toBeEmpty()
    await expect(commentArea).toBeEmpty()
  })
  //Submit feedback form

  test('Submit feedback form', async ({ page }) => {
    await page.type('#name', 'some name')
    await page.type('#email', 'test@example.com')
    await page.type('#subject', 'this is the subject')
    await page.type('#comment', 'this is the text area')
    await page.click("input[name='submit']")
    await page.waitForSelector('#feedback-title')
  })
})
