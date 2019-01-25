# Taro小程序登录Demo

## Features
+ 使用ES7 async/await处理异步
+ 使用Mobx处理状态
+ 使用taro-ui
+ 使用typescript

## 部分代码展示

```typescript
import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtAvatar, AtButton } from 'taro-ui'

import './index.scss'

type PageStateProps = {
  session: {
    user: any,
    logged: Function,
    logout: Function
  }
}

interface Index {
  props: PageStateProps;
}

@inject('session')
@observer
class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const {session: {user}} = this.props
    const User = (
      <View className="header">
        <View className="user">
          <AtAvatar className="user_avatar" image={user.avatarUrl} />
          <View className="user_info">
            <Text className="user_info_nickname">{user.nickName}</Text>
            <Text className="user_info_address">{user.province} {user.city}</Text>
          </View>
        </View>
        <AtButton type="primary" onClick={this.handleLogout}>退出登录</AtButton>
      </View>
    )
    const Login = (
      <AtButton onClick={this.handleLogin} type="primary">登录</AtButton>
    )
    return (
      <View className="index">
        {user ? User : Login}
      </View>
    )
  }

  handleLogout = async () => {
    this.props.session.logout()
  }
  handleLogin = async () => {
    try {
      await Taro.showLoading({mask: true, title: '登录中'})
      await Taro.login()
      const userInfo = await Taro.getUserInfo({lang: 'zh_CN'})
      this.props.session.logged(userInfo.userInfo)
    } catch (e) {
      await Taro.showToast({title: e.message})
    } finally {
      await Taro.hideLoading()
    }
  }
}

export default Index  as ComponentType
```

## 鸣谢
+ [Taro](https://github.com/NervJS/taro)
+ [Taro-UI](https://github.com/NervJS/taro-ui)
