"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, TrendingUp, Server, Database, Zap } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import InteractiveDemo from "@/components/InteractiveDemo";
import ProgressIndicator from "@/components/ProgressIndicator";

export default function SkalowanieSystemowPage() {
  const demoSteps = [
    {
      title: "Analiza wymagań skalowalności",
      description: "Określ cele skalowalności i obecne ograniczenia systemu.",
      code: `# Analiza skalowalności systemu workflow
ANALIZA OBECNA SYTUACJA:

Metryki bazowe:
- Liczba użytkowników: 10,000 aktywnych dziennie
- Średnie obciążenie: 500 zadań/minutę
- Czas odpowiedzi: < 2 sekundy (95 percentyl)
- Dostępność: 99.5%

WYMAGANIA SKALOWALNOŚCI:
- Docelowa liczba użytkowników: 100,000 aktywnych dziennie
- Szczytowe obciążenie: 5,000 zadań/minutę
- Czas odpowiedzi: < 1 sekundy (95 percentyl)
- Dostępność: 99.9%

IDENTYFIKOWANE WĄSKIE GARDŁA:
1. Baza danych - pojedynczy węzeł, 80% wykorzystania CPU przy szczycie
2. Kolejka wiadomości - pojedynczy broker, opóźnienia przy > 1000 msg/s
3. API Gateway - pojedyncza instancja, limit 2000 req/s
4. Cache - Redis pojedynczy węzeł, hit ratio 85%

PLAN SKALOWANIA:
Faza 1 (0-50k użytkowników):
- Skalowanie poziome API (3 instancje)
- Replikacja bazy danych (master-slave)
- Klaster Redis (3 węzły)

Faza 2 (50k-100k użytkowników):
- Mikroserwisy dla krytycznych komponentów
- Sharding bazy danych
- Multi-region deployment
- Advanced load balancing`,
      result: "✅ Przeprowadzono analizę skalowalności i zdefiniowano plan rozwoju."
    },
    {
      title: "Implementacja skalowania poziomego",
      description: "Zaimplementuj automatyczne skalowanie instancji w odpowiedzi na obciążenie.",
      code: `# Implementacja auto-scaling dla workflow systemu
import asyncio
import time
from typing import Dict, Any, List, Optional
from dataclasses import dataclass
from enum import Enum
import boto3
import aiomysql
import redis.asyncio as redis
import structlog

logger = structlog.get_logger('workflow.scaling')

class ScalingDecision(Enum):
    SCALE_UP = "scale_up"
    SCALE_DOWN = "scale_down"
    NO_CHANGE = "no_change"

@dataclass
class ScalingMetrics:
    cpu_utilization: float
    memory_utilization: float
    active_connections: int
    queue_depth: int
    response_time_p95: float
    error_rate: float
    timestamp: float

@dataclass
class ScalingPolicy:
    min_instances: int = 2
    max_instances: int = 20
    scale_up_threshold: float = 70.0  # % wykorzystania
    scale_down_threshold: float = 30.0
    cooldown_period: int = 300  # sekundy
    evaluation_period: int = 60  # sekundy

class AutoScaler:
    def __init__(self, service_name: str, policy: ScalingPolicy, region: str = 'us-east-1'):
        self.service_name = service_name
        self.policy = policy
        self.region = region
        self.application_autoscaling = boto3.client('application-autoscaling', region_name=region)
        self.cloudwatch = boto3.client('cloudwatch', region_name=region)
        self.last_scaling_action = 0
        self.logger = logger.bind(service=service_name)

    async def evaluate_and_scale(self) -> ScalingDecision:
        """Ocenia metryki i podejmuje decyzję o skalowaniu"""

        # Sprawdź cooldown period
        if time.time() - self.last_scaling_action < self.policy.cooldown_period:
            return ScalingDecision.NO_CHANGE

        # Pobierz aktualne metryki
        metrics = await self._get_current_metrics()

        # Oblicz średnie wykorzystanie
        avg_cpu = sum(m.cpu_utilization for m in metrics) / len(metrics)
        avg_memory = sum(m.memory_utilization for m in metrics) / len(metrics)
        avg_queue_depth = sum(m.queue_depth for m in metrics) / len(metrics)

        # Podejmij decyzję skalowania
        decision = self._make_scaling_decision(avg_cpu, avg_memory, avg_queue_depth)

        if decision != ScalingDecision.NO_CHANGE:
            await self._execute_scaling(decision)
            self.last_scaling_action = time.time()

        return decision

    async def _get_current_metrics(self) -> List[ScalingMetrics]:
        """Pobierz aktualne metryki z CloudWatch"""
        end_time = time.time()
        start_time = end_time - self.policy.evaluation_period

        # Pobierz metryki CPU
        cpu_response = self.cloudwatch.get_metric_statistics(
            Namespace='AWS/EC2',
            MetricName='CPUUtilization',
            Dimensions=[
                {'Name': 'AutoScalingGroupName', 'Value': f'{self.service_name}-asg'}
            ],
            StartTime=start_time,
            EndTime=end_time,
            Period=60,
            Statistics=['Average']
        )

        # Pobierz metryki z aplikacji (zakładając custom metrics)
        app_metrics = await self._get_application_metrics(start_time, end_time)

        return app_metrics

    async def _get_application_metrics(self, start_time: float, end_time: float) -> List[ScalingMetrics]:
        """Pobierz metryki aplikacji z własnych źródeł"""
        # W rzeczywistości pobierałby z Prometheus, DataDog itp.
        # Tutaj symulacja
        return [
            ScalingMetrics(
                cpu_utilization=65.0,
                memory_utilization=75.0,
                active_connections=150,
                queue_depth=50,
                response_time_p95=800.0,
                error_rate=0.02,
                timestamp=time.time()
            )
        ]

    def _make_scaling_decision(self, avg_cpu: float, avg_memory: float, avg_queue_depth: float) -> ScalingDecision:
        """Podejmij decyzję o skalowaniu na podstawie metryk"""

        # Sprawdź warunki skalowania w górę
        if (avg_cpu > self.policy.scale_up_threshold or
            avg_memory > self.policy.scale_up_threshold or
            avg_queue_depth > 100):  # arbitrary queue threshold

            current_instances = self._get_current_instance_count()
            if current_instances < self.policy.max_instances:
                self.logger.info("Scaling up due to high utilization",
                               cpu=avg_cpu, memory=avg_memory, queue=avg_queue_depth)
                return ScalingDecision.SCALE_UP

        # Sprawdź warunki skalowania w dół
        elif (avg_cpu < self.policy.scale_down_threshold and
              avg_memory < self.policy.scale_down_threshold and
              avg_queue_depth < 10):

            current_instances = self._get_current_instance_count()
            if current_instances > self.policy.min_instances:
                self.logger.info("Scaling down due to low utilization",
                               cpu=avg_cpu, memory=avg_memory, queue=avg_queue_depth)
                return ScalingDecision.SCALE_DOWN

        return ScalingDecision.NO_CHANGE

    def _get_current_instance_count(self) -> int:
        """Pobierz aktualną liczbę instancji"""
        # W rzeczywistości pobierałby z AWS Auto Scaling Groups
        return 3  # placeholder

    async def _execute_scaling(self, decision: ScalingDecision):
        """Wykonaj skalowanie"""
        if decision == ScalingDecision.SCALE_UP:
            new_capacity = min(self._get_current_instance_count() + 1, self.policy.max_instances)
        else:  # SCALE_DOWN
            new_capacity = max(self._get_current_instance_count() - 1, self.policy.min_instances)

        # Aktualizuj Auto Scaling Group
        self.application_autoscaling.register_scalable_target(
            ServiceNamespace='ec2',
            ResourceId=f'autoScalingGroup/{self.service_name}-asg',
            ScalableDimension='ec2:autoScalingGroup:DesiredCapacity',
            MinCapacity=self.policy.min_instances,
            MaxCapacity=self.policy.max_instances
        )

        self.application_autoscaling.put_scaling_policy(
            PolicyName=f'{self.service_name}-target-tracking',
            ServiceNamespace='ec2',
            ResourceId=f'autoScalingGroup/{self.service_name}-asg',
            ScalableDimension='ec2:autoScalingGroup:DesiredCapacity',
            PolicyType='TargetTrackingScaling',
            TargetTrackingScalingPolicyConfiguration={
                'TargetValue': 70.0,
                'PredefinedMetricSpecification': {
                    'PredefinedMetricType': 'ASGAverageCPUUtilization'
                }
            }
        )

        self.logger.info("Executed scaling action",
                        decision=decision.value,
                        new_capacity=new_capacity)

class LoadBalancerManager:
    def __init__(self, region: str = 'us-east-1'):
        self.elb = boto3.client('elbv2', region_name=region)
        self.logger = logger.bind(component='load_balancer')

    async def update_target_group(self, target_group_arn: str, instance_ids: List[str]):
        """Aktualizuj target group z nowymi instancjami"""
        try:
            # Rejestruj nowe instancje
            self.elb.register_targets(
                TargetGroupArn=target_group_arn,
                Targets=[{'Id': instance_id} for instance_id in instance_ids]
            )

            # Wyrejestruj stare instancje (jeśli potrzebne)
            # deregister_targets(...)

            self.logger.info("Updated load balancer targets",
                           target_group=target_group_arn,
                           instances=instance_ids)

        except Exception as e:
            self.logger.error("Failed to update load balancer targets", error=str(e))

class DatabaseScaler:
    def __init__(self, cluster_identifier: str, region: str = 'us-east-1'):
        self.rds = boto3.client('rds', region_name=region)
        self.cluster_identifier = cluster_identifier
        self.logger = logger.bind(component='database', cluster=cluster_identifier)

    async def scale_read_replicas(self, target_count: int):
        """Skaluj liczbę read replicas"""
        try:
            # Pobierz obecne replicas
            response = self.rds.describe_db_clusters(
                DBClusterIdentifier=self.cluster_identifier
            )

            current_replicas = len(response['DBClusters'][0].get('DBClusterMembers', []))

            if target_count > current_replicas:
                # Dodaj replicas
                for i in range(current_replicas, target_count):
                    self.rds.create_db_instance(
                        DBInstanceIdentifier=f'{self.cluster_identifier}-replica-{i}',
                        DBClusterIdentifier=self.cluster_identifier,
                        DBInstanceClass='db.r5.large',  # przykładowa klasa
                        Engine='aurora-mysql'
                    )
            elif target_count < current_replicas:
                # Usuń replicas (zachowaj ostrożność!)
                # W rzeczywistości potrzebna bardziej złożona logika
                pass

            self.logger.info("Scaled database read replicas",
                           from_count=current_replicas,
                           to_count=target_count)

        except Exception as e:
            self.logger.error("Failed to scale database replicas", error=str(e))

class CacheScaler:
    def __init__(self, cluster_id: str, region: str = 'us-east-1'):
        self.elasticache = boto3.client('elasticache', region_name=region)
        self.cluster_id = cluster_id
        self.logger = logger.bind(component='cache', cluster=cluster_id)

    async def scale_cluster(self, target_node_count: int):
        """Skaluj klaster Redis"""
        try:
            # Modyfikuj klaster
            self.elasticache.modify_cache_cluster(
                CacheClusterId=self.cluster_id,
                NumCacheNodes=target_node_count,
                ApplyImmediately=True
            )

            self.logger.info("Scaled cache cluster",
                           cluster_id=self.cluster_id,
                           nodes=target_node_count)

        except Exception as e:
            self.logger.error("Failed to scale cache cluster", error=str(e))

# Główny orchestrator skalowania
class ScalingOrchestrator:
    def __init__(self):
        self.api_scaler = AutoScaler('workflow-api', ScalingPolicy())
        self.worker_scaler = AutoScaler('workflow-worker', ScalingPolicy(min_instances=1, max_instances=10))
        self.db_scaler = DatabaseScaler('workflow-db-cluster')
        self.cache_scaler = CacheScaler('workflow-cache')
        self.lb_manager = LoadBalancerManager()

        self.logger = logger.bind(component='scaling_orchestrator')

    async def run_scaling_cycle(self):
        """Wykonaj pełny cykl skalowania"""
        self.logger.info("Starting scaling cycle")

        # Skaluj API
        api_decision = await self.api_scaler.evaluate_and_scale()

        # Skaluj worker'ów
        worker_decision = await self.worker_scaler.evaluate_and_scale()

        # Skaluj bazę danych na podstawie obciążenia odczytu
        read_load = await self._get_database_read_load()
        if read_load > 80:
            await self.db_scaler.scale_read_replicas(5)  # przykładowa wartość
        elif read_load < 30:
            await self.db_scaler.scale_read_replicas(2)

        # Skaluj cache na podstawie hit ratio
        hit_ratio = await self._get_cache_hit_ratio()
        if hit_ratio < 0.8:
            await self.cache_scaler.scale_cluster(5)  # przykładowa wartość

        self.logger.info("Completed scaling cycle",
                        api_decision=api_decision.value,
                        worker_decision=worker_decision.value)

    async def _get_database_read_load(self) -> float:
        """Pobierz obciążenie odczytu bazy danych"""
        # W rzeczywistości pobierałby metryki z CloudWatch lub monitoring tool
        return 65.0  # placeholder

    async def _get_cache_hit_ratio(self) -> float:
        """Pobierz współczynnik trafień cache"""
        # W rzeczywistości pobierałby metryki z Redis
        return 0.85  # placeholder

async def scaling_loop():
    """Główna pętla skalowania"""
    orchestrator = ScalingOrchestrator()

    while True:
        try:
            await orchestrator.run_scaling_cycle()
            await asyncio.sleep(60)  # Sprawdź co minutę
        except Exception as e:
            logger.error("Scaling cycle failed", error=str(e))
            await asyncio.sleep(30)  # Krótszy odstęp przy błędach

if __name__ == "__main__":
    asyncio.run(scaling_loop())`,
      result: "✅ Zaimplementowano kompleksowy system auto-scaling z monitoringiem i orkiestracją."
    },
    {
      title: "Optymalizacja wydajności i sharding",
      description: "Zaimplementuj sharding bazy danych i optymalizacje dla wysokiej wydajności.",
      code: `# Implementacja sharding'u i optymalizacji wydajności
import hashlib
import asyncio
from typing import Dict, Any, List, Optional, Tuple
from dataclasses import dataclass
import aiomysql
import redis.asyncio as redis
import structlog

logger = structlog.get_logger('workflow.sharding')

@dataclass
class ShardConfig:
    shard_id: int
    host: str
    port: int
    database: str
    user: str
    password: str
    weight: int = 1  # Dla load balancing

@dataclass
class ShardingKey:
    table_name: str
    column_name: str
    value: Any

class DatabaseShardManager:
    def __init__(self, shards: List[ShardConfig]):
        self.shards = {shard.shard_id: shard for shard in shards}
        self.connections: Dict[int, aiomysql.Connection] = {}
        self.logger = logger.bind(component='shard_manager')

    def get_shard_id(self, sharding_key: ShardingKey) -> int:
        \"\"\"Oblicz ID shard na podstawie klucza sharding\"\"\"
        # Prosta strategia haszowania
        key_string = f\"{sharding_key.table_name}:{sharding_key.column_name}:{sharding_key.value}\"
        hash_value = int(hashlib.md5(key_string.encode()).hexdigest(), 16)
        return hash_value % len(self.shards)

    async def get_connection(self, shard_id: int) -> aiomysql.Connection:
        \"\"\"Pobierz połączenie do shard\"\"\"
        if shard_id not in self.connections:
            shard_config = self.shards[shard_id]
            self.connections[shard_id] = await aiomysql.connect(
                host=shard_config.host,
                port=shard_config.port,
                db=shard_config.database,
                user=shard_config.user,
                password=shard_config.password
            )

        return self.connections[shard_id]

    async def execute_on_shard(self, query: str, params: tuple, sharding_key: ShardingKey) -> Any:
        \"\"\"Wykonaj zapytanie na odpowiednim shard\"\"\"
        shard_id = self.get_shard_id(sharding_key)
        connection = await self.get_connection(shard_id)

        async with connection.cursor() as cursor:
            await cursor.execute(query, params)
            result = await cursor.fetchall()

        self.logger.debug("Executed query on shard",
                         shard_id=shard_id,
                         query=query[:100])  # Log tylko początku zapytania

        return result

    async def execute_cross_shard_query(self, query: str, params: tuple) -> List[Any]:
        \"\"\"Wykonaj zapytanie wymagające dostępu do wielu shard\"\"\"
        # Dla zapytań cross-shard, wykonaj na wszystkich shardach
        all_results = []

        for shard_id in self.shards.keys():
            connection = await self.get_connection(shard_id)
            async with connection.cursor() as cursor:
                await cursor.execute(query, params)
                results = await cursor.fetchall()
                all_results.extend(results)

        return all_results

class WorkflowShardRouter:
    \"\"\"Router decydujący o shard na podstawie typu workflow\"\"\"
    def __init__(self, shard_manager: DatabaseShardManager):
        self.shard_manager = shard_manager

        # Reguły routingu dla różnych typów danych
        self.routing_rules = {
            'user_data': lambda user_id: ShardingKey('users', 'id', user_id),
            'workflow_instance': lambda workflow_id: ShardingKey('workflow_instances', 'id', workflow_id),
            'task_execution': lambda task_id: ShardingKey('task_executions', 'id', task_id),
            'audit_log': lambda entity_id: ShardingKey('audit_logs', 'entity_id', entity_id),
        }

    async def route_query(self, data_type: str, entity_id: Any, query: str, params: tuple) -> Any:
        \"\"\"Przekieruj zapytanie do odpowiedniego shard\"\"\"
        if data_type not in self.routing_rules:
            raise ValueError(f\"Unknown data type: {data_type}\")

        sharding_key = self.routing_rules[data_type](entity_id)
        return await self.shard_manager.execute_on_shard(query, params, sharding_key)

class CacheManager:
    \"\"\"Zaawansowany manager cache z shardowaniem\"\"\"
    def __init__(self, redis_configs: List[Dict[str, Any]]):
        self.redis_clients = []
        for config in redis_configs:
            client = redis.Redis(**config)
            self.redis_clients.append(client)

        self.logger = logger.bind(component='cache_manager')

    def get_cache_client(self, key: str) -> redis.Redis:
        \"\"\"Pobierz klienta cache na podstawie klucza (consistent hashing)\"\"\"
        # Prosta strategia - hash modulo liczba klientów
        hash_value = int(hashlib.md5(key.encode()).hexdigest(), 16)
        client_index = hash_value % len(self.redis_clients)
        return self.redis_clients[client_index]

    async def get(self, key: str) -> Optional[Any]:
        \"\"\"Pobierz wartość z cache\"\"\"
        client = self.get_cache_client(key)
        try:
            value = await client.get(key)
            if value:
                self.logger.debug("Cache hit", key=key)
                return value.decode('utf-8') if isinstance(value, bytes) else value
            else:
                self.logger.debug("Cache miss", key=key)
                return None
        except Exception as e:
            self.logger.error("Cache get failed", key=key, error=str(e))
            return None

    async def set(self, key: str, value: Any, ttl: int = 3600):
        \"\"\"Ustaw wartość w cache\"\"\"
        client = self.get_cache_client(key)
        try:
            await client.set(key, value, ex=ttl)
            self.logger.debug("Cache set", key=key, ttl=ttl)
        except Exception as e:
            self.logger.error("Cache set failed", key=key, error=str(e))

    async def invalidate_pattern(self, pattern: str):
        \"\"\"Unieważnij klucze pasujące do wzorca\"\"\"
        # Wykonaj na wszystkich klientach cache
        for client in self.redis_clients:
            try:
                keys = await client.keys(pattern)
                if keys:
                    await client.delete(*keys)
                    self.logger.info("Invalidated cache keys",
                                   pattern=pattern,
                                   count=len(keys))
            except Exception as e:
                self.logger.error("Cache invalidation failed",
                                pattern=pattern,
                                error=str(e))

class PerformanceOptimizer:
    \"\"\"Optymalizator wydajności z automatycznym tuningiem\"\"\"
    def __init__(self, shard_manager: DatabaseShardManager, cache_manager: CacheManager):
        self.shard_manager = shard_manager
        self.cache_manager = cache_manager
        self.query_stats: Dict[str, Dict[str, Any]] = {}
        self.logger = logger.bind(component='performance_optimizer')

    async def optimize_query(self, query: str, params: tuple, sharding_key: ShardingKey) -> Any:
        \"\"\"Optymalizuj i wykonaj zapytanie\"\"\"
        start_time = time.time()

        # Sprawdź cache najpierw
        cache_key = f\"query:{hashlib.md5((query + str(params)).encode()).hexdigest()}\"
        cached_result = await self.cache_manager.get(cache_key)

        if cached_result:
            return cached_result

        # Wykonaj zapytanie
        result = await self.shard_manager.execute_on_shard(query, params, sharding_key)

        # Cache'uj wynik jeśli to zapytanie SELECT
        if query.strip().upper().startswith('SELECT'):
            await self.cache_manager.set(cache_key, result, ttl=300)  # 5 minut

        # Zapisz statystyki
        execution_time = time.time() - start_time
        query_hash = hashlib.md5(query.encode()).hexdigest()[:8]

        if query_hash not in self.query_stats:
            self.query_stats[query_hash] = {
                'query': query[:100],
                'executions': 0,
                'total_time': 0.0,
                'avg_time': 0.0,
                'slow_count': 0
            }

        stats = self.query_stats[query_hash]
        stats['executions'] += 1
        stats['total_time'] += execution_time
        stats['avg_time'] = stats['total_time'] / stats['executions']

        if execution_time > 1.0:  # Zapytania wolniejsze niż 1 sekunda
            stats['slow_count'] += 1

        # Loguj wolne zapytania
        if execution_time > 0.5:
            self.logger.warning("Slow query detected",
                              query_hash=query_hash,
                              execution_time=execution_time,
                              query=query[:100])

        return result

    async def get_performance_report(self) -> Dict[str, Any]:
        \"\"\"Generuj raport wydajności\"\"\"
        report = {
            'total_queries': sum(stats['executions'] for stats in self.query_stats.values()),
            'slow_queries': sum(stats['slow_count'] for stats in self.query_stats.values()),
            'top_slow_queries': []
        }

        # Znajdź najwolniejsze zapytania
        sorted_queries = sorted(
            self.query_stats.items(),
            key=lambda x: x[1]['avg_time'],
            reverse=True
        )[:10]

        report['top_slow_queries'] = [
            {
                'query_hash': q_hash,
                'query': stats['query'],
                'avg_time': stats['avg_time'],
                'executions': stats['executions'],
                'slow_count': stats['slow_count']
            }
            for q_hash, stats in sorted_queries
        ]

        return report

class ConnectionPoolManager:
    \"\"\"Manager pool'i połączeń dla optymalizacji\"\"\"
    def __init__(self, shard_manager: DatabaseShardManager, pool_size: int = 10):
        self.shard_manager = shard_manager
        self.pool_size = pool_size
        self.pools: Dict[int, List[aiomysql.Connection]] = {}
        self.logger = logger.bind(component='connection_pool')

    async def get_connection_from_pool(self, shard_id: int) -> aiomysql.Connection:
        \"\"\"Pobierz połączenie z pool\"\"\"
        if shard_id not in self.pools:
            self.pools[shard_id] = []

        pool = self.pools[shard_id]

        # Znajdź dostępne połączenie
        for conn in pool:
            if not conn._closed:  # Sprawdź czy połączenie jest aktywne
                pool.remove(conn)
                return conn

        # Utwórz nowe połączenie jeśli pool jest pusty lub ma miejsce
        if len(pool) < self.pool_size:
            conn = await self.shard_manager.get_connection(shard_id)
            self.logger.debug("Created new connection in pool",
                            shard_id=shard_id,
                            pool_size=len(pool) + 1)
            return conn

        # Jeśli pool jest pełny, poczekaj na dostępne połączenie
        # W rzeczywistości użyłby queue lub async primitive
        raise Exception("Connection pool exhausted")

    async def return_connection_to_pool(self, shard_id: int, connection: aiomysql.Connection):
        \"\"\"Zwróć połączenie do pool\"\"\"
        if shard_id not in self.pools:
            self.pools[shard_id] = []

        pool = self.pools[shard_id]

        if len(pool) < self.pool_size:
            pool.append(connection)
            self.logger.debug("Returned connection to pool",
                            shard_id=shard_id,
                            pool_size=len(pool))
        else:
            # Pool pełny, zamknij połączenie
            connection.close()

# Konfiguracja shardingu
shard_configs = [
    ShardConfig(shard_id=0, host='db-shard-0.cluster.region.rds.amazonaws.com', port=3306,
                database='workflow', user='admin', password='password'),
    ShardConfig(shard_id=1, host='db-shard-1.cluster.region.rds.amazonaws.com', port=3306,
                database='workflow', user='admin', password='password'),
    ShardConfig(shard_id=2, host='db-shard-2.cluster.region.rds.amazonaws.com', port=3306,
                database='workflow', user='admin', password='password'),
]

# Inicjalizacja komponentów
shard_manager = DatabaseShardManager(shard_configs)
cache_manager = CacheManager([
    {'host': 'redis-shard-0.cache.amazonaws.com', 'port': 6379},
    {'host': 'redis-shard-1.cache.amazonaws.com', 'port': 6379},
    {'host': 'redis-shard-2.cache.amazonaws.com', 'port': 6379},
])
router = WorkflowShardRouter(shard_manager)
optimizer = PerformanceOptimizer(shard_manager, cache_manager)
pool_manager = ConnectionPoolManager(shard_manager)

async def execute_optimized_workflow_query(user_id: int, workflow_type: str) -> Dict[str, Any]:
    \"\"\"Przykład optymalizacji zapytania workflow\"\"\"
    # Pobierz dane użytkownika
    user_query = \"SELECT * FROM users WHERE id = %s\"
    user_data = await optimizer.optimize_query(
        user_query, (user_id,),
        ShardingKey('users', 'id', user_id)
    )

    # Pobierz aktywne workflow dla użytkownika
    workflow_query = \"\"\"
    SELECT wi.* FROM workflow_instances wi
    JOIN user_workflows uw ON wi.id = uw.workflow_id
    WHERE uw.user_id = %s AND wi.status = 'active' AND wi.type = %s
    \"\"\"
    workflows = await optimizer.optimize_query(
        workflow_query, (user_id, workflow_type),
        ShardingKey('user_workflows', 'user_id', user_id)
    )

    return {
        'user': user_data,
        'active_workflows': workflows
    }

async def main():
    # Testuj optymalizację
    print("Testing sharding and performance optimization...")

    # Wykonaj kilka zapytań
    for user_id in [1001, 2002, 3003]:
        result = await execute_optimized_workflow_query(user_id, 'order_processing')
        print(f"User {user_id}: {len(result['active_workflows'])} active workflows")

    # Wyświetl raport wydajności
    report = await optimizer.get_performance_report()
    print(f"\\nPerformance Report:")
    print(f"Total queries: {report['total_queries']}")
    print(f"Slow queries: {report['slow_queries']}")

    if report['top_slow_queries']:
        print("\\nTop slow queries:")
        for query in report['top_slow_queries'][:3]:
            print(f"  {query['query_hash']}: {query['avg_time']:.3f}s avg")

if __name__ == "__main__":
    asyncio.run(main())`,
      result: "✅ Zaimplementowano sharding bazy danych i optymalizacje wydajności z automatycznym cache'owaniem."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Navigation */}
      <div className="flex items-center gap-4">
        <Link
          href="/samouczki/przeplywy-pracy"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Powrót do kategorii
        </Link>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-gray-200 dark:border-gray-700 pb-8"
      >
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 mb-4">
          <span>Przepływy Pracy</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>17 min czytania</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Skalowanie Systemów
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Naucz się skalować systemy workflow dla obsługi milionów użytkowników.
          Dowiedz się o auto-scaling, sharding, load balancing i optymalizacji wydajności.
        </p>
      </motion.div>

      <ProgressIndicator
        current={5}
        total={5}
        labels={["Projektowanie", "Automatyzacja", "Monitorowanie", "Błędy", "Skalowanie"]}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="prose prose-lg dark:prose-invert max-w-none"
      >
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <TrendingUp className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Auto-Scaling
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Automatyczne dostosowywanie zasobów do zmieniającego się obciążenia systemu.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <Database className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
              Sharding i Partycjonowanie
            </h3>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Podział danych na mniejsze fragmenty dla lepszej wydajności i skalowalności.
            </p>
          </div>
        </div>

        <h2>Dlaczego Skalowanie jest Krytyczne?</h2>
        <p>
          W dzisiejszym świecie aplikacji internetowych, skalowalność decyduje o sukcesie systemu.
          Systemy workflow muszą obsługiwać od dziesiątek do milionów użytkowników jednocześnie,
          zachowując przy tym wysoką wydajność i dostępność. Bez odpowiedniego skalowania,
          nawet najlepiej zaprojektowany system zawiedzie pod dużym obciążeniem.
        </p>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
          <h3 className="text-amber-800 dark:text-amber-200 font-medium mb-2 flex items-center gap-2">
            <Server className="h-5 w-5" />
            Kluczowe Wyzwania Skalowania
          </h3>
          <p className="text-amber-700 dark:text-amber-300">
            Skalowanie poziome zwiększa dostępność o 300%, zmniejsza koszty infrastruktury o 50%
            i pozwala obsłużyć 10x więcej użytkowników przy zachowaniu tych samych czasów odpowiedzi.
          </p>
        </div>

        <h2>Strategie Skalowania</h2>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold">→</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Skalowanie Poziome</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Dodawanie więcej instancji tego samego typu dla rozłożenia obciążenia.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-semibold">↑</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Skalowanie Pionowe</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Zwiększanie mocy pojedynczych instancji (CPU, RAM, storage).
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-semibold">⚡</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Auto-Scaling</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Automatyczne dostosowywanie liczby instancji na podstawie metryk.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 font-semibold">🗂️</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Sharding</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Podział danych na niezależne fragmenty rozproszone po węzłach.
                </p>
              </div>
            </div>
          </div>
        </div>

        <InteractiveDemo
          title="Zobacz Implementację Skalowania w Działaniu"
          steps={demoSteps}
        />

        <h2>Architektura Skalowalnego Systemu</h2>

        <div className="grid md:grid-cols-3 gap-6 my-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Server className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Load Balancer</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Rozdziela ruch między instancjami, zapewnia wysoką dostępność.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Database className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Database Sharding</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Podział danych na shard'y dla równoległego przetwarzania.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Cache Layer</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Wielowarstwowy cache zmniejszający obciążenie bazy danych.
            </p>
          </div>
        </div>

        <CodeBlock
          code={`# Mikroserwisy i service mesh dla skalowalności
from typing import Dict, Any, List, Optional
from dataclasses import dataclass
import asyncio
import aiohttp
import consul.aio as consul
import structlog

logger = structlog.get_logger('workflow.microservices')

@dataclass
class ServiceInstance:
    id: str
    name: str
    address: str
    port: int
    health_check_url: str
    metadata: Dict[str, Any]

class ServiceRegistry:
    \"\"\"Rejestr usług z automatycznym discovery\"\"\"
    def __init__(self, consul_host: str = 'localhost', consul_port: int = 8500):
        self.consul = consul.Consul(host=consul_host, port=consul_port)
        self.services: Dict[str, List[ServiceInstance]] = {}
        self.logger = logger.bind(component='service_registry')

    async def register_service(self, instance: ServiceInstance):
        \"\"\"Zarejestruj instancję usługi\"\"\"
        await self.consul.agent.service.register(
            name=instance.name,
            service_id=instance.id,
            address=instance.address,
            port=instance.port,
            check=consul.Check.http(
                url=f'http://{instance.address}:{instance.port}{instance.health_check_url}',
                interval='10s',
                timeout='5s'
            ),
            tags=instance.metadata.get('tags', [])
        )

        if instance.name not in self.services:
            self.services[instance.name] = []
        self.services[instance.name].append(instance)

        self.logger.info("Service registered",
                        service_name=instance.name,
                        instance_id=instance.id)

    async def deregister_service(self, service_id: str):
        \"\"\"Wyrejestruj usługę\"\"\"
        await self.consul.agent.service.deregister(service_id)
        self.logger.info("Service deregistered", service_id=service_id)

    async def discover_service(self, service_name: str) -> List[ServiceInstance]:
        \"\"\"Odkryj dostępne instancje usługi\"\"\"
        _, services = await self.consul.catalog.service(service_name)

        instances = []
        for service in services:
            instance = ServiceInstance(
                id=service['ServiceID'],
                name=service['ServiceName'],
                address=service['ServiceAddress'],
                port=service['ServicePort'],
                health_check_url='/health',
                metadata=service.get('ServiceMeta', {})
            )
            instances.append(instance)

        # Cache lokalny
        self.services[service_name] = instances
        return instances

    async def get_healthy_instance(self, service_name: str) -> Optional[ServiceInstance]:
        \"\"\"Pobierz zdrową instancję usługi z load balancing\"\"\"
        instances = await self.discover_service(service_name)
        healthy_instances = [inst for inst in instances if await self._is_healthy(inst)]

        if not healthy_instances:
            return None

        # Prosty round-robin (w rzeczywistości użyłby bardziej zaawansowanego LB)
        return healthy_instances[0]  # placeholder

    async def _is_healthy(self, instance: ServiceInstance) -> bool:
        \"\"\"Sprawdź zdrowie instancji\"\"\"
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(f'http://{instance.address}:{instance.port}{instance.health_check_url}') as response:
                    return response.status == 200
        except:
            return False

class ServiceMesh:
    \"\"\"Service mesh do zarządzania komunikacją między usługami\"\"\"
    def __init__(self, registry: ServiceRegistry):
        self.registry = registry
        self.http_client = aiohttp.ClientSession()
        self.logger = logger.bind(component='service_mesh')

        # Metryki i circuit breaker dla każdej usługi
        self.metrics: Dict[str, Dict[str, Any]] = {}
        self.circuit_states: Dict[str, str] = {}  # 'closed', 'open', 'half_open'

    async def call_service(self, service_name: str, endpoint: str,
                          method: str = 'GET', data: Optional[Dict] = None,
                          headers: Optional[Dict] = None) -> Dict[str, Any]:
        \"\"\"Wywołaj usługę przez service mesh\"\"\"

        # Sprawdź circuit breaker
        if self.circuit_states.get(service_name) == 'open':
            if not await self._should_attempt_reset(service_name):
                raise Exception(f"Service {service_name} is unavailable (circuit open)")

        # Odkryj instancję
        instance = await self.registry.get_healthy_instance(service_name)
        if not instance:
            raise Exception(f"No healthy instances available for {service_name}")

        # Przygotuj wywołanie
        url = f'http://{instance.address}:{instance.port}{endpoint}'
        request_headers = headers or {}
        request_headers.update({
            'X-Request-ID': 'req_' + str(asyncio.get_event_loop().time()),
            'X-Source-Service': 'workflow-orchestrator'
        })

        # Retry logic z exponential backoff
        max_retries = 3
        for attempt in range(max_retries):
            try:
                start_time = asyncio.get_event_loop().time()

                async with self.http_client.request(
                    method, url, json=data, headers=request_headers
                ) as response:
                    response_time = asyncio.get_event_loop().time() - start_time

                    # Aktualizuj metryki
                    await self._update_metrics(service_name, response.status, response_time)

                    if response.status >= 500:
                        # Błąd serwera - retry
                        if attempt < max_retries - 1:
                            await asyncio.sleep(2 ** attempt)  # exponential backoff
                            continue

                    result = await response.json()
                    return result

            except Exception as e:
                self.logger.warning("Service call failed",
                                  service=service_name,
                                  attempt=attempt,
                                  error=str(e))

                if attempt == max_retries - 1:
                    # Wszystkie próby wyczerpane - otwórz circuit breaker
                    self.circuit_states[service_name] = 'open'
                    raise e

                await asyncio.sleep(2 ** attempt)

        raise Exception(f"Failed to call {service_name} after {max_retries} attempts")

    async def _update_metrics(self, service_name: str, status_code: int, response_time: float):
        \"\"\"Aktualizuj metryki dla usługi\"\"\"
        if service_name not in self.metrics:
            self.metrics[service_name] = {
                'total_calls': 0,
                'successful_calls': 0,
                'error_calls': 0,
                'total_response_time': 0.0,
                'avg_response_time': 0.0
            }

        metrics = self.metrics[service_name]
        metrics['total_calls'] += 1
        metrics['total_response_time'] += response_time
        metrics['avg_response_time'] = metrics['total_response_time'] / metrics['total_calls']

        if 200 <= status_code < 300:
            metrics['successful_calls'] += 1
        else:
            metrics['error_calls'] += 1

    async def _should_attempt_reset(self, service_name: str) -> bool:
        \"\"\"Sprawdź czy należy spróbować resetować circuit breaker\"\"\"
        # Prosta logika - resetuj po 30 sekundach
        # W rzeczywistości użyłby bardziej zaawansowanej logiki
        return True

    def get_service_metrics(self, service_name: str) -> Dict[str, Any]:
        \"\"\"Pobierz metryki dla usługi\"\"\"
        return self.metrics.get(service_name, {})

class WorkflowMicroservice:
    \"\"\"Mikrousługa workflow z pełną integracją\"\"\"
    def __init__(self, service_name: str, registry: ServiceRegistry, mesh: ServiceMesh):
        self.service_name = service_name
        self.registry = registry
        self.mesh = mesh
        self.logger = logger.bind(service=service_name)

    async def start_service(self, host: str = '0.0.0.0', port: int = 8080):
        \"\"\"Uruchom mikrousługę\"\"\"
        # Zarejestruj w service registry
        instance = ServiceInstance(
            id=f'{self.service_name}-{host}:{port}',
            name=self.service_name,
            address=host,
            port=port,
            health_check_url='/health',
            metadata={'version': '1.0.0', 'region': 'us-east-1'}
        )

        await self.registry.register_service(instance)

        # Tutaj można dodać kod serwera HTTP (np. FastAPI, aiohttp)
        self.logger.info("Service started", host=host, port=port)

    async def process_workflow_task(self, task_data: Dict[str, Any]) -> Dict[str, Any]:
        \"\"\"Przetwórz zadanie workflow wywołując inne usługi\"\"\"
        self.logger.info("Processing workflow task", task_id=task_data.get('id'))

        # Wywołaj usługę walidacji
        validation_result = await self.mesh.call_service(
            'validation-service',
            '/validate',
            method='POST',
            data={'task': task_data}
        )

        if not validation_result.get('valid', False):
            return {'status': 'rejected', 'reason': validation_result.get('errors')}

        # Wywołaj usługę wykonania
        execution_result = await self.mesh.call_service(
            'execution-service',
            '/execute',
            method='POST',
            data={'task': task_data, 'validation': validation_result}
        )

        # Wywołaj usługę powiadomień
        try:
            await self.mesh.call_service(
                'notification-service',
                '/notify',
                method='POST',
                data={
                    'task_id': task_data['id'],
                    'status': execution_result.get('status'),
                    'result': execution_result
                }
            )
        except Exception as e:
            # Powiadomienia nie są krytyczne - loguj ale kontynuuj
            self.logger.warning("Notification failed", error=str(e))

        return execution_result

# Przykład użycia
async def main():
    # Inicjalizacja komponentów
    registry = ServiceRegistry()
    mesh = ServiceMesh(registry)

    # Utwórz mikrousługę workflow
    workflow_service = WorkflowMicroservice('workflow-orchestrator', registry, mesh)

    # Uruchom usługę
    await workflow_service.start_service()

    # Symuluj przetwarzanie zadań
    test_tasks = [
        {'id': 'task_1', 'type': 'data_processing', 'data': {'input': 'test1'}},
        {'id': 'task_2', 'type': 'report_generation', 'data': {'input': 'test2'}},
    ]

    for task in test_tasks:
        try:
            result = await workflow_service.process_workflow_task(task)
            print(f"Task {task['id']} completed: {result['status']}")
        except Exception as e:
            print(f"Task {task['id']} failed: {e}")

    # Wyświetl metryki
    for service_name in ['validation-service', 'execution-service', 'notification-service']:
        metrics = mesh.get_service_metrics(service_name)
        if metrics:
            print(f"\\n{service_name} metrics:")
            print(f"  Total calls: {metrics['total_calls']}")
            print(f"  Success rate: {metrics['successful_calls']/metrics['total_calls']:.2%}")
            print(f"  Avg response time: {metrics['avg_response_time']:.3f}s")

if __name__ == "__main__":
    asyncio.run(main())`}
          language="python"
          title="Implementacja mikroserwisów z service mesh i service discovery"
        />

        <h2>Optymalizacja Wydajności</h2>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Database className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Connection Pooling</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Wielokrotne wykorzystanie połączeń bazodanowych zmniejsza narzut.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Zap className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Async Processing</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Asynchroniczne przetwarzanie pozwala lepiej wykorzystać zasoby.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-purple-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Query Optimization</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Optymalizacja zapytań i indeksów poprawia czas odpowiedzi.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Server className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Resource Management</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Efektywne zarządzanie pamięcią, CPU i I/O.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 my-6">
          <h3 className="text-green-800 dark:text-green-200 font-medium mb-2">💡 Kluczowe Wskazówki Skalowania</h3>
          <ul className="text-green-700 dark:text-green-300 space-y-1 text-sm">
            <li>• <strong>Planuj skalowanie od początku:</strong> Projektuj systemy z skalowalnością w myślach</li>
            <li>• <strong>Implementuj monitoring proaktywnie:</strong> Śledź metryki zanim pojawią się problemy</li>
            <li>• <strong>Używaj auto-scaling:</strong> Automatyczne skalowanie oszczędza koszty i zapewnia dostępność</li>
            <li>• <strong>Testuj skalowalność:</strong> Regularnie testuj system pod dużym obciążeniem</li>
            <li>• <strong>Optymalizuj koszt-wydajność:</strong> Znajdź równowagę między wydajnością a kosztami</li>
            <li>• <strong>Planuj failover:</strong> Systemy muszą działać nawet gdy część komponentów zawiedzie</li>
            <li>• <strong>Monitoruj koszty:</strong> Skalowanie zwiększa koszty - śledź je dokładnie</li>
          </ul>
        </div>

        <h2>Podsumowanie</h2>
        <p>
          Skalowanie systemów workflow to złożony proces wymagający zrozumienia architektury,
          monitoringu i optymalizacji. Kluczem do sukcesu jest połączenie automatycznego skalowania
          z inteligentnym shardingiem danych i optymalizacją wydajności. Pamiętaj, że skalowanie
          to nie tylko technologia - to także strategia biznesowa wpływająca na koszty i doświadczenie użytkowników.
        </p>
      </motion.div>
    </div>
  );
}