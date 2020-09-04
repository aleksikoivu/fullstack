import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'
// import { prettyDOM } from '@testing-library/dom'

describe('rendering', () => {

    test('renders content', () => {

        const blog = {
            author: 'Component testing',
            title: 'How to do tests',
            url: 'www.google.fi',
            likes:0,
            user:{
                username: 'Piripetteri30',
                name: 'Allu',
                id:'123123123'
            },
            id:'456456'
        }

        const component = render(
        <Blog blog={blog} />
        )

        // Tarkastetaan että haluttu divi näkyy
        const div = component.container.querySelector('.showDefault')
        expect(div).not.toHaveStyle('display: none')

    })

    test('doesnt render hidden content', () => {

        const blog = {
            author: 'Component testing',
            title: 'How to do tests',
            url: 'www.google.fi',
            likes:0,
            user:{
                username: 'Piripetteri30',
                name: 'Allu',
                id:'123123123'
            },
            id:'456456'
        }

        const component = render(
        <Blog blog={blog} />
        )

        // Tarkistetaan ettei url likes username diviä renderöidä
        const div = component.container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })
})

describe('buttons', () => {
    test('show more button renders hidden content', () => {

        const blog = {
            author: 'Component testing',
            title: 'How to do tests',
            url: 'www.google.fi',
            likes:0,
            user:{
                username: 'Piripetteri30',
                name: 'Allu',
                id:'123123123'
            },
            id:'456456'
        }

        const component = render(
        <Blog blog={blog} />
        )

        // Klikataan buttonia
        const button = component.getByText('Show more')
        fireEvent.click(button)

        const div = component.container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')


    })

    test('pressing like twice triggers event handler twice', () => {

        const blog = {
            author: 'Component testing',
            title: 'How to do tests',
            url: 'www.google.fi',
            likes:0,
            user:{
                username: 'Piripetteri30',
                name: 'Allu',
                id:'123123123'
            },
            id:'456456'
        }

        //mockHandleri buttonille
        const mockHandler = jest.fn()
        const component = render(
        <Blog blog={blog} addLike={mockHandler}  />
        )

        //Napin haku ja 2 painallusta
        const button = component.getByText('Like')
        fireEvent.click(button)
        fireEvent.click(button)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})

describe('forms', () => {

    test('<BlogForm updates parent state and calls onSubmit', () => {

        const createBlog = jest.fn()

        const component = render(
            <BlogForm createBlog = {createBlog}/>
        )

        const author = component.container.querySelector('#Author')
        fireEvent.change(author, {
            target: { value: 'Aleksi Koivu' }
        })
        const title = component.container.querySelector('#Title')
        fireEvent.change(title, {
            target: { value: 'Testing forms' }
        })
        const url = component.container.querySelector('#Url')
        fireEvent.change(url, {
            target: { value: 'www.fullstackopen.com' }
        })

        const form = component.container.querySelector('form')
        fireEvent.submit(form)

        const shouldBe = {
            author: 'Aleksi Koivu',
            title: 'Testing forms',
            url: 'www.fullstackopen.com'
        }

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0]).toStrictEqual(shouldBe)
        // mock callbackeissa[x][y] - [x] on kutsun numero ja [y] sen sisältö

    })
})