import RedisIcon from "@/assets/icons/redis-opened-svgrepo-com.svg";
import {NodeData, NodeProp, NodeType} from "@/node/types";
import {CellStatus} from "@/node/index";

export class RedisProp implements NodeProp {
  readonly attrText = {         // 对应属性在配置栏中显示的名称
    name: "module 名称",
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

  readonly fixedValue =
    new Set<string>(["name", "source", "zh_name", "module_type", "kubernetes"]);

  readonly type = NodeType.REDIS;
  readonly icon = RedisIcon;

  data(): NodeData {
    return {
      module: {
        name: "k8s-redis",              // 【固定值】 指定module名称
        source: "./modules/k8s/redis/", // 【固定值】指定组件入口位置
        zh_name: "Redis6.2.5 单节点",    // 【固定值】指定中文名称
        module_type: "db",              // 【固定值】指定module类型
        kubernetes: {                   // 【固定值】指定平台连接信息
          host: "var.kubernetes.host",
          client_certificate: "var.kubernetes.client_certificate",
          client_key: "var.kubernetes.client_key",
          cluster_ca_certificate: "var.kubernetes.cluster_ca_certificate",
        },
        wait_namespace_create: "60s",   // 【平台配置值】等待namespace创建时间(秒)
        redis_name: "iac-redis",        // 【平台配置值-需确认】指定redis的名称
        redis_namespace: "module.k8s-namespace.name", // 【平台配置值-需确认】指定redis的命名空间名称
        redis_limits_cpu: "4000m",      // 【平台配置值-需确认】指定redis最大的cpu资源
        redis_limits_memory: "8Gi",     // 【平台配置值-需确认】指定redis最大的内存资源
        redis_requests_cpu: "1000m",    // 【平台配置值-需确认】指定redis请求的cpu资源
        redis_requests_memory: "2Gi",   // 【平台配置值-需确认】指定redis请求的内存资源
        redisExporter_limits_cpu: "1000m",  //【平台配置值-需确认】指定redisExporter最大的cpu资源
        redisExporter_limits_memory: "1Gi", //【平台配置值-需确认】指定redisExporter最大的内存资源
        redisExporter_requests_cpu: "100m", //【平台配置值-需确认】指定redisExporter请求的cpu资源
        redisExporter_requests_memory: "128Mi",       //【平台配置值-需确认】指定redisExporter请求的内存资源
        redis_requests_storage: "5Gi",                //【平台配置值-需确认】指定redis请求的存储空间大小
        redis_password: "base64encode(\"Cc123!@#\")", //【平台配置值-需确认】指定redis的密码

        /* 对其他module提供可用引用为如下
        * host (k8s中svc名称)
        * port (k8s中svc端口)
        * user
        * password
        */
      },
      name: "k8s-redis",  // 对应结点在画布中显示的名称
      fixed_value: this.fixedValue,
      text: this.attrText,
      type: this.type,
      status: CellStatus.DEFAULT
    };
  }
}