import Vue from 'vue'
import {
  Breadcrumb,
  Button,
  Collapse,
  Drawer,
  Dropdown, Form,
  Icon, Input,
  Layout,
  List,
  Menu,
  Select,
  Tabs,
  Tag,
  Tooltip,
} from "ant-design-vue";

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
  // a-select
  Vue.component('ASelect', Select)
  Vue.component('ASelectOption', Select.Option)
  // a-tabs
  Vue.component('ATabs', Tabs)
  Vue.component('ATabPane', Tabs.TabPane)
  // a-tag
  Vue.component('ATag', Tag);
  // a-drawer
  Vue.component('ADrawer', Drawer);
  Vue.use(Drawer); // fixed: Failed to resolve directive: ant-portal
  //
  // Vue.component('ATypography', Typography)
  // a-form
  Vue.component('AForm', Form);
  Vue.component('AFormItem', Form.Item);
  Vue.component('AInput', Input);

}

export default initAntd
