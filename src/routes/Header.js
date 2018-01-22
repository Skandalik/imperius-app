import React from 'react';
import {Link} from 'react-router-dom';
import {Menu, Dropdown} from 'semantic-ui-react';
import {isLogged, removeToken} from "../utils/auth/AuthService";
import history from '../history';

class Header extends React.Component {
    state = { activeItem: 'sensor' };
    handleClickItem = (e, {name}) => this.setState({activeItem: name});

    handleLogout = () => {
        removeToken();
        history.push('/');
    };

    render() {
        const {activeItem} = this.state;
        return (
            <Menu fixed='top' size='large' stackable={true}>
                <Menu.Item header> Imperius Project</Menu.Item>
                {
                    isLogged() ?
                        <Menu.Menu position='right'>
                            <Menu.Item as={Link} to='/sensor' name='sensor' active={activeItem === 'sensor'}
                                       onClick={this.handleClickItem}/>
                            <Menu.Item as={Link} to='/room' name='room' active={activeItem === 'room'}
                                       onClick={this.handleClickItem}/>
                            <Menu.Item as={Link} to='/job' name='job' active={activeItem === 'job'}
                                       onClick={this.handleClickItem}/>
                            <Menu.Item as={Link} to='/profile' name='profile' active={activeItem === 'profile'}
                                       onClick={this.handleClickItem}/>
                            <Menu.Item name='logout' active={activeItem === 'logout'}
                                       onClick={this.handleLogout}/>
                        </Menu.Menu>
                        :
                        <Menu.Menu position='right'>
                            <Menu.Item as={Link} to='/login' name='login' active={activeItem === 'login'}
                                       onClick={this.handleClickItem}/>
                        </Menu.Menu>
                }
            </Menu>
        )
    }
}

export default Header;
