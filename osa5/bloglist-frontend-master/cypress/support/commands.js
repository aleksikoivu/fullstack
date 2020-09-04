Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
      username, password
    }).then(({ body }) => {
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
  })

Cypress.Commands.add('createBlog', ({ author, url, title }) => {
    cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: { author, url, title },
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
        }
    })
    cy.visit('http://localhost:3000')
})