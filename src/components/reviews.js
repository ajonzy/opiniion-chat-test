import React, { useState } from 'react'
import { Configuration, OpenAIApi } from "openai"

import Review from './review'

const reviews = [
    {
        name: "Yvonne Jackson",
        rating: 5,
        review: "Very please with quick response from maintenance, to a problem, prior to the weekend. The staff member was thorough and respectful and cleaned up well after the job was completed. Thank you and Happy New year!"
    },
    {
        name: "Peg McDaniel",
        rating: 5,
        review: "Kullen and Clarice have been personable and friendly. Maintenance needs to deal with a few issues like securing loose tub plumbing and covering hole around faucet and rescreening several windows. Will be monitoring for response. Plumbing in tub was taken care of, still waiting for rescreening of 3 windows. New Dishwasher didn't drain and leaked onto floor. Maintenance did repair within 2 hrs of work order, but I had to explain to worker it was due to related drain in garbage disposal 'not punched out' when installed. Will see if front door repair done after my furniture moved in. Update: screen repairs done promptly. Garbage disposal drain remains very slow, backs up with just few ounces of fluid, though maintenance insists it's fine. Bathroom tub repair won't be done 'as that's how it was built'. Front door repainting won't be done until spring. Prohibited from adding storm door at my own expense, despite many other units still having storm doors 'grandfathered' on their doors. Not at all the pleased with overall construction and maintenance of property. Seems owners want to lower property values!"
    },
    {
        name: "TLew!",
        rating: 5,
        review: "My non-emergency maintenance requests were handled within a 48 hour period. Always quick and polite service."
    },
    {
        name: "Denise Wilson",
        rating: 5,
        review: "Everyone has been so nice and helpful. Couldn't ask for more. The apartment was clean and ready for move in. Management has been super helpful. We are so happy!"
    },
    {
        name: "shane gamble",
        rating: 4,
        review: "A decent place to live. Quiet and cozy, right next to a metro park trail down into the valley. The buildings are old but the maintenance crew is very responsive. It was nice to be in a single level apartment home. The online system, Rent Cafe, is poorly developed and frustrating but the office folks are generally helpful. Hasn't been the same since Kathy Griebel left but it's still a nice place to live in the area."
    },
    {
        name: "H N",
        rating: 4,
        review: "I lived here for 16 months, and for the most part I’ve been satisfied. The community is clean and quiet and the staff at the office are friendly and helpful. My only main issue was the price for what you’re getting. The apartments are smaller with outdated appliances and decor. Also, I wouldn’t suggest living next to a unit with a handicap ramp. They’re metal and ridiculously loud anytime someone uses it. I’ve been woken up countless times. Also, I would suggest purchasing your own snow shovel. The sidewalks aren’t cleaned particularly well and they will not clean the area directly in front of your door. Other than those few issues I never had any major problems with my time living there."
    },
    {
        name: "Foster",
        rating: 4,
        review: "Clean, quiet community that is friendly and a nice place to live. Quite expensive though."
    },
    {
        name: "Patricia",
        rating: 3,
        review: "Cullen did a great job but corporate should have given me a breakdown of the move in charges as soon as I was approved. Included in that should have been what I needed to get the keys...a yr of Renters Insurance Paid with Redwood on the insurance and a cashiers check made out to Redwood. It took a few phone calls to get it all straighten out. Also, the washer and dryer were delivered today, but I never received a call telling me someone would be in my apartment. Good thing I was there. In the future my dogs will also be there and I would need the ability to put them away when strangers will be coming in. I'm very happy with the apartment, so don't get me wrong, just wanted to let you know that it could have gone a bit smoother."
    },
    {
        name: "Daniel",
        rating: 1,
        review: "have been living here for 11 years. They are very quick to raise the rent, but very slow to upgrade appliances or repair things in the property. It took me 6 months to get a new dishwasher. They never offered to replace carpet or do some upgrades. They are not very customer oriented."
    },
    {
        name: "Jen Seidel",
        rating: 1,
        review: "I wish I had a better review since Northampton Apartments in Akron was my home for over 3 years. The first year was GREAT! I fell in love with the location and having the park next door, along with my own entry way and no neighbors above or below me. I worked with Marcia and Mindy when I first signed my lease. When I first moved in, I had a welcome package from them - very sweet! When I would go in to the office to drop off my rent checks, Mindy always called me by my first name and it felt great that she made me feel like she wanted to get to know me. Sadly, as soon as I resigned another year, Mindy and Marcia went to a different location. That is when everything turned for the worse. Vicki and Hannah replaced them - rent checks were 'lost' which I was never late but it happened multiple times with them and said I was required to pay the late fee even though it wasn't my fault. From there I switched to online payments. Hannah helped me set it up then somehow it over charged me with the utilities. I brought it to there attention and Vicki had the nerve to say they can't refund MY money. She was like 'It's only $40' but what she doesn't realize is I work 2 jobs and I live paycheck to paycheck. I was in shock she would even say that as a manager - I feel like Redwood should make her do a cultural sensitivity class because she showed no sympathy whatsoever. She was always rude any time I go into the office and my neighbors agreed. It came to the time to resign my lease. I went back and forth then decided to stay another year and a half just because it was affordable plus it was close to both of my jobs. Hannah made a mistake on the lease after I signed. She left some charges off - I was definitely taken back that I owed so much more monthly. Never got a sorry but since I signed, I had to deal with it. Walls were thin. I could hear my neighbor blowing their nose. Moving out was atrocious with Vicki and we kept going back and forth. Maintenance was pretty fast with coming the same day. However, I had frequent shower problems that were temporarily fixed. Towards the end I just ended up living with it because I was tired of keep putting an order in for service. When putting in a order, make sure request they either take their shoes off or cover them. I assume that they would automatically but that was not the case. They left a lot of footprints when they came in and out with dirt. Towards moving out, apparently a pipe burst under my apartment or the one next to mine. During an emergency like that, I was never contacted. They just entered without my knowledge and I found out 12 hours later when I got home from work with a note. I felt violated because I didn't know and I had laundry out on my couch. Overall, Redwood could be the best home, just not at the Akron Location. Dawn Marie at the corporate office was AMAZING! Anytime I had problems with Hannah and Vicki, I would call her first and she always took care of anything I needed. I did not get my full security deposit back even though I left my place spotless. I was highly disappointed. I'm just glad I'm finally out and on my own home."
    },
    {
        name: "Mona",
        rating: 1,
        review: "NOT advisable at all - I have three suggestions for people from all around the world: Be careful about your pocket. Asking 500$ to be in the waiting list is their trick to get you into their game! Read every paper that they give you to sign three times, especially the rent price. It is fluctuating several times before getting the apartment for no reason! They are refusing to show you the unit before your moving in day. Insist on viewing the apartment!"
    },
]

export default function Reviews(props) {
    const [actionItems, setActionItems] = useState("")
    const [testPrompt, setTestPrompt] = useState("")
    const [promptAnswer, setPromptAnswer] = useState("")

    const configuration = new Configuration({
        apiKey: "API KEY HERE"
      })
    const openai = new OpenAIApi(configuration)
    const prompt = `Generate two lists: things that are going well, and things that can be improved on. Use the following reviews to generate the lists: ${reviews.map(review => review.review).join("\n\n")}`

    const getActionItems = () => {
        openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.6,
            max_tokens: 2000
        })
        .then(completion => {
            console.log(completion.data.choices[0].text)
            setActionItems(completion.data.choices[0].text)
        })
        .catch(error => console.log(error))
    }

    const test = () => {
        openai.createCompletion({
            model: "text-davinci-003",
            prompt: testPrompt.replaceAll("$reviews", reviews.map(review => review.review).join("\n\n")),
            temperature: 0.6,
            max_tokens: 2000
        })
        .then(completion => {
            console.log(completion.data.choices[0].text)
            setPromptAnswer(completion.data.choices[0].text)
        })
        .catch(error => console.log(error))
    }

    const formatActionItems = actionItems => {
        const [_, positive, negative] = actionItems.split("\n\n")
        const [positiveHeader, positiveItems] = positive.split(":")
        const [negativeHeader, negativeItems] = negative.split(":")

        return (
            <div className="action-items-content">
                <div className="positive-wrapper">
                    <h4>{positiveHeader}</h4>
                    {positiveItems.split("\n").map((item, index) => <p key={`p-${index}`}>{item}</p>)}
                </div>
                <div className="negative-wrapper">
                    <h4>{negativeHeader}</h4>
                    {negativeItems.split("\n").map((item, index) => <p key={`p-${index}`}>{item}</p>)}
                </div>
            </div>
        )
    }

    return (
        <div className='reviews-wrapper'>
            {reviews.map((review, index) => (
                <Review key={index} name={review.name} rating={review.rating} review={review.review} />
            ))}

            <div className="action-items-wrapper">
                <button onClick={getActionItems}>Get Action Items</button>

                {actionItems.length > 0
                    ? (
                        <div className="action-items-content-wrapper">
                            <h3>Action Items</h3>
                            {formatActionItems(actionItems)}
                        </div>
                    )
                    : null
                }
            </div>

            <div className="test-prompt-wrapper">
                <h3>Test Prompt</h3>
                <p>Use this to try different prompts. Passing in "$reviews" will pass in all the reviews. Example: "Summarize these reviews in 100 words or less: $reviews"</p>
                <textarea placeholder='Prompt' onChange={event => setTestPrompt(event.target.value)} />
                <button onClick={test}>Test</button>
                {promptAnswer.length > 0
                    ? (
                        <div className="test-prompt-content-wrapper">
                            <h3>Returned Answer</h3>
                            <p>{promptAnswer}</p>
                        </div>
                    )
                    : null
                }
            </div>
        </div>
    )
}