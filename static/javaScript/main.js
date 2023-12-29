//main.js
import {
    fetchJson, createHotProductList, selectRandomProducts,
    getCategoriesList, getSubcategories, findProducts, findProductsInfo
} from './backend.js';
import {
    createUI, initializeEventListeners,
    updateUserInfo, updateList
} from './FrontSide.js';

// 更新熱門
// 更新商品
// 更新子分類

//熱門商品
//子分類 所有商品
//所有商品
document.addEventListener('DOMContentLoaded', () => {
    Initialization()
    initializeEventListeners()
})

let ProductInfo
let Classification
let salesRecord
function Initialization() {
    //創建基本內容 頭尾 
    // 讀取json
    createUI()
    updateUserInfo();

    Promise.all([
        fetchJson('../json/ProductInformationSheet.json'),
        fetchJson('../json/ProductClassificationTable.json'),
        fetchJson('../json/salesRecord.json')
    ]).then(([ProductInfo2, ProductInfo3, ProductInfo4]) => {
        ProductInfo = ProductInfo2
        Classification = ProductInfo3
        salesRecord = ProductInfo4
        InitializationUI(ProductInfo, Classification, salesRecord)
    }).catch(error => {
        console.error("Error loading ProductInfo: ", error);
    });
}

function InitializationUI(ProductInfo, Classification, salesRecord) {
    if (ProductInfo && Classification && salesRecord) {
        //熱門
        let hotProducts = selectRandomProducts(ProductInfo.products, 10)
        console.log(hotProducts)
        updateList("hot-product-list", hotProducts, 'product');
        //父分類
        let categories = getCategoriesList(Classification)
        console.log(categories)
        updateList("classification-list", categories, 'category');
        //子分類
        categories = getSubcategories(Classification, "魔法");
        console.log(categories)
        updateList("sub-classification-list", categories, 'sub-category')
        //所有物品
        let allProducts = selectRandomProducts(ProductInfo.products, 20)
        updateList("all-product-list", allProducts, 'product');
    }
    finalTest("魔法", "擬態魔法")//測試===========================================
}

//更新子分類+ UNDO 這裡有錯
function updateSubcategories(parentCategory) {
    let Categories = getSubcategories(ProductInfo, parentCategory);
    updateList("sub-classification-list", Categories, 'sub-category');

    // 為生成的子分類添加點擊事件監聽器
    let elements = document.querySelectorAll(".sub-category");
    elements.forEach(element => {
        element.addEventListener("click", () => {
            let category = element.textContent; // 假設您在元素上設置了data-category屬性
            updateProduct(parentCategory, category);
        });
    });
}


//更新商品 UNDO
function updateProduct(parentCategory, categorie) {
    let Products = findProducts(Classification, parentCategory, categorie);
    Products = findProductsInfo(ProductInfo, Products);
    updateList("all-product-list", Products, 'product');
}

function finalTest(parentCategory, categorie) {
    updateSubcategories(parentCategory);
    updateProduct(parentCategory, categorie);
    // let Category = document.getElementById("sub-category")
    // Category.addEventListener("click", () => {
    //     updateSubcategories(Category.textContent)
    // })
}


console.log("ok")