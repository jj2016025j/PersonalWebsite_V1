// text-davinci-002
//openai.js
function sendMessage(sendToGpt = false) {
    let inputField = document.getElementById('input');
    let message = inputField.value;
    inputField.value = '';
    document.getElementById('chatbox').innerHTML += `<div>訪客: ${message}</div>`;
    if (!sendToGpt)
        return
    //預設訪問 要先開伺服器
    sendMessageToGpt({
        userMessage: message 
    })
}

//讀取密鑰後訪問gpt
// fetchConfigAndSendMessage("你好，我想了解更多关于你的信息。");
// function fetchConfigAndSendMessage(message) {
//     fetch('../static/json/config.json')
//         .then(response => response.json())
//         .then(OPENAI_API_Data => {
//             const OPENAI_API_KEY = OPENAI_API_Data.OPENAI_API.OPENAI_API_KEY;
//             sendMessageToGpt(message, OPENAI_API_KEY);
//         })
//         .catch(error => {
//             console.error('Error fetching config JSON:', error);
//             document.getElementById('chatbox').innerHTML += `<div>Error: 無法讀取配置文件。</div>`;
//         });
// }

// openai.js

/**
 * 发送消息到 GPT 模型的函数
 * 
 * 默认配置:
 * - URL: 'http://localhost:1234/v1' 用于本地测试
 * - 备选 URL: 'https://api.openai.com/v1/chat/completions' 用于生产环境
 * - 默认模型: 'local-model' 用于本地测试
 * - 备选模型: 'gpt-3.5-turbo' 用于生产环境
 */
async function sendMessageToGpt(config) {
    const {
        url = 'http://localhost:1234/v1', // 本地服务器 URL
        OPENAI_API_KEY = 'not-needed', // 默认 API 密钥
        model = 'local-model', // 默认模型
        messages,
        systemPrompt = '你是一個主要說繁體中文的語音助理',
        userMessage,
        temperature = 0.7,
        max_tokens = 500,
    } = config;

    // 构建消息数组
    const messageArray = messages || [
        { "role": "system", "content": systemPrompt },
        { "role": "user", "content": userMessage }
    ];

    try {
        const response = await fetch(url, {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json',
            //     'Authorization': `Bearer ${OPENAI_API_KEY}`
            // },
                body: JSON.stringify({
                model,
                messages: messageArray,
                temperature,
                max_tokens
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); // 打印 GPT 回复的 JSON 数据
        console.log(data.choices[0].message.content); // 打印 GPT 回复的内容
        const gptResponse = data.choices[0].message.content.trim();
        document.getElementById('chatbox').innerHTML += `<div>GPT: ${gptResponse}</div>`;
    } catch (error) {
        console.error('Error fetching OpenAI completion:', error);
        document.getElementById('chatbox').innerHTML += `<div>Error: 無法從 GPT 獲得回應。</div>`;
    }
}
//自定義
// sendMessageToGpt({
//     url: 'https://api.openai.com/v1/chat/completions', // 生产环境 URL
//     OPENAI_API_KEY: 'your-real-api-key', // 实际的 API 密钥
//     model: 'gpt-3.5-turbo', // 生产环境模型
//     userMessage: "你好，我想了解更多关于你的信息。",
//     systemPrompt: "你是一个高级的聊天机器人。"
// }).then(response => {
//     console.log(response);
// }).catch(error => {
//     console.error(error);
// });

export { sendMessage, sendMessageToGpt };