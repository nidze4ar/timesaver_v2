import React from 'react';
import { NavLink } from 'react-router-dom'
import { Menu, Icon  } from "antd";
const { SubMenu } = Menu;

const Navigation = ({ lang, text }) => {
  return(
    <Menu theme='dark' mode="horizontal">
    <SubMenu
        title={
          <span className="submenu-title-wrapper">
            <Icon type="unordered-list" />
            { text[lang].task }
          </span>
        }
      >        
          <Menu.Item >      
            <NavLink to='/'>{ text[lang].schedule }</NavLink>
          </Menu.Item>
          <Menu.Item >      
            <NavLink to='/compl'>{ text[lang].job }</NavLink>
          </Menu.Item>        
          <Menu.Item >      
            <NavLink to='/'>{ text[lang].schedule }</NavLink>
          </Menu.Item>
          <Menu.Item >      
            <NavLink to='/'>{ text[lang].schedule }</NavLink>
          </Menu.Item>        
      </SubMenu>

    <SubMenu
        title={
          <span className="submenu-title-wrapper">
            <Icon type="bar-chart" />
            { text[lang].statistic }
          </span>
        }
      >        
          <Menu.Item >      
            <NavLink to='/'>{ text[lang].schedule }</NavLink>
          </Menu.Item>
          <Menu.Item >      
            <NavLink to='/'>{ text[lang].schedule }</NavLink>
          </Menu.Item>        
          <Menu.Item >      
            <NavLink to='/'>{ text[lang].schedule }</NavLink>
          </Menu.Item>
          <Menu.Item >      
            <NavLink to='/'>{ text[lang].schedule }</NavLink>
          </Menu.Item>        
      </SubMenu>

  

      <SubMenu
        title={
          <span className="submenu-title-wrapper">
            <Icon type="setting" />
            { text[lang].preference }
          </span>
        }
      >        
          <Menu.Item >      
            <NavLink to='/set'>{ text[lang].preference }</NavLink>
          </Menu.Item>
          <Menu.Item >      
            <NavLink to='/tep'>{ text[lang].tep }</NavLink>
          </Menu.Item>        
          <Menu.Item >      
           <NavLink to='/set'>{ text[lang].preference }</NavLink>
          </Menu.Item>
          <Menu.Item >      
           <NavLink to='/set'>{ text[lang].preference }</NavLink>
          </Menu.Item>        
      </SubMenu>
        
      <SubMenu
        title={
          <span className="submenu-title-wrapper">
            <Icon type="setting" />
            {text[lang].preference}
          </span>
        }
      >        
          <Menu.Item >      
            <NavLink to='/set'>{text[lang].preference}</NavLink>
          </Menu.Item>
          <Menu.Item >      
            <NavLink to='/set'>{text[lang].preference}</NavLink>
          </Menu.Item>        
          <Menu.Item >      
           <NavLink to='/set'>{text[lang].preference}</NavLink>
          </Menu.Item>
          <Menu.Item >      
           <NavLink to='/set'>{text[lang].preference}</NavLink>
          </Menu.Item>        
      </SubMenu>
      <SubMenu
        title={
          <span className="submenu-title-wrapper">
            <Icon type="setting" />
            {text[lang].preference}
          </span>
        }
      >        
          <Menu.Item >      
            <NavLink to='/set'>{text[lang].preference}</NavLink>
          </Menu.Item>
          <Menu.Item >      
            <NavLink to='/set'>{text[lang].preference}</NavLink>
          </Menu.Item>        
          <Menu.Item >      
           <NavLink to='/set'>{text[lang].preference}</NavLink>
          </Menu.Item>
          <Menu.Item >      
           <NavLink to='/set'>{text[lang].preference}</NavLink>
          </Menu.Item>        
      </SubMenu>

      <SubMenu
        title={
          <span className="submenu-title-wrapper">
            <Icon type="setting" />
            {text[lang].preference}
          </span>
        }
      >        
          <Menu.Item >      
            <NavLink to='/set'>{text[lang].preference}</NavLink>
          </Menu.Item>
          <Menu.Item >      
            <NavLink to='/set'>{text[lang].preference}</NavLink>
          </Menu.Item>        
          <Menu.Item >      
           <NavLink to='/set'>{text[lang].preference}</NavLink>
          </Menu.Item>
          <Menu.Item >      
           <NavLink to='/set'>{text[lang].preference}</NavLink>
          </Menu.Item>        
      </SubMenu>

      <SubMenu
        title={
          <span className="submenu-title-wrapper">
            <Icon type="setting" />
            {text[lang].preference}
          </span>
        }
      >        
          <Menu.Item >      
            <NavLink to='/set'>{text[lang].preference}</NavLink>
          </Menu.Item>
          <Menu.Item >      
            <NavLink to='/set'>{text[lang].preference}</NavLink>
          </Menu.Item>        
          <Menu.Item >      
           <NavLink to='/set'>{text[lang].preference}</NavLink>
          </Menu.Item>
          <Menu.Item >      
           <NavLink to='/set'>{text[lang].preference}</NavLink>
          </Menu.Item>        
      </SubMenu>
  </Menu>
  )
}
export default Navigation

