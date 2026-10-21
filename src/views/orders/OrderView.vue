<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import DataTable from '@/components/DataTable.vue'
import CreateOrderView from './CreateOrderView.vue'

interface Order {
    id: string
    table: string
    name: string
    itemsQty: number
    total: number
    server: string
    createdTimestamp?: string
    items: Array<{
        name: string
        quantity: number
        price: number
    }>
}

const initialOrders: Order[] = [
    {
        "id": "0001",
        "table": "1",
        "name": "Daniel",
        "itemsQty": 3,
        "total": 420,
        "server": "Poncho",
        "createdTimestamp": "2026-09-23T20:45:12Z",
        "items": [
            {
                "name": "Queso",
                "quantity": 1,
                "price": 20
            },
            {
                "name": "Chilaquiles Verdes",
                "quantity": 2,
                "price": 200
            }
        ]
    },
    {
        "id": "0002",
        "table": "19",
        "name": "Diego",
        "itemsQty": 3,
        "total": 340,
        "server": "Poncho",
        "createdTimestamp": "2026-09-23T21:00:44Z",
        "items": [
            {
                "name": "Salsa",
                "quantity": 1,
                "price": 20
            },
            {
                "name": "Chilaquiles Rojos",
                "quantity": 2,
                "price": 200
            }
        ]
    },
    {
        "id": "0003",
        "table": "6",
        "name": "Jennie",
        "itemsQty": 2,
        "total": 902,
        "server": "Ana",
        "createdTimestamp": "2026-09-23T21:01:44Z",
        "items": [
            {
                "name": "Salsa",
                "quantity": 1,
                "price": 20
            },
            {
                "name": "Chilaquiles Rojos",
                "quantity": 2,
                "price": 200
            }
        ]
    },
    {
        "id": "0004",
        "table": "12",
        "name": "Sofía",
        "itemsQty": 4,
        "total": 580,
        "server": "Carlos",
        "createdTimestamp": "2026-09-23T21:05:18Z",
        "items": [
            {
                "name": "Café Latte",
                "quantity": 2,
                "price": 80
            },
            {
                "name": "Huevos Rancheros",
                "quantity": 1,
                "price": 180
            },
            {
                "name": "Pan Dulce",
                "quantity": 1,
                "price": 60
            }
        ]
    },
    {
        "id": "0005",
        "table": "3",
        "name": "Luis",
        "itemsQty": 3,
        "total": 450,
        "server": "Mariana",
        "createdTimestamp": "2026-09-23T21:08:32Z",
        "items": [
            {
                "name": "Hamburguesa Clásica",
                "quantity": 2,
                "price": 180
            },
            {
                "name": "Papas Fritas",
                "quantity": 1,
                "price": 90
            }
        ]
    },
    {
        "id": "0006",
        "table": "8",
        "name": "Valeria",
        "itemsQty": 5,
        "total": 720,
        "server": "Poncho",
        "createdTimestamp": "2026-09-23T21:12:07Z",
        "items": [
            {
                "name": "Tacos al Pastor",
                "quantity": 3,
                "price": 120
            },
            {
                "name": "Guacamole",
                "quantity": 1,
                "price": 90
            },
            {
                "name": "Agua de Horchata",
                "quantity": 1,
                "price": 60
            }
        ]
    },
    {
        "id": "0007",
        "table": "15",
        "name": "Andrés",
        "itemsQty": 2,
        "total": 390,
        "server": "Ana",
        "createdTimestamp": "2026-09-23T21:15:21Z",
        "items": [
            {
                "name": "Enchiladas Suizas",
                "quantity": 1,
                "price": 220
            },
            {
                "name": "Limonada",
                "quantity": 1,
                "price": 70
            }
        ]
    },
    {
        "id": "0008",
        "table": "4",
        "name": "Camila",
        "itemsQty": 4,
        "total": 510,
        "server": "Carlos",
        "createdTimestamp": "2026-09-23T21:18:45Z",
        "items": [
            {
                "name": "Molletes",
                "quantity": 2,
                "price": 140
            },
            {
                "name": "Café Americano",
                "quantity": 2,
                "price": 60
            }
        ]
    },
    {
        "id": "0009",
        "table": "21",
        "name": "Mateo",
        "itemsQty": 3,
        "total": 680,
        "server": "Mariana",
        "createdTimestamp": "2026-09-23T21:22:10Z",
        "items": [
            {
                "name": "Corte de Res",
                "quantity": 1,
                "price": 480
            },
            {
                "name": "Papas Fritas",
                "quantity": 2,
                "price": 100
            }
        ]
    },
    {
        "id": "0010",
        "table": "7",
        "name": "Andrea",
        "itemsQty": 2,
        "total": 310,
        "server": "Poncho",
        "createdTimestamp": "2026-09-23T21:25:36Z",
        "items": [
            {
                "name": "Chilaquiles Verdes",
                "quantity": 1,
                "price": 220
            },
            {
                "name": "Jugo de Naranja",
                "quantity": 1,
                "price": 90
            }
        ]
    },
    {
        "id": "0011",
        "table": "10",
        "name": "Fernando",
        "itemsQty": 4,
        "total": 760,
        "server": "Ana",
        "createdTimestamp": "2026-09-23T21:29:02Z",
        "items": [
            {
                "name": "Pizza Pepperoni",
                "quantity": 1,
                "price": 420
            },
            {
                "name": "Refresco",
                "quantity": 2,
                "price": 70
            },
            {
                "name": "Brownie",
                "quantity": 1,
                "price": 200
            }
        ]
    },
    {
        "id": "0012",
        "table": "2",
        "name": "Renata",
        "itemsQty": 3,
        "total": 430,
        "server": "Carlos",
        "createdTimestamp": "2026-09-23T21:32:27Z",
        "items": [
            {
                "name": "Tostadas de Pollo",
                "quantity": 2,
                "price": 150
            },
            {
                "name": "Agua de Jamaica",
                "quantity": 1,
                "price": 60
            }
        ]
    },
    {
        "id": "0013",
        "table": "18",
        "name": "Alejandro",
        "itemsQty": 3,
        "total": 520,
        "server": "Mariana",
        "createdTimestamp": "2026-09-23T21:35:41Z",
        "items": [
            {
                "name": "Club Sandwich",
                "quantity": 1,
                "price": 280
            },
            {
                "name": "Papas Fritas",
                "quantity": 1,
                "price": 120
            },
            {
                "name": "Refresco",
                "quantity": 1,
                "price": 60
            }
        ]
    },
    {
        "id": "0014",
        "table": "5",
        "name": "Paola",
        "itemsQty": 2,
        "total": 360,
        "server": "Poncho",
        "createdTimestamp": "2026-09-23T21:38:55Z",
        "items": [
            {
                "name": "Enchiladas Rojas",
                "quantity": 1,
                "price": 260
            },
            {
                "name": "Café Latte",
                "quantity": 1,
                "price": 80
            }
        ]
    },
    {
        "id": "0015",
        "table": "14",
        "name": "Sebastián",
        "itemsQty": 5,
        "total": 890,
        "server": "Ana",
        "createdTimestamp": "2026-09-23T21:42:13Z",
        "items": [
            {
                "name": "Parrillada",
                "quantity": 2,
                "price": 350
            },
            {
                "name": "Guacamole",
                "quantity": 1,
                "price": 90
            },
            {
                "name": "Refresco",
                "quantity": 2,
                "price": 50
            }
        ]
    },
    {
        "id": "0016",
        "table": "9",
        "name": "Natalia",
        "itemsQty": 3,
        "total": 475,
        "server": "Carlos",
        "createdTimestamp": "2026-09-23T21:45:28Z",
        "items": [
            {
                "name": "Hamburguesa BBQ",
                "quantity": 1,
                "price": 290
            },
            {
                "name": "Papas Fritas",
                "quantity": 1,
                "price": 95
            },
            {
                "name": "Limonada",
                "quantity": 1,
                "price": 70
            }
        ]
    },
    {
        "id": "0017",
        "table": "23",
        "name": "Jorge",
        "itemsQty": 4,
        "total": 610,
        "server": "Mariana",
        "createdTimestamp": "2026-09-23T21:48:42Z",
        "items": [
            {
                "name": "Tacos de Arrachera",
                "quantity": 3,
                "price": 150
            },
            {
                "name": "Agua de Horchata",
                "quantity": 1,
                "price": 70
            },
            {
                "name": "Salsa",
                "quantity": 1,
                "price": 20
            }
        ]
    },
    {
        "id": "0018",
        "table": "11",
        "name": "Mónica",
        "itemsQty": 2,
        "total": 330,
        "server": "Poncho",
        "createdTimestamp": "2026-09-23T21:51:09Z",
        "items": [
            {
                "name": "Chilaquiles Rojos",
                "quantity": 1,
                "price": 230
            },
            {
                "name": "Jugo Verde",
                "quantity": 1,
                "price": 100
            }
        ]
    },
    {
        "id": "0019",
        "table": "16",
        "name": "Ricardo",
        "itemsQty": 3,
        "total": 570,
        "server": "Ana",
        "createdTimestamp": "2026-09-23T21:54:37Z",
        "items": [
            {
                "name": "Burrito de Res",
                "quantity": 2,
                "price": 220
            },
            {
                "name": "Refresco",
                "quantity": 1,
                "price": 60
            }
        ]
    },
    {
        "id": "0020",
        "table": "20",
        "name": "Claudia",
        "itemsQty": 4,
        "total": 690,
        "server": "Carlos",
        "createdTimestamp": "2026-09-23T21:57:11Z",
        "items": [
            {
                "name": "Pasta Alfredo",
                "quantity": 2,
                "price": 260
            },
            {
                "name": "Pan de Ajo",
                "quantity": 1,
                "price": 80
            },
            {
                "name": "Limonada",
                "quantity": 1,
                "price": 70
            }
        ]
    },
    {
        "id": "0021",
        "table": "13",
        "name": "Emiliano",
        "itemsQty": 3,
        "total": 480,
        "server": "Mariana",
        "createdTimestamp": "2026-09-23T22:00:26Z",
        "items": [
            {
                "name": "Torta Ahogada",
                "quantity": 2,
                "price": 190
            },
            {
                "name": "Agua de Jamaica",
                "quantity": 1,
                "price": 60
            }
        ]
    },
    {
        "id": "0022",
        "table": "24",
        "name": "Laura",
        "itemsQty": 2,
        "total": 410,
        "server": "Poncho",
        "createdTimestamp": "2026-09-23T22:03:44Z",
        "items": [
            {
                "name": "Enchiladas Suizas",
                "quantity": 1,
                "price": 300
            },
            {
                "name": "Café Latte",
                "quantity": 1,
                "price": 110
            }
        ]
    },
    {
        "id": "0023",
        "table": "17",
        "name": "Bruno",
        "itemsQty": 5,
        "total": 820,
        "server": "Ana",
        "createdTimestamp": "2026-09-23T22:06:18Z",
        "items": [
            {
                "name": "Costillas BBQ",
                "quantity": 2,
                "price": 320
            },
            {
                "name": "Papas Fritas",
                "quantity": 1,
                "price": 100
            },
            {
                "name": "Refresco",
                "quantity": 2,
                "price": 50
            }
        ]
    },
    {
        "id": "0024",
        "table": "25",
        "name": "Fernanda",
        "itemsQty": 3,
        "total": 540,
        "server": "Carlos",
        "createdTimestamp": "2026-09-23T22:09:35Z",
        "items": [
            {
                "name": "Nachos",
                "quantity": 1,
                "price": 180
            },
            {
                "name": "Quesadilla de Arrachera",
                "quantity": 1,
                "price": 290
            },
            {
                "name": "Agua de Horchata",
                "quantity": 1,
                "price": 70
            }
        ]
    },
    {
        "id": "0025",
        "table": "22",
        "name": "Iván",
        "itemsQty": 4,
        "total": 630,
        "server": "Mariana",
        "createdTimestamp": "2026-09-23T22:12:49Z",
        "items": [
            {
                "name": "Chilaquiles Verdes",
                "quantity": 2,
                "price": 220
            },
            {
                "name": "Huevo Extra",
                "quantity": 1,
                "price": 60
            },
            {
                "name": "Jugo de Naranja",
                "quantity": 1,
                "price": 90
            }
        ]
    },
    {
        "id": "0026",
        "table": "26",
        "name": "Regina",
        "itemsQty": 2,
        "total": 350,
        "server": "Poncho",
        "createdTimestamp": "2026-09-23T22:15:22Z",
        "items": [
            {
                "name": "Pizza Margarita",
                "quantity": 1,
                "price": 280
            },
            {
                "name": "Refresco",
                "quantity": 1,
                "price": 70
            }
        ]
    },
    {
        "id": "0027",
        "table": "27",
        "name": "Óscar",
        "itemsQty": 3,
        "total": 460,
        "server": "Ana",
        "createdTimestamp": "2026-09-23T22:18:06Z",
        "items": [
            {
                "name": "Tacos de Birria",
                "quantity": 2,
                "price": 180
            },
            {
                "name": "Consomé",
                "quantity": 1,
                "price": 100
            }
        ]
    },
    {
        "id": "0028",
        "table": "28",
        "name": "Patricia",
        "itemsQty": 4,
        "total": 740,
        "server": "Carlos",
        "createdTimestamp": "2026-09-23T22:21:33Z",
        "items": [
            {
                "name": "Salmón a la Parrilla",
                "quantity": 1,
                "price": 480
            },
            {
                "name": "Ensalada",
                "quantity": 1,
                "price": 140
            },
            {
                "name": "Agua Mineral",
                "quantity": 2,
                "price": 60
            }
        ]
    },
    {
        "id": "0029",
        "table": "29",
        "name": "Héctor",
        "itemsQty": 3,
        "total": 520,
        "server": "Mariana",
        "createdTimestamp": "2026-09-23T22:24:57Z",
        "items": [
            {
                "name": "Pozole",
                "quantity": 2,
                "price": 190
            },
            {
                "name": "Agua de Jamaica",
                "quantity": 1,
                "price": 70
            }
        ]
    },
    {
        "id": "0030",
        "table": "30",
        "name": "Gabriela",
        "itemsQty": 4,
        "total": 670,
        "server": "Poncho",
        "createdTimestamp": "2026-09-23T22:28:14Z",
        "items": [
            {
                "name": "Fajitas de Pollo",
                "quantity": 2,
                "price": 240
            },
            {
                "name": "Guacamole",
                "quantity": 1,
                "price": 100
            },
            {
                "name": "Limonada",
                "quantity": 1,
                "price": 90
            }
        ]
    }
];


function getHourFromTimestamp(date: string | undefined): string {
    if (!date) return "";
    const rowDate = new Date(date);
    return rowDate.getHours().toString().padStart(2, '0') + ":" + rowDate.getMinutes().toString().padStart(2, '0');
}

function cloneOrder(order: Order): Order {
    return {
        ...order,
        items: order.items.map((item) => ({ ...item })),
    }
}

// Each table owns its own collection and pagination state.
const activeOrders = ref(initialOrders.map(cloneOrder))
const dailyOrders = ref(initialOrders.filter((order) => order.server === 'Poncho').map(cloneOrder))
const activeOrdersPage = ref(1)
const activeOrdersPageSize = ref(10)
const dailyOrdersPage = ref(1)
const dailyOrdersPageSize = ref(10)


function editOrder(order: Order): void {
    ElMessage.info(`La edición de la orden ${order.id} estará disponible próximamente.`)
}
const createOrderModal = ref(false)

</script>

<template>

    <CreateOrderView v-model="createOrderModal"></CreateOrderView>

    <el-row :gutter="20">
        <el-col :span="24">
            <div class="orders-table">
                <el-card class="orders-card">
                    <template #header>
                        <el-row :gutter="20">
                            <el-col :span="14">
                                <div class="card-active-orders">
                                    Órdenes activas
                                </div>
                            </el-col>
                            <el-col :span="10">
                                <div class="" style="text-align: right;">
                                    <el-button class="login-button" @click="createOrderModal = true">
                                        Nueva orden
                                    </el-button>
                                </div>
                            </el-col>
                        </el-row>
                    </template>
                    <DataTable v-model:current-page="activeOrdersPage" v-model:page-size="activeOrdersPageSize"
                        :data="activeOrders" show-pagination stripe>
                        <el-table-column prop="table" label="Mesa">
                            <template #default="scope">
                                <span class="table-number-column">{{ scope.row.table }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="Cliente" />
                        <el-table-column label="Hora">
                            <template #default="scope">{{ getHourFromTimestamp(scope.row.createdTimestamp) }}</template>
                        </el-table-column>
                        <el-table-column prop="itemsQty" label="Articulos" />
                        <el-table-column prop="total" label="Total" />
                        <el-table-column prop="server" label="Mesero/a" />
                        <el-table-column fixed="right" label="Acciones" min-width="120">
                            <template #default="scope">
                                <el-button type="primary" round size="small" @click="editOrder(scope.row)">
                                    Modificar
                                </el-button>
                            </template>
                        </el-table-column>
                    </DataTable>
                </el-card>
            </div>
        </el-col>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="24">
            <div class="orders-table">
                <el-card class="orders-card">
                    <template #header>
                        <div class="card-active-orders">
                            Tus órdenes del día
                        </div>
                    </template>
                    <DataTable v-model:current-page="dailyOrdersPage" v-model:page-size="dailyOrdersPageSize"
                        :data="dailyOrders" show-pagination stripe>
                        <el-table-column prop="table" label="Mesa">
                            <template #default="scope">
                                <span class="table-number-column">{{ scope.row.table }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="Cliente" />
                        <el-table-column prop="itemsQty" label="Articulos" />
                        <el-table-column prop="total" label="Total" />
                    </DataTable>
                </el-card>
            </div>
        </el-col>
    </el-row>



</template>

<style scoped>
:deep(.table-number-column) {
    display: inline-block;
    font-weight: 700 !important;
}

.login-button {
    width: 100%;
    min-height: 40px;
    margin-top: 0px;
    border: 0;
    border-radius: 10px;
    color: #fff8ef;
    background: var(--app-login-accent);
    box-shadow: 0 10px 18px rgb(84 45 29 / 20%);
    font-weight: 700;
}

.orders-table {
    width: 100%;
    padding: 24px;
}

.orders-card {
    width: 100%;
    border-radius: 14px;
}

.card-active-orders {
    color: var(--el-text-color-primary);
    font-weight: 700;
    font-style: normal;
}

.order-item+.order-item {
    margin-top: 12px;
}

.green-dot {
    padding-top: 40px;
}

@media (max-width: 768px) {
    .orders-table {
        padding: 12px 0;
    }

    .orders-card {
        width: 100%;
    }
}
</style>
