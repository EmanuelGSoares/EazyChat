const express = require('express');
const { Configuration, OpenAIApi} = require ('openai');

const config  = new Configuration({
    apipKey: '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',
});

const openai = new OpenAIApi(config);

