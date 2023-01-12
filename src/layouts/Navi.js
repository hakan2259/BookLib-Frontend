import React, { Component } from 'react'
import { Menu, Segment, Image, Input } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
export default class Navi extends Component {
    state = { activeItem: 'bookList' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    render() {
        const { activeItem } = this.state

        return (
            <Segment inverted>
                <Menu inverted pointing secondary>
                    <Image src="book-stack.png" size='mini' />
                    <Menu.Item
                        as={NavLink} to="/books"
                        name='bookList'
                        active={activeItem === 'bookList'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        as={NavLink} to="/addBook"
                        name='addBook'
                        active={activeItem === 'addBook'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        as={NavLink} to="/addAuthor"
                        name='addAuthor'
                        active={activeItem === 'addAuthor'}
                        onClick={this.handleItemClick}
                    />
                </Menu>
            </Segment>
        )
    }
}
