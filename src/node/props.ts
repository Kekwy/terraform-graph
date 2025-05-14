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
import MongodbIcon from "@/assets/icons/mongodb-svgrepo-com.svg";
import OpenguassIcon from "@/assets/icons/openguass.svg";
import NginxIcon from "@/assets/icons/nginx-svgrepo-com.svg";
import KubernetesIcon from "@/assets/icons/kubernetes-svgrepo-com.svg";
import DefaultIcon from "@/assets/icons/deployment-unit-svgrepo-com.svg";

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
  readonly icon = MongodbIcon;
  readonly type = NodeType.MONGODB;
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
    db_database: "db 名称",
    db_collate: "db 排序规则",
    db_strength: "db 排序强度",
    db_user: "db 用户名",
    db_password: "db 密码",
    db_port: "db 端口",
    db_schema: "db 模式名",
  };

  data(): NodeData {
    return {
      module: {
        name: "",
        source: "./modules/vsphere/mongodb/",
        zh_name: "Mongodb42数据库",
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
          host: new Variable("module.vsphere.mongodb_ip"),
          port: new Variable("var.control_port"),
          type: new Variable("var.control_type"),
          user: new Variable("var.control_user"),
          password: new Variable("var.control_password"),
          insecure: new Variable("var.control_insecure"),
        },
        vm_template: "template_mongodb42_yg_20230111",
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
        vm_name: "iac-szxd-mongodb42",
        db_database: "testdb",
        db_collate: "en_US",
        db_strength: "1",
        db_user: "test",
        db_password: "123456",
        db_port: "54023",
        db_schema: "",
      },
      fixed_value: this.fixedValue,
      text: this.attrText,
      type: this.type,
      status: CellStatus.DEFAULT,
    };
  }
}

export class OpenguassProps implements NodeProp {
  readonly icon = OpenguassIcon;
  readonly type = NodeType.OPENGUASS;
  readonly fixedValue =
    // new Set<string>(["name", "source", "zh_name", "module_type", "kubernetes"]);
    new Set<string>(["source", "zh_name", "module_type", "openstack", "control", "db", "instance_key_pair"]);

  readonly attrText = {
    // 对应属性在配置栏中显示的名称
    name: "实例名称",
    source: "组件入口位置",
    zh_name: "中文名称",
    module_type: "module 类型",
    openstack: "平台连接信息",
    control: "主控节点连接信息",
    db: "模板连接信息",
    instance_key_pair: "实例密钥对名称",
    instance_image_name: "实例镜像模板名称",
    instance_network_name: "实例网络名称",
    wait_openstack_create: "等待 openguass 实例创建时间(秒)",
    instance_flavor_name: "实例规格名称",
    instance_name: "实例名称",
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
        source: "./modules/openstack/openguas/",
        zh_name: "Opengauss3.0.3数据库",
        module_type: "db",
        openstack: {
          user_name: new Variable("var.openstack.user_name"),
          tenant_name: new Variable("var.openstack.tenant_name"),
          password: new Variable("var.openstack.password"),
          auth_url: new Variable("var.openstack.auth_url"),
          region: new Variable("var.openstack.region"),
        },
        control: {
          host: new Variable("var.control_host"),
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
        instance_key_pair: new Variable("var.instance.key_pair"),
        instance_image_name: "centos75_20210303_10022_ygpt",
        instance_network_name: "ext_20.46.113.0/24",
        wait_openstack_create: "300s",
        instance_flavor_name: "4-8-50",
        instance_name: "iac-sdyjgl-openstack",
        db_name: "szxd",
        db_character: "utf8",
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
    }
      ;
  }
}

export class NginxProps implements NodeProp {
  readonly icon = NginxIcon;
  readonly type = NodeType.NGINX;
  readonly fixedValue =
    // new Set<string>(["name", "source", "zh_name", "module_type", "kubernetes"]);
    new Set<string>(["source", "zh_name", "module_type", "openstack", "control", "db", "instance_key_pair"]);

  readonly attrText = {
    // 对应属性在配置栏中显示的名称
    name: "实例名称",
    source: "组件入口位置",
    zh_name: "中文名称",
    module_type: "module 类型",
    openstack: "平台连接信息",
    control: "主控节点连接信息",
    db: "模板连接信息",
    instance_key_pair: "实例密钥对名称",
    instance_image_name: "实例镜像模板名称",
    instance_network_name: "实例网络名称",
    wait_openstack_create: "等待 openguass 实例创建时间(秒)",
    instance_flavor_name: "实例规格名称",
    instance_name: "实例名称",
  };

  data(): NodeData {
    return {
      module: {
        name: "",
        source: "./modules/openstack/nginx",
        zh_name: "Nginx1.22",
        module_type: "nginx",
        openstack: {
          user_name: new Variable("var.openstack.user_name"),
          tenant_name: new Variable("var.openstack.tenant_name"),
          password: new Variable("var.openstack.password"),
          auth_url: new Variable("var.openstack.auth_url"),
          region: new Variable("var.openstack.region"),
        },
        control: {
          host: new Variable("module.vsphere.nginx_ip"),
          port: new Variable("var.control_port"),
          type: new Variable("var.control_type"),
          user: new Variable("var.control_user"),
          password: new Variable("var.control_password"),
          insecure: new Variable("var.control_insecure"),
        },
        instance_key_pair: new Variable("var.instance.key_pair"),
        instance_image_name: "centos75_20210303_10022_ygpt",
        instance_network_name: "ext_20.46.113.0/24",
        wait_openstack_create: "300s",
        instance_flavor_name: "4-8-50",
        instance_name: "iac-sdyjgl-openstack",
      },
      fixed_value: this.fixedValue,
      text: this.attrText,
      type: this.type,
      status: CellStatus.DEFAULT,
    }
      ;
  }
}

export class NamespaceProps implements NodeProp {
  readonly icon = KubernetesIcon;
  readonly type = NodeType.NAMESPACE;
  readonly fixedValue =
    new Set<string>(["source", "zh_name", "module_type", "kubernetes"]);

  readonly attrText = {
    // 对应属性在配置栏中显示的名称
    name: "实例名称",
    source: "组件入口位置",
    zh_name: "中文名称",
    module_type: "module 类型",
    kubernetes: "平台连接信息",
    kubernetes_namespace: "k8s 命名空间名称",
  };

  data(): NodeData {
    return {
      module: {
        name: "",
        source: "./modules/k8s/namespace/",
        zh_name: "k8s 命名空间",
        module_type: "microservice",
        kubernetes: {
          // 【固定值】指定平台连接信息
          host: new Variable("var.kubernetes.host"),
          client_certificate: new Variable("var.kubernetes.client_certificate"),
          client_key: new Variable("var.kubernetes.client_key"),
          cluster_ca_certificate: new Variable(
            "var.kubernetes.cluster_ca_certificate"
          ),
        },
        kubernetes_namespace: "iac-sdyj",
      },
      fixed_value: this.fixedValue,
      text: this.attrText,
      type: this.type,
      status: CellStatus.DEFAULT,
    };
  }
}

export class KafkaZookeeperProps implements NodeProp {
  readonly icon = DefaultIcon;
  readonly type = NodeType.KAFKA_ZOOKEEPER;
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
    kz_name: "ZooKeeper&kafka 集群名称",
    kz_namespace: "ZooKeeper&kafka 集群的命名空间",
    kafka_cpu_limits: "kafka 最大的 cpu 资源",
    kafka_memory_limits: "kafka 最大的内存资源",
    kafka_cpu_requests: "kafka 请求的 cpu 资源",
    kafka_memory_requests: "kafka 请求的内存资源",
    kafka_jvm_xms: "kafka 的 JVM 初始堆内存大小(秒)",
    kafka_jvm_xmx: "kafka 的 JVM 最大堆内存大小",
    kafka_storage: "kafka 请求的存储空间大小",
    zookeeper_cpu_limits: "zookeeper 最大的 cpu 资源",
    zookeeper_memory_limits: "zookeeper 最大的内存资源",
    zookeeper_cpu_requests: "zookeeper 请求的 cpu 资源",
    zookeeper_memory_requests: "zookeeper 请求的内存资源",
    zookeeper_jvm_xms: "zookeeper 的 JVM 初始堆内存大小(秒)",
    zookeeper_jvm_xmx: "zookeeper 的 JVM 最大堆内存大小",
    zookeeper_storage: "zookeeper 请求的存储空间大小",
    eotlsSidecar_cpu_limits: "eotlsSidecar 最大的 cpu 资源",
    eotlsSidecar_memory_limits: "eotlsSidecar 最大的内存资源",
    eotlsSidecar_cpu_requests: "eotlsSidecar 请求的 cpu 资源",
    eotlsSidecar_memory_requests: "eotlsSidecar 请求的内存资源",
    eotopicOperator_cpu_limits: "eotopicOperator 最大的 cpu 资源",
    eotopicOperator_memory_limits: "eotopicOperator 最大的内存资源",
    eotopicOperator_cpu_requests: "eotopicOperator 请求的 cpu 资源",
    eotopicOperator_memory_requests: "eotopicOperator 请求的内存资源",
    eouserOperator_cpu_limits: "eouserOperator 最大的 cpu 资源",
    eouserOperator_memory_limits: "eouserOperator 最大的内存资源",
    eouserOperator_cpu_requests: "eouserOperator 请求的 cpu 资源",
    eouserOperator_memory_requests: "eouserOperator 请求的内存资源",
    kafkaExporter_cpu_limits: "kafkaExporter 最大的 cpu 资源",
    kafkaExporter_memory_limits: "kafkaExporter 最大的内存资源",
    kafkaExporter_cpu_requests: "kafkaExporter 请求的 cpu 资源",
    kafkaExporter_memory_requests: "kafkaExporter 请求的内存资源",
  };

  data(): NodeData {
    return {
      module: {
        name: "",
        source: "./modules/k8s/kafka-zookeeper/",
        zh_name: "ZooKeeper&kafka3.0.0集群",
        module_type: "middle",
        kubernetes: {
          host: new Variable("var.kubernetes.host"),
          client_certificate: new Variable("var.kubernetes.client_certificate"),
          client_key: new Variable("var.kubernetes.client_key"),
          cluster_ca_certificate: new Variable(
            "var.kubernetes.cluster_ca_certificate"
          ),
        },
        wait_namespace_create: "60s",
        kz_name: "kafka-3-0-0-20240329-1",
        kz_namespace: new Variable("module.k8s-namespace.name"),
        kafka_cpu_limits: "1",
        kafka_memory_limits: "1Gi",
        kafka_cpu_requests: "1",
        kafka_memory_requests: "1Gi",
        kafka_jvm_xms: "5G",
        kafka_jvm_xmx: "5G",
        kafka_storage: "5G",
        zookeeper_cpu_limits: "1",
        zookeeper_memory_limits: "1Gi",
        zookeeper_cpu_requests: "1",
        zookeeper_memory_requests: "1Gi",
        zookeeper_jvm_xms: "5G",
        zookeeper_jvm_xmx: "5G",
        zookeeper_storage: "5G",
        eotlsSidecar_cpu_limits: "1",
        eotlsSidecar_memory_limits: "1Gi",
        eotlsSidecar_cpu_requests: "1",
        eotlsSidecar_memory_requests: "1Gi",
        eotopicOperator_cpu_limits: "1",
        eotopicOperator_memory_limits: "1Gi",
        eotopicOperator_cpu_requests: "1",
        eotopicOperator_memory_requests: "1Gi",
        eouserOperator_cpu_limits: "1",
        eouserOperator_memory_limits: "1Gi",
        eouserOperator_cpu_requests: "1",
        eouserOperator_memory_requests: "1Gi",
        kafkaExporter_cpu_limits: "1",
        kafkaExporter_memory_limits: "1Gi",
        kafkaExporter_cpu_requests: "1",
        kafkaExporter_memory_requests: "1Gi",
      },
      fixed_value: this.fixedValue,
      text: this.attrText,
      type: this.type,
      status: CellStatus.DEFAULT,
    };
  }
}

export class EsKiProps implements NodeProp {
  readonly icon = DefaultIcon;
  readonly type = NodeType.ES_KI;
  readonly fixedValue =
    new Set<string>(["source", "zh_name", "module_type", "kubernetes"]);

  readonly attrText = {
    // 对应属性在配置栏中显示的名称
    name: "实例名称",
    source: "组件入口位置",
    zh_name: "中文名称",
    module_type: "module 类型",
    kubernetes: "平台连接信息",
    wait_namespace_create: "等待 namespace 创建时间(秒)",
    eski_name: "ElasticSearch&Kibana7.9.3 集群名称",
    eski_namespace: "ElasticSearch&Kibana7.9.3 集群的命名空间",
    es_master_storage: "ElasticSearch_master 请求的存储空间大小",
    es_master_storagename: "ElasticSearch_master 的存储名称",
    es_sysctl_cpu_limits: "ElasticSearch_sysctl 最大的cpu资源",
    es_sysctl_memory_limits: "ElasticSearch_sysctl 最大的内存资源",
    es_sysctl_cpu_requests: "ElasticSearch_sysctl 请求的 cpu 资源",
    es_sysctl_memory_requests: "ElasticSearch_sysctl 请求的内存资源",
    es_xms: "ElasticSearch 的 JVM 初始堆内存大小",
    es_xmx: "ElasticSearch 的 JVM最大堆内存大小",
    es_data_storage: "ElasticSearch_data 请求的存储空间大小",
    es_data_storagename: "ElasticSearch_data 的存储名称",
    es_cpu_limits: "ElasticSearch 最大的 cpu 资源",
    es_memory_limits: "ElasticSearch 最大的内存资源",
    es_cpu_requests: "ElasticSearch 请求的 cpu 资源",
    es_memory_requests: "ElasticSearch 请求的内存资源",
    kb_cpu_limits: "Kibana 最大的 cpu 资源",
    kb_memory_limits: "Kibana 最大的内存资源",
    kb_cpu_requests: "Kibana 请求的 cpu 资源",
    kb_memory_requests: "Kibana 请求的内存资源",
  };

  data(): NodeData {
    return {
      module: {
        name: "",
        source: "./modules/k8s/es-ki/",
        zh_name: "ElasticSearch&Kibana7.9.3 集群",
        module_type: "middle",
        kubernetes: {
          host: new Variable("var.kubernetes.host"),
          client_certificate: new Variable("var.kubernetes.client_certificate"),
          client_key: new Variable("var.kubernetes.client_key"),
          cluster_ca_certificate: new Variable(
            "var.kubernetes.cluster_ca_certificate"
          ),
        },
        wait_namespace_create: "60s",
        eski_name: "iac-eski",
        eski_namespace: new Variable("module.k8s-namespace.name"),
        es_master_storage: "10Gi",
        es_master_storagename: "rook-ceph-block",
        es_sysctl_cpu_limits: "1",
        es_sysctl_memory_limits: "1Gi",
        es_sysctl_cpu_requests: "1",
        es_sysctl_memory_requests: "1Gi",
        es_xms: "8g",
        es_xmx: "8g",
        es_data_storage: "10Gi",
        es_data_storagename: "rook-ceph-block",
        es_cpu_limits: "6",
        es_memory_limits: "16Gi",
        es_cpu_requests: "6",
        es_memory_requests: "16Gi",
        kb_cpu_limits: "2",
        kb_memory_limits: "4Gi",
        kb_cpu_requests: "2",
        kb_memory_requests: "4Gi",
      },
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
    new Set<string>(["source", "zh_name", "module_type", "kubernetes", "index", "parent"]);

  readonly attrText = {
    // 对应属性在配置栏中显示的名称
    name: "实例名称",
    source: "组件入口位置",
    zh_name: "中文名称",
    module_type: "module 类型",
    index : "层级",
    parent: "引用目标",
    kubernetes: "平台连接信息",
    namespace: "pod 的命名空间名称",
    replicas: "pod 的副本数",
    containerPort: "容器的端口",
    limitsCpu: "pod 最大的 cpu 资源",
    limitsMemory: "pod 最大的内存资源",
    requestsCpu: "pod 默认请求的 cpu 资源",
    requestsMemory: "pod 默认请求的 内存资源",
    svc_enable: "是否添加 svc",
    svcType: "svc 类型",
    svc: "pod 的 svc",
    svc_clusterip: "svc 的 ip 地址",
    hostAliases: "pod 的 host 配置",
    metadataName: "pod 的命元数据名称",
    containerImage: "pod 的镜像名称",
    containerCommand: "pod 的命令",
    containerArgs: "pod 的参数",
    livenessProbe_enable: "是否创建 liveness 探针",
    livenessProbe_failureThreshold: "探针当 Pod 成功启动且检查失败时，将在放弃之前尝试的次数",
    livenessProbe_initialDelaySeconds: "容器启动和探针启动之间的秒数",
    livenessProbe_periodSeconds: "探针检查的频率（以秒为单位）",
    livenessProbe_successThreshold: "探针失败后检查成功的最小连续成功次数",
    livenessProbe_timeoutSeconds: "探针超时重启秒数",
    livenessProbe_type: "探针方式（httpGet、tcpSocket）",
    livenessProbe_port: "探针端口",
    livenessProbe_path: "探针探测路径（httpget 方式，默认为空）",
    livenessProbe_scheme: "探针模式（没有则填空）",
    readinessProbe_enable: "是否创建 readiness 探针",
    readinessProbe_failureThreshold: "探针当 Pod 成功启动且检查失败时，将在放弃之前尝试的次数",
    readinessProbe_initialDelaySeconds: "容器启动和探针启动之间的秒数",
    readinessProbe_periodSeconds: "探针检查的频率（以秒为单位）",
    readinessProbe_successThreshold: "探针失败后检查成功的最小连续成功次数",
    readinessProbe_timeoutSeconds: "探针超时重启秒数",
    readinessProbe_type: "探针方式（httpGet、tcpScoket）",
    readinessProbe_port: "探针端口",
    readinessProbe_path: "探针探测路径（httpget方式，默认为空）",
    readinessProbe_scheme: "探针模式（没有填空）",
    init_container_enable: "是否创建初始化容器",
    init_containerCommand: "初始化容器启动命令",
    init_containerImage: "初始化容器镜像",
    init_name: "初始化容器名称",
    init_volumeMounts: "初始化容器挂载（没有则填空）",
    volumeMounts: "pod 的命名空间名称",
    volumes: "pod 的命名空间名称",
    ingress_enable: "pod 的命名空间名称",
    hostname: "pod 的命名空间名称",
    annotations: "pod 的命名空间名称",
    paths: "pod 的命名空间名称",
    ingress_tls: "pod 的命名空间名称",
    configmap_enable: "pod 的命名空间名称",
    config_file: "pod 的命名空间名称",
    config_data: "pod 的命名空间名称",
    secret_enable: "pod 的命名空间名称",
    secret_data: "pod 的命名空间名称",
    secret_name: "pod 的命名空间名称",
    secret_label: "pod 的命名空间名称",
    env_type: "pod 的命名空间名称",
    env: "pod 的命名空间名称",
    env_from: "pod 的命名空间名称",
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
