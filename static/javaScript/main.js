//main.js
import { findJson, createHotProductList, getCategoryBestSellers, selectRandomProducts } from './backend.js';
import { createUI, updateHotProductList, updateClassificationList, updateAllProductList, initializeEventListeners } from './FrontSide.js';

function InitializationUI() {
    createUI()
    initializeEventListeners()
    fetch('../json/data.json')
        .then(response => response.json())
        .then(jsonData => {
            updateStore(jsonData)
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
            // 在这里处理错误
        });    // 异步获取 JSON 数据
}

function updateStore(data) {
    if (data) {
        const hotProductList = createHotProductList(data.products, data.salesRecords);
        updateHotProductList(hotProductList)
        //熱門分類
        const categoryBestSellers = getCategoryBestSellers(data.products);
        updateClassificationList(categoryBestSellers)
        //所有物品
        const selectedProducts = selectRandomProducts(data.products, 20);
        updateAllProductList(selectedProducts)
    }
}

InitializationUI()
console.log("ok")