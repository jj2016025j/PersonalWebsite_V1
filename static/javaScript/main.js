//main.js
import {
    createHotProductList, getCategoryBestSellers, selectRandomProducts, getCategoriesList, getAllSubcategories, getSubcategories
} from './backend.js';
import { createUI, updateHotProductList, updateClassificationList, updateAllProductList, initializeEventListeners } from './FrontSide.js';

function InitializationUI() {
    createUI()
    initializeEventListeners()
    fetch('../json/data.json')
        .then(response => response.json())
        .then(jsonData => {
            updateAllStoreUI(jsonData)
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
    test()
}

function updateAllStoreUI(data) {
    if (data) {
        //熱門
        updateHotProductList(createHotProductList(data.products, data.salesRecords))
        //分類
        updateClassificationList(getCategoryBestSellers(data.products))
        //所有物品
        updateAllProductList(selectRandomProducts(data.products, 20))
    }
}

function test() {
    fetch('../json/ProductInformationSheet.json')
        .then(response => response.json())
        .then(jsonData => {
            console.log(jsonData)
            const testProducts = selectRandomProducts(jsonData.products, 20);
            updateAllProductList(testProducts)

            console.log("父分類:", getCategoriesList(jsonData));
            console.log("所有子分類:", getAllSubcategories(jsonData));
            console.log("特定子分類:", getSubcategories(jsonData, "奇幻主題商品"));
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
            // 在这里处理错误
        });    // 异步获取 JSON 数据

}
//更新分類 UNDO
function updateCategoriesList() {
    fetch('../json/data.json')
        .then(response => response.json())
        .then(jsonData => {
            updateClassificationList(getCategoriesList(jsonData))
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
}
//分類後產生新的商品列表

InitializationUI()
console.log("ok")