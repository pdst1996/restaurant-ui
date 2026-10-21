<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
    Edit
} from '@element-plus/icons-vue'

const { t } = useI18n()

type Allergen = 'gluten' | 'nuts' | 'milk' | 'other'

interface Order {
    tableId: string
    customerName: string
    allergies: Allergen[]
    otherAllergies: string
    notes: string
    isTakeaway: boolean,
    products: OrderProduct[]
}

const newOrderObj = reactive<Order>({
    tableId: '',
    customerName: '',
    allergies: [],
    otherAllergies: '',
    notes: '',
    isTakeaway: false,
    products: []
})

export interface Product {
    id: string,
    name: string,
    description: string,
    attributes: string[],
    sizes: number[]
}

export interface OrderProduct {
    id: string,
    productId: string
    notes: string
    quantity: number,
    attributes: string[],
    size: number
}

const productCatalog: Product[] = [
    {
        id: "0001",
        name: "Chilaquiles Verdes",
        description: "Totopos de masa de maíz bañados en salsa verde, acompañados de crema y queso",
        attributes: [],
        sizes: [1, 0.5]
    },
    {
        id: "0002",
        name: "Chilaquiles Rojos",
        description: "Totopos de masa de maíz bañados en salsa roja casera",
        attributes: ["Sin Cebolla", "Sin Crema", "Picantes", "Blandos", "Extra Queso"],
        sizes: [1, 0.5]
    },
    {
        id: "0003",
        name: "Chilaquiles Mixtos",
        description: "Totopos bañados en una combinación de salsa verde y salsa roja",
        attributes: ["Sin Cebolla", "Sin Crema", "Picantes", "Blandos"],
        sizes: [1, 0.5]
    },
    {
        id: "0004",
        name: "Chilaquiles con Pollo",
        description: "Chilaquiles acompañados de pollo deshebrado, crema, queso y cebolla",
        attributes: ["Sin Cebolla", "Sin Crema", "Sin Queso", "Picantes", "Blandos"],
        sizes: [1, 0.5]
    },
    {
        id: "0005",
        name: "Chilaquiles con Arrachera",
        description: "Chilaquiles acompañados de arrachera a la parrilla",
        attributes: ["Sin Cebolla", "Sin Crema", "Sin Queso", "Picantes", "Blandos"],
        sizes: [1, 0.5]
    },
    {
        id: "0006",
        name: "Huevos Rancheros",
        description: "Huevos estrellados sobre tortilla bañados en salsa ranchera",
        attributes: ["Sin Cebolla", "Sin Frijoles", "Sin Aguacate", "Picantes"],
        sizes: [1, 0.5]
    },
    {
        id: "0007",
        name: "Huevos con Jamón",
        description: "Huevos revueltos con jamón acompañados de frijoles y tortillas",
        attributes: ["Sin Cebolla", "Sin Frijoles", "Sin Tortilla", "Extra Jamón"],
        sizes: [1, 0.5]
    },
    {
        id: "0008",
        name: "Huevos a la Mexicana",
        description: "Huevos revueltos con jitomate, cebolla y chile",
        attributes: ["Sin Cebolla", "Sin Chile", "Sin Jitomate", "Picantes"],
        sizes: [1, 0.5]
    },
    {
        id: "0009",
        name: "Huevos con Chorizo",
        description: "Huevos revueltos con chorizo mexicano acompañados de frijoles",
        attributes: ["Sin Cebolla", "Sin Frijoles", "Extra Chorizo", "Picantes"],
        sizes: [1, 0.5]
    },
    {
        id: "0010",
        name: "Molletes",
        description: "Pan artesanal con frijoles, queso gratinado y pico de gallo",
        attributes: ["Sin Cebolla", "Sin Pico de Gallo", "Sin Frijoles", "Extra Queso"],
        sizes: [1, 0.5]
    },

    {
        id: "0011",
        name: "Tacos al Pastor",
        description: "Tacos de carne al pastor con piña, cebolla y cilantro",
        attributes: ["Sin Cebolla", "Sin Cilantro", "Sin Piña", "Picantes", "Extra Piña"],
        sizes: [1, 3, 5]
    },
    {
        id: "0012",
        name: "Tacos de Arrachera",
        description: "Tacos de arrachera a la parrilla con cebolla y cilantro",
        attributes: ["Sin Cebolla", "Sin Cilantro", "Sin Salsa", "Picantes"],
        sizes: [1, 3, 5]
    },
    {
        id: "0013",
        name: "Tacos de Birria",
        description: "Tacos de birria de res acompañados de consomé",
        attributes: ["Sin Cebolla", "Sin Cilantro", "Sin Consomé", "Picantes", "Extra Queso"],
        sizes: [1, 3, 5]
    },
    {
        id: "0014",
        name: "Tacos de Pollo",
        description: "Tacos de pollo a la plancha con cebolla y cilantro",
        attributes: ["Sin Cebolla", "Sin Cilantro", "Sin Salsa", "Extra Pollo"],
        sizes: [1, 3, 5]
    },
    {
        id: "0015",
        name: "Tacos de Camarón",
        description: "Tacos de camarón sazonado con verduras y salsa de la casa",
        attributes: ["Sin Cebolla", "Sin Verduras", "Sin Salsa", "Picantes"],
        sizes: [1, 3, 5]
    },

    {
        id: "0016",
        name: "Hamburguesa Clásica",
        description: "Carne de res, lechuga, jitomate, cebolla y aderezo de la casa",
        attributes: ["Sin Cebolla", "Sin Jitomate", "Sin Lechuga", "Sin Mayonesa", "Extra Queso"],
        sizes: [1]
    },
    {
        id: "0017",
        name: "Hamburguesa BBQ",
        description: "Carne de res, queso, tocino, cebolla caramelizada y salsa BBQ",
        attributes: ["Sin Cebolla", "Sin Tocino", "Sin Queso", "Sin BBQ", "Extra Tocino"],
        sizes: [1]
    },
    {
        id: "0018",
        name: "Hamburguesa Mexicana",
        description: "Carne de res, queso, guacamole, jalapeño y pico de gallo",
        attributes: ["Sin Cebolla", "Sin Jalapeño", "Sin Guacamole", "Sin Pico de Gallo", "Picantes"],
        sizes: [1]
    },
    {
        id: "0019",
        name: "Hamburguesa de Pollo",
        description: "Pechuga de pollo empanizada con lechuga, jitomate y aderezo",
        attributes: ["Sin Cebolla", "Sin Jitomate", "Sin Lechuga", "Sin Aderezo"],
        sizes: [1]
    },

    {
        id: "0020",
        name: "Quesadilla de Queso",
        description: "Tortilla de harina o maíz rellena de queso fundido",
        attributes: ["Sin Tortilla de Harina", "Sin Tortilla de Maíz", "Extra Queso"],
        sizes: [1, 2, 3]
    },
    {
        id: "0021",
        name: "Quesadilla de Arrachera",
        description: "Quesadilla rellena de queso y arrachera a la parrilla",
        attributes: ["Sin Cebolla", "Sin Queso", "Extra Carne", "Picantes"],
        sizes: [1, 2, 3]
    },
    {
        id: "0022",
        name: "Quesadilla de Pollo",
        description: "Quesadilla de queso fundido con pollo a la plancha",
        attributes: ["Sin Queso", "Sin Pollo", "Sin Salsa", "Extra Pollo"],
        sizes: [1, 2, 3]
    },

    {
        id: "0023",
        name: "Enchiladas Verdes",
        description: "Tortillas rellenas de pollo bañadas en salsa verde y gratinadas con queso",
        attributes: ["Sin Cebolla", "Sin Crema", "Sin Queso", "Picantes"],
        sizes: [1, 0.5]
    },
    {
        id: "0024",
        name: "Enchiladas Rojas",
        description: "Tortillas rellenas de pollo bañadas en salsa roja y acompañadas de crema",
        attributes: ["Sin Cebolla", "Sin Crema", "Sin Queso", "Picantes"],
        sizes: [1, 0.5]
    },
    {
        id: "0025",
        name: "Enchiladas Suizas",
        description: "Enchiladas rellenas de pollo con salsa cremosa verde y queso gratinado",
        attributes: ["Sin Cebolla", "Sin Crema", "Sin Queso", "Picantes"],
        sizes: [1, 0.5]
    },

    {
        id: "0026",
        name: "Burrito de Res",
        description: "Tortilla de harina rellena de carne de res, frijoles, arroz y queso",
        attributes: ["Sin Frijoles", "Sin Arroz", "Sin Queso", "Sin Cebolla", "Picantes"],
        sizes: [1]
    },
    {
        id: "0027",
        name: "Burrito de Pollo",
        description: "Tortilla de harina rellena de pollo, arroz, frijoles y queso",
        attributes: ["Sin Frijoles", "Sin Arroz", "Sin Queso", "Sin Cebolla"],
        sizes: [1]
    },
    {
        id: "0028",
        name: "Burrito Vegetariano",
        description: "Tortilla de harina rellena de arroz, frijoles, verduras y queso",
        attributes: ["Sin Frijoles", "Sin Arroz", "Sin Queso", "Sin Cebolla", "Sin Chile"],
        sizes: [1]
    },

    {
        id: "0029",
        name: "Torta Ahogada",
        description: "Torta de carnitas bañada en salsa de jitomate y chile de árbol",
        attributes: ["Sin Cebolla", "Poco Picante", "Muy Picante", "Sin Salsa"],
        sizes: [1]
    },
    {
        id: "0030",
        name: "Torta de Pierna",
        description: "Pan artesanal relleno de pierna de cerdo, aguacate y verduras",
        attributes: ["Sin Cebolla", "Sin Aguacate", "Sin Jitomate", "Sin Mayonesa"],
        sizes: [1]
    },

    {
        id: "0031",
        name: "Parrillada",
        description: "Selección de carnes a la parrilla acompañadas de cebollitas y nopales",
        attributes: ["Sin Cebolla", "Sin Nopales", "Sin Chile", "Extra Carne", "Picantes"],
        sizes: [1, 2]
    },
    {
        id: "0032",
        name: "Arrachera",
        description: "Arrachera marinada a la parrilla acompañada de guacamole y frijoles",
        attributes: ["Sin Cebolla", "Sin Guacamole", "Sin Frijoles", "Término Medio", "Bien Cocida"],
        sizes: [1, 0.5]
    },
    {
        id: "0033",
        name: "Fajitas de Pollo",
        description: "Pollo a la parrilla salteado con pimientos y cebolla",
        attributes: ["Sin Cebolla", "Sin Pimiento", "Sin Chile", "Extra Pollo"],
        sizes: [1, 0.5]
    },
    {
        id: "0034",
        name: "Salmón a la Parrilla",
        description: "Filete de salmón a la parrilla acompañado de ensalada fresca",
        attributes: ["Sin Ensalada", "Sin Limón", "Bien Cocido", "Extra Verduras"],
        sizes: [1]
    },

    {
        id: "0035",
        name: "Guacamole",
        description: "Guacamole preparado al momento con aguacate, jitomate, cebolla y cilantro",
        attributes: ["Sin Cebolla", "Sin Jitomate", "Sin Cilantro", "Picantes", "Extra Aguacate"],
        sizes: [1, 0.5]
    },
    {
        id: "0036",
        name: "Nachos",
        description: "Totopos con queso fundido, frijoles, jalapeños y pico de gallo",
        attributes: ["Sin Frijoles", "Sin Jalapeños", "Sin Cebolla", "Sin Pico de Gallo", "Extra Queso"],
        sizes: [1, 0.5]
    },
    {
        id: "0037",
        name: "Papas Fritas",
        description: "Papas fritas crujientes sazonadas con sal",
        attributes: ["Sin Sal", "Extra Queso", "Extra Salsa", "Bien Doradas"],
        sizes: [1, 0.5]
    },
    {
        id: "0038",
        name: "Aros de Cebolla",
        description: "Aros de cebolla empanizados y fritos hasta quedar crujientes",
        attributes: ["Sin Salsa", "Extra Salsa", "Bien Dorados"],
        sizes: [1, 0.5]
    },

    {
        id: "0039",
        name: "Ensalada de la Casa",
        description: "Mezcla de lechugas, jitomate, pepino, zanahoria y aderezo",
        attributes: ["Sin Jitomate", "Sin Pepino", "Sin Zanahoria", "Sin Aderezo"],
        sizes: [1, 0.5]
    },
    {
        id: "0040",
        name: "Ensalada César",
        description: "Lechuga fresca, crutones, queso parmesano y aderezo César",
        attributes: ["Sin Crutones", "Sin Queso", "Sin Aderezo", "Con Pollo"],
        sizes: [1, 0.5]
    },

    {
        id: "0041",
        name: "Café Americano",
        description: "Café espresso diluido con agua caliente",
        attributes: ["Sin Azúcar", "Con Leche", "Leche Deslactosada", "Extra Espresso"],
        sizes: [1, 2]
    },
    {
        id: "0042",
        name: "Café Latte",
        description: "Espresso acompañado de leche vaporizada y espuma",
        attributes: ["Sin Azúcar", "Leche Deslactosada", "Leche de Almendra", "Extra Espresso"],
        sizes: [1, 2]
    },
    {
        id: "0043",
        name: "Cappuccino",
        description: "Espresso con leche vaporizada y abundante espuma",
        attributes: ["Sin Azúcar", "Leche Deslactosada", "Leche de Almendra", "Extra Espresso"],
        sizes: [1, 2]
    },
    {
        id: "0044",
        name: "Chocolate Caliente",
        description: "Chocolate mexicano caliente preparado con leche",
        attributes: ["Sin Azúcar", "Leche Deslactosada", "Leche de Almendra", "Extra Canela"],
        sizes: [1, 2]
    },

    {
        id: "0045",
        name: "Limonada",
        description: "Bebida refrescante preparada con limón natural",
        attributes: ["Sin Azúcar", "Poco Hielo", "Sin Hielo", "Mineral"],
        sizes: [1, 2]
    },
    {
        id: "0046",
        name: "Agua de Horchata",
        description: "Bebida tradicional de arroz con canela",
        attributes: ["Sin Azúcar", "Poco Hielo", "Sin Hielo", "Extra Canela"],
        sizes: [1, 2]
    },
    {
        id: "0047",
        name: "Agua de Jamaica",
        description: "Infusión fría de flor de jamaica endulzada",
        attributes: ["Sin Azúcar", "Poco Hielo", "Sin Hielo", "Extra Limón"],
        sizes: [1, 2]
    },
    {
        id: "0048",
        name: "Jugo de Naranja",
        description: "Jugo de naranja natural recién exprimido",
        attributes: ["Sin Hielo", "Poco Hielo", "Sin Pulpa", "Con Pulpa"],
        sizes: [1, 2]
    },
    {
        id: "0049",
        name: "Jugo Verde",
        description: "Jugo natural de naranja, piña, apio, espinaca y limón",
        attributes: ["Sin Apio", "Sin Espinaca", "Sin Piña", "Sin Limón", "Sin Hielo"],
        sizes: [1, 2]
    },
    {
        id: "0050",
        name: "Refresco",
        description: "Refresco embotellado o servido frío",
        attributes: ["Con Hielo", "Sin Hielo", "Extra Hielo", "Light"],
        sizes: [1, 2]
    },

    {
        id: "0051",
        name: "Brownie",
        description: "Brownie de chocolate servido caliente",
        attributes: ["Sin Nuez", "Sin Chocolate", "Extra Chocolate", "Con Helado"],
        sizes: [1, 2]
    },
    {
        id: "0052",
        name: "Pastel de Chocolate",
        description: "Rebanada de pastel de chocolate con cobertura cremosa",
        attributes: ["Sin Chocolate", "Extra Chocolate", "Con Helado", "Sin Crema"],
        sizes: [1]
    },
    {
        id: "0053",
        name: "Flan Napolitano",
        description: "Flan casero de vainilla con caramelo",
        attributes: ["Sin Caramelo", "Extra Caramelo", "Sin Crema"],
        sizes: [1]
    },
    {
        id: "0054",
        name: "Cheesecake",
        description: "Pastel de queso cremoso con base de galleta",
        attributes: ["Sin Salsa", "Extra Fresa", "Extra Chocolate", "Sin Crema"],
        sizes: [1]
    },
    {
        id: "0055",
        name: "Churros",
        description: "Churros crujientes espolvoreados con azúcar y canela",
        attributes: ["Sin Azúcar", "Sin Canela", "Extra Chocolate", "Extra Cajeta"],
        sizes: [1, 3, 5]
    }
];

const isCreateOrderDialogOpen = defineModel<boolean>({ default: false })
const isProductDialogOpen = ref(false)
const selectedProduct = ref<Product | null>(null)
const newOrderProduct = ref<OrderProduct>({
    id: "",
    productId: '',
    notes: '',
    quantity: 1,
    attributes: [],
    size: 1,
})
const tableOptions = Array.from({ length: 5 }, (_, index) => String(index + 1))
const allergenOptions = computed(() => [
    { value: 'gluten' as const, label: t('orders.create.allergens.gluten') },
    { value: 'nuts' as const, label: t('orders.create.allergens.nuts') },
    { value: 'milk' as const, label: t('orders.create.allergens.milk') },
    { value: 'other' as const, label: t('orders.create.allergens.other') },
])
const hasOtherAllergy = computed(() => newOrderObj.allergies.includes('other'))
const filteredProducts = ref<Product[]>(productCatalog)

function productName(productId: string): string {
    return t(`orders.create.productNames.${productId}`)
}

function removeOrderProduct(id: string): void {
    newOrderObj.products = newOrderObj.products.filter((product) => product.id !== id)
}

function addSelectedProduct(): void {
    const product: Product | undefined = productCatalog.find((item) => item.id === selectedProduct.value?.id);
    if (product == undefined) return

    newOrderObj.products.push({
        id: crypto.randomUUID(),
        productId: product.id,
        notes: '',
        quantity: 1,
        attributes: (newOrderProduct.value?.attributes || []),
        size: (newOrderProduct.value?.size || 1)
    })
    selectedProduct.value = null;
    newOrderProduct.value = {
        id: "",
        productId: '',
        notes: '',
        quantity: 1,
        attributes: [],
        size: 1,
    }
    //isProductDialogOpen.value = false
    ElMessage.success(t('orders.create.messages.productAdded', {
        productName: product.name
    }))
}

function isCreateOrderButtonDisabled(): boolean {
    if (!newOrderObj.tableId || newOrderObj.tableId === "") {
        return true;
    }
    if (!newOrderObj.customerName || newOrderObj.customerName === "") {
        return true;
    }
    if (!newOrderObj.products || newOrderObj.products.length <= 0) {
        return true;
    }
    return false;
}

function createOrder(): void {
    showNewOrderDetailsModal();
}

function filterProducts(query: string) {
    const search = query.toLowerCase().trim()

    if (!search) {
        filteredProducts.value = productCatalog
        return
    }

    filteredProducts.value = productCatalog.filter(product => {
        const name = productName(product.id).toLowerCase()
        const id = product.id.toLowerCase()

        return name.includes(search) || id.includes(search)
    })
}

const isOrderSummaryDialogOpen = ref(false)

// Helper para mostrar el nombre del producto dentro del resumen
function getProductInfo(orderProduct: OrderProduct) {
    const product = productCatalog.find(p => p.id === orderProduct.productId)
    return {
        name: product ? productName(product.id) : orderProduct.productId,
        description: product?.description ?? ''
    }
}

function getAllergyLabels(): string {
    const labels = newOrderObj.allergies.map(a => {
        const found = allergenOptions.value.find(opt => opt.value === a)
        return found ? found.label : a
    })
    return labels.length > 0 ? labels.join(', ') : t('orders.create.noAllergies')
}

function showNewOrderDetailsModal(): void {
    isOrderSummaryDialogOpen.value = true;
}

function modifyProduct(): void {

}

function confirmOrder(): void {
    // Aquí va tu lógica real de envío (API call, store, etc.)
    ElMessage.success(t('orders.create.messages.orderCreated'))
    isOrderSummaryDialogOpen.value = false
    isCreateOrderDialogOpen.value = false
    // Opcional: resetear newOrderObj aquí
}
</script>

<template>
    <el-dialog v-model="isCreateOrderDialogOpen" width="90%">
        <el-dialog v-model="isProductDialogOpen" width="80%" :show-close="false">
            <template #header="{ titleId, titleClass }">
                <div class="my-header">
                    <h3 :id="titleId" :class="titleClass">
                        <span>{{ t('orders.create.addProductTitle') }}</span>
                    </h3>
                </div>
            </template>
            <div class="form-new-order-product">
                <el-form :model="newOrderObj" label-width="large" label-position="top">
                    <el-form-item :label="t('orders.create.fields.product')">
                        <el-select v-model="selectedProduct" :placeholder="t('orders.create.productPlaceholder')"
                            filterable clearable value-key="id" :filter-method="filterProducts" size="large">
                            <el-option v-for="product in filteredProducts" :key="product.id" :value="product"
                                :label="productName(product.id)">
                                <span class="product-option__name">
                                    {{ product.id }}{{ " - " }}{{ productName(product.id) }}
                                </span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="t('orders.create.fields.attributes')">
                        <el-row v-if="selectedProduct && selectedProduct?.attributes.length > 0">
                            <el-checkbox-group v-model="newOrderProduct.attributes">
                                <el-checkbox-button v-for="attr in selectedProduct?.attributes" :key="attr"
                                    :value="attr" size="large">
                                    {{ attr }}
                                </el-checkbox-button>
                            </el-checkbox-group>
                        </el-row>
                        <el-row v-else-if="selectedProduct && selectedProduct?.attributes.length <= 0">
                            <span style="font-weight: 100; font-size: small;">No hay opciones para este producto</span>
                        </el-row>
                        <el-row v-else>
                            <span style="font-weight: 100; font-size: small;">Seleccione el producto para ver sus
                                opciones</span>
                        </el-row>
                    </el-form-item>
                    <el-form-item :label="t('orders.create.fields.size')"
                        v-if="selectedProduct && selectedProduct?.sizes.length > 0">
                        <el-select v-model="newOrderProduct.size" width="10%"
                            :placeholder="t('orders.create.productSizePlaceholder')" value-key="id" size="large">
                            <el-option v-for="size in selectedProduct.sizes" :key="size" :value="size" :label="size">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="t('orders.create.fields.quantity')" v-show="selectedProduct">
                        <el-input-number size="large" v-model="newOrderProduct.quantity" />
                    </el-form-item>
                    <el-form-item :label="t('orders.create.fields.notes')" v-show="selectedProduct">
                        <el-input v-model="newOrderProduct.notes" type="textarea" rows="4" />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="isProductDialogOpen = false">{{ t('common.close') }}</el-button>
                    <el-button type="primary" :disabled="!selectedProduct" @click="addSelectedProduct">
                        {{ t('orders.create.addProduct') }}
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog v-model="isOrderSummaryDialogOpen" width="70%" append-to-body>
            <template #header="{ titleId, titleClass }">
                <div class="my-header">
                    <h3 :id="titleId" :class="titleClass">
                        <span>{{ t('orders.create.summaryTitle') }}</span>
                    </h3>
                </div>
            </template>

            <el-descriptions :column="2" border>
                <el-descriptions-item :label="t('orders.create.fields.table')">
                    {{ newOrderObj.tableId }}
                </el-descriptions-item>
                <el-descriptions-item :label="t('orders.create.fields.customerName')">
                    {{ newOrderObj.customerName }}
                </el-descriptions-item>
                <el-descriptions-item :label="t('orders.create.fields.takeaway')">
                    {{ newOrderObj.isTakeaway ? t('common.yes') : t('common.no') }}
                </el-descriptions-item>
                <el-descriptions-item :label="t('orders.create.fields.allergies')" :span="2">
                    <span
                        :style="{ color: newOrderObj.allergies.length ? 'var(--el-color-danger)' : 'inherit', fontWeight: newOrderObj.allergies.length ? 'bold' : 'normal' }">
                        {{ getAllergyLabels() }}
                    </span>
                </el-descriptions-item>
                <el-descriptions-item v-if="hasOtherAllergy" :label="t('orders.create.fields.otherAllergies')"
                    :span="2">
                    {{ newOrderObj.otherAllergies }}
                </el-descriptions-item>
                <el-descriptions-item :label="t('orders.create.fields.notes')" :span="2" v-if="newOrderObj.notes">
                    {{ newOrderObj.notes }}
                </el-descriptions-item>
            </el-descriptions>

            <h4 style="margin-top: 20px;">{{ t('orders.create.fields.products') }}</h4>

            <el-table :data="newOrderObj.products" border stripe style="width: 100%">
                <el-table-column :label="t('orders.create.fields.product')">
                    <template #default="{ row }">
                        {{ getProductInfo(row).name }}
                    </template>
                </el-table-column>
                <el-table-column :label="t('orders.create.fields.quantity')" width="100" align="center">
                    <template #default="{ row }">{{ row.quantity }}</template>
                </el-table-column>
                <el-table-column :label="t('orders.create.fields.size')" width="100" align="center">
                    <template #default="{ row }">{{ row.size }}</template>
                </el-table-column>
                <el-table-column :label="t('orders.create.fields.attributes')">
                    <template #default="{ row }">
                        <el-tag v-for="attr in row.attributes" :key="attr" size="small" style="margin: 2px;">
                            {{ attr }}
                        </el-tag>
                        <span v-if="!row.attributes.length" style="color: var(--el-text-color-secondary);">—</span>
                    </template>
                </el-table-column>
                <el-table-column :label="t('orders.create.fields.notes')">
                    <template #default="{ row }">
                        {{ row.notes || '—' }}
                    </template>
                </el-table-column>
            </el-table>

            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="isOrderSummaryDialogOpen = false">
                        {{ t('common.back') }}
                    </el-button>
                    <el-button type="success" @click="confirmOrder">
                        {{ t('orders.create.confirmSubmit') }}
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <template #header="{ titleId, titleClass }">
            <div class="my-header">
                <h3 :id="titleId" :class="titleClass">
                    <span>{{ t('orders.create.title') }}</span>
                </h3>
            </div>
        </template>
        <div class="form-new-order">
            <el-form :model="newOrderObj" label-width="auto" label-position="top">
                <el-form-item :label="t('orders.create.fields.table')">
                    <el-col :span="20" class="text-center">
                        <el-select v-model="newOrderObj.tableId" :placeholder="t('orders.create.tablePlaceholder')"
                            filterable clearable size="large">
                            <el-option v-for="table in tableOptions" :key="table" :label="table" :value="table" />
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                        <el-button class="add-table-button" type="success" plain size="large">
                            {{ t('orders.create.addTable') }}
                        </el-button>
                    </el-col>
                </el-form-item>
                <el-form-item :label="t('orders.create.fields.customerName')">
                    <el-input v-model="newOrderObj.customerName"
                        :placeholder="t('orders.create.customerNamePlaceholder')" size="large" />
                </el-form-item>
                <el-form-item :label="t('orders.create.fields.allergies')">
                    <el-row>
                        <el-checkbox-group v-model="newOrderObj.allergies">
                            <el-checkbox v-for="allergen in allergenOptions" :key="allergen.value"
                                :value="allergen.value" size="large">
                                {{ allergen.label }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-row>
                </el-form-item>
                <el-form-item :label="t('orders.create.fields.otherAllergies')" v-if="hasOtherAllergy">
                    <el-input v-model="newOrderObj.otherAllergies" type="textarea"
                        :placeholder="t('orders.create.otherAllergiesPlaceholder')" />
                </el-form-item>
                <el-form-item :label="t('orders.create.fields.products')">
                    <div class="flex gap-2">
                        <el-button class="button-new-tag" size="large" @click="isProductDialogOpen = true">
                            {{ t('orders.create.addProduct') }}
                        </el-button>
                        <el-tooltip placement="top" v-for="product in newOrderObj.products" trigger="click">
                            <template #content>
                                <b>Id:</b> {{ product.productId }}<br />
                                Quantity: {{ product.quantity }}<br />
                                Size: {{ product.size }}<br />
                                Attributes: <span v-for="(attr, index) in product.attributes">{{ attr }}<span
                                        v-if="(index + 1) != product.attributes.length">, </span></span>
                            </template>
                            <el-tag :key="product.id" closable size="large" type="success" :disable-transitions="false"
                                @close="removeOrderProduct(product.id)">
                                <el-button :icon="Edit" type="warning" circle size="small" @click="modifyProduct()" />
                                &nbsp;&nbsp;
                                {{ productName(product.productId) }}

                            </el-tag>
                        </el-tooltip>
                    </div>
                </el-form-item>
                <el-form-item :label="t('orders.create.fields.notes')">
                    <el-input v-model="newOrderObj.notes" type="textarea" rows="4" />
                </el-form-item>
                <el-form-item :label="t('orders.create.fields.takeaway')">
                    <el-switch v-model="newOrderObj.isTakeaway" />
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="isCreateOrderDialogOpen = false">{{ t('common.cancel') }}</el-button>
                <el-button type="primary" :disabled="isCreateOrderButtonDisabled()" @click="createOrder()">
                    {{ t('orders.create.submit') }}
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<style scoped>
.form-new-order-product {
    margin: 32px 24px 24px;
}

.form-new-order {
    margin: 32px 24px 24px;
    font-size: 60em !important;
}

.add-table-button {
    width: 100%;
}

.product-option__name {
    float: left;
}

.product-option__id {
    float: right;
    color: var(--el-text-color-secondary);
    font-size: 0.8125rem;
}

@media (max-width: 768px) {
    .form-new-order {
        margin: 24px 0;
    }
}
</style>
