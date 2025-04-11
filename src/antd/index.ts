import Vue from 'vue'
import {Button, Layout, Menu, Breadcrumb, Icon} from "ant-design-vue";

const initAntd = () => {
    Vue.component('AButton', Button)
    Vue.component('ALayout', Layout)
    Vue.component('ALayoutHeader', Layout.Header)
    Vue.component('ALayoutContent', Layout.Content)
    Vue.component('ALayoutSider', Layout.Sider)
    Vue.component('AMenu', Menu)
    Vue.component('AMenuItem', Menu.Item)
    Vue.component('ASubMenu', Menu.SubMenu)
    Vue.component('ABreadcrumb', Breadcrumb)
    Vue.component('ABreadcrumbItem', Breadcrumb.Item)
    Vue.component('AIcon', Icon)
}

export default initAntd
