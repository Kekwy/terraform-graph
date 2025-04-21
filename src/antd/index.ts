import Vue from 'vue'
import {Breadcrumb, Button, Collapse, Dropdown, Icon, Layout, List, Menu, Tooltip} from "ant-design-vue";

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
  Vue.component('ACollapse', Collapse)
  Vue.component('ACollapsePanel', Collapse.Panel)
  Vue.component('AList', List)
  Vue.component('AListItem', List.Item)
  Vue.component('ADropdown', Dropdown)
  Vue.component('ATooltip', Tooltip)
}

export default initAntd
