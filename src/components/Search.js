import React from 'react'
import { Menu, Input } from 'semantic-ui-react'
export default function Search({ search, setSearch }) {
    return (
        <Menu secondary>
            <Menu.Item>
                <Input icon='search'
                    placeholder='Search...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Menu.Item>
        </Menu>
    )
}
