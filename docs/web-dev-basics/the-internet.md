---
layout: default
title: The Internet
parent: Web Dev Basics
nav_order: 5
---

# The Internet

Here are some vocabulary words and demonstrations having to do with the internet.

## Vocabulary

[Source](https://apcentral.collegeboard.org/media/pdf/ap-computer-science-principles-course-and-exam-description.pdf?course=ap-computer-science-principles)

- A **computing device** is a physical artifact that can run a program. Some examples include computers, tablets, servers, routers, and smart sensors.
- A **computing system** is a group of computing devices and programs working together for a common purpose.
- A **computer network** is a group of interconnected computing devices capable of sending or receiving data. A computer network is a type of computing system.
- A **path** between two computing devices on a computer network (a sender and a receiver) is a sequence of directly connected computing devices that begins at the sender and ends at the receiver.
- **Routing** is the process of finding a path from sender to receiver.
- The **bandwidth** of a computer network is the maximum amount of data that can be sent in a fixed amount of time. Bandwidth is usually measured in bits per second.
- A **protocol** is an agreed-upon set of rules that specify the behavior of a system. The protocols used in the Internet are open, which allows users to easily connect additional computing devices to the Internet. Example protocols: IP, HTTP(S), TCP, FTP, UDP.
- The **scalability** of a system is the capacity for the system to change in size and scale to meet new demands.
- Information is passed through the Internet as a **data stream**. Data streams contain chunks of data, which are encapsulated in **packets**.
- **Redundancy** is the inclusion of extra components that can be used to mitigate failure of a system if other components fail.
- When a system can support failures and still continue to function, it is called **fault-tolerant**.

## Internet Game

Try to connect all the cities to make a fault-tolerant network with the least amount of cost.

Game Permalink: [https://NetworkGame.buckldav.repl.co](https://NetworkGame.buckldav.repl.co)

<button id="start">Start Game</button>

<iframe id="internetGame" src="" width="600" height="600" title="Internet Game"></iframe>

<script>
    const button = document.querySelector("button");
    button.onclick = () => { 
        document.getElementById('internetGame').setAttribute('src', 'https://NetworkGame.buckldav.repl.co');
    }
</script>
