const {Configuration, OpenAIApi} = require('openai');
const appConfig = require('../config');
// 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 //NEOIto ORG
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openaiService = {
    createMovieSuggestion: async (messages)=>{
        try {
            if(!messages || !Array.isArray(messages)||messages.length==0) throw new Error("Invalid messages!!");
            const openai = new OpenAIApi(config);
            const response = await openai.createChatCompletion({
                model:"gpt-3.5-turbo",
                messages,
                temperature:0.8,
            })
            // console.log(response.data.choices[0].message.content);
            return response.data.choices[0].message.content;
        } catch (error) {
            console.log(error);
            throw new Error(error)
        }
    }
}

module.exports = openaiService;