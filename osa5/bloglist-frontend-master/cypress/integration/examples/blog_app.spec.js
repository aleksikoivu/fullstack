describe('Blog app', function (){

    beforeEach(function(){
        cy.request('POST','http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Aleksi Koivu',
            username: 'AKoivu',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function(){
        cy.contains('Login')
    })

    describe('When logged in', function(){

        beforeEach(function(){
            cy.get('#Username').type('AKoivu')
            cy.get('#Password').type('salainen')
            cy.get('#login-button').click()
            //New blog
            cy.get('#newBlog').click()
            cy.get('#Author').type('Cypress')
            cy.get('#Title').type('Automated testing')
            cy.get('#Url').type('docs.cypress.io')
            cy.get('#blogSubmit').click()
        })

        it('A blog can be created', function(){
            cy.contains('Automated testing')
        })

        it('A blog can be liked',function(){
            // Like a blog
            cy.get('#showMoreButton').click()
            cy.get('#likeButton').click()
            cy.contains('liked successfully')
        })

        it('A blog can be deleted', function(){
            // Delete a blog
            cy.get('#showMoreButton').click()
            cy.get('#deleteBlogButton').click()
            cy.contains('Blog removed')
        })

        it('Blogs are in correct order',function(){
            // cy.login({ username: 'AKoivu', password: 'salainen'})

            cy.createBlog({title:'Test',author:'test',url:'test'})
            cy.createBlog({title:'Best',author:'best',url:'best'})
            cy.createBlog({title:'Rest',author:'rest',url:'rest'})
            cy.visit('http://localhost:3000')
            cy.contains('Test')
            
        })
    })
})

describe('Login', function(){
    beforeEach(function(){
        cy.request('POST','http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Aleksi Koivu',
            username: 'AKoivu',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('Succeeds with correct credentials', function(){
        cy.get('#Username').type('AKoivu')
        cy.get('#Password').type('salainen')
        cy.get('#login-button').click()
        cy.contains('Logged in as')
    })

    it('Fails with wrong credentials', function(){
        cy.get('#Username').type('AKoivu')
        cy.get('#Password').type('kalainen')
        cy.get('#login-button').click()
        cy.contains('Invalid')
    })
})