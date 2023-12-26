//訪問openai
let OPENAI_API_Data = {}
fetch('../json/config.json')
    .then(response => response.json())
    .then(jsonData => {
        OPENAI_API_Data = jsonData
        console.log(OPENAI_API_Data.OPENAI_API.OPENAI_API_KEY); // 访问产品名
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });

document.getElementById('chatForm').addEventListener('submit', function (event) {
    event.preventDefault(); // 阻止表单默认提交行为
    let inputField = document.getElementById('input');
    let message = inputField.value;
    inputField.value = '';

    // 显示用户信息
    document.getElementById('chatbox').innerHTML += `<div>訪客: ${message}</div>`;

    // message = [{ "role": "user", "content": "Say this is a test!" }]

    // 调用 OpenAI API
    let chat_with_chatgpt = false
    if (chat_with_chatgpt) {
        fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.OPENAI_API_KEY}` // 用实际的 API 密钥替换
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ "role": "user", "content": `${message}` }],
                temperature: 0.7,
                max_tokens: 1
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // 提取 GPT 响应
                let gptResponse = data.choices[0].message.content.trim();
                document.getElementById('chatbox').innerHTML += `<div>GPT: ${gptResponse}</div>`;
            })
            .catch(error => console.error('Error:', error));
    };
})

// text-davinci-002