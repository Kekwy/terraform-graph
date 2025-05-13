import Vue from "vue";
import {
  Breadcrumb,
  Button,
  Collapse,
  Descriptions,
  Drawer,
  Dropdown,
  Form,
  Icon,
  Input,
  InputNumber,
  Layout,
  List,
  Menu,
  Select,
  Tabs,
  Tag,
  Tooltip,
} from "ant-design-vue";

// 手动注册 antd 组件，解决在标签中使用 antd 组件时 IDE 报错的问题。
const initAntd = () => {
  Vue.component("AButton", Button);
  Vue.component("ALayout", Layout);
  Vue.component("ALayoutHeader", Layout.Header);
  Vue.component("ALayoutContent", Layout.Content);
  Vue.component("ALayoutSider", Layout.Sider);
  Vue.component("AMenu", Menu);
  Vue.component("AMenuItem", Menu.Item);
  Vue.component("ASubMenu", Menu.SubMenu);
  Vue.component("ABreadcrumb", Breadcrumb);
  Vue.component("ABreadcrumbItem", Breadcrumb.Item);
  Vue.component("AIcon", Icon);
  Vue.component("ACollapse", Collapse);
  Vue.component("ACollapsePanel", Collapse.Panel);
  Vue.component("AList", List);
  Vue.component("AListItem", List.Item);
  Vue.component("ADropdown", Dropdown);
  Vue.component("ATooltip", Tooltip);
  // a-select
  Vue.component("ASelect", Select);
  Vue.component("ASelectOption", Select.Option);
  // a-tabs
  Vue.component("ATabs", Tabs);
  Vue.component("ATabPane", Tabs.TabPane);
  // a-tag
  Vue.component("ATag", Tag);
  // a-drawer
  Vue.component("ADrawer", Drawer);
  Vue.use(Drawer); // fixed: Failed to resolve directive: ant-portal
  //
  // Vue.component('ATypography', Typography)
  // a-form
  Vue.component("AForm", Form);
  Vue.component("AFormItem", Form.Item);
  Vue.component("AInput", Input);
  Vue.component("AInputNumber", InputNumber);
  // a-descriptions
  Vue.component("ADescriptions", Descriptions);
  Vue.component("ADescriptionsItem", Descriptions.Item);
};

export default initAntd;
