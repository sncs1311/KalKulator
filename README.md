# 🥝KalKulator  

  Let’s be honest: It’s 2026.  
We’re living in the era of Agentic AI, Quantum-enhanced cryptography, and Neural-link interfaces.  
While everyone else is busy fine-tuning Large Action Models (LAMs) or debugging Decentralized Autonomous Organizations, I decided to go back to the basics.  

I built "A Calculator!"

Why? Because no matter how many GPUs you have in the cloud, you still need to know if you can afford lunch after paying your AWS bill.  



## 🚀 The Logic

I didn't want a "dumb" calculator that just clears everything on every tap.  
I focused on making the math feel intuitive:

* **Continuous Chained Operations:** It handles chaining i.e. the previous operation is solved automatically when you hit a new operator.
  For example, if you type 10 + 5 and then hit ×, it results in 15 immediately so you can keep moving. No constant "Enter" or = button spamming required.

* **Intelligent Number Input:** Built a robust state-management flow to handle when the calculator should start a new number versus appending to the current one—mimicking the seamless transitions of the actual iOS app.

* **The Apple Aesthetic:** Meticulously applied the Apple design language. This includes using the Inter font family for that high-end tech look, specific semantic hex codes for button states, and a dark mode that feels truly native.


## 🛠️ Tech Stack

* **HTML5:** Pure semantic structure.
* **CSS3:** Utilizing Custom Variables for a dynamic Dark/Light mode toggle. It doesn't just invert colors; it uses a deliberate palette to stay true to the aesthetic.
* **Vanilla JavaScript:** Zero frameworks. Zero dependencies. Just pure, functional logic.

---

## 💡"Why"

I always wanted to apply the HTML, CSS, and JS I’ve been studying to a real-world UI. The goal was to recreate the Apple calculator from scratch and prove that even a "simple" project requires a surprising amount of logic.  


**Live Demo:** [Click here to view the app on Vercel]([your-vercel-link-here](https://kalkulator-three-wheat.vercel.app/))
