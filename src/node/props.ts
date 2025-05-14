import {
  CellStatus,
  NodeData,
  NodeProp,
  NodeType,
  Variable,
} from "@/node/index";
import RedisClusterIcon from "@/assets/icons/redis-opened-svgrepo-com.svg";
import PostgresqlIcon from "@/assets/icons/postgresql-svgrepo-com.svg";
import OracleIcon from "@/assets/icons/oracle-svgrepo-com.svg";

export class RedisClusterProps implements NodeProp {
  readonly icon = RedisClusterIcon;
  readonly type = NodeType.REDIS_CLUSTER;
  readonly fixedValue =
    // new Set<string>(["name", "source", "zh_name", "module_type", "kubernetes"]);
    new Set<string>(["source", "zh_name", "module_type", "kubernetes"]);

  readonly attrText = {
    // 对应属性在配置栏中显示的名称
    name: "实例名称",
    source: "组件入口位置",
    zh_name: "中文名称",
    module_type: "module 类型",
    kubernetes: "平台连接信息",
    wait_namespace_create: "等待 namespace 创建时间(秒)",
    rediscluster_name: "rediscluster 的名称",
    rediscluster_namespace: "rediscluster 的命名空间名称",
    redis_limits_cpu: "redis 最大的 cpu 资源",
    redis_limits_memory: "redis 最大的内存资源",
    redis_requests_cpu: "redis 请求的 cpu 资源",
    redis_requests_memory: "redis 请求的内存资源",
    redisExporter_limits_cpu: "redisExporter 最大的 cpu 资源",
    redisExporter_limits_memory: "redisExporter 最大的内存资源",
    redisExporter_requests_cpu: "redisExporter 请求的 cpu 资源",
    redisExporter_requests_memory: "redisExporter 请求的内存资源",
    redis_requests_storage: "redis 请求的存储空间大小",
    redis_password: "redis 的密码",
  };

  data(): NodeData {
    return {
      module: {
        name: "",
        source: "./modules/k8s/rediscluster/", // 【固定值】指定组件入口位置
        zh_name: "Redis6.2.5 集群", // 【固定值】指定中文名称
        module_type: "db", // 【固定值】指定module类型
        kubernetes: {
          // 【固定值】指定平台连接信息
          host: new Variable("var.kubernetes.host"),
          client_certificate: new Variable("var.kubernetes.client_certificate"),
          client_key: new Variable("var.kubernetes.client_key"),
          cluster_ca_certificate: new Variable(
            "var.kubernetes.cluster_ca_certificate"
          ),
        },
        wait_namespace_create: "60s", // 【平台配置值】等待namespace创建时间(秒)
        rediscluster_name: "iac-rediscluster", // 【平台配置值-需确认】指定rediscluster的名称
        rediscluster_namespace: new Variable("module.k8s-namespace.name"), // 【平台配置值-需确认】指定redis的命名空间名称
        redis_limits_cpu: "4000m", // 【平台配置值-需确认】指定rediscluster最大的cpu资源
        redis_limits_memory: "8Gi", // 【平台配置值-需确认】指定redis最大的内存资源
        redis_requests_cpu: "1000m", // 【平台配置值-需确认】指定redis请求的cpu资源
        redis_requests_memory: "2Gi", // 【平台配置值-需确认】指定redis请求的内存资源
        redisExporter_limits_cpu: "1000m", //【平台配置值-需确认】指定redisExporter最大的cpu资源
        redisExporter_limits_memory: "1Gi", //【平台配置值-需确认】指定redisExporter最大的内存资源
        redisExporter_requests_cpu: "100m", //【平台配置值-需确认】指定redisExporter请求的cpu资源
        redisExporter_requests_memory: "128Mi", //【平台配置值-需确认】指定redisExporter请求的内存资源
        redis_requests_storage: "5Gi", //【平台配置值-需确认】指定redis请求的存储空间大小
        redis_password: new Variable('base64encode("")'), //【平台配置值-需确认】指定redis的密码

        /* 对其他module提供可用引用为如下
         * host (k8s中svc名称)
         * port (k8s中svc端口)
         * user
         * password
         */
      },
      fixed_value: this.fixedValue,
      text: this.attrText,
      type: this.type,
      status: CellStatus.DEFAULT,
    };
  }
}

export class OracleProps implements NodeProp {
  readonly icon = OracleIcon;
  readonly type = NodeType.ORACLE;
  readonly fixedValue =
    // new Set<string>(["name", "source", "zh_name", "module_type", "kubernetes"]);
    new Set<string>(["source", "zh_name", "module_type", "vsphere", "control", "db"]);

  readonly attrText = {
    // 对应属性在配置栏中显示的名称
    name: "实例名称",
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
    vm_timeout: "vm 创建的超时时间(分钟)",
    wait_create_vm: "vm 创建时间(秒)",
    vm_ip: "vm 使用的 ip 地址",
    vm_disk: "vm 的磁盘大小(GB)",
    vm_cpu: "vm 的 cpu 大小(核)  ",
    vm_ram: "vm 的内存大小(MB) ",
    vm_name: "vm 名称",
    db_name: "db 名称",
    db_character: "db 字符集",
    db_collate: "db 排序规则",
    db_user: "db 用户名",
    db_password: "db 密码",
    db_port: "db 端口",
    db_schema: "db 模式名",
  };

  data(): NodeData {
    return {
      module: {
        name: "",
        source: "./modules/vsphere/oracle/",
        zh_name: "Oracle11g数据库",
        module_type: "db",
        vsphere: {
          cluster: new Variable("var.vsphere_cluster"),
          datacenter: new Variable("var.vsphere_datacenter"),
          vcenter: new Variable("var.vsphere_vcenter"),
          user: new Variable("var.vsphere_user"),
          password: new Variable("var.vsphere_password"),
          unverifiedSsl: new Variable("var.vsphere_unverifiedSsl"),
        },
        control: {
          host: new Variable("module.vsphere.oracle_ip"),
          port: new Variable("var.control_port"),
          type: new Variable("var.control_type"),
          user: new Variable("var.control_user"),
          password: new Variable("var.control_password"),
          insecure: new Variable("var.control_insecure"),
        },
        db: {
          host_ip: new Variable("var.db_host_ip"),
          host_port: new Variable("var.db_host_port"),
          host_user: new Variable("var.db_host_user"),
          host_password: new Variable("var.db_host_password"),
        },
        vm_template: "template_ora11g_yg_20230111",
        vm_datastore: "datastore2",
        vm_network: "VM Network",
        vm_netmask: "24",
        vm_gateway: "192.168.130.254",
        vm_linkedClone: "false",
        vm_dns: "8.8.8.8",
        vm_domain: "localhost",
        vm_timeout: "20",
        wait_create_vm: "300s",
        vm_ip: "192.168.130.249",
        vm_disk: [100, 60, 60],
        vm_cpu: 2,
        vm_ram: 2048,
        vm_name: "iac-szxd-oracle11g",
        db_name: "szxd",
        db_character: "UTF8",
        db_collate: "utf8_general_ci",
        db_user: "chita",
        db_password: "Cc123!@#",
        db_port: "33066",
        db_schema: "",
      },
      fixed_value: this.fixedValue,
      text: this.attrText,
      type: this.type,
      status: CellStatus.DEFAULT,
    };
  }
}

export class PostgresqlProps implements NodeProp {
  readonly icon = PostgresqlIcon;
  readonly type = NodeType.POSTGRESQL;
  readonly fixedValue =
    // new Set<string>(["name", "source", "zh_name", "module_type", "kubernetes"]);
    new Set<string>(["source", "zh_name", "module_type", "vsphere", "control"]);

  readonly attrText = {
    // 对应属性在配置栏中显示的名称
    name: "实例名称",
    source: "组件入口位置",
    zh_name: "中文名称",
    module_type: "module 类型",
    vsphere: "平台连接信息",
    control: "主控节点连接信息",
    vm_template: "vm 使用的模板名称",
    vm_datastore: "vm 使用的数据中心名称",
    vm_network: "vm 使用的网络名称",
    vm_netmask: "vm 使用的网络掩码",
    vm_gateway: "vm 使用的网关地址",
    vm_linkedClone: "vm 使用的克隆类型",
    vm_dns: "vm 的 DNS",
    vm_domain: "vm 的域",
    vm_timeout: "vm 创建的超时时间(分钟)",
    wait_create_vm: "vm 创建时间(秒)",
    vm_ip: "vm 使用的 ip 地址",
    vm_disk: "vm 的磁盘大小(GB)",
    vm_cpu: "vm 的 cpu 大小(核)  ",
    vm_ram: "vm 的内存大小(MB) ",
    vm_name: "vm 名称",
    db_path: "db 数据存放目录",
    db_base: "db 数据库名",
    db_character: "db 字符集",
    db_collate: "db 排序规则",
    db_ctype: "db 字符类型",
    db_user: "db 用户名",
    db_password: "db 密码",
    db_port: "db 端口",
    db_schema: "db 模式名",
  };

  data(): NodeData {
    return {
      module: {
        name: "vsphere-postgresql",
        source: "./modules/vsphere/postgresql/",
        zh_name: "PostgreSQL118数据库",
        module_type: "db",
        vsphere: {
          cluster: new Variable("var.vsphere_cluster"),
          datacenter: new Variable("var.vsphere_datacenter"),
          vcenter: new Variable("var.vsphere_vcenter"),
          user: new Variable("var.vsphere_user"),
          password: new Variable("var.vsphere_password"),
          unverifiedSsl: new Variable("var.vsphere_unverifiedSsl"),
        },
        control: {
          host: new Variable("module.vsphere.postgresql_ip"),
          port: new Variable("var.control_port"),
          type: new Variable("var.control_type"),
          user: new Variable("var.control_user"),
          password: new Variable("var.control_password"),
          insecure: new Variable("var.control_insecure"),
        },
        vm_template: "template_pg118_yg_20230111",
        vm_datastore: "datastore2",
        vm_network: "VM Network",
        vm_netmask: "24",
        vm_gateway: "192.168.130.254",
        vm_linkedClone: "false",
        vm_dns: "8.8.8.8",
        vm_domain: "localhost",
        vm_timeout: "20",
        wait_create_vm: "300s",
        vm_ip: "192.168.130.249",
        vm_disk: [100, 60, 60],
        vm_cpu: 2,
        vm_ram: 2048,
        vm_name: "iac-szxd-postgresql118",
        db_path: "/usr/pgsql-11/data",
        db_base: "testdb",
        db_character: "UTF8",
        db_collate: "en_US.UTF-8",
        db_ctype: "en_US.UTF-8",
        db_user: "test",
        db_password: "123456",
        db_port: "30323",
        db_schema: "testschema",
      },
      fixed_value: this.fixedValue,
      text: this.attrText,
      type: this.type,
      status: CellStatus.DEFAULT,
    };
  }
}


export class MongodbProps implements NodeProp {
  readonly icon = RedisClusterIcon;
  readonly type = NodeType.REDIS_CLUSTER;
  readonly fixedValue =
    // new Set<string>(["name", "source", "zh_name", "module_type", "kubernetes"]);
    new Set<string>(["source", "zh_name", "module_type", "kubernetes"]);

  readonly attrText = {
    // 对应属性在配置栏中显示的名称
    name: "实例名称",
    source: "组件入口位置",
    zh_name: "中文名称",
    module_type: "module 类型",
    kubernetes: "平台连接信息",
    wait_namespace_create: "等待 namespace 创建时间(秒)",
    redis_name: "redis 的名称",
    redis_namespace: "redis 的命名空间名称",
    redis_limits_cpu: "redis 最大的 cpu 资源",
    redis_limits_memory: "redis 最大的内存资源",
    redis_requests_cpu: "redis 请求的 cpu 资源",
    redis_requests_memory: "redis 请求的内存资源",
    redisExporter_limits_cpu: "redisExporter 最大的 cpu 资源",
    redisExporter_limits_memory: "redisExporter 最大的内存资源",
    redisExporter_requests_cpu: "redisExporter 请求的 cpu 资源",
    redisExporter_requests_memory: "redisExporter 请求的内存资源",
    redis_requests_storage: "redis 请求的存储空间大小",
    redis_password: "redis 的密码",
  };

  data(): NodeData {
    return {
      module: {},
      fixed_value: this.fixedValue,
      text: this.attrText,
      type: this.type,
      status: CellStatus.DEFAULT,
    };
  }
}

export class OpenguassProps implements NodeProp {
  readonly icon = RedisClusterIcon;
  readonly type = NodeType.REDIS_CLUSTER;
  readonly fixedValue =
    // new Set<string>(["name", "source", "zh_name", "module_type", "kubernetes"]);
    new Set<string>(["source", "zh_name", "module_type", "kubernetes"]);

  readonly attrText = {
    // 对应属性在配置栏中显示的名称
    name: "实例名称",
    source: "组件入口位置",
    zh_name: "中文名称",
    module_type: "module 类型",
    kubernetes: "平台连接信息",
    wait_namespace_create: "等待 namespace 创建时间(秒)",
    redis_name: "redis 的名称",
    redis_namespace: "redis 的命名空间名称",
    redis_limits_cpu: "redis 最大的 cpu 资源",
    redis_limits_memory: "redis 最大的内存资源",
    redis_requests_cpu: "redis 请求的 cpu 资源",
    redis_requests_memory: "redis 请求的内存资源",
    redisExporter_limits_cpu: "redisExporter 最大的 cpu 资源",
    redisExporter_limits_memory: "redisExporter 最大的内存资源",
    redisExporter_requests_cpu: "redisExporter 请求的 cpu 资源",
    redisExporter_requests_memory: "redisExporter 请求的内存资源",
    redis_requests_storage: "redis 请求的存储空间大小",
    redis_password: "redis 的密码",
  };

  data(): NodeData {
    return {
      module: {},
      fixed_value: this.fixedValue,
      text: this.attrText,
      type: this.type,
      status: CellStatus.DEFAULT,
    };
  }
}

export class NginxProps implements NodeProp {
  readonly icon = RedisClusterIcon;
  readonly type = NodeType.REDIS_CLUSTER;
  readonly fixedValue =
    // new Set<string>(["name", "source", "zh_name", "module_type", "kubernetes"]);
    new Set<string>(["source", "zh_name", "module_type", "kubernetes"]);

  readonly attrText = {
    // 对应属性在配置栏中显示的名称
    name: "实例名称",
    source: "组件入口位置",
    zh_name: "中文名称",
    module_type: "module 类型",
    kubernetes: "平台连接信息",
    wait_namespace_create: "等待 namespace 创建时间(秒)",
    redis_name: "redis 的名称",
    redis_namespace: "redis 的命名空间名称",
    redis_limits_cpu: "redis 最大的 cpu 资源",
    redis_limits_memory: "redis 最大的内存资源",
    redis_requests_cpu: "redis 请求的 cpu 资源",
    redis_requests_memory: "redis 请求的内存资源",
    redisExporter_limits_cpu: "redisExporter 最大的 cpu 资源",
    redisExporter_limits_memory: "redisExporter 最大的内存资源",
    redisExporter_requests_cpu: "redisExporter 请求的 cpu 资源",
    redisExporter_requests_memory: "redisExporter 请求的内存资源",
    redis_requests_storage: "redis 请求的存储空间大小",
    redis_password: "redis 的密码",
  };

  data(): NodeData {
    return {
      module: {},
      fixed_value: this.fixedValue,
      text: this.attrText,
      type: this.type,
      status: CellStatus.DEFAULT,
    };
  }
}

export class NamespaceProps implements NodeProp {
  readonly icon = RedisClusterIcon;
  readonly type = NodeType.REDIS_CLUSTER;
  readonly fixedValue =
    // new Set<string>(["name", "source", "zh_name", "module_type", "kubernetes"]);
    new Set<string>(["source", "zh_name", "module_type", "kubernetes"]);

  readonly attrText = {
    // 对应属性在配置栏中显示的名称
    name: "实例名称",
    source: "组件入口位置",
    zh_name: "中文名称",
    module_type: "module 类型",
    kubernetes: "平台连接信息",
    wait_namespace_create: "等待 namespace 创建时间(秒)",
    redis_name: "redis 的名称",
    redis_namespace: "redis 的命名空间名称",
    redis_limits_cpu: "redis 最大的 cpu 资源",
    redis_limits_memory: "redis 最大的内存资源",
    redis_requests_cpu: "redis 请求的 cpu 资源",
    redis_requests_memory: "redis 请求的内存资源",
    redisExporter_limits_cpu: "redisExporter 最大的 cpu 资源",
    redisExporter_limits_memory: "redisExporter 最大的内存资源",
    redisExporter_requests_cpu: "redisExporter 请求的 cpu 资源",
    redisExporter_requests_memory: "redisExporter 请求的内存资源",
    redis_requests_storage: "redis 请求的存储空间大小",
    redis_password: "redis 的密码",
  };

  data(): NodeData {
    return {
      module: {},
      fixed_value: this.fixedValue,
      text: this.attrText,
      type: this.type,
      status: CellStatus.DEFAULT,
    };
  }
}

export class KafkaZookeeperProps implements NodeProp {
  readonly icon = RedisClusterIcon;
  readonly type = NodeType.REDIS_CLUSTER;
  readonly fixedValue =
    // new Set<string>(["name", "source", "zh_name", "module_type", "kubernetes"]);
    new Set<string>(["source", "zh_name", "module_type", "kubernetes"]);

  readonly attrText = {
    // 对应属性在配置栏中显示的名称
    name: "实例名称",
    source: "组件入口位置",
    zh_name: "中文名称",
    module_type: "module 类型",
    kubernetes: "平台连接信息",
    wait_namespace_create: "等待 namespace 创建时间(秒)",
    redis_name: "redis 的名称",
    redis_namespace: "redis 的命名空间名称",
    redis_limits_cpu: "redis 最大的 cpu 资源",
    redis_limits_memory: "redis 最大的内存资源",
    redis_requests_cpu: "redis 请求的 cpu 资源",
    redis_requests_memory: "redis 请求的内存资源",
    redisExporter_limits_cpu: "redisExporter 最大的 cpu 资源",
    redisExporter_limits_memory: "redisExporter 最大的内存资源",
    redisExporter_requests_cpu: "redisExporter 请求的 cpu 资源",
    redisExporter_requests_memory: "redisExporter 请求的内存资源",
    redis_requests_storage: "redis 请求的存储空间大小",
    redis_password: "redis 的密码",
  };

  data(): NodeData {
    return {
      module: {},
      fixed_value: this.fixedValue,
      text: this.attrText,
      type: this.type,
      status: CellStatus.DEFAULT,
    };
  }
}

export class EsKiProps implements NodeProp {
  readonly icon = RedisClusterIcon;
  readonly type = NodeType.REDIS_CLUSTER;
  readonly fixedValue =
    // new Set<string>(["name", "source", "zh_name", "module_type", "kubernetes"]);
    new Set<string>(["source", "zh_name", "module_type", "kubernetes"]);

  readonly attrText = {
    // 对应属性在配置栏中显示的名称
    name: "实例名称",
    source: "组件入口位置",
    zh_name: "中文名称",
    module_type: "module 类型",
    kubernetes: "平台连接信息",
    wait_namespace_create: "等待 namespace 创建时间(秒)",
    redis_name: "redis 的名称",
    redis_namespace: "redis 的命名空间名称",
    redis_limits_cpu: "redis 最大的 cpu 资源",
    redis_limits_memory: "redis 最大的内存资源",
    redis_requests_cpu: "redis 请求的 cpu 资源",
    redis_requests_memory: "redis 请求的内存资源",
    redisExporter_limits_cpu: "redisExporter 最大的 cpu 资源",
    redisExporter_limits_memory: "redisExporter 最大的内存资源",
    redisExporter_requests_cpu: "redisExporter 请求的 cpu 资源",
    redisExporter_requests_memory: "redisExporter 请求的内存资源",
    redis_requests_storage: "redis 请求的存储空间大小",
    redis_password: "redis 的密码",
  };

  data(): NodeData {
    return {
      module: {},
      fixed_value: this.fixedValue,
      text: this.attrText,
      type: this.type,
      status: CellStatus.DEFAULT,
    };
  }
}

export class AbcProps implements NodeProp {
  readonly icon = RedisClusterIcon;
  readonly type = NodeType.REDIS_CLUSTER;
  readonly fixedValue =
    // new Set<string>(["name", "source", "zh_name", "module_type", "kubernetes"]);
    new Set<string>(["source", "zh_name", "module_type", "kubernetes"]);

  readonly attrText = {
    // 对应属性在配置栏中显示的名称
    name: "实例名称",
    source: "组件入口位置",
    zh_name: "中文名称",
    module_type: "module 类型",
    kubernetes: "平台连接信息",
    wait_namespace_create: "等待 namespace 创建时间(秒)",
    redis_name: "redis 的名称",
    redis_namespace: "redis 的命名空间名称",
    redis_limits_cpu: "redis 最大的 cpu 资源",
    redis_limits_memory: "redis 最大的内存资源",
    redis_requests_cpu: "redis 请求的 cpu 资源",
    redis_requests_memory: "redis 请求的内存资源",
    redisExporter_limits_cpu: "redisExporter 最大的 cpu 资源",
    redisExporter_limits_memory: "redisExporter 最大的内存资源",
    redisExporter_requests_cpu: "redisExporter 请求的 cpu 资源",
    redisExporter_requests_memory: "redisExporter 请求的内存资源",
    redis_requests_storage: "redis 请求的存储空间大小",
    redis_password: "redis 的密码",
  };

  data(): NodeData {
    return {
      module: {},
      fixed_value: this.fixedValue,
      text: this.attrText,
      type: this.type,
      status: CellStatus.DEFAULT,
    };
  }
}
