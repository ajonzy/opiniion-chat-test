import React, { useState } from 'react'
import { Configuration, OpenAIApi } from "openai"

export default function Review(props) {
    const [summary, setSummary] = useState("")

    const configuration = new Configuration({
        apiKey: "API KEY HERE"
      })
    const openai = new OpenAIApi(configuration)
    const prompt = `Summarize this review in 100 words or less: ${props.review}`

    const summarize = () => {
        openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.6,
            max_tokens: 200
        })
        .then(completion => {
            console.log(completion.data.choices[0].text)
            setSummary(completion.data.choices[0].text)
        })
        .catch(error => console.log(error))
    }

    return (
        <div className='review-wrapper'>
            <div className="name-wrapper review-content">
                <h3>Name</h3>
                <p>{props.name}</p>
            </div>

            <div className="rating-wrapper review-content">
                <h3>Rating</h3>
                <p>{props.rating}</p>
            </div>
            
            <div className="review-content-wrapper review-content">
                <h3>Review</h3>
                <p>{props.review}</p>
            </div>

            <button onClick={summarize}>Summarize</button>

            {summary.length > 0
                ? (
                    <div className="summary-wrapper">
                        <h3>Summary</h3>
                        <p>{summary}</p>
                    </div>
                )
                : null
            }
        </div>
    )
}