import MySQLIcon from "@/assets/icons/mysql-logo-svgrepo-com.svg";
import {NodeData, NodeProp, NodeType, Variable} from "@/node/types";
import {CellStatus} from "@/node/index";

export class MySQLProp implements NodeProp {
  readonly attrText = {         // 对应属性在配置栏中显示的名称
    name: "module 名称",
    source: "组件入口位置",
    zh_name: "中文名称",
    module_type: "module 类型",
    vsphere: "平台连接信息",
    control: "主控节点连接信息",
    db: "模板连接信息",
    vm_template: "vm 使用的模板名称",
    vm_datastore: "vm 使用的数据中心名称",
    vm_network: "vm 使用的网络名称",
    vm_netmask: "vm 使用的网络掩码",
    vm_gateway: "vm 使用的网关地址",
    vm_linkedClone: "vm 使用的克隆类型",
    vm_dns: "vm 的 DNS",
    vm_domain: "vm 的域",
    vm_timeout: "vm 创建的超时时间 (分钟)",
    wait_create_vm: "等待 vm 创建时间 (秒)",
    vm_ip: "vm 使用的 ip 地址",
    vm_disk: "vm 的磁盘大小 (GB)",
    vm_cpu: "vm 的 cpu 大小 (核)",
    vm_ram: "vm 的内存大小 (MB)",
    vm_name: "vm 名称",
    db_name: "db 名称",
    db_character: "db 字符集",
    db_collate: "db 排序规则",
    db_user: "db 用户名",
    db_password: "db 密码",
    db_port: "db 端口",
    db_schema: "db 模式名(根据实际情况填写，没有则默认为\"\"即可)",
  }

  readonly fixedValue =
    // new Set<string>(["name", "source", "zh_name", "module_type", "vsphere", "control", "db"]);
    new Set<string>(["source", "zh_name", "module_type", "vsphere", "control", "db"]);

  readonly type = NodeType.MYSQL;
  readonly icon = MySQLIcon;

  data(): NodeData {
    return {
      module: {
        name: "vsphere-mysql",              //【固定值】 指定module名称
        source: "./modules/vsphere/mysql/", //【固定值】指定组件入口位置
        zh_name: "MySql8021数据库",          //【固定值】指定中文名称
        module_type: "db",                  //【固定值】指定module类型
        vsphere: {                          //【固定值】指定平台连接信息
          cluster: new Variable("var.vsphere_cluster"),
          datacenter: new Variable("var.vsphere_datacenter"),
          vcenter: new Variable("var.vsphere_vcenter"),
          user: new Variable("var.vsphere_user"),
          password: new Variable("var.vsphere_password"),
          unverifiedSsl: new Variable("var.vsphere_unverifiedSsl"),
        },
        control: {                          //【固定值】指定主控节点连接信息
          host: new Variable("module.vsphere.mysql_ip"),
          port: new Variable("var.control_port"),
          type: new Variable("var.control_type"),
          user: new Variable("var.control_user"),
          password: new Variable("var.control_password"),
          insecure: new Variable("var.control_insecure"),
        },
        db: {                               //【固定值】指定模板连接信息
          host_ip: new Variable("var.db_host_ip"),
          host_port: new Variable("var.db_host_port"),
          host_user: new Variable("var.db_host_user"),
          host_password: new Variable("var.db_host_password"),
        },
        vm_template: "template_mysql8021_yg_20230111",  //【平台配置值】指定vm使用的模板名称
        vm_datastore: "datastore2",                     //【平台配置值】指定vm使用的数据中心名称
        vm_network: "VM Network",                       //【平台配置值】指定vm使用的网络名称
        vm_netmask: "24",                               //【平台配置值】指定vm使用的网络掩码
        vm_gateway: "192.168.130.254",                  //【平台配置值】指定vm使用的网关地址
        vm_linkedClone: "false",                        //【平台配置值】指定vm使用的克隆类型
        vm_dns: "8.8.8.8",                              //【平台配置值】定义vm的DNS
        vm_domain: "localhost",                         //【平台配置值】定义vm的域
        vm_timeout: "20",                               //【平台配置值】指定vm创建的超时时间(分钟)
        wait_create_vm: "300s",                         //【平台配置值】等待vm创建时间(秒)
        vm_ip: "192.168.130.249",                       //【平台配置值-需确认】指定vm使用的ip地址
        vm_disk: [50],                                  //【平台配置值-需确认】定义vm的磁盘大小(GB)  *磁盘数量固定*
        vm_cpu: 2,                                      //【平台配置值-需确认】定义vm的cpu大小(核)
        vm_ram: 2048,                                   //【平台配置值-需确认】定义vm的内存大小(MB)
        vm_name: "iac-szxd-mysql8021",                  //【自定义值】定义vm名称
        db_name: "szxd",                                //【自定义值】定义db名称
        db_character: "utf8",                           //【自定义值】定义db字符集
        db_collate: "utf8_general_ci",                  //【自定义值】定义db排序规则
        db_user: "chita",                               //【自定义值】定义db用户名
        db_password: "Cc123!@#",                        //【自定义值】定义db密码
        db_port: "33066",                               //【自定义值】定义db端口
        db_schema: "",                                  //【自定义值】定义db模式名(根据实际情况填写，没有则默认为""即可)
        //【***此组件为数据库需要初始化sql*** sql文件覆盖 ./modules/vsphere/mysql/ansible-playbook/files/init.sql 文件尽可能小一些】

        /* 对其他module提供可用引用为如下
         * host
         * port
         * user
         * password
         * name
         * schema
         */
      },
      fixed_value: this.fixedValue,
      text: this.attrText,
      type: this.type,
      status: CellStatus.DEFAULT
    };
  }
}